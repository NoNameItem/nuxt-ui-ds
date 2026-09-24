import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseLedger, validateLedger, classify } from '../scripts/ledger-core.mjs'

/* Регистр ведётся руками, и всё, что в нём можно написать неправильно, надо ловить здесь:
   неверная строка молча меняет вердикт, а вердикт — критерий окончания цикла. */
const ledger = (yaml) => parseLedger(yaml)

test('accepted без decided невалиден — принять отклонение может только человек', () => {
  const problems = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes:
  - {id: glyph-source, title: глифы, side: construction, status: accepted, reason: принято}
pairs: []
`))
  assert.equal(problems.length, 1)
  assert.match(problems[0], /decided/)
})

test('accepted без reason невалиден — причина решения записывается в регистре', () => {
  const problems = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes:
  - {id: glyph-source, title: глифы, side: construction, status: accepted, decided: 2026-09-18}
pairs: []
`))
  assert.equal(problems.length, 1)
  assert.match(problems[0], /reason/)
})

test('reason из пробелов — то же, что его отсутствие', () => {
  const problems = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes:
  - {id: glyph-source, title: глифы, side: construction, status: accepted, decided: 2026-09-18, reason: "  "}
pairs: []
`))
  assert.equal(problems.length, 1)
  assert.match(problems[0], /reason/)
})

test('пара без residual невалидна — «объяснено целиком» пишется явно', () => {
  const problems = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes:
  - {id: kit-repeat, title: повторяемое, side: kit, status: open}
pairs:
  - {pair: pin-input.light, classes: [kit-repeat]}
`))
  assert.equal(problems.length, 1)
  assert.match(problems[0], /residual/)
})

test('residual: null и пустое residual: опечатка ровно как отсутствие поля', () => {
  const problemsNull = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes:
  - {id: kit-repeat, title: повторяемое, side: kit, status: open}
pairs:
  - {pair: pin-input.light, classes: [kit-repeat], residual: null}
`))
  assert.equal(problemsNull.length, 1)
  assert.match(problemsNull[0], /residual/)

  const problemsEmpty = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes:
  - {id: kit-repeat, title: повторяемое, side: kit, status: open}
pairs:
  - {pair: pin-input.light, classes: [kit-repeat], residual:}
`))
  assert.equal(problemsEmpty.length, 1)
  assert.match(problemsEmpty[0], /residual/)
})

/* Пустая строка отличается от отсутствия поля: `'' == null` ложно, проверка на null её
   пропускала, и пара становилась блокером с текстом «остаток «» не классифицирован». */
test('residual пустой строкой невалиден — остаток пишется словами', () => {
  const problems = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes:
  - {id: kit-repeat, title: повторяемое, side: kit, status: open}
pairs:
  - {pair: pin-input.light, classes: [kit-repeat], residual: ""}
`))
  assert.equal(problems.length, 1)
  assert.match(problems[0], /residual/)
})

/* У класса side проверялся по словарю, у пары — нет, и `side: ourss` проходил молча:
   пометка «пара измеряет не кит» оставалась нечитаемой. */
test('side пары проверяется по тому же словарю, что у класса', () => {
  const problems = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes: []
pairs:
  - {pair: context-menu.light, side: ourss, status: incomparable, residual: none}
`))
  assert.equal(problems.length, 1)
  assert.match(problems[0], /ourss/)
})

/* `blind: yes` в YAML 1.2 — строка, а строка truthy: описка молча включала бы слепой режим,
   в котором пару закрывает статус класса, а не число. */
test('blind только булевым true — blind: yes это строка', () => {
  const asString = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes:
  - {id: kit-main-height, title: слепой, side: kit, status: open}
pairs:
  - {pair: main.light, classes: [kit-main-height], residual: none, blind: yes}
`))
  assert.equal(asString.length, 1)
  assert.match(asString[0], /blind/)
  const asBool = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes:
  - {id: kit-main-height, title: слепой, side: kit, status: open}
pairs:
  - {pair: main.light, classes: [kit-main-height], residual: none, blind: true}
`))
  assert.deepEqual(asBool, [])
})

test('ссылка на неизвестный класс названа вместе с парой', () => {
  const problems = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes: []
pairs:
  - {pair: badge.dark, classes: [kit-bogus], residual: none}
`))
  assert.equal(problems.length, 1)
  assert.match(problems[0], /badge\.dark/)
  assert.match(problems[0], /kit-bogus/)
})

test('дубль id класса замечен — Map иначе молча оставит последний', () => {
  const problems = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes:
  - {id: kit-repeat, title: раз, side: kit, status: open}
  - {id: kit-repeat, title: два, side: kit, status: fixed}
pairs: []
`))
  assert.equal(problems.length, 1)
  assert.match(problems[0], /дубл/)
})

