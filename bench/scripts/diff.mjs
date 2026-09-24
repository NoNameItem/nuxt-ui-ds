/* Пиксельный диф стенда визуальной сверки. Подробности: bench/README.md,
   .superpowers/sdd/2026-09-16-visual-parity-testbed/task-7-review.md (раздел «Порог
   совпадения» — числа, на которых выбран порог ниже).

   node bench/scripts/diff.mjs --run dist/parity/<прогон> [--only badge,page-cta.dark] [--force]

   --only принимает имя целиком (обе темы) и <имя>.<тему> — разбор общий на три скрипта,
   bench/scripts/only.mjs.

   Различающийся пиксель: d = |ΔR|+|ΔG|+|ΔB| (альфа отброшена, снимки непрозрачны) > 30
   (~10 на канал). Порог не подобран на глаз: на партии «атомы» растровый шум (демо-картинка,
   разное округление при декодировании в React-ките и в Nuxt-приложении) даёт max d = 5,
   а самое слабое настоящее расхождение партии — сдвиг линии separator на 1px — даёт
   max d = 563. Между 5 и 563 нет ничего, порог 30 стоит с большим запасом в обе стороны.
   Точный побайтовый счётчик (d>0) считается и печатается отдельно как диагностика: рост
   с единиц до тысяч сигналит о съехавшей съёмке, а не о ките.

   Разная высота/ширина сторон — само по себе расхождение, а не повод подгонять: холст берётся
   как max(w1,w2)×max(h1,h2), недостающая площадь считается различающейся безусловно и попадает
   в отчёт отдельным счётчиком missingAreaPixels.

   Идемпотентность: пара пересчитывается, если её PNG в diff/ отсутствует ИЛИ в уже существующем
   report.json нет годной записи для неё (в отличие от shoot.mjs/pairs.mjs, здесь один общий
   report.json, а не по файлу на пару, поэтому одного признака «файл существует» недостаточно),
   ИЛИ если снимок стороны новее посчитанного дифа (bench/scripts/stale.mjs) — пересъёмка сама
   отменяет пропуск, просить об этом флагом не нужно, причина печатается рядом с парой.
   --force отключает проверки и пересчитывает пару заново, перезаписывая её картинку
   различий и запись в report.json; записи пар, не попавших под --only, не трогает.

   Пара со снимком, снятым с ошибкой (JSON стороны несёт непустой errors — shoot.mjs пишет
   такой JSON без PNG рядом), не пропускается: сравнение всё равно считается, а в записи
   сводки и в таблице stdout появляется отметка shootErrors — иначе число в отчёте выглядит
   как обычный результат, а на деле посчитано по снимку с незавершённой/упавшей съёмкой. */
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { chromium } from 'playwright'
import { CHANNEL_THRESHOLD, COL_GAP, ROW_GAP, compareInPage } from './compare.mjs'
import { parseOnly } from './only.mjs'
import { staleReason } from './stale.mjs'

const { values: opt } = parseArgs({ options: { run: { type: 'string' }, only: { type: 'string' }, force: { type: 'boolean', default: false } } })
if (!opt.run) throw new Error('нужен --run dist/parity/<прогон>')
const dirs = { app: path.join(opt.run, 'app'), kit: path.join(opt.run, 'kit') }
const outDir = path.join(opt.run, 'diff')
await mkdir(outDir, { recursive: true })
const reportPath = path.join(outDir, 'report.json')
/* «Не передан» и «передан пустым» различаются намеренно — как в shoot.mjs: `--only ""`
   означало «все пары», и под --force это пересчитывало весь прогон вместо названных пар. */
const only = parseOnly(opt.only, 'имена пар')

const png = async (d) => (await readdir(d).catch(() => [])).filter((f) => f.endsWith('.png'))
const NAME_RE = /^(.+)\.(light|dark)\.png$/
const allFiles = [...new Set([...(await png(dirs.app)), ...(await png(dirs.kit))])]
const allKeys = allFiles
  .map((f) => f.match(NAME_RE))
  .filter(Boolean)
  .map((m) => ({ file: m[0], name: m[1], theme: m[2] }))
const keys = allKeys
  .filter((k) => !only || only.matches(k.name, k.theme))
  .sort((a, b) => (a.name === b.name ? a.theme.localeCompare(b.theme) : a.name.localeCompare(b.name)))
/* Частичный промах молчал: `--only badge,bogus` считал badge и про bogus не говорил.
   Здесь снимки уже на диске, поэтому сверяется пара целиком: промах по теме такой же. */
const unknown = only ? only.unknownPairs(allKeys) : []
if (unknown.length) console.warn(`--only: нет таких пар в прогоне — ${unknown.join(', ')}`)
if (keys.length === 0) throw new Error('нет пар для сравнения (проверь --run и --only)')

let previous = { pairs: [] }
if (existsSync(reportPath)) {
  try {
    previous = JSON.parse(await readFile(reportPath, 'utf8'))
  } catch {
    previous = { pairs: [] }
  }
}
const previousByKey = new Map(previous.pairs?.map((p) => [`${p.name}.${p.theme}`, p]) ?? [])

/* Сравнение и рендер диф-картинки идут в браузере Playwright: у Chromium уже есть Canvas 2D
   для декодирования/кодирования PNG и ImageData для побайтового доступа, отдельная зависимость
   (pngjs/pixelmatch) не нужна. Одна долгоживущая страница на весь прогон: элементы canvas/img
   не привязываются к DOM и не накапливаются между итерациями — GC движка забирает их между
   вызовами evaluate, что и даёт пригодность к 304 парам без утечек. */
const browser = await chromium.launch()
const page = await browser.newPage()

