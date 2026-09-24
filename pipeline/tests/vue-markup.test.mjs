import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseVueMarkup } from '../doc-pages/vue-markup.mjs'

test('одиночный самозакрывающийся тег становится компонентом кита', () => {
  const r = parseVueMarkup('<UButton label="Open" color="neutral" variant="subtle" />')
  assert.deepEqual(r.nodes, [{ $el: 'Button', props: { label: 'Open', color: 'neutral', variant: 'subtle' }, children: [] }])
  assert.equal(r.$markup, '<UButton label="Open" color="neutral" variant="subtle" />')
})

test('Placeholder доки становится собственным узлом', () => {
  assert.deepEqual(parseVueMarkup('<Placeholder class="h-48 m-4" />').nodes, [{ $placeholder: 'h-48 m-4' }])
})

test('последовательность тегов даёт несколько узлов', () => {
  const r = parseVueMarkup('<UAvatar alt="A" />\n<UAvatar alt="B" />')
  assert.equal(r.nodes.length, 2)
  assert.equal(r.nodes[1].props.alt, 'B')
})

test('обычный HTML с текстом и вложенностью', () => {
  const r = parseVueMarkup('<h1>Hello World</h1>\n<p>This is a <strong>rich text</strong> editor.</p>')
  assert.equal(r.nodes.length, 2)
  assert.equal(r.nodes[0].$el, 'h1')
  assert.deepEqual(r.nodes[0].children, ['Hello World'])
  assert.equal(r.nodes[1].children[1].$el, 'strong')
})

test('двоеточие перед именем разбирается как значение, а не строка', () => {
  const r = parseVueMarkup('<UButton :loading="true" label="x" />')
  assert.equal(r.nodes[0].props.loading, true)
  assert.equal(r.nodes[0].props.label, 'x')
})

test('одиночный непарный тег не ломает разбор', () => {
  const r = parseVueMarkup('<img src="https://github.com/nuxt.png" alt="Logo" class="size-10">')
  assert.equal(r.nodes.length, 1)
  assert.equal(r.nodes[0].$el, 'img')
})