test('kit.statics_copied обязателен — без него свежесть не с чем сравнивать', () => {
  const problems = validateLedger(ledger('classes: []\npairs: []\n'))
  assert.equal(problems.length, 1)
  assert.match(problems[0], /statics_copied/)
})

test('ключ пары обязан нести тему', () => {
  const problems = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes: []
pairs:
  - {pair: badge, residual: none, status: incomparable}
`))
  assert.equal(problems.length, 1)
  assert.match(problems[0], /light|dark/)
})

test('правильный регистр не даёт замечаний', () => {
  assert.deepEqual(
    validateLedger(
      ledger(`
kit: {statics_copied: 2026-09-18T11:40Z, bundle_size: 790966}
classes:
  - {id: kit-repeat, title: повторяемое, side: kit, status: sent, rounds: [{n: 1, verdict: partial}]}
pairs:
  - {pair: pin-input.light, classes: [kit-repeat], residual: none}
  - {pair: context-menu.light, side: ours, status: incomparable, residual: none}
`)
    ),
    []
  )
})

test('residual: none без классов невалиден — объяснено целиком требует назвать классы', () => {
  const problems = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes: []
pairs:
  - {pair: badge.light, residual: none}
`))
  assert.equal(problems.length, 1)
  assert.match(problems[0], /классов/)
})

test('residual с остатком без классов валиден — остаток блокирует пару сам', () => {
  const problems = validateLedger(ledger(`
kit: {statics_copied: 2026-09-18T11:40Z}
classes: []
pairs:
  - {pair: badge.light, residual: "50% не разобраны"}
`))
  assert.equal(problems.length, 0)
})

const CLASSES = `
kit:  {statics_copied: 2026-09-18T11:40Z}
classes:
  - {id: open-one,   title: ждёт,     side: kit,          status: open}
  - {id: fixed-one,  title: починен,  side: kit,          status: fixed}
  - {id: acc-one,    title: принят,   side: construction, status: accepted, decided: 2026-09-18, reason: принято решением}
  - {id: acc-undec,  title: непринят, side: construction, status: accepted}
`
const run = (pairsYaml, measured, staleKeys = []) =>
  classify({
    ledger: parseLedger(CLASSES + pairsYaml),
    reportPairs: new Map(Object.entries(measured).map(([k, diffPixels]) => [k, { diffPixels }])),
    expectedKeys: new Set(Object.keys(measured)),
    staleKeys: new Set(staleKeys)
  })

test('диф ноль закрывает пару без всякой записи', () => {
  const r = run('pairs: []', { 'badge.light': 0 })
  assert.equal(r.closed.match, 1)
  assert.equal(r.unresolved, 0)
})

test('диф не ноль без записи — необъяснено, и диф назван', () => {
  const r = run('pairs: []', { 'badge.light': 15974 })
  assert.equal(r.reasons.noEntry, 1)
  assert.match(r.blockers[0].reason, /15974/)
})

test('класс open — пара ждёт починки, а не «объяснена»', () => {
  const r = run('pairs:\n  - {pair: badge.light, classes: [open-one], residual: none}', { 'badge.light': 100 })
  assert.equal(r.reasons.waiting, 1)
  assert.equal(r.unresolved, 1)
})

test('непустой residual старше «ждёт починки»', () => {
  const r = run('pairs:\n  - {pair: badge.light, classes: [open-one], residual: "58 % не разобраны"}', { 'badge.light': 100 })
  assert.equal(r.reasons.residual, 1)
  assert.match(r.blockers[0].reason, /58 %/)
})

test('класс fixed при ненулевом дифе — регресс', () => {
  const r = run('pairs:\n  - {pair: badge.light, classes: [fixed-one], residual: none}', { 'badge.light': 8104 })
  assert.equal(r.reasons.regress, 1)
  assert.match(r.blockers[0].reason, /регресс/)
})

test('accepted с decided закрывает пару', () => {
  const r = run('pairs:\n  - {pair: badge.light, classes: [acc-one], residual: none}', { 'badge.light': 384 })
  assert.equal(r.closed.accepted, 1)
  assert.equal(r.unresolved, 0)
})

test('accepted без decided не закрывает — это не решение человека', () => {
  const r = run('pairs:\n  - {pair: badge.light, classes: [acc-undec], residual: none}', { 'badge.light': 384 })
  assert.equal(r.reasons.undecided, 1)
})

