import { test } from 'node:test'
import assert from 'node:assert/strict'
import { expected, resolveRaw } from '../audit/oracle.mjs'

const THEME = {
  slots: { base: 'font-medium inline-flex', label: 'truncate' },
  variants: { color: { primary: '', neutral: '' }, variant: { solid: '', outline: '' } },
  compoundVariants: [
    { color: 'primary', variant: 'solid', class: 'bg-primary text-inverted' },
    { color: 'neutral', variant: 'outline', class: 'ring ring-accented' }
  ],
  defaultVariants: { color: 'primary', variant: 'solid' }
}

test('compoundVariant попадает в корневой слот', () => {
  const e = expected(THEME, {})
  assert.deepEqual(e.base, ['bg-primary', 'font-medium', 'inline-flex', 'text-inverted'])
  assert.deepEqual(e.label, ['truncate'])
})

test('пропы перекрывают defaultVariants', () => {
  const e = expected(THEME, { color: 'neutral', variant: 'outline' })
  assert.ok(e.base.includes('ring-accented'))
  assert.ok(!e.base.includes('bg-primary'))
})

// Плоская тема без slots (реальный пример — тема container из dist/docs/themes.json):
// tv(theme)(props) сразу отдаёт строку классов, а не объект функций по слотам.
const FLAT_THEME = {
  base: 'w-full px-4',
  variants: { padded: { false: '' } }
}

test('плоская тема без slots попадает в единственный слот base', () => {
  const e = expected(FLAT_THEME, {})
  assert.deepEqual(e.base, ['px-4', 'w-full'])
})

test('плоская тема с пустым base не бросает исключение', () => {
  const e = expected({ base: '' }, {})
  assert.deepEqual(e.base, [])
})

test('оракул кладёт class примера на корневой слот и разрешает конфликт', () => {
  const theme = { slots: { root: 'w-full', label: 'text-sm' } }
  assert.deepEqual(expected(theme, { class: 'max-w-lg px-4' }).root, ['max-w-lg', 'px-4', 'w-full'])
  assert.deepEqual(expected(theme, { class: 'w-96' }).root, ['w-96'])
  assert.deepEqual(expected(theme, { class: 'w-96' }).label, ['text-sm'])
})

test('слот, принимающий class, задаётся явно — первый слот темы не всегда корень', () => {
  /* Modal.vue:74 кладёт props.class в content, а первым слотом темы идёт
     overlay. Без явного указания класс уходил в затемнение. */
  const theme = { slots: { overlay: 'bg-elevated/75', content: 'bg-default rounded-lg' } }
  const e = expected(theme, { class: 'sm:max-w-3xl' }, 'content')
  assert.deepEqual(e.content, ['bg-default', 'rounded-lg', 'sm:max-w-3xl'])
  assert.deepEqual(e.overlay, ['bg-elevated/75'])
})

test('оракул кладёт ui примера на свой слот', () => {
  const theme = { slots: { root: 'w-full', label: 'text-sm' } }
  assert.deepEqual(expected(theme, { ui: { label: 'text-lg' } }).label, ['text-lg'])
})

/* Делегирующему компоненту строка темы обёртки уходит в `class` делегата, и
   отдавать туда отсортированный набор нельзя. У tailwind-merge есть
   асимметричные группы: `flex-1` перебивает `basis-0`, только стоя после
   него, — `flex-1 basis-0` сохраняет оба, `basis-0 flex-1` оставляет один.
   Алфавит ставит basis-0 первым, то есть сортировка здесь не переставляет
   классы, а стирает один. Проверяются обе половины — что resolveRaw порядок
   хранит и что expected его меняет; иначе тест переживёт подмену одной
   функции другой. */
test('resolveRaw хранит порядок классов, expected — сортирует', () => {
  const theme = { slots: { base: 'flex-1 basis-0' } }
  assert.equal(resolveRaw(theme, {}).base, 'flex-1 basis-0')
  assert.deepEqual(expected(theme, {}).base, ['basis-0', 'flex-1'])
  // и вот чем это кончается, если отсортированное отдать дальше как строку
  const delegate = { slots: { base: 'rounded-md' } }
  assert.equal(resolveRaw(delegate, { class: resolveRaw(theme, {}).base }).base, 'rounded-md flex-1 basis-0')
  assert.equal(resolveRaw(delegate, { class: expected(theme, {}).base.join(' ') }).base, 'rounded-md flex-1')
})