/* Само сравнение — bench/scripts/compare.mjs: оно исполняется в странице, и его
   закрепляет bench/tests/parity-compare.test.mjs. Пороги передаются аргументом, потому что
   сериализованная функция не видит области этого модуля. */
async function comparePair(appBuf, kitBuf) {
  return page.evaluate(compareInPage, { appData: appBuf, kitData: kitBuf, CHANNEL_THRESHOLD, ROW_GAP, COL_GAP })
}

/* Итоговый report.json — не только обработанные в этом запуске пары: --only обязан сохранить
   записи остальных компонентов из предыдущего прогона, иначе повторный частичный запуск стирает
   уже посчитанное. */
/* Ошибки самой съёмки (console/pageerror/requestfailed из shoot.mjs) не блокируют сравнение —
   PNG рядом с ними существует и валиден (иначе PNG отсутствует, и ниже сработает обычная
   ветка «нет снимка»). Их нужно только показать, чтобы число в отчёте не выглядело обычным
   результатом, посчитанным по чистому снимку. */
async function shootErrorsOf(dir, name, theme) {
  try {
    const j = JSON.parse(await readFile(path.join(dir, `${name}.${theme}.json`), 'utf8'))
    return Array.isArray(j.errors) ? j.errors : []
  } catch {
    return []
  }
}

const mergedByKey = new Map(previousByKey)
const results = []
const record = (key, entry) => {
  results.push(entry)
  mergedByKey.set(key, entry)
}
try {
  for (const { name, theme } of keys) {
    const key = `${name}.${theme}`
    const diffFile = path.join(outDir, `${name}.${theme}.png`)
    const appPath = path.join(dirs.app, `${name}.${theme}.png`)
    const kitPath = path.join(dirs.kit, `${name}.${theme}.png`)
    const prior = previousByKey.get(key)
    /* Пропуск по готовому выводу действует, только пока вывод не старше своих снимков. */
    const stale = staleReason(diffFile, appPath, kitPath)
    if (!opt.force && !stale && existsSync(diffFile) && prior && !prior.error) {
      results.push(prior)
      continue
    }
    const appExists = existsSync(appPath)
    const kitExists = existsSync(kitPath)
    if (!appExists || !kitExists) {
      const error = !appExists && !kitExists ? 'нет снимков ни одной стороны' : !appExists ? 'нет снимка app' : 'нет снимка kit'
      console.error(`  ${key}: ${error}`)
      record(key, { name, theme, error })
      continue
    }

    /* Причина рядом с парой: пересчёт без флага иначе неотличим от обычного прогона, а
       именно неотличимость и была ловушкой. */
    process.stdout.write(!opt.force && stale ? `${key} (${stale})\n` : `${key}\n`)
    const shootErrors = { app: await shootErrorsOf(dirs.app, name, theme), kit: await shootErrorsOf(dirs.kit, name, theme) }
    const appBuf = await readFile(appPath)
    const kitBuf = await readFile(kitPath)
    let r
    try {
      r = await comparePair(
        `data:image/png;base64,${appBuf.toString('base64')}`,
        `data:image/png;base64,${kitBuf.toString('base64')}`
      )
    } catch (e) {
      console.error(`  ${key}: ${e.message.split('\n')[0]}`)
      record(key, { name, theme, error: e.message.split('\n')[0] })
      continue
    }

    const diffBytes = Buffer.from(r.diffPng.split(',')[1], 'base64')
    await writeFile(diffFile, diffBytes)
    const { diffPng: _diffPng, ...entry } = r
    record(key, {
      name,
      theme,
      ...entry,
      diffImage: diffFile,
      ...(shootErrors.app.length || shootErrors.kit.length ? { shootErrors } : {})
    })
  }
} finally {
  await browser.close()
}

const report = {
  run: opt.run,
  generatedAt: new Date().toISOString(),
  metric: {
    description: 'd = |ΔR|+|ΔG|+|ΔB| на пиксель, альфа отброшена; различающийся пиксель — d>30 (~10 на канал)',
    channelSumThreshold: CHANNEL_THRESHOLD,
    rowGap: ROW_GAP,
    colGap: COL_GAP
  },
  pairs: [...mergedByKey.values()].sort((a, b) => (a.name === b.name ? a.theme.localeCompare(b.theme) : a.name.localeCompare(b.name)))
}
await writeFile(reportPath, JSON.stringify(report, null, 1))

const table = results
  .filter((r) => !r.error)
  .slice()
  .sort((a, b) => b.diffPixels - a.diffPixels)
console.log('')
console.log('пара                          diffPixels  ratio    exact(d>0)  maxD  холст        расхождение размеров  съёмка с ошибкой')
for (const r of table) {
  const key = `${r.name}.${r.theme}`.padEnd(28)
  const dp = String(r.diffPixels).padStart(10)
  const ratio = `${(r.diffRatio * 100).toFixed(2)}%`.padStart(7)
  const exact = String(r.exactDiffPixels).padStart(10)
  const maxD = String(r.maxChannelSum).padStart(4)
  const canvas = `${r.canvasSize.w}x${r.canvasSize.h}`.padEnd(12)
  const shootFlag = r.shootErrors ? [r.shootErrors.app.length && 'app', r.shootErrors.kit.length && 'kit'].filter(Boolean).join('+') : ''
  console.log(`${key}  ${dp}  ${ratio}  ${exact}  ${maxD}  ${canvas} ${(r.sizeMismatch ? 'да' : '').padEnd(21)}${shootFlag}`)
}
const errored = results.filter((r) => r.error)
if (errored.length) {
  console.log('')
  console.log('ошибки:')
  for (const r of errored) console.log(`  ${r.name}.${r.theme}: ${r.error}`)
}
console.log('')
console.log(reportPath)
