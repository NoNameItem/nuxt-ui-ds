import test from 'node:test'
import assert from 'node:assert/strict'
import { adaptSets, isVarClass } from '../audit/adaptations.mjs'

test('fixed темы сходится с absolute кита', () => {
  const { got, want } = adaptSets(['absolute', 'inset-0'], ['fixed', 'inset-0'])
  assert.deepEqual(got, want)
})

test('потерянное позиционирование расхождением остаётся', () => {
  const { got, want } = adaptSets(['inset-0'], ['fixed', 'inset-0'])
  assert.notDeepEqual(got, want)
})

test('вьюпортная единица сходится с процентом', () => {
  const { got, want } = adaptSets(['w-[calc(100%-2rem)]'], ['w-[calc(100vw-2rem)]'])
  assert.deepEqual(got, want)
})

test('классы с произвольным свойством выброшены с обеих сторон', () => {
  assert.equal(isVarClass('[--gap:--spacing(16)]'), true)
  const { want } = adaptSets([], ['[--duration:20s]', 'flex'])
  assert.deepEqual(want, ['flex'])
})

test('библиотечный класс у кита засчитывается без адаптации', () => {
  // кит адаптацию применил: absolute в DOM против fixed в теме — совпадение
  const adapted = adaptSets(['absolute'], ['fixed'])
  assert.deepEqual(adapted.got, adapted.want)
  // кит оставил класс библиотеки (keepFixed, раунды 114-115) — тоже совпадение
  const kept = adaptSets(['fixed', 'inset-y-0'], ['fixed', 'inset-y-0'])
  assert.deepEqual(kept.got, kept.want)
  const keptVw = adaptSets(['w-[calc(100vw-2rem)]'], ['w-[calc(100vw-2rem)]'])
  assert.deepEqual(keptVw.got, keptVw.want)
})

test('третий класс вместо библиотечного и адаптированного — расхождение', () => {
  const pair = adaptSets(['relative'], ['fixed'])
  assert.notDeepEqual(pair.got, pair.want)
  const unit = adaptSets(['w-[calc(100dvh-2rem)]'], ['w-[calc(100vw-2rem)]'])
  assert.notDeepEqual(unit.got, unit.want)
})

/* Минимумы держат вьюпортную единицу (24.09): процентный min-height от родителя с
   высотой auto схлопывает панель. Основание — нулевые пары error, main, dashboard-*. */
test('минимум с вьюпортной единицей ждётся в dvh, а не в процентах', () => {
  const ok = (got, want) => { const p = adaptSets(got, want); return p.got.join(' ') === p.want.join(' ') }
  assert.ok(ok(['min-h-[100dvh]'], ['min-h-svh']))
  assert.ok(ok(['min-h-svh'], ['min-h-svh']), 'библиотечный класс как есть засчитывается')
  assert.ok(ok(['min-h-[calc(100dvh-var(--ui-header-height))]'], ['min-h-[calc(100vh-var(--ui-header-height))]']))
  assert.ok(!ok(['min-h-full'], ['min-h-svh']), 'процент для минимума — расхождение')
  assert.ok(!ok(['min-h-[calc(100%-var(--ui-header-height))]'], ['min-h-[calc(100vh-var(--ui-header-height))]']))
  assert.ok(ok(['h-full'], ['h-svh']), 'жёсткая высота по-прежнему в процентах')
  assert.ok(ok(['lg:min-h-[100dvh]'], ['lg:min-h-svh']), 'вариант сохраняется')
})
