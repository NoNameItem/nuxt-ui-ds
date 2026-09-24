/* Приёмка регистра: что в прогоне осталось незакрытым.

   Вызов:
     node bench/scripts/ledger.mjs --run dist/parity/<прогон> [--only badge,page-cta.dark] [--all]

   Печатает вердикт двумя частями. Итоговая строка `unresolved: N` — критерий окончания
   цикла (спека, «Критерий выхода»), и она появляется только на полном и непротухшем
   прогоне: неполный прогон и прогон, целиком снятый до последней правки кита, получают
   отказ. Число там опаснее отказа — оно выглядит результатом, а описывает кит, которого
   уже нет; на этом уже терялся раунд.

   Вторая часть — вердикт по классам на переснятых парах. Раунд переснимает компоненты
   одного класса (`--force --only`), поэтому итогового числа на нём не бывает по
   определению, а ответ «починился ли класс N» нужен именно там.

   Протухание считается от `kit.statics_copied` регистра — момента, когда статика кита
   перезабрана в тестовый проект. Дата отправки промпта для этого не годится: между
   отправкой и перезабором артборды рисуют прежний кит. Время снимка берётся из `shotAt` в
   JSON рядом с ним, а не из mtime файла: mtime не переживает копирование каталога. */
import { existsSync } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { classify, parseLedger, validateLedger } from './ledger-core.mjs'
import { parseOnly } from './only.mjs'
import { PAGES_DIR, pageNames } from './pages.mjs'

const { values: opt } = parseArgs({
  options: {
    run: { type: 'string' },
    ledger: { type: 'string', default: 'bench/ledger.yaml' },
    pages: { type: 'string', default: PAGES_DIR },
    only: { type: 'string' },
    all: { type: 'boolean' }
  }
})
if (!opt.run) throw new Error('нужен --run dist/parity/<прогон>')

const ledger = parseLedger(await readFile(opt.ledger, 'utf8'))
const problems = validateLedger(ledger)

/* Отсутствующий или обрубленный report.json — крайний случай «неполного прогона»: ноль
   снятых пар. Без него нельзя посчитать ни N пар в шапке, ни staleKeys, ни вердикт, поэтому
   отказ печатается немедленно, до шапки, а не копится в общий блок отказов ниже — до него
   тут просто не из чего досчитать. Сосед diff.mjs:70-75 читает тот же файл так же осторожно. */
const reportPath = path.join(opt.run, 'diff/report.json')
const refuse = (text) => {
  console.log(`отказ: ${text}`)
  console.log('unresolved не считается — сперва снять отказ')
  process.exit(1)
}
if (!existsSync(reportPath)) refuse(`нет файла ${reportPath} — шаг diff:parity не выполнялся или упал`)
let report
try {
  report = JSON.parse(await readFile(reportPath, 'utf8'))
} catch (e) {
  refuse(`${reportPath} не читается как JSON (${e.message.split('\n')[0]}) — похоже, diff:parity оборвался посреди записи`)
}
/* Валидный JSON без списка `pairs` — та же оборвавшаяся запись, только успевшая закрыться:
   `{}` в report.json давал TypeError мимо try/catch выше. Отказ здесь того же рода, что два
   предыдущих, и молчать о нём было бы несогласованностью. */
if (!Array.isArray(report.pairs)) refuse(`в ${reportPath} нет списка pairs — похоже, diff:parity оборвался, не дописав пары`)
const reportPairs = new Map(report.pairs.map((p) => [`${p.name}.${p.theme}`, p]))

const pages = pageNames(opt.pages)
const expectedKeys = new Set(pages.flatMap((n) => [`${n}.light`, `${n}.dark`]))

/* Снимок кит-стороны, а не app: правка кита обесценивает кит-сторону, сторона приложения
   между раундами не меняется и переснимать её не надо. */
const copiedAt = Date.parse(String(ledger.kit?.statics_copied))
const mtimeMs = async (file) => stat(file).then((s) => s.mtimeMs, () => null)
/* Время съёмки берётся из JSON рядом со снимком: его пишет сама съёмка, и оно переживает
   копирование каталога прогона. mtime того же не свидетельствует — `cp -r` без `-p` ставит
   всем файлам текущее время, и допочинковый прогон читался бы свежим целиком. Прогоны,
   снятые до появления поля, считаются по-старому, и шапка говорит, чем посчитано. */
const shotAtMs = async (file) =>
  readFile(file.replace(/\.png$/, '.json'), 'utf8').then((t) => Date.parse(JSON.parse(t)?.shotAt), () => NaN)
const staleKeys = new Set()
/* Считается найденный shotAt, а не использованный: пара без снимка протухает раньше, чем
   дело доходит до сравнения времён, и если считать использованные, прогон, у которого не
   снялась ни одна пара, объявил бы себя снятым до появления поля — то есть шапка соврала бы
   об источнике ровно там, где смотреть на неё будут внимательнее всего. */
