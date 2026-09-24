import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { inSkipped, keepComponent } from '../skip-dirs.mjs'
import { templateSlots, namespacedParts } from '../audit/template.mjs'
import { checkNodes } from '../audit/checks.mjs'

const DIR = 'node_modules/@nuxt/ui/dist/runtime/components'
const sfc = (name) => readFile(path.join(DIR, `${name}.vue`), 'utf8')

/* Закрепляет разбор целиком: у кнопки безусловен ровно корень, а leadingIcon,
   label и trailingIcon сидят в запасном содержимом слотов под v-if. Стоит
   потерять хоть одно правило — множество разрастётся, и тест это покажет. */
test('Button: безусловен только корневой слот', async (t) => {
  if (!existsSync(DIR)) return t.skip('нет node_modules/@nuxt/ui')
  const { unconditional, conditional } = templateSlots(await sfc('Button'))
  assert.deepEqual([...unconditional], ['base'])
  for (const s of ['leadingIcon', 'label', 'trailingIcon']) {
    assert.ok(conditional.has(s), `${s} рисуется под условием и в безусловные попасть не должен`)
  }
})

/* Атрибут без значения: <tr v-else> у Table. Строка атрибутов кончается сразу
   за именем, и без хвоста `|$` в COND ветка читалась безусловной — слот empty
   ждали в каждом примере, хотя он рисуется только у пустой таблицы. */
test('Table: ветка v-else без значения не считается безусловной', async (t) => {
  if (!existsSync(DIR)) return t.skip('нет node_modules/@nuxt/ui')
  const { unconditional, conditional } = templateSlots(await sfc('Table'))
  assert.ok(!unconditional.has('empty'))
  assert.ok(conditional.has('empty'))
})

/* createReusableTemplate: разметка внутри Define-половины на месте не рисуется
   вовсе. У Header так объявлены left и right, у Sidebar — body и inner. */
test('Header и Sidebar: содержимое Define-шаблона безусловным не считается', async (t) => {
  if (!existsSync(DIR)) return t.skip('нет node_modules/@nuxt/ui')
  const h = templateSlots(await sfc('Header'))
  for (const s of ['left', 'right']) assert.ok(!h.unconditional.has(s), `${s} лежит в DefineLeftTemplate/DefineRightTemplate`)
  const sb = templateSlots(await sfc('Sidebar'))
  for (const s of ['body', 'inner']) assert.ok(!sb.unconditional.has(s), `${s} лежит в Define-шаблоне`)
})

/* Третье множество: содержимое, которое есть у открытого экземпляра и только
   у него. Popover кладёт content под Presence по открытости — значит ни в
   безусловных, ни в условных, а ровно в множестве «по открытости».

   Modal сюда не годится и годиться не должен: его content лежит внутри
   DefineContentTemplate, то есть запрет там жёсткий и открытостью не
   снимается. */
test('Popover: content — слот открытого экземпляра', async (t) => {
  if (!existsSync(DIR)) return t.skip('нет node_modules/@nuxt/ui')
  const { unconditional, whenOpen, conditional } = templateSlots(await sfc('Popover'))
  assert.ok(whenOpen.has('content'), 'content ждут у открытого поповера')
  assert.ok(!unconditional.has('content'), 'у закрытого поповера content не рисуется')
  assert.ok(!conditional.has('content'), 'открытость снимает запрет, а не оставляет его')
})

/* Гейт на таблицу DEFERRED_PART: она разбирает namespace-тег по последней
   части имени, то есть `Content` и `Portal` откладывают узел, в каком бы
   namespace ни встретились. Состав частей закреплён целиком, потому что
   ошибиться можно в обе стороны: новый `Picker.Content` тихо уедет из
   проверяемого множества, а новый отложенный примитив с другим именем тихо в
   него попадёт. Обе — молчаливое изменение счётчиков вместо находки. */
