/* Приёмка кита по страницам документации. Работает на локальной копии:
   ни serve_url, ни токенов, ни обращений к проекту. */
import { spawn } from 'node:child_process'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { keepDir } from './skip-dirs.mjs'
import { KIT_LIVE } from './kit-export.mjs'
import { assembleLocalKit, serve } from './audit/local-kit.mjs'
import { checkRendered, checkClasses, checkCssPresence, checkCompositesCss, checkComposites, checkDeclaredValues, checkNodes } from './audit/checks.mjs'
import { templateSlots } from './audit/template.mjs'
import { varMap } from './audit/tokens.mjs'
import { libraryTailwind } from './audit/tailwind.mjs'
import { oracleProps, readsCoverage, DELEGATES, delegateProps, CHILDREN, childCall, childPageName, CHILD_INTO, OWN_PAINT, SLOT_VARIANTS, PRIMITIVE_CLASSES, HABITAT, ACCEPTED_PAINT, acceptedPaintProblems } from './audit/props.mjs'
import { parseLedger } from '../bench/scripts/ledger-core.mjs'
import { expected, paintedTokens, resolveRaw, habitatTokens } from './audit/oracle.mjs'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const OUT = 'dist/audit'
const SFC_DIR = 'node_modules/@nuxt/ui/dist/runtime/components'

/* Запуск Chrome обязан быть АСИНХРОННЫМ. Синхронный execFileSync блокирует
   событийный цикл Node, а сервер поднят в этом же процессе — Chrome запрашивает
   страницу, Node в это время стоит внутри вызова и не может ответить, Chrome
   ждёт до таймаута. Проверено: с execFileSync все 118 страниц дали одинаковое
   «не отрисовалась за 60 секунд», хотя каждая из них открывается за секунды.

   Без --virtual-time-budget: он замораживает время, пока висит хоть один
   сетевой запрос, и на странице с внешними скриптами Chrome стоит до таймаута.

   Таймаут гасит всю группу процессов, а не только главный. Встроенный `timeout` у execFile
   шлёт SIGTERM одному Chrome, а его вспомогательные процессы держат открытым stdout — и
   колбэк не зовётся никогда: 24.09 прогон так простоял два часа на одной странице
   (DashboardResizeHandle). Поэтому Chrome запускается через spawn в своей группе (detached —
   у execFile такой опции нет, и группа молча не создаётся) и по таймауту получает SIGKILL вся
   группа: канал закрывается, вызов падает ошибкой, и страница уходит на вторую попытку, как
   при любом другом отказе. */
const MAX_DOM = 64 * 1024 * 1024
function dumpDom(url) {
  return new Promise((resolve, reject) => {
    const child = spawn(CHROME, ['--headless', '--disable-gpu', '--dump-dom', url], { detached: true, stdio: ['ignore', 'pipe', 'ignore'] })
    const chunks = []
    let size = 0
    let killed = false
    const killGroup = () => { killed = true; try { process.kill(-child.pid, 'SIGKILL') } catch { /* группа уже вышла сама */ } }
    const timer = setTimeout(killGroup, 60_000)
    child.stdout.on('data', (c) => { size += c.length; if (size > MAX_DOM) killGroup(); else chunks.push(c) })
    child.on('error', (err) => { clearTimeout(timer); reject(err) })
    child.on('close', (code) => {
      clearTimeout(timer)
      if (killed) reject(new Error(`Chrome погашен: ${size > MAX_DOM ? 'DOM больше 64 МБ' : 'таймаут 60 с'}`))
      else if (code !== 0) reject(new Error(`Chrome вышел с кодом ${code}`))
      else resolve(Buffer.concat(chunks).toString('utf8'))
    })
  })
}

const payloadOf = (html) => {
  const m = /<script type="application\/json" id="ds-audit">([\s\S]*?)<\/script>/.exec(html)
  return m ? JSON.parse(m[1]) : null
}
const docOf = (html) => JSON.parse(/id="ds-doc">([\s\S]*?)<\/script>/.exec(html)[1])

/* Шаблон компонента ищется так же, как его ищет сборка страниц
   (pipeline/build-docs.mjs): по всему дереву runtime/components, кроме prose —
   там лежат одноимённые обёртки для markdown, у которых своя разметка. */
