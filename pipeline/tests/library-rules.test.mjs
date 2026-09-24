import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { COMPUTED, SLOT_VARIANTS, PRIMITIVE_CLASSES, HABITAT, ACCEPTED_PAINT, acceptedPaintProblems, oracleProps } from '../audit/props.mjs'
import { expected, habitatTokens, paintedTokens } from '../audit/oracle.mjs'
import { parseLedger } from '../../bench/scripts/ledger-core.mjs'
import { adaptSets } from '../audit/adaptations.mjs'

/* Таблицы знаний о библиотеке, заведённые 24.09 по расхождениям приёмки на бандле 117.
   Каждая запись проверяется в обе стороны: кит, повторивший библиотеку, проходит, а кит,
   отклонившийся иначе, по-прежнему даёт расхождение. Иначе запись — не знание о
   библиотеке, а дыра в проверке. */

const themes = JSON.parse(await readFile('dist/docs/themes.json', 'utf8').catch(() => 'null'))
const skip = (t) => (themes ? false : (t.skip('нет dist/docs/themes.json — см. CLAUDE.md про t.skip'), true))
const same = (got, want) => {
  const p = adaptSets(got, want)
  return p.got.join(' ') === p.want.join(' ')
}
const want = (short, page, raw) => {
  const theme = themes[short]
  const mine = oracleProps({ page, theme, props: raw })
  const out = expected(theme, mine)
  for (const [slot, f] of Object.entries(SLOT_VARIANTS.get(page) || {})) {
    const v = f(raw)
    if (v && out[slot]) out[slot] = expected(theme, { ...mine, ...v })[slot]
  }
  return out
}

test('Alert: actions с кнопкой закрытия красятся horizontal, внутренние — пропом', (t) => {
  if (skip(t)) return
  const closeOnly = want('alert', 'Alert', { title: 'T', close: true, orientation: 'vertical' })
  assert.ok(closeOnly.actions.includes('items-center'), 'Alert.vue:69 — orientation: horizontal')
  assert.ok(!closeOnly.actions.includes('mt-2.5'))
  const inner = want('alert', 'Alert', { title: 'T', close: true, orientation: 'vertical', actions: [{ label: 'A' }] })
  assert.ok(inner.actions.includes('mt-2.5'), 'первым идёт внутренний узел Alert.vue:62 — вариант из пропа')
  const slot = want('alert', 'Alert', { title: 'T', close: true, orientation: 'vertical', actions: { $slotMark: 'actions' } })
  assert.ok(slot.actions.includes('mt-2.5'), 'плашка слота actions — заполненный слот (!!slots.actions)')
  // Отрицательный: кит, покрасивший внешний узел по пропу vertical, расходится.
  assert.ok(!same(['flex', 'flex-wrap', 'gap-1.5', 'items-start', 'mt-2.5', 'shrink-0'], closeOnly.actions))
})

test('ChatTool: alone у leadingIcon считается шаблоном, пропы примера его не задают', (t) => {
  if (skip(t)) return
  const plain = want('chat-tool', 'ChatTool', { text: 'T', icon: 'i-lucide-search', alone: false })
  assert.ok(!plain.leadingIcon.includes('absolute'), 'без содержимого alone = true (ChatTool.vue:81)')
  const leading = want('chat-tool', 'ChatTool', { text: 'T', icon: 'i-lucide-search', chevron: 'leading', children: 'x' })
  assert.ok(leading.leadingIcon.includes('absolute'), 'содержимое и chevron leading — alone = false')
  assert.ok(!same(['shrink-0', 'size-4'], leading.leadingIcon), 'кит без смены иконки на шеврон расходится')
})

test('ChatReasoning: содержимое — текст рассуждения, а не дефолтный слот', (t) => {
  if (skip(t)) return
  const withText = want('chat-reasoning', 'ChatReasoning', { text: 'Lorem', icon: 'i-lucide-brain', chevron: 'leading' })
  assert.ok(withText.leadingIcon.includes('absolute'), 'ChatReasoning.vue:94 — hasContent = !!text || streaming')
  const bare = want('chat-reasoning', 'ChatReasoning', { icon: 'i-lucide-brain', chevron: 'leading' })
  assert.ok(!bare.leadingIcon.includes('absolute'))
})

