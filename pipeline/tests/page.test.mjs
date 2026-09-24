import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pageHtml } from '../doc-pages/page.mjs'

const DOC = {
  name: 'Badge', theme: 'badge', group: 'core',
  docUrl: 'https://ui.nuxt.com/docs/components/badge',
  propsTable: [{ prop: 'color', type: 'BadgeColor', values: 'primary | neutral', def: 'primary', from: 'variants' }],
  sections: [{ id: 'color', title: 'Color', anchor: 'https://ui.nuxt.com/docs/components/badge#color', base: {}, examples: [{ label: 'primary', patch: { color: 'primary' } }] }]
}

test('страница подключает ресурсы кита относительными путями', () => {
  const html = pageHtml(DOC)
  assert.match(html, /href="\.\.\/\.\.\/styles\.css"/)
  assert.match(html, /href="\.\.\/\.\.\/lib\/docs\.css"/)
  assert.match(html, /src="\.\.\/\.\.\/_ds_bundle\.js"/)
  assert.match(html, /from '\.\.\/\.\.\/lib\/docs\.js'/)
})

test('у страницы есть заголовок с именем компонента', () => {
  assert.match(pageHtml(DOC), /<title>Badge — Nuxt UI kit docs<\/title>/)
})

test('данные страницы лежат в application/json и разбираются', () => {
  const html = pageHtml(DOC)
  const m = /<script type="application\/json" id="ds-doc">([\s\S]*?)<\/script>/.exec(html)
  assert.ok(m, 'нет блока ds-doc')
  assert.deepEqual(JSON.parse(m[1]).sections[0].examples[0].patch, { color: 'primary' })
})

test('в разметке нет новых Tailwind-классов кроме трёх разрешённых', () => {
  const html = pageHtml(DOC)
  const cls = [...html.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/))
  const allowed = new Set(['bg-default', 'text-default', 'dark'])
  const own = cls.filter((c) => !c.startsWith('ds-') && !allowed.has(c))
  assert.deepEqual(own, [], 'посторонние классы: ' + own.join(','))
})
