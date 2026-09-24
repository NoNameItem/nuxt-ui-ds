import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseDefineProps, sfcDefaults } from '../doc-pages/parse-props.mjs'

const SFC = `<script setup>
const _props = defineProps({
  as: { type: null, required: false, default: "span" },
  label: { type: [String, Number], required: false },
  square: { type: Boolean, required: false },
  rows: { type: Number, required: false, default: 3 },
  watchOptions: { type: Object, required: false, default: () => ({
    deep: true
  }) }
});
</script>`

test('пропы разбираются вместе с типом и дефолтом', () => {
  const p = parseDefineProps(SFC)
  assert.equal(p.as.default, 'span')
  assert.equal(p.label.type, '[String, Number]')
  assert.equal(p.square.type, 'Boolean')
  assert.equal(p.square.hasDefault, false)
  assert.equal(p.rows.default, 3)
  assert.equal(p.watchOptions.hasDefault, true)
})

test('Boolean без default равен undefined, а не false — правило Nuxt UI, не Vue', () => {
  const d = sfcDefaults(parseDefineProps(SFC))
  assert.ok(!('square' in d), 'useComponentProps отдаёт void 0, когда у объявления нет default')
  assert.equal(d.as, 'span')
  assert.equal(d.rows, 3)
  assert.ok(!('label' in d))
})

test('default: void 0 — это отсутствие дефолта, а не строка «void 0»', () => {
  /* Дословно из Link.vue:23 — так dist-сборка записывает `default: undefined`. */
  const sfc = `<script setup>
const _props = defineProps({
  active: { type: Boolean, required: false, default: void 0 },
  locale: { type: [Boolean, String], required: false, default: undefined },
  size: { type: null, required: false, default: "md" }
});
</script>`
  const p = parseDefineProps(sfc)
  assert.equal(p.active.default, undefined)
  const d = sfcDefaults(p)
  assert.ok(!('active' in d), 'строка "void 0" ушла бы в tv ключом, которого нет ни в одном варианте')
  assert.ok(!('locale' in d))
  assert.equal(d.size, 'md')
})