/* Компоненты без единого data-slot в шаблоне библиотеки (Container, Link, Kbd…): узлы под
   ними принадлежат обёртке — см. checkNodes. Выводится из node_modules/@nuxt/ui, не из кита. */
const SLOT_ATTR_ANY = /\s:?data-slot=/
async function transparentComponents() {
  const out = new Set()
  const stack = [SFC_DIR]
  while (stack.length) {
    const dir = stack.pop()
    for (const e of await readdir(dir, { withFileTypes: true })) {
      if (e.isDirectory()) { if (keepDir(e.name)) stack.push(path.join(dir, e.name)); continue }
      if (!e.name.endsWith('.vue')) continue
      /* По самому исходнику, а не по разбору: разбор отбрасывает data-slot на теге компонента
         без своего элемента (NO_ELEMENT в template.mjs), и DashboardSearch, чьи узлы рисует
         UModal, выглядел бы прозрачным. */
      if (!SLOT_ATTR_ANY.test(await readFile(path.join(dir, e.name), 'utf8'))) out.add(e.name.slice(0, -4))
    }
  }
  return out
}

async function findSfc(name) {
  const stack = [SFC_DIR]
  while (stack.length) {
    const dir = stack.pop()
    for (const e of await readdir(dir, { withFileTypes: true })) {
      if (e.isDirectory()) { if (keepDir(e.name)) stack.push(path.join(dir, e.name)) }
      else if (e.name === `${name}.vue`) return path.join(dir, e.name)
    }
  }
  return null
}

/* Таблица READS сверяется с собранными страницами до первого запуска Chrome.
   Непокрытая пара молча даёт объект там, где оракул ждёт булево, — и выясняется
   это иначе через двадцать минут прогона, а на чистом клоне не выясняется вовсе:
   тест на покрытие пропускается, когда dist/docs нет. Проверка та же самая, что
   зовёт pipeline/tests/props.test.mjs, одной функцией, а не копией. */
const readsProblems = (await readsCoverage()).problems
if (readsProblems.length) {
  throw new Error(`таблица READS (pipeline/audit/props.mjs) не сходится:\n- ${readsProblems.join('\n- ')}`)
}
const acceptedProblems = acceptedPaintProblems(parseLedger(await readFile('bench/ledger.yaml', 'utf8')))
if (acceptedProblems.length) throw new Error(acceptedProblems.join('\n'))
/* Сколько примеров ослаблено принятым отклонением — печатается в отчёте (см. acceptedPaint). */
const acceptedUse = new Map()

const { root, pages } = await assembleLocalKit()
const { server, port } = await serve(root)
/* И правила, и переменные берутся из всех файлов токенов кита, а не из одного
   utilities.css: часть значений объявлена в base.css и theme.css, а после
   раунда 10 кит отдаёт второй файл правил — tokens/utilities-extra.css,
   который styles.css импортирует следом за основным. Проверка обязана читать
   ровно то, что грузит страница, иначе «правила нет» будет означать «мы его
   не искали». */
const tokenDir = path.join(KIT_LIVE, 'tokens')
const tokenCss = await Promise.all((await readdir(tokenDir)).filter((f) => f.endsWith('.css'))
  .map((f) => readFile(path.join(tokenDir, f), 'utf8')))
const css = tokenCss.join('\n')
const vars = varMap(tokenCss)
const tailwind = await libraryTailwind()
const themes = JSON.parse(await readFile('dist/docs/themes.json', 'utf8'))
const byShort = new Map(Object.entries(themes).map(([k, v]) => [k.split('/').pop(), v]))
await mkdir(OUT, { recursive: true })

/* Дефолты defineProps каждой страницы — предпроходом, до Chrome: дочернему
   компоненту (CHILDREN) они нужны так же, как ему нужна тема, а собираются они
   только из его собственной doc-страницы. Например прогресс внутри Toast: без
   orientation="horizontal" из Progress.vue:21 у него пропадают `w-full flex
   flex-col`, и расхождение записалось бы на кит. */
const defaultsByPage = new Map()
for (const p of pages) {
  defaultsByPage.set(p.name, docOf(await readFile(path.join(root, p.rel), 'utf8')).defaults ?? {})
}

/* Статическая часть проверки 4 сканирует весь CSS токенов (tokens/*.css) один
   раз, а не на каждой странице — иначе единственное смешанное правило попадает в отчёт
   118 раз вместо одного. */
