/* Порождение разделов страницы и экземпляров в них.

   Политика покрытия: по одному экземпляру на каждое значение каждого ключа
   variants и по одному на каждое объявленное правило compoundVariants. Полный
   кросс-продукт не нужен: тема объявляет ровно те сочетания, которым назначен
   отдельный вид, остальные клетки выглядели бы как дефолт.

   Экземпляр несёт только patch — разницу с base раздела. Это удерживает вес
   страницы: фикстура navigation-menu весит 28 КБ, повторять её на каждый
   экземпляр нельзя. */

const S = (v) => String(v)

export function baseProps(theme, sfcDef) {
  const v = theme.variants || {}
  const out = {}
  for (const k of Object.keys(v)) {
    if (sfcDef[k] !== undefined) out[k] = sfcDef[k]
    else if ((theme.defaultVariants || {})[k] !== undefined) out[k] = theme.defaultVariants[k]
  }
  return out
}

/* «Trailing Icon» -> trailingIcon */
function headingToKey(h) {
  const w = String(h || '').replace(/[^A-Za-z0-9 ]/g, ' ').trim().split(/\s+/)
  if (!w[0]) return ''
  return w[0].toLowerCase() + w.slice(1).map((x) => x[0].toUpperCase() + x.slice(1).toLowerCase()).join('')
}

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/* Слот-конфигурация: тема его объявляет, но значением по вариантам даёт не
   классы, а размерный токен для вложенного компонента
   (`itemLeadingAvatarSize: '2xs'` — это проп `size` аватара пункта меню).
   Таких слотов 30 на 24 темы. Содержимое в них класть нельзя: кит рисует
   лишний пустой узел, а `2xs` правила в CSS не имеет и не должен иметь. */
const SIZE_TOKENS = new Set(['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'])

export function configSlots(theme) {
  const out = new Set()
  for (const slot of Object.keys(theme.slots || {})) {
    const values = new Set()
    const walk = (o) => {
      if (!o || typeof o !== 'object') return
      for (const [k, v] of Object.entries(o)) {
        if (k === slot && typeof v === 'string') values.add(v)
        else walk(v)
      }
    }
    walk(theme.variants)
    walk(theme.compoundVariants)
    if (values.size && [...values].every((v) => SIZE_TOKENS.has(v))) out.add(slot)
  }
  return out
}

export function blockBase(block) {
  const base = { ...block.props }
  if (block.class !== undefined) base.class = block.class
  for (const [name, value] of Object.entries(block.slots || {})) {
    if (name === 'default') base.children = value
    else base[name] = value
  }
  return base
}