let withShotAt = 0
for (const key of reportPairs.keys()) {
  const png = path.join(opt.run, 'kit', `${key}.png`)
  const shot = await shotAtMs(png)
  if (!Number.isNaN(shot)) withShotAt += 1
  const m = await mtimeMs(png)
  /* Снимка нет — аттестовать нечего, и JSON тут не помощник: он говорит, когда пробовали
     снять, а не что сняли (ветка ошибки shoot.mjs пишет JSON и удаляет PNG). */
  if (m === null) {
    staleKeys.add(key)
    continue
  }
  const when = Number.isNaN(shot) ? m : shot
  if (!(when > copiedAt)) staleKeys.add(key)
}
const freshness =
  withShotAt === reportPairs.size ? 'свежесть по shotAt'
  : withShotAt === 0 ? 'свежесть по mtime (shotAt нет ни у одной пары)'
  : `свежесть по shotAt у ${withShotAt} из ${reportPairs.size}, остальные по mtime`

const r = classify({ ledger, reportPairs, expectedKeys, staleKeys })

/* `?.`, а не `.`: пустой элемент в classes (лишний `-` в YAML) не должен ронять команду
   исключением раньше блока отказов — validateLedger уже назвал его словами. */
const byStatus = (status) => ledger.classList.filter((c) => c?.status === status).length
/* Дата прогона — из report.generatedAt, до минут, а не как есть: вердикт попадает в
   заметку раунда и без своей даты через сутки неотличим от свежего. Отсутствие поля не
   молчится — «дата прогона неизвестна» видна сразу, а не проглатывается пустой строкой. */
const runDate = report.generatedAt ? String(report.generatedAt).replace('T', ' ').slice(0, 16) : 'дата прогона неизвестна'
/* Размер бандла печатается рядом с датой перезабора статики: сверять его с `list_files` человек
   должен на шаге 5 протокола, а до сих пор поле в регистре не читал никто. Поля может не быть
   (в схеме оно не обязательно) — тогда шапка идёт без него, отказа тут нет. */
const bundle = ledger.kit?.bundle_size ? ` · бандл ${ledger.kit.bundle_size} байт` : ''
console.log(
  `прогон ${opt.run} · ${reportPairs.size} пар · ${runDate} · кит правлен ${ledger.kit?.statics_copied}${bundle} · ${freshness}\n` +
    `классы: ${['open', 'sent', 'fixed', 'accepted', 'regressed'].map((s) => `${byStatus(s)} ${s}`).join(' · ')}`
)
if (r.extra.length) console.log(`лишних пар в прогоне: ${r.extra.length} (страница удалена или переименована) — ${r.extra.join(', ')}`)

/* Все вёдра класса одним списком: их четыре, и перебираются они в трёх местах — в
   предупреждении `--only`, в фильтре классов и в отборе по `--only`. Забытое ведро в любом
   из трёх тихо теряет пары из вида. */
const allOf = (b) => [...b.zero, ...b.left, ...b.stale, ...b.blind]

const only = parseOnly(opt.only, 'имена пар')
/* Опечатка в --only здесь особенно коварна: она не падает и не пустеет прогон, а тихо
   даёт пустой раздел «классы по переснятым парам» — а этот раздел и есть ответ на вопрос
   «починился ли класс N» во втором режиме. Известные пары берём из byClass, а не из всех
   reportPairs: предупреждение относится именно к тем парам, у которых есть привязка к
   классу, — как и сам раздел ниже. */
if (only) {
  const classified = new Set()
  for (const b of r.byClass.values()) for (const { key } of allOf(b)) classified.add(key)
  const knownPairs = [...classified].map((key) => {
    const [name, theme] = key.split(/\.(?=light$|dark$)/)
    return { name, theme }
  })
  const unknown = only.unknownPairs(knownPairs)
  if (unknown.length) console.warn(`--only: нет таких пар среди классифицированных — ${unknown.join(', ')}`)
}
const classLines = ledger.classList
  .filter((c) => {
    const b = r.byClass.get(c?.id)
    if (!b || allOf(b).length === 0) return false
    if (!only) return true
    return allOf(b).some(({ key }) => only.matches(...key.split(/\.(?=light$|dark$)/)))
  })
  .map((c) => {
    const b = r.byClass.get(c?.id)
    const left = b.left.map(({ key, diff }) => `${key} (${diff})`).join(', ')
    /* Доля считается по промеренным непослепым парам и не печатается вовсе, когда таких пар
       нет: у слепой пары ноль не аттестует ничего, и класс из одних слепых пар (kit-main-height,
       stand-uninformative-zero) печатал «в ноль 2 из 2» — обещание починки там, где не измерено
       ничего. Статус класса человек ставит на шаге 9 протокола ровно по этой строке. */
    const measured = b.zero.length + b.left.length
    const parts = [
      measured && `в ноль ${b.zero.length} из ${measured}`,
      b.blind.length && `слепых ${b.blind.length} — диф не судья, проверять механизмом`,
      left && `осталось: ${left}`,
      b.stale.length && `не переснято ${b.stale.length}`
    ].filter(Boolean)
    return `  ${c?.id} — ${parts.join(' · ')}`
  })