const compositesCss = checkCompositesCss(css)

/* Все токены классов, встречающиеся в теме: строки слотов, вариантов и
   компаундов. Массивы тема использует наравне со строками (у file-upload
   слот base — массив из двух строк), поэтому обход рекурсивный. */
const themeClassesOf = (theme) => {
  const out = new Set()
  const walk = (o) => {
    if (typeof o === 'string') { for (const c of o.split(/\s+/).filter(Boolean)) out.add(c); return }
    if (o && typeof o === 'object') for (const v of Object.values(o)) walk(v)
  }
  walk(theme)
  return out
}

const results = []
const transparentComps = await transparentComponents()
/* Слотов, оставшихся под условием, — по странице: число нужно отчёту, а
   считается оно там же, где разбирается шаблон. */
const conditionalByPage = new Map()
const noThemePages = []
const retriedPages = []
for (const p of pages) {
  const doc = docOf(await readFile(path.join(root, p.rel), 'utf8'))
  const theme = byShort.get(doc.theme)
  if (!theme) noThemePages.push(p.name)
  /* Дефолты пропов лежат под базой раздела: кит применяет их так же, как
     применил бы живой компонент, а раздел из доки несёт только то, что задано
     явно в блоке. Без них каждый вариант, завязанный на дефолтный проп,
     расходится с оракулом (пример — orientation/position/decorative у
     Separator). */
  /* Компонент, чей корень рисует другой компонент: класс корня считает тема
     делегата, а тема обёртки приходит к нему как `class` и `ui` — ровно так,
     как это делает сама библиотека (см. DELEGATES в pipeline/audit/props.mjs).
     Слоты обёртки, которых у делегата нет (`trailing` у DashboardSearchButton),
     остаются за обёрткой, поэтому ожидания складываются в таком порядке. */
  const row = DELEGATES.get(p.name)
  const delegateTheme = row ? byShort.get(row.theme) : null
  const wantById = {}
  if (theme) for (const s of doc.sections) s.examples.forEach((e, i) => {
    const raw = { ...doc.defaults, ...s.base, ...e.patch }
    const mine = oracleProps({ page: p.name, theme, props: raw })
    /* Слот, принимающий верхнеуровневый class: у темы modal это content, а не
       первый слот overlay. Где шаблон не прочитан, оракул берёт первый слот. */
    const want = expected(theme, mine, CHILD_INTO[doc.theme])
    if (row) {
      const dProps = delegateProps(p.name, raw, resolveRaw(theme, mine))
      Object.assign(want, expected(delegateTheme, oracleProps({ page: row.to, theme: delegateTheme, props: dProps })))
    }
    /* Узел, который рисует дочерний компонент: его класс — своя тема ПЛЮС
       строка слота обёртки, пришедшая пропом `class` (см. CHILDREN). */
    if (CHILDREN.has(p.name)) {
      const wrapperRaw = resolveRaw(theme, mine)
      for (const slot of Object.keys(CHILDREN.get(p.name))) {
        const call = childCall(p.name, slot, raw, wrapperRaw)
        if (!call) continue
        const childTheme = byShort.get(call.theme)
        if (!childTheme) throw new Error(`CHILDREN: темы «${call.theme}» нет в dist/docs/themes.json`)
        const childPage = childPageName(call.theme)
        if (!defaultsByPage.has(childPage)) throw new Error(`CHILDREN: страницы «${childPage}» для темы «${call.theme}» нет среди собранных`)
        const childProps = { ...defaultsByPage.get(childPage), ...call.props }
        /* Схлопнутый узел несёт классы обоих элементов библиотеки — см. CHILD_PAINT. */
        want[slot] = call.paint
          ? paintedTokens(childTheme, childProps, call.paint)
          : expected(childTheme, childProps, call.into)[call.into]
      }
    }
    /* Вариант, переданный в вызов одного слота, — см. SLOT_VARIANTS. */
    for (const [slot, variant] of Object.entries(SLOT_VARIANTS.get(p.name) || {})) {
      const v = variant(raw)
      if (v && want[slot]) want[slot] = expected(theme, { ...mine, ...v }, CHILD_INTO[doc.theme])[slot]
    }
    /* Свой узел, покрашенный двумя слотами темы, — см. OWN_PAINT. */
    for (const [slot, paint] of Object.entries(OWN_PAINT[p.name] || {})) {
      const pair = typeof paint === 'function' ? paint(raw) : paint
      if (pair) want[slot] = paintedTokens(theme, mine, pair)
    }
    /* Отклонение кита, принятое человеком, — см. ACCEPTED_PAINT. */
    for (const [slot, { paint, ledger }] of Object.entries(ACCEPTED_PAINT.get(p.name) || {})) {
      want[slot] = paintedTokens(theme, mine, paint)
      const key = `${p.name}.${slot} = ${paint.join(' + ')} (${ledger})`
      acceptedUse.set(key, (acceptedUse.get(key) || 0) + 1)
    }
    /* Стиль или атрибут примитива reka, который кит выражает классами, — см. PRIMITIVE_CLASSES. */
    for (const [slot, extra] of Object.entries(PRIMITIVE_CLASSES.get(p.name) || {})) {
      const add = extra(raw)
      if (add.length && want[slot]) want[slot] = [...new Set([...want[slot], ...add])].sort()
    }
    /* Компонент, живущий только внутри другого, — см. HABITAT. */
    const hab = HABITAT.get(p.name)
    if (hab) {
      const habTheme = byShort.get(hab.theme)
      if (!habTheme) throw new Error(`HABITAT: темы «${hab.theme}» нет в dist/docs/themes.json`)
      want[hab.slot] = habitatTokens(theme, mine, hab.into, habTheme, hab.props, hab.slot)
        .map((c) => hab.swap?.[c] ?? c).sort()
      delete want[hab.into]
    }
    wantById[`${s.id}.${i}`] = want
  })
  const hasItems = doc.sections.some((s) => Array.isArray(s.base.items))
  /* Состав узлов: ожидание берётся из шаблона библиотеки, а открытость каждого
     примера — из его же пропов. Страницы без SFC нет ни одной (проверено на
     всех 118), но отсутствие файла не должно валить прогон целиком: пустые
     множества дают проверку без сравнений, и это видно в отчёте. */
  const sfc = await findSfc(p.name)
  const sfcSrc = sfc ? await readFile(sfc, 'utf8') : ''
  const tpl = sfc ? templateSlots(sfcSrc) : { unconditional: new Set(), whenOpen: new Set(), conditional: new Set() }
  conditionalByPage.set(p.name, tpl.conditional.size)
  /* У компонента, которого библиотека рисует внутри другого, слот `into` приходит в DOM
     под именем среды — см. HABITAT. */
  const habitat = HABITAT.get(p.name)
  if (habitat && tpl.unconditional.delete(habitat.into)) tpl.unconditional.add(habitat.slot)
  const openById = new Map()
  for (const s of doc.sections) s.examples.forEach((e, i) => {
    const raw = { ...doc.defaults, ...s.base, ...e.patch }
    openById.set(`${s.id}.${i}`, raw.open === true || raw.defaultOpen === true)
  })
  let html = ''
  try { html = await dumpDom(`http://127.0.0.1:${port}/${p.rel}`) } catch { /* первая попытка могла не открыться вовсе */ }
  let payload = html ? payloadOf(html) : null
  /* Перемежающаяся ошибка отрисовки: на фоне ста восемнадцати последовательных
     запусков headless Chrome изредка не успевает за 60 секунд не из-за самой
     страницы (PinInput отдельным зондом отрисовался за 3.1с), а из-за нагрузки
     на систему. Одна повторная попытка эту ошибку гасит — но молча ретраить
     нельзя, отчёт обязан назвать страницу, которой потребовалась вторая попытка.

     Разметка первой попытки сохраняется отдельно: если вторая попытка упадёт
     исключением, диагностика должна остаться точной («нет блока ds-audit» —
     страница открылась, но не собрала нагрузку), а не затереться в «страница
     не отрисовалась» — так, будто она вовсе не открылась. */
  if (!payload) {
    const first = html
    try { html = await dumpDom(`http://127.0.0.1:${port}/${p.rel}`) } catch { html = first }
    payload = html ? payloadOf(html) : null
    if (payload) retriedPages.push(p.name)
  }
  if (!payload) {
    results.push({ page: p.name, checks: [{ name: 'отрисовка', failures: [{ where: p.name, got: html ? 'нет блока ds-audit' : 'страница не отрисовалась за 60 секунд', want: 'полезная нагрузка приёмки' }] }] })
    continue
  }
  results.push({
    page: p.name,
    checks: [
      checkRendered(payload, p.name, { librarySlots: !sfc || SLOT_ATTR_ANY.test(sfcSrc) }),
      theme ? checkClasses(payload, { wantById, hasItems, componentName: p.name, ownComps: row ? [row.to] : [] }) : { name: 'классы против оракула', failures: [], skippedForeign: 0, skippedNoOwner: 0, skippedSlots: 0, comparedSlots: 0, considered: 0 },
      checkCssPresence(payload, css, theme ? themeClassesOf(theme) : new Set(), { generates: tailwind.generates }),
      checkComposites(payload),
      checkDeclaredValues(payload, css, vars),
      checkNodes(payload, { always: tpl.unconditional, open: tpl.whenOpen, isOpen: (id) => openById.get(id) === true, componentName: p.name, ownComps: row ? [row.to] : [], transparentComps })
    ]
  })
  await writeFile(path.join(OUT, `${p.name}.payload.json`), JSON.stringify(payload))
}
server.close()