test('состав namespace-частей сверен с библиотекой', async (t) => {
  if (!existsSync(DIR)) return t.skip('нет node_modules/@nuxt/ui')
  const KNOWN = ['Anchor', 'Arrow', 'Cancel', 'Cell', 'CellTrigger', 'CheckboxItem', 'Content', 'Empty',
    'Filter', 'Grid', 'GridBody', 'GridHead', 'GridRow', 'Group', 'HeadCell', 'Header', 'Heading', 'Input',
    'Item', 'ItemIndicator', 'Label', 'Next', 'Portal', 'Prev', 'Root', 'Separator', 'Sub', 'SubTrigger',
    'Trigger', 'Virtualizer']
  const found = new Set()
  for (const e of await readdir(DIR, { withFileTypes: true, recursive: true })) {
    if (!e.isFile() || !e.name.endsWith('.vue') || inSkipped(e.parentPath) || !keepComponent(e.name)) continue
    for (const part of namespacedParts(await readFile(path.join(e.parentPath, e.name), 'utf8'))) found.add(part)
  }
  assert.ok(found.size > 0, 'ни одного namespace-тега — гейт вхолостую')
  assert.deepEqual([...found].sort(), KNOWN,
    'состав namespace-частей изменился: реши, откладывается ли новая часть по открытости (DEFERRED_PART в pipeline/audit/template.mjs), и поправь этот список')
})

const nodes = (...slots) => slots.map((s) => ({ slot: s, comp: 'Card', class: '', computed: {} }))

/* Проверка обязана срабатывать: ноль расхождений на живом ките — её нынешний
   результат, и без этого теста нельзя отличить «состав узлов сходится» от
   «проверка ничего не сравнивает». */
test('пропавший безусловный узел даёт расхождение с именем слота', () => {
  const payload = { examples: [{ id: 'anatomy.0', nodes: nodes('root', 'header') }] }
  const r = checkNodes(payload, {
    always: new Set(['root', 'header', 'body']), open: new Set(), isOpen: () => false, componentName: 'Card'
  })
  assert.equal(r.failures.length, 1)
  assert.match(r.failures[0].got, /body/)
  assert.ok(!/header/.test(r.failures[0].got), 'нарисованный слот в пропажи не попадает')
  assert.equal(r.comparedExamples, 1)
})

test('слот открытого экземпляра спрашивают только у открытого примера', () => {
  const payload = { examples: [{ id: 'closed.0', nodes: nodes('root') }, { id: 'open.0', nodes: nodes('root') }] }
  const r = checkNodes(payload, {
    always: new Set(['root']), open: new Set(['content']), isOpen: (id) => id === 'open.0', componentName: 'Card'
  })
  assert.equal(r.failures.length, 1)
  assert.equal(r.failures[0].where, 'Card open.0')
})

test('упавший пример не считается пропажей узлов', () => {
  const payload = { examples: [{ id: 'a.0', error: 'boom', nodes: [] }] }
  const r = checkNodes(payload, { always: new Set(['root']), open: new Set(), isOpen: () => false, componentName: 'Card' })
  assert.deepEqual(r.failures, [], 'про упавший пример уже сказала проверка отрисовки')
  assert.equal(r.comparedExamples, 0)
})

/* UModal и явный Presence (24.09). У UModal нет своего элемента, и `data-slot="modal"`
   с его тега в DOM не попадает (замер на стенде); содержимое модалки ждут только у
   открытого экземпляра. Кнопку автопрокрутки ChatMessages включает замер прокрутки,
   поэтому `viewport` не ждут никогда. */
test('DashboardSearch: modal узла не даёт, содержимое модалки по open; ChatMessages: viewport под замером', async (t) => {
  if (!existsSync(DIR)) return t.skip('нет node_modules/@nuxt/ui')
  const ds = templateSlots(await sfc('DashboardSearch'))
  for (const set of [ds.unconditional, ds.whenOpen, ds.conditional]) assert.ok(!set.has('modal'), 'у UModal нет своего элемента — data-slot тега узла не даёт')
  assert.ok(!ds.unconditional.has('root'), 'содержимое модалки отложено по open')
  const cm = templateSlots(await sfc('ChatMessages'))
  assert.ok(!cm.unconditional.has('viewport') && !cm.whenOpen.has('viewport'), 'Presence по замеру — ни всегда, ни по открытости')
  assert.ok(cm.unconditional.has('root'), 'остальной шаблон ChatMessages не задет')
})