export function buildSections({ themeName, theme, sfcDef, blocks, fixture, docSlug }) {
  const variants = theme.variants || {}
  const base = baseProps(theme, sfcDef)
  const sections = []
  const expanded = new Set()

  /* 1. Анатомия — один экземпляр, где заполнены все слоты сразу.

     Не всякий слот принимает произвольное содержимое: слот, имя которого
     кончается на icon, кит ожидает строкой с именем иконки и зовёт на ней
     `name.includes(...)`, а слот аватара — объектом с полями аватара. Плашка
     в таком слоте роняет рендер целиком: `Uncaught TypeError: name.includes
     is not a function`, и React выбрасывает всё поддерево. Проверено в
     браузере: страница остаётся пустой, затронуто 48 компонентов из 118. */
  const anatomy = {}
  const config = configSlots(theme)
  for (const s of Object.keys(theme.slots || {})) {
    if (config.has(s)) continue
    if (/icon$/i.test(s)) anatomy[s] = 'i-lucide-square'
    else if (/^(avatar|image)$/i.test(s) || /avatar$/i.test(s)) anatomy[s] = { alt: 'AV' }
    else anatomy[s] = { $slotMark: s }
  }
  sections.push({
    id: 'anatomy', title: 'Анатомия', anchor: null,
    base: { ...fixture, ...anatomy }, examples: [{ label: 'все слоты', patch: {} }]
  })

  // 2. Разделы доки
  const seenHeading = new Set()
  for (const b of blocks) {
    const key = headingToKey(b.heading)
    const title = b.heading || 'Usage'
    let id = slug(title)
    let n = 1
    while (seenHeading.has(id)) id = `${slug(title)}-${++n}`
    seenHeading.add(id)
    const sec = {
      id, title,
      anchor: `https://ui.nuxt.com/docs/components/${docSlug}#${slug(title)}`,
      base: { ...fixture, ...blockBase(b) },
      examples: []
    }
    if (variants[key]) {
      expanded.add(key)
      for (const v of Object.keys(variants[key])) sec.examples.push({ label: v, patch: { [key]: cast(v) } })
    } else {
      sec.examples.push({ label: title, patch: {} })
    }
    sections.push(sec)
  }

  // 3. Остальные ключи темы
  const rest = Object.keys(variants).filter((k) => !expanded.has(k))
  if (rest.length) {
    for (const k of rest) {
      sections.push({
        id: `variant-${slug(k)}`, title: k, anchor: null,
        base: { ...fixture, ...base },
        examples: Object.keys(variants[k]).map((v) => ({ label: `${k}=${v}`, patch: { [k]: cast(v) } }))
      })
    }
  }

  // 4. Объявленные сочетания
  const groups = new Map()
  for (const r of theme.compoundVariants || []) {
    const patch = {}
    const keys = []
    for (const [k, want] of Object.entries(r)) {
      if (k === 'class' || k === 'className') continue
      patch[k] = Array.isArray(want) ? want[0] : want
      keys.push(k)
    }
    const gid = keys.slice().sort().join('+')
    if (!groups.has(gid)) groups.set(gid, new Map())
    groups.get(gid).set(JSON.stringify(patch), patch)
  }
  for (const [gid, set] of groups) {
    sections.push({
      id: `compound-${slug(gid)}`, title: gid, anchor: null,
      base: { ...fixture, ...base },
      examples: [...set.values()].map((p) => ({ label: Object.entries(p).map(([k, v]) => `${k}=${v}`).join(' '), patch: p }))
    })
  }
  return fileInputsWithoutValue(sections)
}

/* `<input type="file">` — единственное поле, которому браузер запрещает
   непустое значение: присваивание value бросает InvalidStateError («This input
   element accepts a filename, which may only be programmatically set to the
   empty string»). Секция вариантов темы перебирает type поверх базы раздела, а
   база у полей со значением несёт modelValue («Backlog», ["Vue"]) — сочетание,
   которого в живом коде не бывает и которое валит отрисовку всей страницы:
   исключение в одном примере уносит всё дерево React. Значение из таких
   примеров убирается, сам вариант type=file остаётся. */
function fileInputsWithoutValue(sections) {
  return sections.map((s) => ({
    ...s,
    examples: s.examples.map((e) => {
      const props = { ...s.base, ...e.patch }
      if (props.type !== 'file') return e
      const drop = ['modelValue', 'defaultValue'].filter((k) => props[k] !== undefined && props[k] !== '')
      if (!drop.length) return e
      return { ...e, patch: { ...e.patch, ...Object.fromEntries(drop.map((k) => [k, ''])) } }
    })
  }))
}

/* ключи variants — строки, но значения бывают булевыми: "true" -> true */
function cast(v) { return v === 'true' ? true : v === 'false' ? false : v }

export function coverage(theme, sections) {
  const variants = theme.variants || {}
  const all = []
  for (const s of sections) for (const e of s.examples) all.push({ ...s.base, ...e.patch })

  const valuesMissing = []
  let valuesTotal = 0
  for (const k of Object.keys(variants)) {
    for (const v of Object.keys(variants[k])) {
      valuesTotal++
      if (!all.some((p) => S(p[k]) === S(v))) valuesMissing.push(`${k}=${v}`)
    }
  }
  const rulesMissing = []
  const cvs = theme.compoundVariants || []
  cvs.forEach((r, i) => {
    const ok = all.some((p) => Object.entries(r).every(([k, want]) => {
      if (k === 'class' || k === 'className') return true
      if (p[k] === undefined) return false
      return Array.isArray(want) ? want.map(S).includes(S(p[k])) : S(want) === S(p[k])
    }))
    if (!ok) rulesMissing.push(i)
  })
  return {
    values: { total: valuesTotal, hit: valuesTotal - valuesMissing.length, missing: valuesMissing },
    rules: { total: cvs.length, hit: cvs.length - rulesMissing.length, missing: rulesMissing }
  }
}