/* Промпт в проект пишется по причинам, а не построчно: на 6413 расхождениях
   отчёт нечитаем без свода классов, которых оракул ждал или не ждал. */
const summary = () => {
  const miss = new Map(), extra = new Map()
  const bump = (m, c, page) => {
    const v = m.get(c) || { n: 0, pages: new Set() }
    v.n++
    v.pages.add(page)
    m.set(c, v)
  }
  for (const r of results) {
    for (const c of r.checks) {
      if (c.name !== 'классы против оракула') continue
      for (const f of c.failures) {
        const g = new Set(f.got.split(/\s+/).filter(Boolean))
        const w = new Set(f.want.split(/\s+/).filter(Boolean))
        for (const x of g) if (!w.has(x)) bump(extra, x, r.page)
        for (const x of w) if (!g.has(x)) bump(miss, x, r.page)
      }
    }
  }
  /* Список страниц у каждого класса обрезан до трёх, иначе строка не читается
     на компоненте, встречающемся всюду. Обрезка без признака, что страниц
     больше, выглядит как полный список — так `Toast` пропал из строки про
     `shrink-0`, хотя находки там были: он не попал в первые три. */
  const top = (m) => [...m.entries()].sort((a, b) => b[1].n - a[1].n).slice(0, 30)
    .map(([c, v]) => {
      const pages = [...v.pages]
      const shown = pages.slice(0, 3).join(', ')
      const rest = pages.length > 3 ? ` и ещё ${pages.length - 3}` : ''
      return `- \`${c}\` — ${v.n}, страницы: ${shown}${rest}`
    })
  return ['## Сводка\n', '### Нет в DOM, ждал оракул\n', ...top(miss), '', '### Есть в DOM, оракул не ждал\n', ...top(extra), '']
}

