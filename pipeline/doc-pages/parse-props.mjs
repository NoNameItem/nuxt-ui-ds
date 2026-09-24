/* defineProps из скомпилированных SFC библиотеки: список пропов, типы и дефолты.
   В dist-сборке типы стёрты (type: null у сложных), поэтому тип здесь — строка
   как она записана, она нужна только для таблицы пропов на странице.

   Булев проп без ключа default компонент Nuxt UI читает как undefined, а не
   как false: прокси useComponentProps возвращает void 0, когда проп не передан
   явно и у объявления нет default (см. её последние строки). Голое правило Vue
   здесь не действует — библиотека его переопределяет, и от этого зависит ветка
   `trailing !== false` в useComponentIcons, то есть наличие шеврона у Select.

   Почему снятие подстановки безопасно везде, кроме страниц форм: для tv
   `undefined` и `false` неразличимы — отсутствующий проп попадает в ту же ветку
   `variants.x.false`, что и явный `false` (проверено и на минимальном примере, и
   запеканием `false` во всякий булев вариант на всех 118 страницах: те же
   расхождения). Значит весь эффект правила идёт не через tv, а через
   `componentIcons`, где значение читает строгое сравнение `trailing !== false`.
   Ключей `false` в темах 50, из них 30 с классами, — и ни один из них к делу
   не относится. */

function sliceBalanced(src, from, open, close) {
  let depth = 0
  for (let i = from; i < src.length; i++) {
    if (src[i] === open) depth++
    else if (src[i] === close) { depth--; if (depth === 0) return src.slice(from, i + 1) }
  }
  throw new Error('незакрытая скобка в defineProps')
}

export function parseDefineProps(src) {
  const at = src.indexOf('defineProps(')
  if (at < 0) return {}
  const body = sliceBalanced(src, src.indexOf('{', at), '{', '}')
  const out = {}
  let i = 1
  while (i < body.length) {
    const m = /([A-Za-z_$][\w$]*)\s*:\s*\{/g
    m.lastIndex = i
    const hit = m.exec(body)
    if (!hit) break
    const entry = sliceBalanced(body, body.indexOf('{', hit.index + hit[1].length), '{', '}')
    const type = /type:\s*(\[[^\]]*\]|[A-Za-z_$][\w$]*|null)/.exec(entry)
    const def = /default:\s*([\s\S]*?)\s*\}$/.exec(entry)
    out[hit[1]] = {
      type: type ? type[1] : 'null',
      hasDefault: !!def,
      default: def ? literal(def[1]) : undefined
    }
    i = body.indexOf(entry, hit.index) + entry.length
  }
  return out
}

/* Значения дефолтов в dist — литералы; фабрики (() => ({…})) нам не нужны,
   они дают объект, который на вариантах не сказывается. */
function literal(text) {
  const t = text.trim().replace(/,$/, '')
  if (t.startsWith('()')) return undefined
  /* `default: void 0` в dist-сборке — это «дефолта нет», а не значение.
     Строкой оно ядовито: для tv ключа `"void 0"` в вариантах не существует,
     ветка не выбирается вовсе, и страница ждёт голую базу темы. Так и вышло
     у `Link` (`Link.vue:23`, `active: { type: Boolean, default: void 0 }`):
     четыре расхождения приёмки, где прав был кит, а неверно ждали мы. */
  if (t === 'void 0' || t === 'undefined') return undefined
  try { return JSON.parse(t.replace(/'/g, '"')) } catch { return t }
}

export function sfcDefaults(parsed) {
  const out = {}
  for (const [name, p] of Object.entries(parsed)) {
    if (p.hasDefault && p.default !== undefined) out[name] = p.default
  }
  return out
}