test('resolveRaw плоской темы отдаёт строку, а не набор', () => {
  const theme = { base: 'lg:hidden', variants: { side: { left: '', right: '' } } }
  /* tailwind-merge внутри tv гасит lg:hidden ещё до нас — ровно это и
     происходит у DashboardSidebarToggle, где пример передаёт lg:flex. */
  assert.equal(resolveRaw(theme, { side: 'left', class: 'lg:flex' }).base, 'lg:flex')
})

/* Схлопнутый дочерний узел: CHILD_PAINT + paintedTokens. Комментарий у
   paintedTokens обещает, что между внешним и внутренним слотом конфликта нет ни
   у одной из трёх тем, — вот эта проверка. Конфликт не запрещён, он просто
   молча меняет ожидание: twMerge оставит один класс из пары, и расхождение
   уедет не туда. Пусть падает тест, а не приёмка. */
test('paintedTokens несёт классы обоих слотов, темы CHILD_PAINT конфликта не дают', async () => {
  const { paintedTokens } = await import('../audit/oracle.mjs')
  const { CHILD_PAINT } = await import('../audit/props.mjs')
  const { readFile } = await import('node:fs/promises')
  const themes = JSON.parse(await readFile('dist/docs/themes.json', 'utf8').catch(() => 'null'))
  if (!themes) return // без собранной доки проверять нечего — см. CLAUDE.md про t.skip
  const byShort = new Map(Object.entries(themes).map(([k, v]) => [k.split('/').pop(), v]))
  let checked = 0
  for (const [short, paint] of Object.entries(CHILD_PAINT)) {
    const theme = byShort.get(short)
    assert.ok(theme?.slots, `темы «${short}» из CHILD_PAINT нет в themes.json — проверка стала бы пустой`)
    checked += 1
    const got = new Set(paintedTokens(theme, {}, paint))
    const raw = resolveRaw(theme, {})
    for (const slot of paint) {
      for (const t of String(raw[slot] ?? '').split(/\s+/).filter(Boolean)) {
        assert.ok(got.has(t), `${short}: класс «${t}» слота «${slot}» потерян при слиянии — конфликт twMerge`)
      }
    }
  }
  assert.equal(checked, Object.keys(CHILD_PAINT).length)
})

/* OWN_PAINT — та же склейка, но на собственном узле страницы. Проверка та же:
   слияние не теряет ни одного класса обоих слотов, и тема на месте. */
test('OWN_PAINT: свой узел несёт классы обоих слотов без конфликта twMerge', async () => {
  const { paintedTokens } = await import('../audit/oracle.mjs')
  const { OWN_PAINT } = await import('../audit/props.mjs')
  const { readFile } = await import('node:fs/promises')
  const themes = JSON.parse(await readFile('dist/docs/themes.json', 'utf8').catch(() => 'null'))
  if (!themes) return // без собранной доки проверять нечего — см. CLAUDE.md про t.skip
  const kebab = (s) => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  /* Запись-функция включается пропами; проверяем её в том состоянии, где она склеивает. */
  const ACTIVE = { InputMenu: { multiple: true } }
  let checked = 0
  for (const [page, slots] of Object.entries(OWN_PAINT)) {
    const theme = themes[kebab(page)]
    assert.ok(theme?.slots, `темы для страницы «${page}» из OWN_PAINT нет в themes.json — проверка стала бы пустой`)
    const props = ACTIVE[page] || {}
    const raw = resolveRaw(theme, props)
    for (const entry of Object.values(slots)) {
      const paint = typeof entry === 'function' ? entry(props) : entry
      assert.ok(Array.isArray(paint), `${page}: запись OWN_PAINT не включилась на ${JSON.stringify(props)} — впиши пропы в ACTIVE`)
      checked += 1
      const got = new Set(paintedTokens(theme, props, paint))
      for (const slot of paint) {
        assert.ok(raw[slot], `${page}: слота «${slot}» нет в теме — запись OWN_PAINT устарела`)
        for (const t of String(raw[slot]).split(/\s+/).filter(Boolean)) {
          assert.ok(got.has(t), `${page}: класс «${t}» слота «${slot}» потерян при слиянии — конфликт twMerge`)
        }
      }
    }
  }
  assert.ok(checked > 0)
})
