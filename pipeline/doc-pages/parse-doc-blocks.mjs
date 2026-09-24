/* Блоки ::component-code из markdown доки Nuxt UI.
   Берём только то, что влияет на рендер: props, slots, class.
   Ключи ignore / hide / prettier / external / collapse / cast управляют подсветкой
   кода на сайте доки и к рендеру отношения не имеют. */
import { parse as parseYaml } from 'yaml'

const BLOCK = /^::component-code\n(?:---\n([\s\S]*?)\n---\n)?([\s\S]*?)^::[ \t]*$/gm
const HEADING = /^#{2,3}[ \t]+(.+)$/gm
/* Верхнеуровневый ключ `items` блока — НЕ проп компонента, а конфигурация
   выпадающих списков на сайте доки: какие значения предлагать для пропа.
   По всему корпусу это 43 объекта вида {type: ['text','number']} и ни одного
   массива. Отдать такое в компонент значит уронить его на list.map — так
   падали Calendar, PinInput, RadioGroup, CheckboxGroup, NavigationMenu,
   InputMenu и SelectMenu. Настоящие items компонента приходят внутри `props`. */
const KEEP = ['props', 'slots', 'class']

export function parseDocBlocks(markdown) {
  const heads = [...markdown.matchAll(HEADING)].map((m) => ({ at: m.index, text: m[1].trim() }))
  const out = []
  for (const m of markdown.matchAll(BLOCK)) {
    const y = m[1] ? (parseYaml(m[1]) ?? {}) : {}
    const block = { heading: null, props: {}, slots: {} }
    let last = null
    for (const h of heads) { if (h.at < m.index) last = h.text; else break }
    block.heading = last
    for (const k of KEEP) if (y[k] !== undefined) block[k] = y[k]
    out.push(block)
  }
  return out
}
