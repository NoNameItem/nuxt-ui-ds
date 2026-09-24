import { test } from 'node:test'
import assert from 'node:assert/strict'
import { vueSnippet, jsxSnippet, jsLiteral, hoistable, preamble, hydrate } from '../lib/docs.js'

test('Vue: строки атрибутами, прочее через двоеточие, children телом', () => {
  const s = vueSnippet('Badge', { color: 'neutral', square: true, children: 'Badge' })
  assert.equal(s, '<UBadge color="neutral" :square="true">\n  Badge\n</UBadge>')
})

test('Vue: именованные слоты через template', () => {
  const s = vueSnippet('Card', { header: 'Заголовок', children: 'Тело' })
  assert.match(s, /<template #header>Заголовок<\/template>/)
})

test('Vue: самозакрывающийся тег без содержимого', () => {
  assert.equal(vueSnippet('Badge', { label: 'Badge' }), '<UBadge label="Badge" />')
})

test('JSX повторяет объект пропов кита', () => {
  const s = jsxSnippet('Badge', { color: 'neutral', square: true, children: 'Badge' })
  assert.equal(s, '<Badge color="neutral" square>Badge</Badge>')
})

test('Vue: разобранная разметка печатается исходной строкой, а не объектом', () => {
  const markup = { $markup: '<UButton label="Open" />', nodes: [{ $el: 'Button', props: { label: 'Open' }, children: [] }] }
  const s = vueSnippet('Modal', { children: markup })
  assert.equal(s, '<UModal>\n  <UButton label="Open" />\n</UModal>')
  assert.ok(!s.includes('object Object'))
})

test('крупное значение выносится в объявление, а не в атрибут', () => {
  const items = Array.from({ length: 12 }, (_, i) => ({ label: `Пункт ${i}`, icon: 'i-lucide-house' }))
  const h = hoistable({ items, color: 'primary' })
  assert.deepEqual([...h], ['items'], 'выносить надо только крупное')
  assert.match(vueSnippet('NavigationMenu', { items, color: 'primary' }, h), /:items="items"/)
  assert.match(jsxSnippet('NavigationMenu', { items, color: 'primary' }, h), /items=\{items\}/)
  const pre = preamble({ items, color: 'primary' }, h)
  assert.match(pre, /^const items = \[/)
  assert.ok(!pre.includes('color'), 'мелкое в объявление не выносится')
})

test('JSX печатает className, а не class — иначе сниппет не работает при копировании', () => {
  const markup = { $markup: '<div class="flex">x</div>', nodes: [{ $el: 'div', props: { class: 'flex' }, children: ['x'] }] }
  const s = jsxSnippet('Card', { class: 'w-full', children: markup })
  assert.match(s, /className="w-full"/)
  assert.match(s, /<div className="flex">x<\/div>/)
  assert.ok(!/\bclass=/.test(s), 'атрибута class в JSX остаться не должно')
})

test('литерал печатается как JavaScript, а не как JSON', () => {
  assert.equal(jsLiteral({ label: 'Guide', to: '/docs' }).replace(/\s+/g, ' '), "{ label: 'Guide', to: '/docs' }")
  assert.equal(jsLiteral([]), '[]')
  assert.equal(jsLiteral({ 'data-x': 1 }).replace(/\s+/g, ' '), "{ 'data-x': 1 }")
})

test('JSX: разобранная разметка печатается элементами кита', () => {
  const markup = { $markup: '<UButton label="Open" />', nodes: [{ $el: 'Button', props: { label: 'Open' }, children: [] }] }
  assert.equal(jsxSnippet('Modal', { children: markup }), '<Modal><Button label="Open" /></Modal>')
})

/* Кит отличает содержимое, пришедшее слотом, от значения пропа по ключу
   `$slotMark` в props элемента (lib/reads.js, isSlotMark) — варианты вида
   `!slots.x` для него выключаются. Плашка обязана этот ключ донести: пока она
   была голым span'ом, PageHero и PageSection считали плашку пропом. */
test('плашка слота доносит $slotMark до кита', () => {
  globalThis.React = { createElement: (type, props, ...children) => ({ type, props: { ...props, children } }) }
  try {
    const out = hydrate({ headline: { $slotMark: 'headline' }, title: 'Заголовок' })
    assert.equal(out.headline.props.$slotMark, 'headline')
    assert.equal(out.title, 'Заголовок')
  } finally {
    delete globalThis.React
  }
})
