import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseDefineProps, sfcDefaults } from '../doc-pages/parse-props.mjs'
import { existsSync } from 'node:fs'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { oracleProps, ICON_COMPONENTS, readsSelfCheck, readsCoverage, DELEGATES, delegateProps, SEARCH_LABEL } from '../audit/props.mjs'

test('булев проп без объявленного default в дефолты не попадает', () => {
  const src = `defineProps({
    size: { type: String, required: false, default: "md" },
    trailing: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false, default: false }
  })`
  const d = sfcDefaults(parseDefineProps(src))
  assert.equal(d.size, 'md')
  assert.equal(d.disabled, false, 'объявленный default сохраняется')
  assert.ok(!('trailing' in d), 'без default компонент видит undefined, а не false')
})

const selectTheme = { slots: { base: '' }, variants: { leading: { true: '' }, trailing: { true: '' }, size: { md: '' } } }

test('у Select шеврон стоит всегда: trailing вычисляется, а не берётся из пропа', () => {
  const p = oracleProps({ page: 'Select', theme: selectTheme, props: { size: 'md' } })
  assert.equal(p.trailing, true)
  assert.equal(p.leading, false)
})

test('явный trailing=false из примера доки гасит шеврон', () => {
  const p = oracleProps({ page: 'Select', theme: selectTheme, props: { size: 'md', loading: true, trailing: false } })
  assert.equal(p.trailing, false)
  assert.equal(p.leading, true, 'loading без trailing даёт ведущую иконку')
})

test('иконка примера включает ведущий отступ, хотя проп leading не задан', () => {
  const p = oracleProps({ page: 'Input', theme: selectTheme, props: { size: 'md', icon: 'i-lucide-search' } })
  assert.equal(p.leading, true)
})

test('слот-метка в значении варианта темы становится true', () => {
  const theme = { slots: { base: '' }, variants: { title: { true: '' } } }
  const p = oracleProps({ page: 'PageSection', theme, props: { title: { $slotMark: 'title' } } })
  assert.equal(p.title, true)
})

/* Ветки, которые до раунда правок 1 не держал ни один тест: их снятие двигало
   приёмку (131 → 137 и 131 → 135), а тесты оставались зелёными. */
test('аватар примера включает ведущий отступ, хотя ни иконки, ни пропа leading нет', () => {
  const p = oracleProps({ page: 'Input', theme: selectTheme, props: { size: 'md', avatar: { src: 'x' } } })
  assert.equal(p.leading, true, 'Input.vue:69 — isLeading || !!props.avatar || !!slots.leading')
})

/* Метка слота — единственный признак заполненного слота. Без этой проверки
   сторож $slotMark в isMark не держал ничего: подмена isMark на «любой объект»
   оставляла все тесты зелёными, хотя обычный объект в пропе начинал читаться
   как !!slots.leading и включал отступ под иконку, которой нет. */
test('объект без метки слота в пропе leading заполненным слотом не считается', () => {
  const p = oracleProps({ page: 'Input', theme: selectTheme, props: { size: 'md', leading: { color: 'neutral' }, trailing: { color: 'neutral' } } })
  assert.equal(p.leading, false, 'Input.vue:69 — слот считается заполненным только по метке')
  assert.equal(p.trailing, false, 'то же для замыкающего слота')
})

test('loading вместе с явным trailing=true даёт замыкающую иконку', () => {
  const p = oracleProps({ page: 'Input', theme: selectTheme, props: { size: 'md', loading: true, trailing: true } })
  assert.equal(p.trailing, true, 'ветка (loading && trailing) из useComponentIcons')
})

/* Четыре формы таблицы READS, кроме slot (её держит тест про PageSection.title
   выше) и icons (её держат тесты про Select). */
test('truthy: объект в пропе включает вариант, который компонент читает как !!props.x', () => {
  const theme = { slots: { base: '' }, variants: { increment: { true: '' } } }
  const p = oracleProps({ page: 'InputNumber', theme, props: { increment: { color: 'neutral', size: 'xs' } } })
  assert.equal(p.increment, true, 'InputNumber.vue:75')
})

test('inverted: заполненный слот выключает вариант, который компонент читает как !slots.x', () => {
  const theme = { slots: { headline: '' }, variants: { headline: { true: '' } } }
  const p = oracleProps({ page: 'PageSection', theme, props: { headline: { $slotMark: 'headline' } } })
  assert.equal(p.headline, false, 'PageSection.vue:56 — ui.headline({ headline: !slots.headline })')
})