/* Заголовок зависит от режима: на полном прогоне «по переснятым парам» — неправда, ничего не
   переснимали, а раздел там читают как срез всего прогона. */
if (classLines.length) console.log([only ? 'классы по переснятым парам:' : 'классы в прогоне:', ...classLines].join('\n'))

const refusals = [
  problems.length && `замечания схемы регистра:\n${problems.map((p) => `  ${p}`).join('\n')}`,
  r.missing.length && `в прогоне нет ${r.missing.length} пар из ожидаемых ${expectedKeys.size} (первые: ${r.missing.slice(0, 5).join(', ')})`,
  staleKeys.size === reportPairs.size && `ни одна пара не снята после правки кита ${ledger.kit?.statics_copied}`
].filter(Boolean)

if (refusals.length) {
  console.log(refusals.map((t) => `отказ: ${t}`).join('\n'))
  console.log('unresolved не считается — сперва снять отказ')
  process.exit(1)
}

console.log(
  `пары: совпадает ${r.closed.match} · принято ${r.closed.accepted} · несравнимо ${r.closed.incomparable} · слепой ноль починен ${r.closed.blindFixed}`
)
/* Обход на нашей стороне прячет диф, ничего не меняя в ките, поэтому такая пара закрыта
   как совпадение — и должна быть видна отдельной строкой, а не растворяться в счётчике. */
const workarounds = ledger.pairList.filter((p) => p.workaround === 'ours').map((p) => p.pair)
if (workarounds.length) console.log(`обходов на нашей стороне: ${workarounds.length} (${workarounds.join(', ')})`)
/* Ноль по снимку, о котором браузер сказал «ошибка», — всё ещё ноль, но читать его надо зная
   об этом. Сторона в строке названа одна, и отбор ей соответствует: `classify` берёт только
   кит-сторонние `shootErrors` (поле двустороннее), иначе строка врала бы о стороне. */
if (r.matchWithShootErrors.length) {
  console.log(`совпало ${r.matchWithShootErrors.length} со shootErrors на кит-стороне: ${r.matchWithShootErrors.join(', ')}`)
}
/* Пиксельный итог — только по парам, которые ещё выравниваются. Выведенные решением человека
   названы отдельной строкой и в счёт не входят: иначе одна сломавшаяся принятая пара
   переворачивает знак итога и прячет настоящее движение. */
console.log(`пикселей в сверке: ${r.pixels.counted.toLocaleString('ru-RU')}`)
if (r.pixels.excludedPairs.length) {
  console.log(`  вне сверки (решением): ${r.pixels.excluded.toLocaleString('ru-RU')} на ${r.pixels.excludedPairs.length} парах`)
}
console.log(`unresolved: ${r.unresolved}`)
if (r.unresolved > 0) {
  const names = { waiting: 'ждёт починки', noEntry: 'нет записи', residual: 'остаток', regress: 'регресс', recheck: 'требует перепроверки', undecided: 'принято без decided' }
  console.log(`  ${Object.entries(r.reasons).map(([k, n]) => `${names[k]} ${n}`).join(' · ')}`)
  /* Строка счётчиков выше — единственный авторитетный итог, и её не сокращает ни подрезка, ни
     `--all`. А сам список надо читать: в первом наполнении он 292 строки, и строка регресса в
     нём невидима — при том что регресс единственная причина, которую нельзя пропустить.
     Поэтому печать идёт по старшинству причины и подрезается по десять строк на причину.
     Причина вне порядка (седьмая, если словарь однажды откроют) сортируется в конец, а не
     пропадает из списка. */
  const ORDER = ['regress', 'undecided', 'noEntry', 'recheck', 'residual', 'waiting']
  const LIMIT = 10
  const rank = (cause) => (ORDER.includes(cause) ? ORDER.indexOf(cause) : ORDER.length)
  const groups = new Map()
  for (const b of [...r.blockers].sort((a, b2) => rank(a.cause) - rank(b2.cause))) {
    if (!groups.has(b.cause)) groups.set(b.cause, [])
    groups.get(b.cause).push(b)
  }
  for (const [cause, group] of groups) {
    const shown = opt.all ? group : group.slice(0, LIMIT)
    for (const b of shown) console.log(`  ${b.key} — ${b.reason}`)
    if (group.length > shown.length) console.log(`  …и ещё ${group.length - shown.length} — ${names[cause] ?? cause} (целиком: --all)`)
  }
  process.exit(1)
}
