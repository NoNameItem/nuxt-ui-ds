import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MANUAL_FIXTURES, OVERLAY_THEMES } from '../doc-pages/fixtures.mjs'

const NEED = ['icon', 'chat-palette', 'container', 'skeleton', 'dashboard-group',
  'dashboard-resize-handle', 'dashboard-search', 'dashboard-toolbar', 'carousel',
  'scroll-area', 'editor-drag-handle', 'editor-emoji-menu', 'editor-mention-menu',
  'editor-suggestion-menu', 'editor-toolbar', 'form', 'footer', 'footer-columns',
  'main', 'toast', 'toaster', 'page', 'page-aside', 'page-body', 'page-cta',
  'page-columns', 'page-grid', 'page-list']

test('фикстура есть у каждого компонента без блоков в доке', () => {
  for (const n of NEED) {
    assert.ok(MANUAL_FIXTURES[n], `нет ручной фикстуры для ${n}`)
    assert.ok(Object.keys(MANUAL_FIXTURES[n]).length > 0, `пустая фикстура у ${n}`)
  }
})

test('оверлеи с ручной фикстурой открыты, иначе им нечего рисовать', () => {
  const withFixture = [...OVERLAY_THEMES].filter((n) => MANUAL_FIXTURES[n])
  assert.ok(withFixture.length >= 3, 'ожидались ручные фикстуры хотя бы у трёх оверлеев, иначе проверка вырождена')
  for (const n of withFixture) {
    assert.equal(MANUAL_FIXTURES[n].open, true, `${n} должен быть open: true`)
  }
})