/* Вариант включает не только плашка слота, но и обычное значение: компонент
   читает `!!props.x || !!slots.x`, и непустая строка для него такой же `true`.
   Прежний страж «преобразуем, только если в пропе объект» прятал этот дефект
   кита всюду, кроме анатомии, — 337 примеров на 18 парах. */
test('строка в пропе включает вариант так же, как заполненный слот', () => {
  const theme = { slots: { root: '', description: '' }, variants: { title: { true: { description: 'mt-1' } } } }
  assert.equal(oracleProps({ page: 'Alert', theme, props: { title: 'Heads up!' } }).title, true, 'Alert.vue:39 — title: !!props.title || !!slots.title')
  assert.equal(oracleProps({ page: 'Alert', theme, props: { title: { $slotMark: 'title' } } }).title, true)
  assert.equal(oracleProps({ page: 'Alert', theme, props: {} }).title, false, 'ни пропа, ни слота — вариант ложен, а не отсутствует')
})

test('инвертированный вариант зависит от слота, а не от пропа', () => {
  const theme = { slots: { headline: '' }, variants: { headline: { true: '' } } }
  // PageSection.vue:56 — ui.headline({ headline: !slots.headline })
  assert.equal(oracleProps({ page: 'PageSection', theme, props: { headline: 'Новое' } }).headline, true,
    'строка в пропе слот не заполняет — вариант остаётся истинным')
  assert.equal(oracleProps({ page: 'PageSection', theme, props: { headline: { $slotMark: 'headline' } } }).headline, false)
})

test('Modal читает overlay сырым: плашка слота им не становится', () => {
  const theme = { slots: { overlay: '' }, variants: { overlay: { true: { overlay: 'bg-elevated/75' } } } }
  const p = oracleProps({ page: 'Modal', theme, props: { overlay: { $slotMark: 'overlay' } } })
  assert.equal(typeof p.overlay, 'object', 'Modal.vue:64,165 — значение уходит в tv как есть')
  assert.equal(oracleProps({ page: 'Modal', theme, props: { overlay: true } }).overlay, true)
})

/* Та же форма raw у Table: пока страж пропускал только объекты, drop и raw
   были неотличимы, а на настоящем `loading: true` drop стирал ключ и гасил
   двенадцать расхождений строки загрузки — все в примерах, которые эту строку и
   показывают. */
test('Table читает loading сырым: значение примера в tv() не стирается', () => {
  const theme = { slots: { thead: '' }, variants: { loading: { true: { thead: 'after:bg-primary' } } } }
  assert.equal(oracleProps({ page: 'Table', theme, props: { loading: true } }).loading, true, 'Table.vue:96 — loading: props.loading')
})

test('PageCard читает spotlight сырым: плашка слота темы значением не становится', () => {
  const theme = { slots: { root: '', spotlight: '' }, variants: { spotlight: { true: { root: 'before:absolute' } } } }
  const mark = oracleProps({ page: 'PageCard', theme, props: { spotlight: { $slotMark: 'spotlight' } } }).spotlight
  assert.equal(mark !== null && typeof mark === 'object', true,
    'PageCard.vue:80 — Vue-слота spotlight нет, плашка отмечает слот темы; живой компонент пропа не получает вовсе')
  assert.equal(oracleProps({ page: 'PageCard', theme, props: { spotlight: true } }).spotlight, true,
    'PageCard.vue:44 — props.spotlight && (elementX !== 0 || elementY !== 0); useMouseInElement даёт elementX = −rect.left, то есть не ноль')
})

test('InputNumber: вертикальная ориентация читает обе кнопки иначе горизонтальной', () => {
  const theme = { slots: { base: '' }, variants: { increment: { false: '' }, decrement: { false: '' } } }
  const vert = oracleProps({ page: 'InputNumber', theme, props: { orientation: 'vertical', increment: true, decrement: true } })
  assert.equal(vert.decrement, false, 'InputNumber.vue:76 — при vertical decrement ложен при любом пропе')
  const chained = oracleProps({ page: 'InputNumber', theme, props: { orientation: 'vertical', increment: false, decrement: true } })
  assert.equal(chained.increment, true, 'InputNumber.vue:75 — при vertical increment включает и чужой decrement')
  const horiz = oracleProps({ page: 'InputNumber', theme, props: { orientation: 'horizontal', increment: false, decrement: true } })
  assert.deepEqual([horiz.increment, horiz.decrement], [false, true], 'InputNumber.vue:75-76 — при horizontal каждая кнопка читает свой проп')
})

