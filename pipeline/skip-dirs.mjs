/* Каталоги и отдельные компоненты `@nuxt/ui/dist/runtime/components`, которые в кит не идут.

   Список лежит отдельным модулем, потому что читать его должны все четверо сразу:
   сборка пакета, сборка doc-страниц, приёмка и гейт namespace-тегов. Пока правило
   было записано в каждом из них своей строкой, исключить каталог означало вспомнить
   про все четыре места — и забыть про одно, отчего приёмка продолжала бы ждать
   компоненты, которых в ките уже нет. */

import { kebab } from './doc-pages/names.mjs'

export const SKIP_DIRS = new Set([
  /* типографика для MDC-контента, для макетов интерфейсов не нужна */
  'prose',
  /* ContentNavigation, ContentSearch, ContentSearchButton, ContentSurround, ContentToc —
     обвязка @nuxt/content: навигация по страницам документации, её поиск и оглавление.
     Решение человека 2026-09-19: из кита выкинуть, как pricing и changelog. Это не
     строительные блоки интерфейса, а части конкретного сайта документации; макетировать
     ими нечего, а посмотреть, как они выглядят, проще в самой доке Nuxt UI. */
  'content'
])

/* Компоненты из корня runtime/components, выведенные из кита поимённо: каталога, который
   можно было бы пропустить целиком, у них нет. Имя — как у файла темы (.nuxt/ui/<имя>.ts).

   Решения человека: 2026-09-18 про PricingTable, 2026-09-19 расширено на всё семейство
   pricing («и в целом можно так же выкинуть всё семейство pricing») и на changelog — «то же,
   что по pricing-table»: держать их в ките для макетирования пользы мало, проще посмотреть,
   как это выглядит в документации Nuxt UI. Отсюда выпадают и темы в themes.json пакета, и
   шаблоны в components-N.md — а за ними ожидание приёмки и страницы стенда. */
export const SKIP_COMPONENTS = new Set([
  'changelog-version', 'changelog-versions',
  'pricing-plan', 'pricing-plans', 'pricing-table'
])

/** Идёт ли компонент в кит. Принимает имя файла темы (`pricing-plan.ts`) или шаблона
    (`PricingPlan.vue`), с расширением или без. */
export function keepComponent(fileName) {
  return !SKIP_COMPONENTS.has(kebab(fileName.replace(/\.(vue|ts)$/, '')))
}

/** Идёт ли каталог с SFC в кит. Принимает имя каталога, не путь. */
export function keepDir(name) {
  return !SKIP_DIRS.has(name)
}

/** Лежит ли файл внутри исключённого каталога. Принимает путь к каталогу файла. */
export function inSkipped(dirPath) {
  return dirPath.split(/[\\/]/).some((seg) => SKIP_DIRS.has(seg))
}
