import { test } from 'node:test'
import assert from 'node:assert/strict'
import { stampLedger } from '../scripts/ledger-stamp.mjs'
import { parseLedger, validateLedger } from '../scripts/ledger-core.mjs'

/* Отметку свежести ставит только kit:pull, после настоящей выгрузки статики. Главное свойство
   функции — менять ровно две величины: регистр ведётся руками, и диф отметки должен
   показывать отметку, а не переформатированный файл. */
const REGISTER = `kit:
  # Сверка list_files теста и кита перед съёмкой.
  bundle_size: 790966
  # Нижняя граница: точный момент забора не записан.
  statics_copied: 2026-09-17T04:00Z
classes:
  - id: kit-repeat
    title: рендерер кита теряет повторяемое содержимое
    side: kit
    status: open
    components: [pin-input, input-tags, input-date, input-time, listbox, checkbox-group, file-upload, dropdown-menu, carousel]
pairs:
  - {pair: badge.light, classes: [kit-repeat], residual: "?"} # хвост строки
`

test('пишет отметку и размер, не трогая остальной регистр', () => {
  const after = stampLedger(REGISTER, { size: 801234, at: '2026-09-18T09:30:00.000Z' })
  assert.match(after, /statics_copied: 2026-09-18T09:30:00.000Z/)
  assert.match(after, /bundle_size: 801234/)
  const was = REGISTER.split('\n')
  const now = after.split('\n')
  assert.equal(now.length, was.length, 'число строк не должно меняться')
  for (let i = 0; i < was.length; i++) {
    if (/bundle_size|statics_copied/.test(was[i])) continue
    assert.equal(now[i], was[i], `строка ${i + 1} изменилась, а меняться не должна была`)
  }
})

test('без at ставит текущее время', () => {
  const before = Date.now()
  const stamped = Date.parse(stampLedger(REGISTER, { size: 1 }).match(/statics_copied: (\S+)/)[1])
  assert.ok(stamped >= before - 1000 && stamped <= Date.now() + 1000, `отметка ${stamped} вне окна вызова`)
})

test('без size размер бандла не трогается', () => {
  assert.match(stampLedger(REGISTER), /bundle_size: 790966/)
})

/* Регистр без отображения kit — либо не регистр, либо сломан правкой: дописать в него отметку
   значило бы заверить свежесть там, где её не с чем сравнивать. */
test('регистра без kit не правит, а отказывается', () => {
  assert.throws(() => stampLedger('classes: []\npairs: []\n', { size: 1 }), /kit/)
})

test('размер бандла принимается только целым положительным', () => {
  assert.throws(() => stampLedger(REGISTER, { size: 0 }), /целое положительное/)
  assert.throws(() => stampLedger(REGISTER, { size: 1.5 }), /целое положительное/)
})

test('at не дата — отказ', () => {
  assert.throws(() => stampLedger(REGISTER, { at: 'вчера' }), /не дата/)
})

test('концевой перевод строки сохраняется как был', () => {
  assert.ok(!stampLedger(REGISTER.replace(/\n$/, ''), { size: 1 }).endsWith('\n'))
})

/* Отметка назад расстухляет пары, которые регистр уже считал протухшими. */
test('отметку назад не ставит', () => {
  assert.throws(() => stampLedger(REGISTER, { at: '2026-09-16T00:00:00.000Z' }), /только вперёд/)
})

test('отметка вперёд ставится', () => {
  assert.match(stampLedger(REGISTER, { at: '2026-09-18T00:00:00.000Z' }), /statics_copied: 2026-09-18T00:00:00.000Z/)
})

test('первая отметка ложится в поточное отображение kit без прошлой', () => {
  const after = stampLedger('kit: {statics_copied: null, bundle_size: null}\nclasses: []\npairs: []\n', { size: 790966, at: '2026-09-18T00:00:00.000Z' })
  assert.match(after, /statics_copied: 2026-09-18T00:00:00.000Z/)
  assert.match(after, /bundle_size: 790966/)
  assert.deepEqual(validateLedger(parseLedger(after)), [], 'после отметки регистр должен оставаться валидным')
})