const cssBySource = () => {
  const n = { тема: 0, пример: 0 }
  for (const r of results) for (const c of r.checks) {
    if (c.name !== 'классы против CSS') continue
    for (const f of c.failures) if (f.source) n[f.source]++
  }
  /* Классы, которым Tailwind библиотеки тоже не даёт правила: названы поимённо, чтобы
     исключение было видно, а не растворялось в нуле. */
  const dead = new Map()
  for (const r of results) for (const c of r.checks) {
    if (c.name !== 'классы против CSS') continue
    for (const f of c.deadInLibrary || []) dead.set(f.got, [...(dead.get(f.got) || []), r.page])
  }
  const deadLines = [...dead].sort(([a], [b]) => a.localeCompare(b)).map(([cls, pages]) => `  - \`${cls}\` — ${[...new Set(pages)].join(', ')}`)
  return [`### Классы без правила по происхождению\n`, `- из тем кита: ${n['тема']}`, `- из примеров документации: ${n['пример']}`,
    `- не существуют и в библиотеке (Tailwind с CSS Nuxt UI правила не даёт), расхождением не считаются: ${dead.size}`, ...deadLines, '']
}

const acceptedPaint = () => [`### Принятые отклонения кита (ACCEPTED_PAINT)\n`,
  ...(acceptedUse.size ? [...acceptedUse].map(([k, n]) => `- ${k} — примеров: ${n}`) : ['- нет']), '']

