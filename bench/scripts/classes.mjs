/* Сравнение классов узел-в-узел между приложением и китом. Подробности: bench/README.md.

   node bench/scripts/classes.mjs --kit '<serve_url с PAGE вместо имени>' --only alert,chip

   Зачем отдельно от дифа. Диф говорит, что кадры разные, и молчит о причине; счёт узлов
   говорит, каких узлов нет. Но к восьмому раунду появился класс пар, у которых состав узлов
   совпал ЦЕЛИКОМ, а диф крупный: alert 162/162 при 232992 пикселях, chip 89/89 при 13397,
   form-field 76/76 при 22584. Для них оба прежних инструмента слепы, и раунд на симптоме
   («высота вдвое») давал ноль. Этот замер назвал причину с первого прогона: у alert 114
   расхождений из 114 — узел иконки, а у chip потерян вариант color.

   Узлы сопоставляются по порядку обхода внутри одного data-slot (`icon#3` — третий узел со
   слотом icon). Это верно ровно тогда, когда состав уже сверен: порядок обхода у совпавших
   составов один и тот же. При несовпавшем составе лишние узлы просто не находят пары и в
   отчёт не идут — то есть замер не врёт, а молчит, и это честнее, чем сдвинутое сравнение.

   Сравнивается три вещи: тег (у Chip `as` по умолчанию span, а кит рисовал div), набор
   классов (в обе стороны: чего нет у кита и что лишнее) и атрибут style — инлайновые стили
   кита перебивают тему хозяина, и именно так нашлось display:block у иконок. */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { parseOnly } from './only.mjs'
import { pageNames } from './pages.mjs'

const { values: opt } = parseArgs({ options: { kit: { type: 'string' }, only: { type: 'string' }, app: { type: 'string' } } })
if (!opt.kit) throw new Error('--kit обязателен: serve_url артборда, где имя страницы заменено на PAGE')
if (!opt.kit.includes('PAGE')) throw new Error('--kit должен содержать PAGE вместо имени страницы')

const APP_ROOT = opt.app ?? '.output/public'
const only = parseOnly(opt.only, 'имена страниц')
const all = pageNames()
const names = all.filter((n) => !only || ['light', 'dark'].some((t) => only.matches(n, t)))
if (!names.length) throw new Error('нет страниц для сравнения')

/* Отдавать надо не только index.html: страница тянет CSS и шрифты из /_nuxt, и без них
   сторона приложения рендерится голой. На этом уже обожглись — замер коробок иконки на
   неостилённой странице дал 16px там, где на самом деле 20px, и целый пункт промпта ушёл в
   кит по ошибке (раунд 8). Сравнение классов от этого не страдало — атрибуты в разметке есть
   и без CSS, — но computed-стили и размеры без статики бессмысленны. */
const MIME = { '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2', '.woff': 'font/woff' }
const srv = createServer(async (req, res) => {
  const f = path.join(APP_ROOT, decodeURIComponent(req.url.split('?')[0]))
  const send = (buf, ext) => { res.setHeader('content-type', MIME[ext] || 'text/html'); res.end(buf) }
  try { send(await readFile(f), path.extname(f)); return } catch {}
  try { send(await readFile(path.join(f, 'index.html')), '.html'); return } catch {}
  res.statusCode = 404; res.end('')
})
await new Promise((r) => srv.listen(0, r))
const port = srv.address().port
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, colorScheme: 'light' })

const grab = () => page.evaluate(() => {
  const out = []; const seen = {}
  for (const e of document.querySelectorAll('[data-slot]')) {
    const s = e.dataset.slot
    seen[s] = (seen[s] || 0) + 1
    out.push([`${s}#${seen[s]}`, e.tagName.toLowerCase(),
      String(e.className || '').split(/\s+/).filter(Boolean).sort().join(' '),
      e.getAttribute('style') || ''])
  }
  return out
})

let total = 0
for (const n of names) {
  let app, kit
  try {
    await page.goto(`http://127.0.0.1:${port}/parity/${n}/`, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(200)
    /* Неостилённая страница обязана падать, а не мериться. Свой сервер однажды отдавал только
       index.html, CSS не отдавал вовсе, и замер коробки иконки дал 16px вместо настоящих 20 —
       целый пункт промпта ушёл в кит по ошибке. Признак берётся не «есть ли styleSheets»
       (пустой список бывает и у живой страницы с внешним CSS), а тем, что preflight Tailwind
       обнуляет поля body: без CSS браузер даёт 8px. */
    const styled = await page.evaluate(() => getComputedStyle(document.body).marginTop)
    if (styled !== '0px') throw new Error(`страница приложения без стилей: body margin ${styled}, ожидался 0px`)
    app = new Map((await grab()).map((r) => [r[0], r]))
    await page.goto(opt.kit.replace('PAGE', n), { waitUntil: 'networkidle', timeout: 45000 })
    await page.waitForTimeout(250); kit = new Map((await grab()).map((r) => [r[0], r]))
  } catch (e) {
    console.log(`${n}: не снялось — ${String(e.message).slice(0, 70)}`)
    continue
  }
  /* Сопоставление по индексу внутри слота верно, только если последовательность слотов у
     сторон одна и та же. У chip составы совпали (89/89), а порядок разошёлся — и пары
     `root#9`/`root#10` сравнивались со сдвигом, давая «тег div / span» и «span / div» подряд.
     Совпадения счётчиков для этого мало, поэтому последовательность сверяется отдельно, и при
     расхождении отчёт помечается: находки из него — зацепка, а не доказательство. */
  const seqA = [...app.keys()].map((k) => k.split('#')[0]).join(',')
  const seqB = [...kit.keys()].map((k) => k.split('#')[0]).join(',')
  const shifted = seqA !== seqB
  const rows = []
  for (const [k, a] of app) {
    const t = kit.get(k)
    if (!t) continue
    if (a[1] !== t[1]) rows.push(`${k}: тег ${a[1]} / ${t[1]}`)
    if (a[2] !== t[2]) {
      const A = new Set(a[2].split(' ')); const T = new Set(t[2].split(' '))
      const miss = [...A].filter((x) => !T.has(x)); const extra = [...T].filter((x) => !A.has(x))
      if (miss.length || extra.length) rows.push(`${k}: нет у кита [${miss.join(' ')}] · лишнее [${extra.join(' ')}]`)
    }
    if (a[3] !== t[3]) rows.push(`${k}: style «${a[3].slice(0, 60)}» / «${t[3].slice(0, 60)}»`)
  }
  total += rows.length
  console.log(`${n}: узлов ${app.size}/${kit.size} · расхождений ${rows.length}${shifted ? ' · ПОРЯДОК СЛОТОВ РАЗНЫЙ — сопоставление сдвинуто, читать как зацепку' : ''}`)
  for (const r of rows.slice(0, 12)) console.log(`   ${r}`)
  if (rows.length > 12) console.log(`   …и ещё ${rows.length - 12}`)
}
console.log(`итого расхождений классов: ${total}`)
await browser.close()
srv.close()
