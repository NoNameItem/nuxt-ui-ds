import { existsSync } from 'node:fs'
import { PAGES_DIR, pageNames } from './bench/scripts/pages.mjs'

// Стенд визуальной сверки (bench/README.md): страницы bench/app/pages/parity/*.vue собираются
// `nuxt generate` в статику. Список пререндера строится из файлов, потому что Nuxt при ssr
// кладёт в него только первую страницу и дальше идёт по ссылкам, а ссылок между страницами нет.
const parityRoutes = existsSync(PAGES_DIR) ? pageNames().map((n) => `/parity/${n}`) : []

export default defineNuxtConfig({
  // Приложение — только стенд, поэтому живёт в bench/. Корень Nuxt остаётся в корне
  // репозитория: .nuxt/ui (темы для pipeline/build-ds-bundle.mjs) лежит там же, где раньше.
  srcDir: 'bench/app',
  dir: { public: 'bench/public' },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  // глифы Lucide вшиваются в клиентский бандл: у статики нет API /api/_nuxt_icon
  icon: { clientBundle: { scan: true } },
  nitro: { prerender: { crawlLinks: false, routes: parityRoutes } }
})