test('протухший снимок старше всех причин — числа относятся к прежнему киту', () => {
  const r = run('pairs:\n  - {pair: badge.light, classes: [fixed-one], residual: none}', { 'badge.light': 8104 }, ['badge.light'])
  assert.equal(r.reasons.recheck, 1)
  assert.equal(r.reasons.regress, 0)
})

/* Ноль по протухшему снимку тоже ничего не значит: он измерен до правки кита. */
test('протухший снимок с нулём не считается совпадением', () => {
  const r = run('pairs: []', { 'badge.light': 0 }, ['badge.light'])
  assert.equal(r.closed.match, 0)
  assert.equal(r.reasons.recheck, 1)
})

test('слепой ноль закрывает статус класса, а не число', () => {
  const waiting = run('pairs:\n  - {pair: main.light, classes: [open-one], residual: none, blind: true}', { 'main.light': 0 })
  assert.equal(waiting.reasons.waiting, 1, 'слепой ноль при открытом классе не совпадение')
  const done = run('pairs:\n  - {pair: main.light, classes: [fixed-one], residual: none, blind: true}', { 'main.light': 0 })
  assert.equal(done.closed.blindFixed, 1)
})

/* Дыра, ради которой волна и делалась: слепая пометка отключала проверку дифом целиком.
   Ветка `if (entry?.blind)` стояла вместо `else if (diff === 0)`, поэтому статус класса
   `fixed` закрывал слепую пару при любом дифе — а статус человек ставит на шаге 9 по строке
   «в ноль N из M», которая у класса из слепых пар всегда показывала полную починку. */
test('слепая пара с ненулевым дифом — регресс, а не закрытие статусом класса', () => {
  const atFixed = run('pairs:\n  - {pair: main.light, classes: [fixed-one], residual: none, blind: true}', { 'main.light': 8104 })
  assert.equal(atFixed.closed.blindFixed, 0, 'класс fixed не закрывает слепую пару при ненулевом дифе')
  assert.equal(atFixed.reasons.regress, 1)
  assert.match(atFixed.blockers[0].reason, /8104/, 'диф должен быть назван — по нему видно, устарела пометка или расхождение настоящее')

  const atAccepted = run('pairs:\n  - {pair: main.light, classes: [acc-one], residual: none, blind: true}', { 'main.light': 8104 })
  assert.equal(atAccepted.closed.accepted, 0, 'принятый класс тоже не закрывает слепую пару при ненулевом дифе')
  assert.equal(atAccepted.reasons.regress, 1)
})

/* Ведро `zero` у слепой пары означало бы «ушла в ноль», то есть аттестацию починки нулём,
   которого у неё не было бы и при живом расхождении. */
test('промеренная слепая пара с нулём идёт в своё ведро, а не в «в ноль»', () => {
  const r = run('pairs:\n  - {pair: main.light, classes: [open-one], residual: none, blind: true}', { 'main.light': 0 })
  const bucket = r.byClass.get('open-one')
  assert.deepEqual(bucket.blind.map((p) => p.key), ['main.light'])
  assert.deepEqual(bucket.zero, [])
  assert.deepEqual(bucket.left, [])
})

/* diff.mjs пишет в report.json и пары, которые сравнить не удалось. Без этой ветки
   diffPixels у них undefined, `?? 0` превращает его в ноль, и несравнившаяся пара
   закрылась бы как совпадение. */
test('пара, которая не сравнилась, требует перепроверки, а не закрывается нулём', () => {
  const r = classify({
    ledger: parseLedger(CLASSES + 'pairs: []'),
    reportPairs: new Map([['badge.light', { error: 'нет снимка kit' }]]),
    expectedKeys: new Set(['badge.light']),
    staleKeys: new Set()
  })
  assert.equal(r.closed.match, 0)
  assert.equal(r.reasons.recheck, 1)
  assert.match(r.blockers[0].reason, /нет снимка kit/)
})

test('incomparable закрывает пару и не смотрит на диф', () => {
  const r = run('pairs:\n  - {pair: context-menu.light, side: ours, status: incomparable, residual: none}', { 'context-menu.light': 99999 })
  assert.equal(r.closed.incomparable, 1)
})

/* Съёмка ругалась, PNG валиден, диф ноль: пара закрыта совпадением — но её ноль посчитан по
   снимку, о котором браузер сказал «ошибка», и приёмка об этом молчала. diff.mjs это показывает,
   регистр обязан тоже. Отбор только кит-сторонний: пара с ошибкой на нашей стороне, попав в
   кит-сторонний счёт, была бы объявлена дефектом кита. */
