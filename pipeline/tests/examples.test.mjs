import { test } from 'node:test'
import assert from 'node:assert/strict'
import { baseProps, buildSections, coverage, configSlots } from '../doc-pages/examples.mjs'

const THEME = {
  slots: { base: '', label: '' },
  variants: {
    color: { primary: '', neutral: '' },
    variant: { solid: '', outline: '' },
    square: { true: '' }
  },
  compoundVariants: [
    { color: 'primary', variant: 'solid', class: 'bg-primary' },
    { color: 'neutral', variant: 'outline', class: 'ring-accented' }
  ],
  defaultVariants: { color: 'primary', variant: 'solid' }
}
const SFC = { square: false, as: 'span' }

test('дефолт из SFC перекрывает defaultVariants', () => {
  const t = { ...THEME, defaultVariants: { ...THEME.defaultVariants, square: 'true' } }
  assert.equal(baseProps(t, SFC).square, false)
  assert.equal(baseProps(t, SFC).color, 'primary')
  assert.ok(!('as' in baseProps(t, SFC)), 'ключей вне variants в базе быть не должно')
})

test('раздел доки с заголовком-ключом разворачивается в ряд по значениям', () => {
  const blocks = [{ heading: 'Usage', props: {}, slots: { default: 'Badge' } },
                  { heading: 'Color', props: { color: 'neutral' }, slots: { default: 'Badge' } }]
  const secs = buildSections({ themeName: 'badge', theme: THEME, sfcDef: SFC, blocks, fixture: {}, docSlug: 'badge' })
  const color = secs.find((s) => s.title === 'Color')
  assert.deepEqual(color.examples.map((e) => e.patch.color), ['primary', 'neutral'])
  assert.equal(color.anchor, 'https://ui.nuxt.com/docs/components/badge#color')
})

test('анатомия не кладёт плашку в слот иконки или аватара', () => {
  const theme = {
    slots: { base: '', label: '', leadingIcon: '', trailingIcon: '', leadingAvatar: '', leadingAvatarSize: '' },
    variants: {}, compoundVariants: [], defaultVariants: {}
  }
  const secs = buildSections({ themeName: 'x', theme, sfcDef: {}, blocks: [], fixture: {}, docSlug: 'x' })
  const an = secs.find((s) => s.id === 'anatomy').base
  assert.equal(typeof an.leadingIcon, 'string', 'слот иконки — строка с именем иконки')
  assert.equal(typeof an.trailingIcon, 'string')
  assert.deepEqual(an.leadingAvatar, { alt: 'AV' }, 'слот аватара — объект аватара')
  assert.deepEqual(an.label, { $slotMark: 'label' }, 'обычный слот — плашка с именем')
  assert.deepEqual(an.leadingAvatarSize, { $slotMark: 'leadingAvatarSize' }, 'слот размера аватара — не аватар')
})

test('configSlots находит слоты, значения которых — размерные токены', () => {
  const theme = {
    slots: { item: 'flex', itemLeadingAvatarSize: '', label: 'truncate' },
    variants: {
      size: {
        md: { item: 'p-2', itemLeadingAvatarSize: '2xs' },
        lg: { item: 'p-3', itemLeadingAvatarSize: 'xs' }
      }
    }
  }
  assert.deepEqual([...configSlots(theme)], ['itemLeadingAvatarSize'])
})

test('configSlots не трогает слот, у которого среди значений есть классы', () => {
  const theme = {
    slots: { badge: '' },
    variants: { size: { md: { badge: 'sm' }, lg: { badge: 'rounded-full px-2' } } }
  }
  assert.deepEqual([...configSlots(theme)], [])
})

test('покрытие достигает всех значений и всех compound-правил', () => {
  const blocks = [{ heading: 'Usage', props: {}, slots: { default: 'Badge' } }]
  const secs = buildSections({ themeName: 'badge', theme: THEME, sfcDef: SFC, blocks, fixture: {}, docSlug: 'badge' })
  const c = coverage(THEME, secs)
  assert.equal(c.values.missing.length, 0, 'не покрытые значения: ' + c.values.missing)
  assert.equal(c.rules.hit, 2)
})

test('у примера с type=file значение обнуляется, сам вариант остаётся', () => {
  const theme = { slots: { root: '', base: '' }, variants: { type: { text: '', file: '' } }, defaultVariants: {} }
  const blocks = [{ heading: 'Usage', props: {}, slots: {} }]
  const secs = buildSections({
    themeName: 'input', theme, sfcDef: {}, blocks,
    fixture: { modelValue: 'Backlog' }, docSlug: 'input'
  })
  const sec = secs.find((s) => s.id === 'variant-type')
  const props = sec.examples.map((e) => ({ ...sec.base, ...e.patch }))
  const file = props.find((p) => p.type === 'file')
  const text = props.find((p) => p.type === 'text')
  assert.ok(file, 'вариант type=file должен остаться')
  assert.equal(file.modelValue, '', 'браузер запрещает непустое value у input type=file')
  assert.equal(text.modelValue, 'Backlog', 'у остальных типов значение не трогаем')
})