/* Ноль расхождений на странице — не всегда «совпало». У страницы либо вовсе
   нет темы (Icon: сравнения не было ни одного), либо часть узлов и слотов
   исключена — как чужое поддерево (законно), узел вовсе без метки владельца
   (не норма), делегированный слот, свой слот компонента с items или
   отсутствие ожидания у оракула (см. checkClasses.skippedForeign,
   .skippedNoOwner и .skippedSlots) — это сужение сравнения, а не находка, и
   не должно тонуть в общем счётчике расхождений. */
const notChecked = () => {
  const sum = (key) => results.reduce((a, r) => a + (r.checks.find((c) => c.name === 'классы против оракула')?.[key] || 0), 0)
  /* Знаменатель — considered (узлы, реально разобранные checkClasses, по
     одному разу на id примера), а не сырой счёт узлов страницы по обеим копиям,
     светлой и тёмной. skippedForeign/skippedNoOwner считаются тем же дедупом, и
     деление на сырой счёт занижало бы долю вдвое против того, что видно в DOM. */
  const nodes = sum('considered')
  const skippedForeign = sum('skippedForeign')
  const skippedNoOwner = sum('skippedNoOwner')
  const empty = results.filter((r) => {
    const c = r.checks.find((x) => x.name === 'классы против оракула')
    return c && !c.failures.length && c.considered && (c.skippedForeign + c.skippedNoOwner) === c.considered
  }).map((r) => r.page)
  /* Кит рисует содержимое оверлея (Drawer, Modal, Slideover, Sidebar) отдельным
     поддеревом без метки на корне — своих узлов там в разы меньше, чем узлов
     без владельца, и страница фактически сравнивается на седьмую часть DOM,
     хотя «страниц без сравнений» это не покажет. */
  /* Страница может отчитаться нулём расхождений и не попасть ни в одну строку
     выше: узлы свои, метки на месте, а сравнивать нечего — ни у одного слота
     нет ожидания у оракула. Считается отдельно от «ни один узел не
     сравнивался»: там причина в чужих метках, здесь — в именах слотов. */
  const noCompare = results
    .filter((r) => !noThemePages.includes(r.page))
    .filter((r) => (r.checks.find((x) => x.name === 'классы против оракула')?.comparedSlots || 0) === 0)
    .map((r) => r.page)
  const noOwnerPages = results
    .map((r) => {
      const c = r.checks.find((x) => x.name === 'классы против оракула')
      return { page: r.page, share: (c?.skippedNoOwner || 0) / (c?.considered || 1) }
    })
    .filter((x) => x.share > 0.5)
    .map((x) => `${x.page} (${Math.round(x.share * 100)}%)`)
  const nodeCov = results.reduce((a, r) => {
    const c = r.checks.find((x) => x.name === 'отсутствующие узлы')
    return {
      always: a.always + (c?.alwaysSlots || 0),
      open: a.open + (c?.openSlots || 0),
      examples: a.examples + (c?.comparedExamples || 0),
      conditional: a.conditional + (conditionalByPage.get(r.page) || 0)
    }
  }, { always: 0, open: 0, examples: 0, conditional: 0 })
  const cov = results.reduce((a, r) => {
    const c = r.checks.find((x) => x.name === 'числа против объявленных значений')
    return {
      compared: a.compared + (c?.compared || 0),
      candidates: a.candidates + (c?.candidates || 0),
      used: a.used + (c?.used || 0)
    }
  }, { compared: 0, candidates: 0, used: 0 })
  return [
    '## Не проверялось\n',
    `Страниц без темы (проверка 2 не выполнялась вовсе): ${noThemePages.length}${noThemePages.length ? ' — ' + noThemePages.join(', ') : ''}\n`,
    `Узлов, исключённых как чужое поддерево или делегированный слот: ${skippedForeign} из ${nodes} (${nodes ? (skippedForeign / nodes * 100).toFixed(1) : 0}%)\n`,
    `Узлов без метки владельца (сравнить не с чем): ${skippedNoOwner} из ${nodes} (${nodes ? (skippedNoOwner / nodes * 100).toFixed(1) : 0}%)\n`,
    `Слотов сравнено ${sum('comparedSlots')}, не сравнено из-за items или отсутствия ожидания у оракула ${sum('skippedSlots')}\n`,
    `Страниц, где ни один узел не сравнивался: ${empty.length}${empty.length ? ' — ' + empty.join(', ') : ''}\n`,
    `Страниц, где больше половины узлов без метки компонента: ${noOwnerPages.length}${noOwnerPages.length ? ' — ' + noOwnerPages.join(', ') : ''}\n`,
    `Страниц с темой, где не сравнён ни один слот: ${noCompare.length}${noCompare.length ? ' — ' + noCompare.join(', ') : ''}\n`,
    /* Кандидаты и сравнения — разные единицы (объявление `padding` даёт четыре
       сравнения, `gap` — одно), и делить их друг на друга нельзя: на наборе из
       одних `p-*` доля вышла бы больше ста процентов. Охват считается по
       кандидатам, давшим хотя бы одно сравнение. */
    `Проверка 5: объявлений-кандидатов ${cov.candidates}, из них дали сравнение ${cov.used}` +
      ` (${cov.candidates ? (cov.used / cov.candidates * 100).toFixed(1) : 0}%);` +
      ` всего сравнено ${cov.compared} значений\n`,
    /* Шестая проверка отчитывается своим знаменателем: «расхождений ноль» без
       него читается как «состав узлов сверен», а сверена из 774 слотов
       библиотеки едва пятая часть — остальные под условием. Ровно это чтение
       и держало пробел незамеченным пятнадцать раундов. */
    `Проверка 6: слотов сверено ${nodeCov.always} безусловных и ${nodeCov.open} по открытости` +
      ` на ${nodeCov.examples} примерах; под условием и потому не проверяется ${nodeCov.conditional}\n`,
    `Страниц, отрисовавшихся только со второй попытки: ${retriedPages.length}${retriedPages.length ? ' — ' + retriedPages.join(', ') : ''}\n`
  ]
}