test('Progress: первый шаг — first при нулевом значении, иначе other', (t) => {
  if (skip(t)) return
  const other = want('progress', 'Progress', { modelValue: 1, max: ['a', 'b', 'c'] })
  assert.ok(other.step.includes('opacity-0'))
  const first = want('progress', 'Progress', { modelValue: 0, max: ['a', 'b', 'c'] })
  assert.ok(first.step.includes('opacity-100') && first.step.includes('text-muted'))
  assert.equal(SLOT_VARIANTS.get('Progress').step({ modelValue: 0, max: 100 }), null, 'без массива шагов нет')
})

test('COMPUTED: size у DashboardPanel — из defaultSize, проп size до tv() не доходит', (t) => {
  assert.deepEqual(COMPUTED.get('DashboardPanel')({ defaultSize: 35, size: false }), { size: true })
  assert.deepEqual(COMPUTED.get('DashboardPanel')({ size: true }), { size: false })
  /* PageCard сюда не входит сознательно: useMouseInElement на монтировании даёт
     elementX = 0 − rect.left (VueUse 14.4, tryOnMounted(update)), то есть spotlight у
     библиотеки на статичной странице включён — см. тест «PageCard читает spotlight сырым». */
  assert.equal(COMPUTED.has('PageCard'), false)
  if (skip(t)) return
  const panel = want('dashboard-panel', 'DashboardPanel', { defaultSize: 35, size: false })
  assert.ok(panel.root.includes('lg:w-(--width)') && !panel.root.includes('flex-1'))
  assert.ok(!same(['flex-1'], panel.root), 'кит, взявший size из пропа, расходится')
})

test('PRIMITIVE_CLASSES: направление Splitter и hidden только у закрытого content', () => {
  const split = PRIMITIVE_CLASSES.get('Splitter').root
  assert.deepEqual(split({}), ['flex', 'flex-row', 'overflow-hidden', 'size-full'])
  assert.ok(split({ orientation: 'vertical' }).includes('flex-col'))
  const tool = PRIMITIVE_CLASSES.get('ChatTool').content
  assert.deepEqual(tool({}), ['hidden'], 'по умолчанию закрыт (ChatTool.vue:43)')
  assert.deepEqual(tool({ defaultOpen: true }), [])
  assert.deepEqual(tool({ actions: [{ label: 'A' }], children: 'x' }), [], 'actions с содержимым раскрывают (ChatTool.vue:50-54)')
  assert.deepEqual(tool({ actions: [{ label: 'A' }] }), ['hidden'], 'без содержимого — нет')
  assert.deepEqual(tool({ open: false, defaultOpen: true }), ['hidden'], 'управляемый open сильнее')
  const reasoning = PRIMITIVE_CLASSES.get('ChatReasoning').content
  assert.deepEqual(reasoning({ streaming: true }), [], 'открыт, пока streaming (ChatReasoning.vue:40)')
  assert.deepEqual(reasoning({}), ['hidden'])
  // Отрицательный: кит, спрятавший открытый content, расходится с ожиданием без hidden.
  assert.ok(!same(['a', 'hidden'], ['a', ...tool({ defaultOpen: true })]))
})

test('HABITAT: тост в тостере — узел base, absolute тостера побеждает relative тоста', (t) => {
  if (skip(t)) return
  const hab = HABITAT.get('Toast')
  const theme = themes.toast
  const mine = oracleProps({ page: 'Toast', theme, props: { title: 'T' } })
  const got = habitatTokens(theme, mine, hab.into, themes[hab.theme], hab.props, hab.slot)
  assert.ok(got.includes('absolute') && !got.includes('relative'), 'twMerge: class тостера идёт последним (Toast.vue:31)')
  assert.ok(got.includes('bottom-0'), 'position по defaultVariants тостера — bottom-right')
  assert.ok(got.includes('ring-default'), 'root тоста на месте')
  assert.ok(!same(got.map((c) => (c === 'absolute' ? 'relative' : c)), got), 'relative вместо absolute — расхождение без swap')
  /* swap — решение человека (kit-toaster-stack-in-flow): relative засчитывается, а fixed или
     потеря позиционирования — нет. */
  const swapped = got.map((c) => hab.swap?.[c] ?? c)
  assert.ok(swapped.includes('relative') && !swapped.includes('absolute'))
  assert.ok(!same(got.map((c) => (c === 'absolute' ? 'fixed' : c)), swapped))
  assert.ok(!same(got.filter((c) => c !== 'absolute'), swapped))
})