test('InputNumber: ответ не зависит от порядка вариантов в теме', () => {
  const props = { orientation: 'vertical', increment: false, decrement: true }
  const slots = { base: '' }
  const a = oracleProps({ page: 'InputNumber', theme: { slots, variants: { increment: { false: '' }, decrement: { false: '' } } }, props })
  const b = oracleProps({ page: 'InputNumber', theme: { slots, variants: { decrement: { false: '' }, increment: { false: '' } } }, props })
  assert.deepEqual([b.increment, b.decrement], [a.increment, a.decrement],
    'слагаемые формул читаются из props, а не из уже переписанного out — иначе порядок обхода theme.variants меняет ответ')
  assert.deepEqual([a.increment, a.decrement], [true, false])
})

test('пара, которой нет в таблице, значения не меняет', () => {
  const theme = { slots: { base: '' }, variants: { indicator: { start: '', end: '' } } }
  const mark = { $slotMark: 'indicator' }
  const p = oracleProps({ page: 'Checkbox', theme, props: { indicator: mark } })
  assert.deepEqual(p.indicator, mark, 'небулев вариант: true в него всё равно не попадает, а объект не выдумывает значения')
})

/* Гейт 1 на полноту таблицы. Обход живёт в pipeline/audit/props.mjs и оттуда же
   зовётся приёмкой: тест и приёмка обязаны проверять одно и то же одной
   функцией. Сверка в обе стороны — пара, куда попадает объект, обязана быть в
   таблице (иначе новый вариант молча получит поведение по умолчанию, ровно тот
   дефект, из-за которого таблица и появилась), и строка таблицы обязана
   встречаться хотя бы на одной странице (иначе таблица копит мусор после смены
   версии библиотеки). */
test('таблица READS покрывает все пары «страница + булев вариант», куда попадает объект', async (t) => {
  if (!existsSync('dist/docs/pages') || !existsSync('dist/docs/themes.json')) {
    return t.skip('нет dist/docs: выполни pnpm build:docs')
  }
  const c = await readsCoverage()
  assert.ok(c.pairs > 0, 'обход не нашёл ни одной пары — проверять нечего, гейт вхолостую')
  assert.deepEqual(c.missing, [], 'пары нет в таблице READS (pipeline/audit/props.mjs): реши по строке tv() компонента, как он читает этот ключ, и добавь форму')
  assert.deepEqual(c.stale, [], 'строка таблицы READS не встретилась ни на одной странице — устарела')
})

/* Гейт 1б — на саму таблицу, без собранных страниц. Вынесен отдельным тестом
   именно потому, что здесь нечего пропускать: на чистом клоне гейт выше молчит
   по t.skip, а этот проверяет и там. */
test('формы таблицы READS известны, а строки icons сходятся с ICON_COMPONENTS', () => {
  const c = readsSelfCheck()
  assert.deepEqual(c.badForms, [], 'форма, которой нет в switch, уходит в default и ведёт себя как отсутствие строки')
  assert.deepEqual(c.iconsNotInSet, [], 'у страницы форма icons, но формулы componentIcons для неё нет: объект останется необработанным')
  assert.deepEqual(c.setNotInIcons, [], 'страница считается по componentIcons, но строк icons в таблице у неё нет')
})

/* Гейт 2 на состав ICON_COMPONENTS: новый компонент, начавший звать
   useComponentIcons, обязан уронить тест, а не пройти незамеченным. */
test('состав компонентов с вычисляемыми иконками сверен с библиотекой', async (t) => {
  const dir = 'node_modules/@nuxt/ui/dist/runtime/components'
  if (!existsSync(dir)) return t.skip('нет node_modules/@nuxt/ui')
  const callers = new Set()
  for (const e of await readdir(dir, { withFileTypes: true, recursive: true })) {
    if (!e.isFile() || !e.name.endsWith('.vue')) continue
    if ((await readFile(path.join(e.parentPath, e.name), 'utf8')).includes('useComponentIcons')) {
      callers.add(e.name.replace(/\.vue$/, ''))
    }
  }
  /* Badge и Button её зовут, но формула у них своя: Badge.vue:36-42 не передаёт
     leading/trailing в tv() вовсе, Button.vue:120-121 передаёт голые
     isLeading/isTrailing без `|| !!props.avatar || !!slots.leading`. Добавить их
     в множество нельзя, не заведя своей ветки, — поэтому они известные
     исключения, а не пропуск. */
  const EXCEPT = new Set(['Badge', 'Button'])
  assert.ok(callers.size > 0, 'ни один .vue не зовёт useComponentIcons — гейт вхолостую')
  assert.deepEqual([...callers].filter((c) => !ICON_COMPONENTS.has(c) && !EXCEPT.has(c)).sort(), [],
    'компонент зовёт useComponentIcons, но его формулы у оракула нет: сверь строку tv() и добавь его в ICON_COMPONENTS либо в исключения')
  assert.deepEqual([...ICON_COMPONENTS].filter((c) => !callers.has(c)).sort(), [],
    'в ICON_COMPONENTS есть компонент, который useComponentIcons не зовёт')
  assert.deepEqual([...EXCEPT].filter((c) => !callers.has(c)).sort(), [],
    'исключение больше не зовёт useComponentIcons — строку можно снять')
})

