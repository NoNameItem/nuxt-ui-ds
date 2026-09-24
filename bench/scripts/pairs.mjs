/* Листы пар «кит слева, приложение справа» для сравнения глазами.
   node bench/scripts/pairs.mjs --run dist/parity/<прогон> [--only badge,page-cta.dark] [--force]
   Лист собирается служебной страницей в том же Chromium: две картинки data:-URL
   в сетке 1280+1280, фон серый, чтобы края светлого и тёмного снимков были видны.
   Готовые листы не пересобираются, кроме как под --force — тогда названный лист
   (или все листы без --only) собирается заново и перезаписывается. */
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { chromium } from 'playwright'
import { parseOnly } from './only.mjs'

const { values: opt } = parseArgs({ options: { run: { type: 'string' }, only: { type: 'string' }, force: { type: 'boolean', default: false } } })
if (!opt.run) throw new Error('нужен --run dist/parity/<прогон>')
const dirs = { kit: path.join(opt.run, 'kit'), app: path.join(opt.run, 'app') }
const out = path.join(opt.run, 'pairs')
await mkdir(out, { recursive: true })

/* «Не передан» и «передан пустым» различаются намеренно — как в shoot.mjs: `--only ""`
   означало «все листы», и под --force пересобирался весь прогон вместо названных.
   Форма <имя>.<тема> тоже принимается — разбор общий, bench/scripts/only.mjs. */
const only = parseOnly(opt.only, 'имена пар')
const NAME_RE = /^(.+)\.(light|dark)\.png$/
const pngs = async (d) => (await readdir(d).catch(() => [])).filter((f) => f.endsWith('.png'))
const allFiles = [...new Set([...(await pngs(dirs.kit)), ...(await pngs(dirs.app))])]
/* Файл, не разобранный как <имя>.<тема>.png, листом не становится: пару из него не
   составить, а diff.mjs такие и так не видит. */
const allKeys = allFiles
  .map((f) => f.match(NAME_RE))
  .filter(Boolean)
  .map((m) => ({ file: m[0], name: m[1], theme: m[2] }))
const files = allKeys
  .filter((k) => !only || only.matches(k.name, k.theme))
  .map((k) => k.file)
  .sort()
/* Частичный промах молчал: `--only badge,bogus` собирал badge и про bogus не говорил. */
const unknown = only ? only.unknownPairs(allKeys) : []
if (unknown.length) console.warn(`--only: нет таких пар в прогоне — ${unknown.join(', ')}`)

const img = async (d, f) => {
  const buf = await readFile(path.join(d, f)).catch(() => null)
  return buf ? `<img src="data:image/png;base64,${buf.toString('base64')}">` : '<p class="none">нет снимка</p>'
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 2600, height: 800 }, deviceScaleFactor: 1 })
try {
  for (const f of files) {
    const target = path.join(out, f)
    if (!opt.force && existsSync(target)) continue
    await page.setContent(`<!DOCTYPE html><style>
      body{margin:0;background:#888;font:16px/1.4 system-ui}
      main{display:grid;grid-template-columns:1280px 1280px;gap:40px;align-items:start}
      h1{margin:0;padding:8px;font-size:16px;color:#fff;background:#444}
      img{display:block;width:1280px} .none{margin:0;padding:24px;color:#fff}
    </style><main>
      <section><h1>кит · ${f}</h1>${await img(dirs.kit, f)}</section>
      <section><h1>приложение · ${f}</h1>${await img(dirs.app, f)}</section>
    </main>`)
    await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode())))
    await page.screenshot({ path: target, fullPage: true })
    process.stdout.write(`${f}\n`)
  }
} finally {
  await browser.close()
}
console.log(out)
