/* Независимый оракул: ожидаемые классы считаются настоящим tailwind-variants,
   а не портом кита lib/tv.js — именно порт и проверяется. */
import { createRequire } from 'node:module'

const require_ = createRequire(import.meta.url)

let TV_PATH
try {
  TV_PATH = require_.resolve('tailwind-variants', { paths: [process.cwd() + '/node_modules/@nuxt/ui'] })
} catch {
  // require.resolve не нашёл пакет через @nuxt/ui — берём прямой путь в pnpm-хранилище,
  // он проверен заранее и рабочий (см. task-11-report.md).
  TV_PATH = process.cwd() +
    '/node_modules/.pnpm/tailwind-variants@3.3.1_tailwind-merge@3.6.0_tailwindcss@4.3.3/node_modules/tailwind-variants/dist/index.js'
}

const { tv } = await import(TV_PATH)

const tokens = (s) => String(s ?? '').split(/\s+/).filter(Boolean).sort()

/* Классы темы как их отдаёт tv — строками, в порядке темы. expected() тот же
   набор сортирует, и для сравнения это правильно: порядок в DOM ничего не
   значит. А вот дальше, в `class` другого компонента (см. DELEGATES в
   pipeline/audit/props.mjs), уходит именно строка, и там порядок значит.

   Разница не умозрительная, хотя сегодня и не видна: у tailwind-merge есть
   асимметричные группы, где класс перебивает соседа, только стоя после него, —
   `flex-1 basis-0` сохраняет оба, а `basis-0 flex-1` оставляет один (то самое
   правило из раунда 12). Алфавит ставит basis-0 первым, то есть сортировка
   такую пару не переставляет, а стирает половину. На четырёх строках DELEGATES
   сегодня обе дороги дают один и тот же ответ — сверено поэкземплярно;
   функция здесь потому, что верна, а не потому, что нашлось расхождение.

   Плоская тема (без slots): tv(theme)(props) сразу возвращает готовую строку
   классов единственного слота base, а не объект функций по слотам. Реальный
   пример — тема form с пустым base: tv отдаёт undefined, а не ''. Проп `ui`
   плоская тема не читает: разносить по слотам нечего. */
export function resolveRaw(theme, props, classSlot) {
  const resolved = tv(theme)(props)
  if (!theme.slots) return { base: resolved }
  const out = {}
  /* Верхнеуровневый class примера tv по слотам не разносит — его кладёт на
     один слот сам компонент. Оракул повторяет это, иначе каждый пример
     с class даёт ложное расхождение: 1262 на живом прогоне.

     Какой это слот — читается из шаблона компонента и передаётся третьим
     аргументом. Первый слот темы годится как умолчание, но не как правило:
     Modal.vue:74 кладёт class в `content`, а первым в теме идёт `overlay`. */
  const target = classSlot || Object.keys(theme.slots)[0]
  for (const slot of Object.keys(theme.slots)) {
    const fn = resolved[slot]
    if (typeof fn !== 'function') continue
    const extra = []
    if (slot === target && typeof props.class === 'string') extra.push(props.class)
    if (props.ui && typeof props.ui[slot] === 'string') extra.push(props.ui[slot])
    out[slot] = extra.length ? fn({ class: extra }) : fn()
  }
  return out
}

/* Схлопнутый дочерний узел: библиотека рисует два элемента, кит — один, и один
   узел обязан нести классы обоих. Какие это слоты — читается из шаблона
   библиотеки (CHILD_PAINT в props.mjs), а не из исходников кита.

   Слияние делает сам tailwind-variants: строка внешнего слота уходит в `class`
   внутреннего, и twMerge снимает конфликты ровно так же, как снимает их
   библиотека, когда тот же `class` приходит пропом. Порядок — внутренний,
   внешний, потом класс места вызова: у twMerge побеждает последний, а класс
   места вызова специфичнее обоих (в библиотеке он и уходит на root).

   Между внешним и внутренним слотом конфликта сегодня нет ни у одной из трёх
   тем (проверяется тестом), поэтому их взаимный порядок ничего не решает. Если
   конфликт появится, приёмка его и покажет — расхождением, а не тишиной. */
export function paintedTokens(theme, props, paint) {
  const resolved = tv(theme)(props)
  if (!theme.slots) return tokens(resolved)
  const [outer, inner] = paint
  const outerFn = resolved[outer]
  const innerFn = resolved[inner]
  const outerStr = typeof outerFn === 'function' ? outerFn() : ''
  const extra = [outerStr]
  if (props.ui && typeof props.ui[inner] === 'string') extra.push(props.ui[inner])
  if (typeof props.class === 'string') extra.push(props.class)
  if (typeof innerFn !== 'function') return tokens(extra.join(' '))
  return tokens(innerFn({ class: extra.filter(Boolean) }))
}

/* Узел компонента, нарисованного внутри другого (HABITAT в props.mjs): свой слот `into`
   получает строку слота среды в `class`. Порядок дословно библиотечный: Toaster кладёт
   `ui.base(…)` в class тоста после класса самого тоста (mergeProps у v-bind="toast" и
   :class), а тост уводит class в `ui.root({ class: [props.ui?.root, props.class] })`, —
   у twMerge побеждает последний, то есть среда. */
export function habitatTokens(theme, props, into, habitatTheme, habitatProps, slot) {
  const outer = tv(habitatTheme)(habitatProps)[slot]()
  const own = tv(theme)(props)[into]
  const extra = [props.ui?.[into], props.class, outer].filter((c) => typeof c === 'string' && c)
  return tokens(own({ class: extra }))
}

export function expected(theme, props, classSlot) {
  const raw = resolveRaw(theme, props, classSlot)
  const out = {}
  for (const [slot, cls] of Object.entries(raw)) out[slot] = tokens(cls)
  return out
}