test('Switch: оракул ждёт тот вариант, с которым нарисован первый узел icon', () => {
  /* Switch.vue:84 (loading) против :86-87 (две соседние иконки). Приёмка
     сравнивает первый узел слота, и до появления COMPUTED оракул не ждал ни
     одного из классов opacity-100 — три расхождения, где «ждали» было неверным
     у нас, а не у кита. */
  const theme = { variants: { checked: { true: {} }, unchecked: { true: {} }, loading: { true: {} } } }
  const ask = (props) => oracleProps({ page: 'Switch', theme, props })

  const both = ask({ checkedIcon: 'i-lucide-check', uncheckedIcon: 'i-lucide-x' })
  assert.equal(both.checked, true, 'первым идёт checkedIcon (Switch.vue:86)')
  assert.equal(both.unchecked, false)

  const loading = ask({ loading: true })
  assert.equal(loading.checked, true)
  assert.equal(loading.unchecked, true, 'иконка загрузки несёт оба варианта сразу (Switch.vue:84)')
  assert.equal(loading.disabled, true, 'загрузка выключает переключатель (Switch.vue:61)')
  assert.equal(ask({}).disabled, undefined, 'без загрузки disabled берётся из примера как есть')

  const onlyUnchecked = ask({ uncheckedIcon: 'i-lucide-x' })
  assert.equal(onlyUnchecked.checked, false)
  assert.equal(onlyUnchecked.unchecked, true)

  const noIcons = ask({})
  assert.equal(noIcons.checked, false)
  assert.equal(noIcons.unchecked, false)
})

test('Button: square компонент считает сам, из метки и содержимого', () => {
  /* Button.vue:120 — `props.square || !slots.default && !props.label`.
     Дефолтный слот примеров приходит пропом `children` (examples.mjs:62).
     На странице Button он заполнен везде, так что правило видно только на
     делегирующих страницах — там кнопка и получает p-1.5 вместо px-2.5 py-1.5. */
  const theme = { variants: { square: { true: '' } } }
  const ask = (props) => oracleProps({ page: 'Button', theme, props }).square
  assert.equal(ask({ children: 'Button' }), false)
  assert.equal(ask({ label: 'Button' }), false)
  assert.equal(ask({}), true, 'ни содержимого, ни метки — кнопка квадратная')
  assert.equal(ask({ square: true, label: 'Button' }), true, 'явный проп сильнее')
})

test('строка DELEGATES: обёртка пересылает делегату свои пропы без изъятых', () => {
  /* DashboardSidebarToggle.vue:45 — reactiveOmit(props, "icon", "side", "class").
     `side` не проп кнопки, а вариант темы обёртки, и просочись он в tv() —
     кнопка не изменилась бы, но таблица врала бы о том, что туда уходит. */
  const out = delegateProps('DashboardSidebarToggle', { side: 'right', class: 'lg:flex', icon: 'i-lucide-menu' }, { base: 'lg:flex' })
  assert.equal(out.side, undefined)
  assert.equal(out.icon, undefined)
  assert.equal(out.color, 'neutral', 'дефолт defineProps обёртки (:17)')
  assert.equal(out.variant, 'ghost', '(:18)')
  assert.equal(out.class, 'lg:flex', 'класс темы обёртки уходит делегату пропом class')
})

test('строка DELEGATES: проп страницы сильнее дефолта обёртки', () => {
  const out = delegateProps('DashboardSidebarToggle', { side: 'left', variant: 'subtle' }, { base: 'lg:hidden' })
  assert.equal(out.variant, 'subtle')
})

