import { test } from 'node:test'
import assert from 'node:assert/strict'
import { varMap, toPx } from '../audit/tokens.mjs'

test('varMap собирает пользовательские свойства, первое объявление побеждает', () => {
  const vars = varMap([':root { --spacing: 0.25rem; --text-sm: 0.875rem }', ':root { --spacing: 1rem }'])
  assert.equal(vars.get('--spacing'), '0.25rem')
  assert.equal(vars.get('--text-sm'), '0.875rem')
})

test('toPx разрешает длину, ссылку и умножение', () => {
  const vars = varMap([':root { --spacing: 0.25rem; --ui-radius: 0.25rem }'])
  assert.equal(toPx('16px', vars), 16)
  assert.equal(toPx('0.875rem', vars), 14)
  assert.equal(toPx('var(--spacing)', vars), 4)
  assert.equal(toPx('calc(var(--spacing) * 2.5)', vars), 10)
  assert.ok(Number.isNaN(toPx('calc(100% - 2rem)', vars)))
  assert.ok(Number.isNaN(toPx('var(--нет-такой)', vars)))
})
