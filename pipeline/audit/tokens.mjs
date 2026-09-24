/* Пользовательские свойства кита. Правила утилит записаны ссылками
   (`padding-inline: calc(var(--spacing) * 2.5)`, `font-size: var(--text-sm)`),
   а объявлены значения в tokens/*.css. Без разрешения ссылок проверка 5
   сравнивала 346 значений из 46 292 кандидатов, то есть её ноль ничего не
   значил. */
export function varMap(cssTexts) {
  const out = new Map()
  for (const css of cssTexts) {
    for (const m of css.matchAll(/(--[A-Za-z0-9_-]+)\s*:\s*([^;{}]+)/g)) {
      if (!out.has(m[1])) out.set(m[1], m[2].trim())
    }
  }
  return out
}

/* Строгий разбор: ровно число с единицей и ничего больше. Экспортируется —
   этим же разбором измеренное значение проверяется в checks.mjs, и оба конца
   сравнения (объявленное и измеренное) проходят один и тот же фильтр. */
export const px = (v) => {
  const m = /^(-?[\d.]+)(px|rem)$/.exec(String(v).trim())
  return m ? (m[2] === 'rem' ? +m[1] * 16 : +m[1]) : NaN
}

/* Разрешает объявленное значение в пиксели. Три формы покрывают весь
   utilities.css: длина, `var(--x)`, `calc(var(--x) * N)`. Всё остальное —
   NaN: проценты, calc с процентами и незнакомые переменные сравнивать с
   разрешённым пикселем нельзя. */
export function toPx(value, vars, depth = 0) {
  const v = String(value).trim()
  if (depth > 4) return NaN
  const direct = px(v)
  if (Number.isFinite(direct)) return direct
  const ref = /^var\((--[A-Za-z0-9_-]+)\)$/.exec(v)
  if (ref) return vars.has(ref[1]) ? toPx(vars.get(ref[1]), vars, depth + 1) : NaN
  const mul = /^calc\(\s*var\((--[A-Za-z0-9_-]+)\)\s*\*\s*(-?[\d.]+)\s*\)$/.exec(v)
  if (mul && vars.has(mul[1])) {
    const base = toPx(vars.get(mul[1]), vars, depth + 1)
    return Number.isFinite(base) ? base * +mul[2] : NaN
  }
  return NaN
}
