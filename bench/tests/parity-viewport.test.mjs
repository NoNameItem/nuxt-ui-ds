import { test } from 'node:test'
import assert from 'node:assert/strict'
import { NARROW_VIEWPORT, VIEWPORT, viewportFor } from '../scripts/viewport.mjs'

/* Узкий кадр существует ради того, что библиотека прячет до `lg` (1024 px): кнопка
   DashboardSidebarToggle — `lg:hidden`, и на 1280 её место не видно ни одной паре
   (nuxt-ui-ds-n33). Узкий кадр не ниже `lg` — пустая страница, которая выглядит проверкой. */

test('страница без суффикса снимается в общем кадре 1280', () => {
  assert.deepEqual(viewportFor('dashboard-navbar'), { width: 1280, height: 800 })
  assert.deepEqual(viewportFor('dashboard-navbar--slots'), VIEWPORT)
})

test('суффикс --narrow даёт узкий кадр ниже lg', () => {
  assert.equal(viewportFor('dashboard-navbar--narrow'), NARROW_VIEWPORT)
  assert.ok(NARROW_VIEWPORT.width < 1024, 'кадр обязан быть уже lg, иначе lg:hidden не снимется')
})

test('narrow в середине имени — не суффикс', () => {
  assert.equal(viewportFor('narrow-thing'), VIEWPORT)
  assert.equal(viewportFor('dashboard-navbar--narrow-x'), VIEWPORT)
})
