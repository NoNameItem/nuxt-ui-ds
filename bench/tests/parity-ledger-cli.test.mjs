import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, mkdir, rm, utimes, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'

const run = promisify(execFile)
const at = (sec) => new Date(1_700_000_000_000 + sec * 1000)
const COPIED = at(500).toISOString()

/* Синтетический прогон: report.json с парами, PNG кит-стороны с заданными временами (по
   ним считается протухание) и каталог страниц, задающий ожидаемый состав. `runAt` — время
   самого прогона (report.generatedAt), которое печатается в шапке до минут. */
async function fixture({ pairs, pages, ledger, kitShotAt = 900, runAt = 950, sidecarAt, sidecarFor }) {
  const dir = await mkdtemp(path.join(tmpdir(), 'parity-ledger-'))
  await mkdir(path.join(dir, 'run/diff'), { recursive: true })
  await mkdir(path.join(dir, 'run/kit'), { recursive: true })
  await mkdir(path.join(dir, 'pages'), { recursive: true })
  await writeFile(path.join(dir, 'run/diff/report.json'), JSON.stringify({ run: 'run', generatedAt: at(runAt).toISOString(), pairs }))
  for (const p of pairs) {
    const key = `${p.name}.${p.theme}`
    const png = path.join(dir, `run/kit/${key}.png`)
    await writeFile(png, '')
    await utimes(png, at(kitShotAt), at(kitShotAt))
    /* JSON рядом со снимком — то же, что пишет shoot.mjs. `sidecarAt` задаётся отдельно от
       `kitShotAt`, потому что весь смысл поля в том, чтобы расходиться с mtime: скопированный
       каталог прогона получает новые mtime и прежние shotAt. */
    if (sidecarAt !== undefined && (!sidecarFor || sidecarFor.includes(key))) {
      await writeFile(png.replace(/\.png$/, '.json'), JSON.stringify({ side: 'kit', name: p.name, theme: p.theme, errors: [], rects: [], shotAt: at(sidecarAt).toISOString() }))
    }
  }
  for (const name of pages) await writeFile(path.join(dir, `pages/${name}.vue`), '')
  await writeFile(path.join(dir, 'ledger.yaml'), ledger)
  return dir
}

const argv = (dir, extra = []) => [
  'bench/scripts/ledger.mjs',
  '--run', path.join(dir, 'run'),
  '--ledger', path.join(dir, 'ledger.yaml'),
  '--pages', path.join(dir, 'pages'),
  ...extra
]
/* Два хелпера, а не один с .catch: общий скрывал бы провал успешного случая, подставляя
   код 0 объекту ошибки. */
const ok = (dir, extra) => run('node', argv(dir, extra))
const fail = async (dir, extra) => {
  const e = await run('node', argv(dir, extra)).then(() => null, (err) => err)
  assert.ok(e, 'команда должна была выйти ненулевым кодом')
  return e
}

const BASE = `
kit: {statics_copied: ${COPIED}}
classes:
  - {id: acc, title: принят, side: construction, status: accepted, decided: 2026-09-18, reason: принято решением}
`

