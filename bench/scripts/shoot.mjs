/* Съёмка обеих сторон стенда визуальной сверки. Подробности: bench/README.md.

   node bench/scripts/shoot.mjs --kit <serve_url любого артборда> [--side app|kit|both]
                                 [--only badge,page-cta.dark] [--out dist/parity/<прогон>]
                                 [--local] [--force]

   Тема задаётся явно на каждый снимок (colorScheme), чтобы системная тёмная тема
   не дала два тёмных снимка. Файлы, которые уже есть, не переснимаются — прогон
   продолжается с места остановки. serve_url живёт около часа: при истечении
   перезапросить render_preview и повторить команду с тем же --out.
   --force снимает заново и перезаписывает PNG и JSON, даже если файл уже лежит на
   диске — сочетается с --only, чтобы пересъёмка не затронула остальные компоненты.
   Ключ --only принимает и <имя>.<тему> (bench/scripts/only.mjs): `--force --only page-cta.dark`
   переснимает одну сторону и не трогает вторую. Отбор идёт по паре и стоит раньше
   проверки существования файла — снимок другой темы в тело цикла не попадает вовсе.

   Неудачная съёмка (goto/waitFor упали, страница пуста) не оставляет PNG — только JSON
   с непустым errors. Иначе на диске остался бы PNG прежнего прогона рядом со свежим
   JSON об ошибке, и diff.mjs молча сравнил бы устаревший снимок: пропуск по существующему
   файлу считает съёмку сделанной именно по PNG, а не по JSON. */
import { existsSync } from 'node:fs'
import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { chromium } from 'playwright'
import { serve } from '../../pipeline/audit/local-kit.mjs'
import { KIT_LIVE } from '../../pipeline/kit-export.mjs'
import { parseOnly } from './only.mjs'
import { pageNames } from './pages.mjs'
import { viewportFor } from './viewport.mjs'

const { values: opt } = parseArgs({ options: {
  force: { type: 'boolean', default: false },
  kit: { type: 'string' },
  local: { type: 'boolean', default: false },
  out: { type: 'string' },
  only: { type: 'string' },
  side: { type: 'string', default: 'both' }
} })

const APP_ROOT = '.output/public'
const LOCAL_KIT = 'dist/parity/local'
const THEMES = ['light', 'dark']

const stamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '')
const out = opt.out ?? path.join('dist/parity', stamp)
/* Ключи проверяются до чтения каталога страниц: иначе `--side kti --only bogus` падал на
   «нет страниц для съёмки» и называл не ту ошибку, что сделал пользователь. */
const SIDES = ['app', 'kit', 'both']
if (!SIDES.includes(opt.side)) throw new Error(`--side ${opt.side}: допустимо ${SIDES.join(', ')}`)
/* «Не передан» и «передан пустым» различаются намеренно. `--only ""` раньше означало
   «все страницы», а bench/README.md рекомендует `--force --only <имена>` штатным рецептом
   пересъёмки: с незаполненной переменной это не лишние снимки, а стирание готового
   прогона — под --force пропускается проверка существования, а неудача съёмки удаляет PNG. */
const only = parseOnly(opt.only, 'имена страниц')
const allNames = pageNames()
const names = allNames.filter((n) => !only || THEMES.some((t) => only.matches(n, t)))
/* Частичный промах молчал: `--only badge,bogus` снимал badge и про bogus не говорил.
   Сверяется имя страницы: снимков ещё нет, и тема в токене законна до первой съёмки. */
const unknown = only ? only.unknownNames(allNames) : []
if (unknown.length) console.warn(`--only: нет таких страниц — ${unknown.join(', ')}`)
if (names.length === 0) throw new Error('нет страниц для съёмки')
const sides = opt.side === 'both' ? ['app', 'kit'] : [opt.side]
if (sides.includes('app') && !existsSync(path.join(APP_ROOT, 'parity'))) throw new Error('нет .output/public/parity — выполни pnpm build:parity')
if (sides.includes('kit') && !opt.local && !opt.kit) throw new Error('нужен --kit <serve_url> или --local')

/* Запасной путь: статика кита из локальной копии плюс артборды. Копия — кэш и отстаёт
   от кита; финальная приёмка снимает сам тестовый проект. */
async function assembleLocalParity() {
  await mkdir(LOCAL_KIT, { recursive: true })
  for (const f of ['styles.css', '_ds_bundle.js', 'tokens']) await cp(path.join(KIT_LIVE, f), path.join(LOCAL_KIT, f), { recursive: true })
  await cp('bench/artboards', LOCAL_KIT, { recursive: true })
  await mkdir(path.join(LOCAL_KIT, 'assets'), { recursive: true })
  await cp('bench/public/parity/demo.png', path.join(LOCAL_KIT, 'assets/demo.png'))
}