const lines = []
let failed = 0
const byCheck = {}

if (compositesCss.failures.length) {
  byCheck[compositesCss.name] = compositesCss.failures.length
  failed += compositesCss.failures.length
  lines.push('## Составные свойства CSS\n')
  lines.push(`### ${compositesCss.name} — расхождений ${compositesCss.failures.length}\n`)
  for (const f of compositesCss.failures.slice(0, 20)) lines.push(`- \`${f.where}\`\n  - было: \`${f.got}\`\n  - ждали: \`${f.want}\``)
  lines.push('')
}

for (const r of results) {
  const bad = r.checks.filter((c) => c.failures.length)
  for (const c of bad) byCheck[c.name] = (byCheck[c.name] || 0) + c.failures.length
  if (!bad.length) continue
  failed += bad.reduce((a, c) => a + c.failures.length, 0)
  lines.push(`## ${r.page}\n`)
  for (const c of bad) {
    lines.push(`### ${c.name} — расхождений ${c.failures.length}\n`)
    for (const f of c.failures.slice(0, 20)) lines.push(`- \`${f.where}\`${f.source ? ` (${f.source})` : ''}\n  - было: \`${f.got}\`\n  - ждали: \`${f.want}\``)
    lines.push('')
  }
}
lines.push(...summary())
lines.push(...cssBySource())
lines.push(...acceptedPaint())
lines.push(...notChecked())
lines.unshift(`Страниц ${results.length}, расхождений ${failed}.\n\n` +
  Object.entries(byCheck).map(([k, v]) => `- ${k}: ${v}`).join('\n') + '\n')
lines.unshift('# Приёмка кита\n')
await writeFile(path.join(OUT, 'report.md'), lines.join('\n'))
/* Отчёт режет каждую секцию до двадцати записей — читать его глазами иначе нельзя, но по
   обрезанному списку не видно, однородна ли группа и сняла ли правка ровно её: у InputTags
   из 74 расхождений видно 20. Полный список лежит рядом, по записи на расхождение. */
const allFailures = [
  ...compositesCss.failures.map((f) => ({ page: null, check: compositesCss.name, ...f })),
  ...results.flatMap((r) => r.checks.flatMap((c) => c.failures.map((f) => ({ page: r.page, check: c.name, ...f }))))
]
await writeFile(path.join(OUT, 'failures.json'), JSON.stringify(allFailures, null, 1))
console.log(`страниц ${results.length}, расхождений ${failed}; отчёт ${OUT}/report.md`)
process.exit(failed ? 1 : 0)
