/* Рендерер страниц документации кита. ES-модуль: подключается на странице как
   <script type="module"> и импортируется тестами Node напрямую.

   Vue-сниппет никем не исполняется и отвечает только за читаемость; JSX-сниппет
   описывает ровно тот вызов, который отрисован рядом. */

const SLOTLIKE = /^(header|footer|title|description|label|hint|help|body|content|leading|trailing)$/

export function vueSnippet(name, props, hoist = new Set()) {
  const tag = `U${name}`
  const attrs = []
  const slots = []
  let children
  for (const [k, v] of Object.entries(props)) {
    if (k === 'children') { children = v; continue }
    if (v && typeof v === 'object' && v.$slotMark) { slots.push(`<template #${k}>${v.$slotMark}</template>`); continue }
    /* разобранная Vue-разметка из доки: печатаем исходную строку — она и есть верный сниппет */
    if (v && typeof v === 'object' && v.$markup) { slots.push(`<template #${k}>${v.$markup}</template>`); continue }
    if (typeof v === 'string' && SLOTLIKE.test(k) && k !== 'label') { slots.push(`<template #${k}>${v}</template>`); continue }
    if (v === undefined) continue
    if (hoist.has(k)) { attrs.push(`:${kebabAttr(k)}="${k}"`); continue }
    attrs.push(typeof v === 'string' ? `${kebabAttr(k)}="${v}"` : `:${kebabAttr(k)}="${jsLiteral(v).replace(/\s+/g, ' ')}"`)
  }
  const head = `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}`
  const body = children && typeof children === 'object' && children.$markup ? children.$markup : children
  const inner = [...slots, ...(body !== undefined ? [String(body)] : [])]
  if (!inner.length) return `${head} />`
  return `${head}>\n${inner.map((l) => '  ' + l).join('\n')}\n</${tag}>`
}

function kebabAttr(k) { return k.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() }

/* Значение как литерал JavaScript: ключи без кавычек, строки в одинарных.
   JSON.stringify тут не годится — «:items="{&quot;label&quot;:…}"» никто не станет копировать. */
