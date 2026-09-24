import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseOnly } from '../scripts/only.mjs'

/* Ключ --only брал имя страницы целиком, поэтому `--force --only page-cta` относился к
   обеим темам сразу. В прогоне 2026-09-17 так потеряли готовый светлый снимок при
   пересъёмке тёмного: вернуть его не удалось, page-cta далась только с четвёртой попытки.
   Форма <имя>.<тема> сужает выбор до одной стороны. Разбор общий на три скрипта: копий
   было три, и разойтись им теперь есть на чём. */

const sel = (raw) => parseOnly(raw, 'имена пар')

test('флаг не передан — выбраны все пары', () => {
  assert.equal(parseOnly(undefined, 'имена пар'), null)
})

/* `--only ""` с незаполненной переменной под --force означал бы не лишние снимки, а
   стирание готового прогона: проверка существования пропускается, а неудача съёмки
   удаляет PNG. Поэтому пустой флаг — ошибка, а не «все». */
test('пустой --only — ошибка, а не «все пары»', () => {
  assert.throws(() => sel(''), /пустым/)
  assert.throws(() => sel(' , '), /пустым/)
})

test('имя без темы выбирает обе темы', () => {
  const only = sel('page-cta')
  assert.equal(only.matches('page-cta', 'light'), true)
  assert.equal(only.matches('page-cta', 'dark'), true)
  assert.equal(only.matches('badge', 'dark'), false)
})

test('имя с темой выбирает только названную тему', () => {
  const only = sel('page-cta.dark')
  assert.equal(only.matches('page-cta', 'dark'), true)
  assert.equal(only.matches('page-cta', 'light'), false, 'светлая сторона не должна попадать под --force')
})

test('перечисление смешивает обе формы', () => {
  const only = sel(' badge , page-cta.dark ')
  assert.deepEqual(
    [only.matches('badge', 'light'), only.matches('badge', 'dark'), only.matches('page-cta', 'light'), only.matches('page-cta', 'dark')],
    [true, true, false, true]
  )
})

/* До съёмки файлов на диске нет, и `page-cta.dark` там законен ещё до первого снимка:
   shoot.mjs может сверить только имя страницы. */
test('неизвестные имена: тема не мешает опознать имя', () => {
  assert.deepEqual(sel('page-cta.dark,bogus').unknownNames(['page-cta', 'badge']), ['bogus'])
  assert.deepEqual(sel('page-cta.dark').unknownNames(['page-cta']), [])
})

/* А diff.mjs и pairs.mjs работают по готовым файлам, и там пара — целый ключ: названная
   тема, которой в прогоне нет, это такой же промах, как несуществующее имя. */
test('неизвестные пары: тема сверяется с прогоном', () => {
  const known = [{ name: 'page-cta', theme: 'light' }, { name: 'badge', theme: 'dark' }]
  assert.deepEqual(sel('page-cta.dark').unknownPairs(known), ['page-cta.dark'])
  assert.deepEqual(sel('page-cta.light,badge').unknownPairs(known), [])
})

/* Опечатка в теме не должна выбирать молча ничего: `.darkk` — не суффикс темы, значит
   весь токен остаётся именем, а имени такого нет, и о нём предупредят. */
test('опечатка в теме остаётся именем и попадает в неизвестные', () => {
  const only = sel('page-cta.darkk')
  assert.equal(only.matches('page-cta', 'dark'), false)
  assert.deepEqual(only.unknownNames(['page-cta']), ['page-cta.darkk'])
})