const servers = []
async function baseUrl(side) {
  if (side === 'app') {
    const s = await serve(APP_ROOT); servers.push(s.server)
    return (name) => `http://127.0.0.1:${s.port}/parity/${name}/`
  }
  if (opt.local) {
    await assembleLocalParity()
    const s = await serve(LOCAL_KIT); servers.push(s.server)
    return (name, theme) => `http://127.0.0.1:${s.port}/${name}${theme === 'dark' ? '.dark' : ''}.html`
  }
  return (name, theme) => opt.kit.replace(/[^/?#]+\.html/, `${name}${theme === 'dark' ? '.dark' : ''}.html`)
}

async function shoot(browser, url, side, name, theme, file) {
  const errors = []
  let ctx
  try {
    ctx = await browser.newContext({ colorScheme: theme, reducedMotion: 'reduce', viewport: viewportFor(name), deviceScaleFactor: 1 })
    const page = await ctx.newPage()
    page.on('pageerror', (e) => errors.push(String(e)))
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
    page.on('requestfailed', (r) => errors.push(`request failed: ${r.url()} (${r.failure()?.errorText ?? 'unknown'})`))
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 })
    await page.waitForFunction((t) => document.documentElement.classList.contains('dark') === (t === 'dark'), theme, { timeout: 15_000 })
    /* state: 'attached', не заданный по умолчанию 'visible': кит-модалка кладёт под
       #root два top-level узла (пустой обёрточный div с двумя абсолютно
       позиционированными оверлеями внутри, схлопнувшийся до высоты 0, и сам content) —
       Page.waitForSelector с default 'visible' ждёт видимости именно ПЕРВОГО совпадения
       и виснет на все 30с, хотя второй узел уже видим. Финальная готовность (иконки,
       картинки, шрифты) проверяется отдельными шагами ниже — здесь достаточно, что
       React вообще что-то смонтировал. */
    await page.waitForSelector('#root > *, #__nuxt > *', { state: 'attached', timeout: 30_000 })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForFunction(() =>
      [...document.querySelectorAll('iconify-icon')].every((el) => (el.shadowRoot ?? el).querySelector('svg, span')) &&
      [...document.querySelectorAll('.iconify')].every((el) => {
        const s = getComputedStyle(el)
        return s.maskImage !== 'none' || s.backgroundImage !== 'none'
      }) &&
      [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 30_000 })
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
    await page.screenshot({ path: file, fullPage: true, animations: 'disabled' })
    const rects = await page.evaluate(() => [...document.querySelectorAll('.flex.flex-wrap.gap-4.items-start')]
      .flatMap((row, r) => [...row.children].map((el, i) => {
        const b = el.getBoundingClientRect()
        return { row: r, i, x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }
      })))
    /* `shotAt` — время съёмки, записанное самой съёмкой. Приёмка считает по нему протухание:
       mtime файла того же не свидетельствует, он переживает `cp -r` без `-p` и делает
       скопированный каталог прогона свежим целиком (nuxt-ui-ds-qz5). */
    await writeFile(file.replace(/\.png$/, '.json'), JSON.stringify({ side, name, theme, errors, rects, shotAt: new Date().toISOString() }, null, 1))
  } catch (e) {
    errors.push(String(e))
    await rm(file, { force: true })
    /* И в ветке ошибки тоже: без `shotAt` пара, которую пробовали снять и не сняли, была бы
       неотличима от непеснятой. PNG тут уже удалён, и свежей по этому полю пара не станет —
       приёмка сперва смотрит, есть ли снимок. */
    await writeFile(file.replace(/\.png$/, '.json'), JSON.stringify({ side, name, theme, errors, rects: [], shotAt: new Date().toISOString() }, null, 1))
    console.error(`  ${side}/${name}.${theme}: ${e.message.split('\n')[0]}`)
  } finally {
    if (ctx) await ctx.close()
  }
}

const browser = await chromium.launch()
try {
  for (const side of sides) {
    const url = await baseUrl(side)
    await mkdir(path.join(out, side), { recursive: true })
    for (const name of names) {
      for (const theme of THEMES) {
        /* Отбор по паре — до --force и до проверки файла: иначе `--force --only page-cta.dark`
           входил бы в тело цикла со светлой темой и сносил готовый снимок. */
        if (only && !only.matches(name, theme)) continue
        const file = path.join(out, side, `${name}.${theme}.png`)
        if (!opt.force && existsSync(file)) continue
        process.stdout.write(`${side}/${name}.${theme}\n`)
        await shoot(browser, url(name, theme), side, name, theme, file)
      }
    }
  }
} finally {
  await browser.close()
  for (const s of servers) s.close()
}
console.log(out)