export function jsLiteral(v, indent = 0) {
  const pad = '  '.repeat(indent + 1)
  const close = '  '.repeat(indent)
  if (v === null || v === undefined) return String(v)
  if (typeof v === 'string') return `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  if (typeof v !== 'object') return String(v)
  if (Array.isArray(v)) {
    if (!v.length) return '[]'
    return `[\n${v.map((x) => pad + jsLiteral(x, indent + 1)).join(',\n')}\n${close}]`
  }
  const keys = Object.keys(v)
  if (!keys.length) return '{}'
  const body = keys.map((k) => `${pad}${/^[A-Za-z_$][\w$]*$/.test(k) ? k : `'${k}'`}: ${jsLiteral(v[k], indent + 1)}`)
  return `{\n${body.join(',\n')}\n${close}}`
}

/* Пропы, которые нельзя вставлять в атрибут: слишком длинные в развёрнутом виде. */
export function hoistable(props, limit = 120) {
  const out = new Set()
  for (const [k, v] of Object.entries(props || {})) {
    if (k === 'children' || v === null || typeof v !== 'object') continue
    if (v.$slotMark || v.$markup) continue
    if (jsLiteral(v).replace(/\s+/g, ' ').length > limit) out.add(k)
  }
  return out
}

/* Объявления вынесенных значений — один раз над блоком кода раздела. */
export function preamble(props, hoist) {
  const lines = []
  for (const k of hoist) {
    if (props[k] === undefined) continue
    lines.push(`const ${k} = ${jsLiteral(props[k])}`)
  }
  return lines.join('\n')
}

/* В JSX атрибут называется className. Для обычного тега (div, img) `class`
   не применяется вовсе, а компоненты кита принимают оба написания — поэтому
   печатаем className всегда: сниппет должен работать при копировании. */
const jsxAttr = (k) => (k === 'class' ? 'className' : k)

/* Разобранная разметка в JSX: узлы печатаются как элементы, а не как JSON. */
export function jsxNodes(nodes) {
  return (nodes || []).map((n) => {
    if (typeof n === 'string') return n
    if (n.$placeholder !== undefined) return `<Placeholder className="${n.$placeholder}" />`
    const attrs = Object.entries(n.props || {})
      .map(([k, v]) => (v === true ? jsxAttr(k) : typeof v === 'string' ? `${jsxAttr(k)}="${v}"` : `${jsxAttr(k)}={${JSON.stringify(v)}}`))
    const head = `<${n.$el}${attrs.length ? ' ' + attrs.join(' ') : ''}`
    const kids = jsxNodes(n.children)
    return kids ? `${head}>${kids}</${n.$el}>` : `${head} />`
  }).join('')
}

export function jsxSnippet(name, props, hoist = new Set()) {
  const attrs = []
  let children
  for (const [k, v] of Object.entries(props)) {
    if (k === 'children') { children = v; continue }
    if (v === undefined) continue
    if (v === true) { attrs.push(jsxAttr(k)); continue }
    if (typeof v === 'string') { attrs.push(`${jsxAttr(k)}="${v}"`); continue }
    if (v && v.$markup) { attrs.push(`${jsxAttr(k)}={<>${jsxNodes(v.nodes)}</>}`); continue }
    if (hoist.has(k)) { attrs.push(`${jsxAttr(k)}={${k}}`); continue }
    attrs.push(`${jsxAttr(k)}={${jsLiteral(v).replace(/\s+/g, ' ')}}`)
  }
  const head = `<${name}${attrs.length ? ' ' + attrs.join(' ') : ''}`
  const body = children && typeof children === 'object' && children.$markup ? jsxNodes(children.nodes) : children
  return body === undefined ? `${head} />` : `${head}>${body}</${name}>`
}

const h = (...a) => React.createElement(...a)

/* Оверлеям нужна своя рамка с position: relative, иначе absolute уходит к body.
   Список оверлеев живёт в одном месте — pipeline/doc-pages/fixtures.mjs; сюда он
   приезжает флагом doc.framed, чтобы два списка не разъехались. */

/* Плашка слота — компонент, а не голый span: кит отличает содержимое, пришедшее
   слотом, от значения пропа по ключу `$slotMark` в props элемента (lib/reads.js,
   isSlotMark), и варианты вида `!slots.x` для него выключаются. У функционального
   компонента ключ остаётся в props и в DOM-атрибут не утекает. */
function SlotMark({ $slotMark }) {
  return h('span', { className: 'ds-slotmark' }, $slotMark)
}

function slotMark(name) {
  return h(SlotMark, { $slotMark: name })
}

/* Пространство имён кита; заполняется в renderPage, нужно узлам разобранной разметки. */
let KIT = {}

function nodeToEl(n, key) {
  if (typeof n === 'string') return n
  if (n.$placeholder !== undefined) return h('div', { key, className: ('ds-placeholder ' + n.$placeholder).trim() })
  const kids = (n.children || []).map((c, i) => nodeToEl(c, `${key}.${i}`))
  const props = { key, ...(n.props || {}) }
  const Comp = KIT[n.$el]
  if (Comp) return h(Comp, props, kids.length ? kids : undefined)
  /* тег с заглавной, которого нет в ките, — компонент самой доки (Logo, NuxtLink):
     своего вида у него нет, показываем только содержимое */
  const tag = /^[A-Z]/.test(n.$el) ? 'span' : n.$el
  if (props.class !== undefined) { props.className = props.class; delete props.class }
  return h(tag, props, kids.length ? kids : undefined)
}

export function hydrate(props) {
  const out = {}
  for (const [k, v] of Object.entries(props)) {
    if (v && typeof v === 'object' && v.$slotMark) { out[k] = slotMark(v.$slotMark); continue }
    if (v && typeof v === 'object' && v.$markup) { out[k] = v.nodes.map((n, i) => nodeToEl(n, `${k}.${i}`)); continue }
    out[k] = v
  }
  return out
}

function Example({ Comp, props, framed }) {
  const el = h(Comp, hydrate(props))
  return framed ? h('div', { className: 'ds-frame' }, el) : el
}

/* Один сломанный пример не должен уносить страницу целиком. React 18 при
   необработанном исключении в рендере размонтирует ВЕСЬ корень: страница
   остаётся пустой, блока ds-audit нет вовсе, и причина не видна ни в DOM, ни в
   нагрузке — приёмка видит только «страница не отрисовалась». Измерено на
   InputMenu, InputTags и SelectMenu: `<input type="file">` с непустым value
   бросает InvalidStateError, и вместе с одним примером пропадали все остальные.
   Граница ставится на каждый пример: падает только его ячейка, а причина
   уезжает в нагрузку атрибутом.

   Класс создаётся при первом обращении, а не на верхнем уровне модуля:
   React — глобал страницы, и `extends React.Component` в момент загрузки
   уронил бы импорт этого файла в Node, где docs.js используют генератор
   сниппетов и его тесты. */
let Boundary = null
function exampleBoundary() {
  if (Boundary) return Boundary
  Boundary = class extends React.Component {
    constructor(props) { super(props); this.state = { error: null } }
    static getDerivedStateFromError(error) { return { error } }
    render() {
      if (!this.state.error) return this.props.children
      const msg = String(this.state.error && this.state.error.message || this.state.error)
      return h('div', { className: 'ds-example-error', 'data-ds-error': msg }, msg)
    }
  }
  return Boundary
}

/* Компонент с пропом `portal` рисуется на месте: `portal: false`, как на стенде. Иначе
   открытая панель уходит в body — и у кита, и у библиотеки, — а приёмка собирает узлы только
   внутри ячейки примера и пишет «ни одного data-slot» у DropdownMenu, Tooltip и Popover при
   том, что на артборде тот же сценарий рисует все узлы (сверка 24.09, dropdown-menu--portal:
   21 из 21). Явный `portal` из примера сильнее. */
function Row({ Comp, framed, section, dark, inline }) {
  return h('div', { className: 'ds-row' + (dark ? ' dark bg-default text-default' : '') },
    section.examples.map((e, i) =>
      h('div', { className: 'ds-cell', key: i, 'data-ex': `${section.id}.${i}`, 'data-theme': dark ? 'dark' : 'light' },
        h('div', { className: 'ds-cell-label' }, e.label),
        h(exampleBoundary(), null, h(Example, { Comp, framed, props: { ...(inline ? { portal: false } : {}), ...section.base, ...e.patch } })))))
}

function Section({ Comp, doc, section }) {
  const merged = section.examples.map((e) => ({ ...section.base, ...e.patch }))
  const inline = (doc.propsTable || []).some((r) => r.prop === 'portal')
  /* Крупные значения объявляются один раз над блоком: иначе массив items
     повторился бы в каждом экземпляре раздела и код стал бы нечитаемым. */
  const hoist = hoistable(section.base)
  const pre = preamble(section.base, hoist)
  const block = (fn, cls) => h('pre', { className: cls }, h('code', null,
    (pre ? pre + '\n\n' : '') + merged.map((p) => fn(doc.name, p, hoist)).join('\n')))
  return h('section', { className: 'ds-section', id: section.id },
    h('h2', null, section.title,
      section.anchor ? h('a', { className: 'ds-anchor', href: section.anchor, target: '_blank', rel: 'noreferrer' }, 'дока') : null),
    h('div', { className: 'ds-preview' },
      h(Row, { Comp, framed: !!doc.framed, section, dark: false, inline }),
      h(Row, { Comp, framed: !!doc.framed, section, dark: true, inline })),
    block(vueSnippet, 'ds-code'),
    block(jsxSnippet, 'ds-code ds-code-jsx'))
}

function PropsTable({ rows }) {
  return h('table', { className: 'ds-props' },
    h('thead', null, h('tr', null, ['проп', 'тип', 'значения', 'дефолт', 'откуда'].map((t) => h('th', { key: t }, t)))),
    h('tbody', null, rows.map((r) => h('tr', { key: r.prop },
      h('td', null, r.prop), h('td', null, r.type), h('td', null, r.values), h('td', null, String(r.def ?? '')), h('td', null, r.from)))))
}

export function renderPage(doc, root) {
  const kit = window[Object.keys(window).find((k) => k.startsWith('NuxtUIDesignSystem_'))]
  KIT = kit
  const Comp = kit[doc.name]
  if (!Comp) throw new Error(`Компонент ${doc.name} не найден в бандле кита`)
  const view = h('main', { className: 'ds-page' },
    h('header', { className: 'ds-head' },
      h('h1', null, doc.name),
      h('p', null, `тема ${doc.theme}`, ' · ',
        h('a', { href: doc.docUrl, target: '_blank', rel: 'noreferrer' }, 'дока Nuxt UI')),
      h('p', { className: 'ds-note' }, 'Vue-сниппет приведён для продакшен-кода и здесь не исполняется; исполняется JSX.')),
    h(PropsTable, { rows: doc.propsTable }),
    doc.sections.map((s) => h(Section, { key: s.id, Comp, doc, section: s })),
    h('footer', { className: 'ds-foot' }, 'Разделы и содержимое примеров — из документации @nuxt/ui 4.11.1 (MIT).'))
  /* Коммит принудительно синхронный, и нагрузка собирается сразу за ним.

     Через requestAnimationFrame это не работает: React 18 коммитит асинхронно,
     и выгрузка DOM из headless-браузера успевает раньше. Замерено на прогоне
     118 страниц: блок ds-audit либо отсутствовал, либо содержал ноль
     экземпляров при отрисованной странице в 160 КБ. После перехода на
     flushSync те же страницы дают 118, 182 и 60 экземпляров. */
  ReactDOM.flushSync(() => { ReactDOM.createRoot(root).render(view) })
  const el = document.createElement('script')
  el.type = 'application/json'
  el.id = 'ds-audit'
  el.textContent = JSON.stringify(buildAuditPayload(root))
  document.body.appendChild(el)
}

/* Полезная нагрузка приёмки: классы и вычисленные значения по каждому data-slot.
   Собирается на странице, потому что getComputedStyle доступен только в браузере,
   а сравнение с ожиданием делается снаружи, локальным оракулом. */
const MEASURED = ['padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'font-size', 'line-height', 'gap', 'width', 'height', 'border-radius',
  'color', 'background-color', 'translate', 'scale', 'rotate', 'position',
  'border-top-width', 'border-top-style']

export function buildAuditPayload(root) {
  /* Бандл кита ведёт собственный список ошибок загрузки в ключе __errors —
     проверено пробником: пространство имён отдаёт 121 ключ, из них 120
     компонентов манифеста и __errors. Если он непуст, часть кита не поднялась,
     и все остальные проверки на этой странице недостоверны. */
  const ns = Object.keys(window).find((k) => k.startsWith('NuxtUIDesignSystem_'))
  const kitErrors = (ns && window[ns].__errors) || null
  const out = { component: document.title || '', kitErrors, examples: [] }
  for (const cell of root.querySelectorAll('[data-ex]')) {
    const nodes = []
    for (const n of cell.querySelectorAll('[data-slot]')) {
      const cs = getComputedStyle(n)
      const computed = {}
      for (const p of MEASURED) computed[p] = cs.getPropertyValue(p)
      let depth = 0
      for (let p = n.parentElement; p && p !== cell; p = p.parentElement) {
        if (p.hasAttribute('data-slot')) depth++
      }
      /* Владелец узла — ближайший предок-или-сам с меткой компонента. Кит
         ставит её на корень каждого экземпляра, и по ней узел относится к
         своей теме: и вложенный компонент, и делегированный слот
         (`pagination.item` рисуется кнопкой, и на этом узле метка Button),
         и соседний экземпляр опознаются одним признаком вместо трёх правил
         по именам слотов. */
      const owner = n.closest('[data-ds-component]')
      nodes.push({ slot: n.getAttribute('data-slot'), class: n.getAttribute('class') || '', depth,
        comp: owner ? owner.getAttribute('data-ds-component') : null, computed })
    }
    /* Пример, упавший при рендере: граница оставила в ячейке причину. Без неё
       приёмка увидела бы просто ячейку без единого data-slot и не смогла бы
       отличить «компонент ничего не рисует» от «исключение при рендере». */
    const failed = cell.querySelector('[data-ds-error]')
    out.examples.push({ id: cell.getAttribute('data-ex'), theme: cell.getAttribute('data-theme'), nodes,
      ...(failed ? { error: failed.getAttribute('data-ds-error') } : {}) })
  }
  return out
}
