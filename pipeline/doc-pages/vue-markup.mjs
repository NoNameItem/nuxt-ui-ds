/* Разбор Vue-разметки, встречающейся в блоках доки внутри значений slots.

   Полноценный парсер тут не нужен: по всему корпусу доки таких строк 36, и это
   либо одиночный самозакрывающийся тег, либо их последовательность, либо простой
   HTML. Исходная строка сохраняется в $markup — она и есть верный Vue-сниппет
   для этого содержимого, ровно то, что показывает ui.nuxt.com. */

const TAG = /<([A-Za-z][\w-]*)((?:\s+[^>]*?)?)(\/?)>|<\/([A-Za-z][\w-]*)>/g
const ATTR = /([:@]?[\w-]+)(?:="([^"]*)")?/g
/* теги без закрывающей пары — стек на них не растёт */
const VOID = new Set(['img', 'br', 'hr', 'input', 'meta', 'link'])

function parseAttrs(text) {
  const props = {}
  for (const m of text.matchAll(ATTR)) {
    const raw = m[1]
    if (raw.startsWith('@')) continue
    const name = raw.startsWith(':') ? raw.slice(1) : raw
    if (m[2] === undefined) { props[name] = true; continue }
    if (raw.startsWith(':')) {
      try { props[name] = JSON.parse(m[2].replace(/'/g, '"')) } catch { props[name] = m[2] }
    } else props[name] = m[2]
  }
  return props
}

export function parseVueMarkup(text) {
  const nodes = []
  const stack = [{ children: nodes }]
  let last = 0
  for (const m of text.matchAll(TAG)) {
    const between = text.slice(last, m.index).trim()
    if (between) stack[stack.length - 1].children.push(between)
    last = m.index + m[0].length
    if (m[4]) { if (stack.length > 1) stack.pop(); continue }
    const tag = m[1]
    const node = tag === 'Placeholder'
      ? { $placeholder: parseAttrs(m[2]).class || '' }
      : { $el: /^U[A-Z]/.test(tag) ? tag.slice(1) : tag, props: parseAttrs(m[2]), children: [] }
    stack[stack.length - 1].children.push(node)
    if (!m[3] && !VOID.has(tag) && node.$el) stack.push(node)
  }
  const tail = text.slice(last).trim()
  if (tail) stack[stack.length - 1].children.push(tail)
  return { $markup: text.trim(), nodes }
}
