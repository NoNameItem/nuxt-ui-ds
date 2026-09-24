import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseDocBlocks } from '../doc-pages/parse-doc-blocks.mjs'

const MD = `## Usage

Use the default slot.

::component-code
---
slots:
  default: Badge
---
::

### Color

Use the \`color\` prop.

::component-code
---
ignore:
  - avatar.loading
prettier: true
props:
  color: neutral
slots:
  default: Badge
---
::
`

test('блоки разбираются с привязкой к заголовку', () => {
  const blocks = parseDocBlocks(MD)
  assert.equal(blocks.length, 2)
  assert.equal(blocks[0].heading, 'Usage')
  assert.deepEqual(blocks[0].slots, { default: 'Badge' })
  assert.deepEqual(blocks[0].props, {})
  assert.equal(blocks[1].heading, 'Color')
  assert.deepEqual(blocks[1].props, { color: 'neutral' })
})

test('служебные ключи доки отбрасываются', () => {
  const blocks = parseDocBlocks(MD)
  assert.ok(!('ignore' in blocks[1]))
  assert.ok(!('prettier' in blocks[1]))
})

test('верхнеуровневый items — конфигурация выпадающего списка доки, не проп', () => {
  const md = `## Type

::component-code
---
props:
  type: number
items:
  type:
    - text
    - number
---
::
`
  const blocks = parseDocBlocks(md)
  assert.equal(blocks.length, 1)
  assert.ok(!('items' in blocks[0]))
  assert.deepEqual(blocks[0].props, { type: 'number' })
})