test('строка DELEGATES: слоты обёртки, кроме корневого, уходят делегату пропом ui', () => {
  /* transformUI (utils/index.js:134) у DashboardSearchButton: `base` кнопка
     получает через class, `label` и `trailing` — через ui. */
  const wrapper = { base: '', label: 'hidden', trailing: 'lg:hidden' }
  const out = delegateProps('DashboardSearchButton', { collapsed: true }, wrapper)
  assert.equal(out.class, '')
  assert.deepEqual(out.ui, { label: 'hidden', trailing: 'lg:hidden' })
  assert.equal(out.square, true, 'collapsed включает square (DashboardSearchButton.vue:73-76)')
  assert.equal(out.variant, 'ghost', 'collapsed выбирает ghost (:70)')
  assert.equal(out.label, SEARCH_LABEL, 'метка из локали — она решает square у кнопки (:69)')
  assert.equal(out.collapsed, undefined, 'проп обёртки, до кнопки не доходит (:54)')
})

test('строка DELEGATES: статус ChatPromptSubmit выбирает цвет и вариант кнопки', () => {
  // ChatPromptSubmit.vue:60-91 — карта статусов; :17 — дефолт status = 'ready'
  const at = (props) => delegateProps('ChatPromptSubmit', props, { base: '' })
  assert.deepEqual([at({ color: 'primary', variant: 'solid' }).color, at({ color: 'primary', variant: 'solid' }).variant], ['primary', 'solid'])
  const err = at({ status: 'error' })
  assert.deepEqual([err.color, err.variant], ['error', 'soft'], 'дефолты errorColor/errorVariant (:28-29)')
  const stream = at({ status: 'streaming', streamingColor: 'neutral', streamingVariant: 'subtle' })
  assert.deepEqual([stream.color, stream.variant], ['neutral', 'subtle'])
  assert.equal(err.status, undefined, 'сам статус кнопке не передаётся (:58)')
})

test('метка поиска в DELEGATES совпадает с локалью библиотеки', async (t) => {
  /* Значение нужно не текстом, а фактом наличия: оно решает square у кнопки.
     Но пусть оно врёт не молча — если библиотека переименует метку, строка
     таблицы обязана это заметить. */
  const file = 'node_modules/@nuxt/ui/dist/runtime/locale/en.js'
  if (!existsSync(file)) return t.skip('нет node_modules/@nuxt/ui')
  const src = await readFile(file, 'utf8')
  const m = /dashboardSearchButton:\s*\{\s*label:\s*"((?:[^"\\]|\\.)*)"/.exec(src)
  assert.ok(m, 'в локали нет dashboardSearchButton.label')
  assert.equal(JSON.parse(`"${m[1]}"`), SEARCH_LABEL)
})

test('делегаты названы темой, которая в ките есть', async (t) => {
  /* Строка DELEGATES молчит двумя способами: исчезнувшая страница (формула
     просто никогда не зовётся) и опечатка в имени темы делегата (корень
     сравнивать не с чем, и страница даёт ноль расхождений — ровно как до
     появления таблицы). */
  if (!existsSync('dist/docs/pages') || !existsSync('dist/docs/themes.json')) {
    return t.skip('нет dist/docs: выполни pnpm build:docs')
  }
  const cov = await readsCoverage()
  assert.deepEqual(cov.badDelegateThemes, [])
  assert.deepEqual(cov.staleDelegates, [])
})

/* Раунд 15 научил кит рисовать спиннер под `loading` (Button.vue:145), и тема
   крутит его compound-правилом `{loading, leading} -> leadingIcon: animate-spin`.
   Пока узла не было, leading/trailing у кнопки ничего не меняли; теперь меняют. */
test('кнопка под loading считает leading сама, как useComponentIcons', () => {
  const theme = { slots: { base: '', leadingIcon: '' }, variants: { loading: { true: '' }, leading: { true: '' }, trailing: { true: '' } } }
  const p = oracleProps({ page: 'Button', theme, props: { loading: true, children: 'Button' } })
  assert.equal(p.leading, true, 'loading без trailing — иконка ведущая')
  assert.equal(p.trailing, false)
  const t = oracleProps({ page: 'Button', theme, props: { loading: true, trailing: true, children: 'Button' } })
  assert.equal(t.leading, false, 'при trailing спиннер уезжает вправо')
  assert.equal(t.trailing, true)
  const none = oracleProps({ page: 'Button', theme, props: { children: 'Button' } })
  assert.equal(none.leading, false, 'без иконки и без loading обе ветки выключены')
})
