/* Кадр, в котором стенд открывает страницу: съёмка (shoot.mjs) и оба разбора (roots.mjs,
   classes.mjs). Общий, потому что страница, снятая в одной ширине и разобранная в другой,
   даёт замер не того кадра, на котором найдено расхождение.

   Ширина одна на весь стенд — 1280, — кроме страниц с суффиксом `--narrow`: у них 768.
   Узкий кадр нужен тому, что библиотека показывает только ниже `lg` (1024): кнопка
   DashboardSidebarToggle несёт `lg:hidden`, и на 1280 пара не видит, где она стоит
   (nuxt-ui-ds-n33). 768 — ступень `md`: ниже `lg`, но `sm:` и `md:` ещё действуют, так что
   узкая страница отличается от широкой ровно тем, что спрятано до `lg`. */

export const VIEWPORT = { width: 1280, height: 800 }
export const NARROW_VIEWPORT = { width: 768, height: 800 }

export function viewportFor(name) {
  return name.endsWith('--narrow') ? NARROW_VIEWPORT : VIEWPORT
}