test('всё закрыто — печатает unresolved: 0 и выходит нулём', async () => {
  const dir = await fixture({
    pairs: [{ name: 'badge', theme: 'light', diffPixels: 0 }, { name: 'badge', theme: 'dark', diffPixels: 0 }],
    pages: ['badge'],
    ledger: BASE + 'pairs: []'
  })
  try {
    const { stdout } = await ok(dir)
    assert.match(stdout, /unresolved: 0/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('неполный прогон — отказ вместо числа и ненулевой код', async () => {
  const dir = await fixture({
    pairs: [{ name: 'badge', theme: 'light', diffPixels: 0 }],
    pages: ['badge'],
    ledger: BASE + 'pairs: []'
  })
  try {
    const e = await fail(dir)
    assert.match(e.stdout, /отказ/)
    assert.match(e.stdout, /badge\.dark/)
    assert.doesNotMatch(e.stdout, /unresolved:/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Ровно та ловушка, на которой уже терялся раунд: прогон снят до правки кита и показывает
   кит, которого нет. Число здесь опаснее отказа — оно выглядит результатом. */
test('ни одна пара не снята после правки кита — отказ', async () => {
  const dir = await fixture({
    pairs: [{ name: 'badge', theme: 'light', diffPixels: 0 }, { name: 'badge', theme: 'dark', diffPixels: 0 }],
    pages: ['badge'],
    ledger: BASE + 'pairs: []',
    kitShotAt: 100
  })
  try {
    const e = await fail(dir)
    assert.match(e.stdout, /отказ/)
    assert.doesNotMatch(e.stdout, /unresolved:/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('замечания схемы печатаются и считаются отказом', async () => {
  const dir = await fixture({
    pairs: [{ name: 'badge', theme: 'light', diffPixels: 0 }, { name: 'badge', theme: 'dark', diffPixels: 0 }],
    pages: ['badge'],
    ledger: BASE + 'pairs:\n  - {pair: badge.light, classes: [bogus], residual: none}'
  })
  try {
    const e = await fail(dir)
    assert.match(e.stdout, /bogus/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Пустой элемент в classes — обычная опечатка при ручной правке регистра на три сотни
   пар (лишний `-` в YAML). validateLedger уже называет её словами («класс <без id>: нет
   поля id»), и отказ должен доехать до печати, а не утонуть в необработанном исключении
   раньше блока отказов. */
test('пустой элемент в classes — отказ, а не необработанное исключение', async () => {
  const dir = await fixture({
    pairs: [{ name: 'badge', theme: 'light', diffPixels: 0 }, { name: 'badge', theme: 'dark', diffPixels: 0 }],
    pages: ['badge'],
    ledger: `
kit: {statics_copied: ${COPIED}}
classes:
  - null
  - {id: acc, title: принят, side: construction, status: accepted, decided: 2026-09-18, reason: принято решением}
pairs: []`
  })
  try {
    const e = await fail(dir)
    assert.match(e.stdout, /отказ/)
    assert.doesNotMatch(e.stderr, /TypeError/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Отсутствующий или обрубленный report.json — крайний случай «неполного прогона»: ноль
   снятых пар, шаг diff:parity не выполнялся или упал посреди записи. Без него не из чего
   досчитать ни шапку, ни staleKeys, ни вердикт, поэтому отказ обязан появиться раньше
   любой попытки что-то посчитать — а не необработанным исключением (ENOENT/SyntaxError). */
test('report.json отсутствует — отказ, а не необработанное исключение', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'parity-ledger-'))
  await mkdir(path.join(dir, 'run/diff'), { recursive: true })
  await mkdir(path.join(dir, 'pages'), { recursive: true })
  await writeFile(path.join(dir, 'pages/badge.vue'), '')
  await writeFile(path.join(dir, 'ledger.yaml'), BASE + 'pairs: []')
  try {
    const e = await fail(dir)
    assert.match(e.stdout, /отказ/)
    assert.doesNotMatch(e.stdout, /unresolved:/)
    assert.doesNotMatch(e.stderr, /Error/, 'должен быть аккуратный отказ, а не трейс')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('report.json обрублен — отказ, а не необработанное исключение', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'parity-ledger-'))
  await mkdir(path.join(dir, 'run/diff'), { recursive: true })
  await mkdir(path.join(dir, 'pages'), { recursive: true })
  /* Обрубленный JSON — ровно то, что оставляет diff.mjs, упавший посреди writeFile. */
  await writeFile(path.join(dir, 'run/diff/report.json'), '{"run": "run", "pairs": [')
  await writeFile(path.join(dir, 'pages/badge.vue'), '')
  await writeFile(path.join(dir, 'ledger.yaml'), BASE + 'pairs: []')
  try {
    const e = await fail(dir)
    assert.match(e.stdout, /отказ/)
    assert.doesNotMatch(e.stdout, /unresolved:/)
    assert.doesNotMatch(e.stderr, /Error/, 'должен быть аккуратный отказ, а не трейс')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Переименованная страница даёт обе половины разом: пара прежнего имени лишняя в прогоне, пары
   нового — недостающие. Лишняя печатается до блока отказов — иначе переименование читалось бы
   одной половиной, а лишняя пара до этой правки уходила молча в «совпадает». */
test('переименованная страница: лишняя пара строкой, недостающие отказом', async () => {
  const dir = await fixture({
    pairs: [{ name: 'gone', theme: 'light', diffPixels: 0 }, { name: 'gone', theme: 'dark', diffPixels: 0 }],
    pages: ['renamed'],
    ledger: BASE + 'pairs: []'
  })
  try {
    const e = await fail(dir)
    assert.match(e.stdout, /лишних пар в прогоне: 2 .*gone\.dark, gone\.light/)
    assert.match(e.stdout, /отказ: в прогоне нет 2 пар/, 'вторая половина переименования — обычный отказ по составу')
    assert.doesNotMatch(e.stdout, /unresolved:/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Размер бандла в регистре не читал никто, а сверять его с list_files надо на шаге 5 протокола.
   Прочие тесты этого файла идут без `bundle_size` — отсутствие поля отказом не делается. */
test('шапка несёт размер бандла, совпадение со shootErrors названо отдельной строкой', async () => {
  const dir = await fixture({
    pairs: [
      { name: 'badge', theme: 'light', diffPixels: 0, shootErrors: { app: [], kit: ['Refused to load the stylesheet'] } },
      { name: 'badge', theme: 'dark', diffPixels: 0 }
    ],
    pages: ['badge'],
    ledger: `
kit: {statics_copied: ${COPIED}, bundle_size: 790966}
classes: []
pairs: []`
  })
  try {
    const { stdout } = await ok(dir)
    assert.match(stdout, /бандл 790966 байт/)
    assert.match(stdout, /совпало 1 со shootErrors на кит-стороне: badge\.light/)
    assert.match(stdout, /unresolved: 0/, 'shootErrors ничего не блокируют — они только видимость')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Тот же класс, но в статусе fixed: пары закрываются как «слепой ноль починен», и строка класса
   обязана остаться про слепых. Доля починенного считалась бы по нулю, которого у слепой пары нет
   ни при починке, ни при живом расхождении, — то есть обещала бы измеренную починку. */
test('класс fixed из слепых пар — строка по-прежнему про слепых, а не доля', async () => {
  const dir = await fixture({
    pairs: [{ name: 'main', theme: 'light', diffPixels: 0 }, { name: 'main', theme: 'dark', diffPixels: 0 }],
    pages: ['main'],
    ledger: `
kit: {statics_copied: ${COPIED}}
classes:
  - {id: kit-main-height, title: слепой ноль main, side: kit, status: fixed}
pairs:
  - {pair: main.light, classes: [kit-main-height], residual: none, blind: true}
  - {pair: main.dark, classes: [kit-main-height], residual: none, blind: true}`
  })
  try {
    const { stdout } = await ok(dir)
    assert.match(stdout, /kit-main-height — слепых 2/)
    assert.doesNotMatch(stdout, /в ноль/, 'доля не появляется и при починенном классе')
    assert.match(stdout, /слепой ноль починен 2/, 'пары при этом закрыты — статусом класса, а не числом')
    assert.match(stdout, /unresolved: 0/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Строка регресса в списке из 292 строк «остатка» невидима, а это единственная причина,
   которую нельзя пропустить: старшинство причин в печати — не украшение. Здесь остаток стоит
   первым по порядку пар в прогоне, и всё равно печатается вторым. */
test('блокеры печатаются по старшинству причины, регресс первым', async () => {
  const dir = await fixture({
    pairs: [{ name: 'badge', theme: 'light', diffPixels: 500 }, { name: 'badge', theme: 'dark', diffPixels: 700 }],
    pages: ['badge'],
    ledger: `
kit: {statics_copied: ${COPIED}}
classes:
  - {id: fx, title: починен, side: kit, status: fixed}
pairs:
  - {pair: badge.light, classes: [fx], residual: "не разобрано"}
  - {pair: badge.dark, classes: [fx], residual: none}`
  })
  try {
    const e = await fail(dir)
    const lines = e.stdout.split('\n')
    const counters = lines.findIndex((l) => l.includes('регресс 1'))
    assert.ok(counters > 0, 'строка счётчиков причин должна быть напечатана')
    assert.match(lines[counters + 1], /badge\.dark.*регресс/, 'первой строкой списка — старшая причина')
    assert.match(lines[counters + 2], /badge\.light.*остаток/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Подрезка по десять строк на причину: полный дамп в 292 строки прячет то, ради чего список и
   читают. --all возвращает его тем, кому он нужен целиком. */
test('больше десяти блокеров одной причины — хвост «…и ещё», --all печатает всё', async () => {
  const names = Array.from({ length: 12 }, (_, i) => `c${i}`)
  const dir = await fixture({
    pairs: names.flatMap((n) => [{ name: n, theme: 'light', diffPixels: 5 }, { name: n, theme: 'dark', diffPixels: 5 }]),
    pages: names,
    ledger: BASE + 'pairs:\n' + names.flatMap((n) => [`  - {pair: ${n}.light, residual: "?"}`, `  - {pair: ${n}.dark, residual: "?"}`]).join('\n')
  })
  try {
    const e = await fail(dir)
    assert.match(e.stdout, /unresolved: 24/)
    assert.match(e.stdout, /…и ещё 14 — остаток/)
    const all = await fail(dir, ['--all'])
    assert.doesNotMatch(all.stdout, /…и ещё/)
    assert.match(all.stdout, /c11\.light/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Класс, у которого все пары слепые (в настоящем регистре это kit-main-height и
   stand-uninformative-zero), печатался как «в ноль 2 из 2» — обещание починки там, где ноль не
   аттестует ничего. Из вывода класс при этом исчезать не должен: это было бы хуже. */
test('класс из одних слепых пар — без «в ноль», с числом слепых', async () => {
  const dir = await fixture({
    pairs: [{ name: 'main', theme: 'light', diffPixels: 0 }, { name: 'main', theme: 'dark', diffPixels: 0 }],
    pages: ['main'],
    ledger: `
kit: {statics_copied: ${COPIED}}
classes:
  - {id: kit-main-height, title: слепой ноль main, side: kit, status: open}
pairs:
  - {pair: main.light, classes: [kit-main-height], residual: none, blind: true}
  - {pair: main.dark, classes: [kit-main-height], residual: none, blind: true}`
  })
  try {
    /* Класс open — слепые пары ждут починки, значит код ненулевой. */
    const e = await fail(dir)
    assert.match(e.stdout, /kit-main-height — слепых 2/)
    assert.doesNotMatch(e.stdout, /в ноль/, 'у класса из слепых пар доли «в ноль» не бывает')
    assert.match(e.stdout, /классы в прогоне:/, 'без --only ничего не переснимали, и заголовок это говорит')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Валидный JSON без списка pairs — третий случай той же семьи: `report.pairs.map` давал
   TypeError мимо try/catch вокруг JSON.parse, то есть трейс вместо отказа. */
test('report.json без списка pairs — отказ, а не необработанное исключение', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'parity-ledger-'))
  await mkdir(path.join(dir, 'run/diff'), { recursive: true })
  await mkdir(path.join(dir, 'pages'), { recursive: true })
  await writeFile(path.join(dir, 'run/diff/report.json'), '{}')
  await writeFile(path.join(dir, 'pages/badge.vue'), '')
  await writeFile(path.join(dir, 'ledger.yaml'), BASE + 'pairs: []')
  try {
    const e = await fail(dir)
    assert.match(e.stdout, /отказ/)
    assert.match(e.stdout, /pairs/)
    assert.doesNotMatch(e.stdout, /unresolved:/)
    assert.doesNotMatch(e.stderr, /TypeError/, 'должен быть аккуратный отказ, а не трейс')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Пять прежних тестов проверяют либо unresolved: 0, либо один из отказов, где unresolved
   вообще не печатается, — забытый process.exit(1) после печати unresolved: N ни один из
   них не поймает, а это и есть критерий выхода задачи. Здесь — валидный, полный и свежий
   прогон с одной незакрытой парой (класс open): unresolved: 1, причина названа, ключ пары
   в блокерах, и дата прогона (report.generatedAt) есть в шапке. */
test('одна пара не закрыта — unresolved: 1, причина «ждёт починки», дата прогона в шапке', async () => {
  const runAt = 950
  const dir = await fixture({
    pairs: [{ name: 'badge', theme: 'light', diffPixels: 5 }, { name: 'badge', theme: 'dark', diffPixels: 0 }],
    pages: ['badge'],
    ledger: `
kit: {statics_copied: ${COPIED}}
classes:
  - {id: op, title: открыт, side: construction, status: open}
pairs:
  - {pair: badge.light, classes: [op], residual: none}`,
    runAt
  })
  try {
    const e = await fail(dir)
    assert.match(e.stdout, /unresolved: 1/)
    assert.match(e.stdout, /ждёт починки 1/)
    assert.match(e.stdout, /badge\.light/)
    const runDate = at(runAt).toISOString().replace('T', ' ').slice(0, 16)
    assert.match(e.stdout, new RegExp(runDate), 'дата прогона должна быть видна в шапке')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Прогон 2026-09-17 мерил свежесть по mtime снимка, и это свидетельство не переживает
   копирование каталога: `cp -r` без `-p` ставит всем файлам текущее время, и допочинковый
   прогон читается свежим целиком. Здесь закрепляется, что решает время съёмки, записанное
   съёмкой (nuxt-ui-ds-qz5). */
test('shotAt старше правки кита старше mtime — пара протухла, а не свежая', async () => {
  const dir = await fixture({
    pairs: [{ name: 'badge', theme: 'light', diffPixels: 0 }, { name: 'badge', theme: 'dark', diffPixels: 0 }],
    pages: ['badge'],
    ledger: BASE + 'pairs: []',
    kitShotAt: 900,
    sidecarAt: 300,
    sidecarFor: ['badge.light']
  })
  try {
    const e = await fail(dir)
    assert.match(e.stdout, /требует перепроверки 1/, 'пара со старым shotAt должна протухнуть, хотя её mtime новее отметки')
    assert.match(e.stdout, /badge\.light/, 'протухшая пара должна быть названа')
    assert.doesNotMatch(e.stdout, /badge\.dark/, 'пара без shotAt считается по mtime и остаётся свежей')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('шапка называет, чем посчитана свежесть', async () => {
  const dir = await fixture({
    pairs: [{ name: 'badge', theme: 'light', diffPixels: 0 }, { name: 'badge', theme: 'dark', diffPixels: 0 }],
    pages: ['badge'],
    ledger: BASE + 'pairs: []',
    sidecarAt: 900
  })
  try {
    const { stdout } = await ok(dir)
    assert.match(stdout, /свежесть по shotAt/, 'источник свежести виден в шапке: иначе вердикт нечем отличить от посчитанного по mtime')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('прогон без shotAt считается по mtime, и шапка говорит об этом', async () => {
  const dir = await fixture({
    pairs: [{ name: 'badge', theme: 'light', diffPixels: 0 }, { name: 'badge', theme: 'dark', diffPixels: 0 }],
    pages: ['badge'],
    ledger: BASE + 'pairs: []'
  })
  try {
    const { stdout } = await ok(dir)
    assert.match(stdout, /свежесть по mtime/, 'прогоны, снятые до этой правки, должны считаться по-старому и говорить об этом')
    assert.match(stdout, /unresolved: 0/, 'откат на mtime не должен ломать прежние прогоны')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Съёмка упала и удалила PNG, но JSON записала (ветка ошибки shoot.mjs). Аттестовать нечего:
   shotAt говорит, когда пробовали снять, а не что сняли. */
test('снимка нет, а JSON есть — пара протухла, а не свежая по shotAt', async () => {
  const dir = await fixture({
    pairs: [{ name: 'badge', theme: 'light', diffPixels: 0 }, { name: 'badge', theme: 'dark', diffPixels: 0 }],
    pages: ['badge'],
    ledger: BASE + 'pairs: []',
    sidecarAt: 900
  })
  await rm(path.join(dir, 'run/kit/badge.light.png'))
  try {
    const e = await fail(dir)
    assert.match(e.stdout, /требует перепроверки 1/)
    assert.match(e.stdout, /badge\.light/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* Съёмка упала на всех парах: PNG нет, JSON есть. Если считать источник свежести по
   использованным значениям, а не по найденным, шапка объявила бы такой прогон «снятым до
   появления shotAt» — соврала бы об источнике там, где в неё будут смотреть внимательнее
   всего. */
test('снимков нет вовсе, а shotAt есть — шапка не выдаёт прогон за старый', async () => {
  const dir = await fixture({
    pairs: [{ name: 'badge', theme: 'light', diffPixels: 0 }, { name: 'badge', theme: 'dark', diffPixels: 0 }],
    pages: ['badge'],
    ledger: BASE + 'pairs: []',
    sidecarAt: 900
  })
  await rm(path.join(dir, 'run/kit/badge.light.png'))
  await rm(path.join(dir, 'run/kit/badge.dark.png'))
  try {
    const e = await fail(dir)
    assert.match(e.stdout, /свежесть по shotAt/)
    assert.doesNotMatch(e.stdout, /до появления shotAt/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})