test('CommandPalette: active и loading — варианты пункта, проп палитры до tv() не доходит', (t) => {
  if (skip(t)) return
  const groups = (items) => [{ id: 'g', items }]
  const top = want('command-palette', 'CommandPalette', { active: true, groups: groups([{ label: 'A' }, { label: 'B', active: true }]) })
  assert.ok(top.item.includes('transition-colors') && !top.item.includes('before:bg-elevated'), 'CommandPalette.vue:257 — active || item.active первого пункта')
  const own = want('command-palette', 'CommandPalette', { groups: groups([{ label: 'A', active: true, icon: 'i-lucide-a' }]) })
  assert.ok(own.item.includes('before:bg-elevated') && own.itemLeadingIcon.includes('text-default'), 'item.active включает')
  // Отрицательный: кит, покрасивший пункт по пропу палитры, расходится.
  assert.ok(!same(own.item, top.item))
  const spin = want('command-palette', 'CommandPalette', { loading: true, groups: groups([{ label: 'A', icon: 'i-lucide-a' }]) })
  assert.ok(!spin.itemLeadingIcon.includes('animate-spin'), 'loading палитры — спиннер поля, не пункта')
  const busy = want('command-palette', 'CommandPalette', { groups: groups([{ label: 'A' }, { label: 'B', loading: true }]) })
  assert.ok(busy.itemLeadingIcon.includes('animate-spin'), 'первый узел itemLeadingIcon — у пункта с loading (CommandPalette.vue:260)')
  /* У ветки загрузки `active` в вызове нет, и tailwind-variants берёт у булева варианта ветку
     false — так же, как у библиотеки: вызов идёт через тот же tv(). */
  assert.ok(busy.itemLeadingIcon.includes('text-dimmed'))
  assert.equal(SLOT_VARIANTS.get('CommandPalette').itemLeadingIcon({ groups: groups([{ label: 'A' }]) }), null, 'без иконки слота нет')
})

test('FooterColumns: active ссылки — из самой ссылки, проп колонок до tv() не доходит', (t) => {
  if (skip(t)) return
  const columns = (children) => [{ label: 'C', children }]
  const top = want('footer-columns', 'FooterColumns', { active: true, columns: columns([{ label: 'L' }]) })
  assert.ok(top.link.includes('text-muted') && !top.link.includes('text-primary'), 'FooterColumns.vue:45 — active из ULink')
  const own = want('footer-columns', 'FooterColumns', { columns: columns([{ label: 'L', active: true }]) })
  assert.ok(own.link.includes('text-primary'))
  assert.ok(!same(own.link, top.link), 'кит, покрасивший ссылку по пропу колонок, расходится')
})

test('ACCEPTED_PAINT: каждая запись держится на классе реестра, принятом человеком', async () => {
  const ledger = parseLedger(await readFile('bench/ledger.yaml', 'utf8'))
  assert.deepEqual(acceptedPaintProblems(ledger), [])
  const missing = { classes: new Map() }
  assert.equal(acceptedPaintProblems(missing).length, ACCEPTED_PAINT.size, 'класса нет — запись не действует')
  const open = { classes: new Map([['kit-editor-no-tiptap', { id: 'kit-editor-no-tiptap', status: 'open' }]]) }
  assert.match(acceptedPaintProblems(open)[0], /не принят человеком/)
  const noDate = { classes: new Map([['kit-editor-no-tiptap', { id: 'kit-editor-no-tiptap', status: 'accepted' }]]) }
  assert.match(acceptedPaintProblems(noDate)[0], /decided нет/)
})

test('ACCEPTED_PAINT: корень Editor — склейка root и base, прочие отклонения остаются', (t) => {
  if (skip(t)) return
  const theme = themes.editor
  const mine = oracleProps({ page: 'Editor', theme, props: {} })
  const { paint } = ACCEPTED_PAINT.get('Editor').root
  const want = paintedTokens(theme, mine, paint)
  const own = expected(theme, mine)
  assert.ok(same([...own.root, ...own.base], want), 'кит с классами root и base проходит')
  assert.ok(!same(own.root, want), 'кит без классов ProseMirror расходится')
  assert.ok(!same([...own.root, ...own.base, ...own.content], want), 'классы узла content на корне — расхождение')
})