test('совпадение со shootErrors на кит-стороне названо отдельно, наша сторона в счёт не идёт', () => {
  const r = classify({
    ledger: parseLedger(CLASSES + 'pairs: []'),
    reportPairs: new Map([
      ['skeleton.dark', { diffPixels: 0, shootErrors: { app: [], kit: ['Refused to load the stylesheet'] } }],
      ['badge.light', { diffPixels: 0, shootErrors: { app: ['Cannot read properties of undefined'], kit: [] } }],
      ['chip.light', { diffPixels: 0 }]
    ]),
    expectedKeys: new Set(['skeleton.dark', 'badge.light', 'chip.light']),
    staleKeys: new Set()
  })
  assert.equal(r.closed.match, 3, 'правило не меняется: съёмка не провалилась, PNG валиден')
  assert.deepEqual(r.matchWithShootErrors, ['skeleton.dark'], 'ошибка только на нашей стороне в кит-сторонней строке была бы неправдой')
})

/* Сверка состава была односторонней: удалённая или переименованная страница оставляла в прогоне
   пару вне ожидаемого состава, и та молча уходила в «совпадает». */
test('лишняя пара в прогоне названа списком, а не молчит', () => {
  const r = classify({
    ledger: parseLedger(CLASSES + 'pairs: []'),
    reportPairs: new Map([['badge.light', { diffPixels: 0 }], ['gone.light', { diffPixels: 0 }]]),
    expectedKeys: new Set(['badge.light']),
    staleKeys: new Set()
  })
  assert.deepEqual(r.extra, ['gone.light'])
  assert.deepEqual(r.missing, [], 'лишняя пара — не то же, что недостающая')
})

test('недостающие пары названы по ожидаемому составу, а не по числу', () => {
  const r = classify({
    ledger: parseLedger(CLASSES + 'pairs: []'),
    reportPairs: new Map([['badge.light', { diffPixels: 0 }]]),
    expectedKeys: new Set(['badge.light', 'badge.dark']),
    staleKeys: new Set()
  })
  assert.deepEqual(r.missing, ['badge.dark'])
})

test('регресс старше принято без decided: два класса, один fixed другой accepted без decided', () => {
  const r = run(
    'pairs:\n  - {pair: badge.light, classes: [fixed-one, acc-undec], residual: none}',
    { 'badge.light': 500 }
  )
  assert.equal(r.reasons.regress, 1, 'причина должна быть regress, а не undecided')
  assert.match(r.blockers[0].reason, /fixed-one/, 'в блокере должен стоять id регрессировавшего класса')
})

test('учёт по классам делит пары на ноль, остаток и непереснятые', () => {
  const r = run(
    `pairs:
  - {pair: a.light, classes: [open-one], residual: none}
  - {pair: b.light, classes: [open-one], residual: none}
  - {pair: c.light, classes: [open-one], residual: none}`,
    { 'a.light': 0, 'b.light': 500, 'c.light': 700 },
    ['c.light']
  )
  const bucket = r.byClass.get('open-one')
  assert.deepEqual(bucket.zero.map((p) => p.key), ['a.light'])
  assert.deepEqual(bucket.left.map((p) => p.key), ['b.light'])
  assert.deepEqual(bucket.stale.map((p) => p.key), ['c.light'])
})

/* Пиксельный итог — мера работы, а не архива. 19.09.2026 сломавшийся pricing, давно выведенный
   решением человека, один поднял общую сумму с 3,6 млн до 8,7 млн: итог показал рост там, где
   выравниваемые пары падали. Выведенные считаются отдельной строкой, а не выбрасываются, чтобы
   их ухудшение всё равно было видно. */
test('пиксельный итог не считает пары, выведенные решением человека', () => {
  const r = run(
    `pairs:
  - {pair: badge.light, classes: [acc-one], residual: none}
  - {pair: chip.light, side: ours, status: incomparable, residual: none}
  - {pair: card.light, classes: [open-one], residual: "?"}`,
    { 'badge.light': 1000000, 'chip.light': 500000, 'card.light': 700 }
  )
  assert.equal(r.pixels.counted, 700, 'в счёт идёт только выравниваемая пара')
  assert.equal(r.pixels.excluded, 1500000)
  assert.deepEqual(r.pixels.excludedPairs, ['badge.light', 'chip.light'])
})

test('совпавшая в ноль пара остаётся в счёте — она мера работы, а не исключение', () => {
  const r = run('pairs: []', { 'badge.light': 0, 'chip.light': 42 })
  assert.equal(r.pixels.counted, 42)
  assert.equal(r.pixels.excluded, 0)
  assert.deepEqual(r.pixels.excludedPairs, [])
})
