/* Разбор пары по ДЕТЯМ КОРНЯ. Подробности: bench/README.md.

   node bench/scripts/roots.mjs --kit '<serve_url с PAGE вместо имени>' --only listbox,table

   Третий вопрос после «что различается в кадре» (диф) и «каких узлов нет» (счёт слотов):
   ГДЕ узлы стоят. Он оказался решающим там, где первые два молчали.

   Живой пример, ради которого инструмент и написан. Пара listbox держала 2 821 139 пикселей —
   больше любой другой в прогоне, — и три раунда не двигалась, потому что счёт слотов почти
   сходился и в промпт уходил симптом. Разбор по детям корня назвал причину за один прогон:

     приложение   content:div:168                                  ← один ребёнок, всё внутри
     кит          div:33 | content:div:8 | label:28 | separator:1 | item:37 | … пять раз

   Шаблон элемента оказался сиблингом content вместо того, чтобы лежать внутри него и внутри
   group, и выдавал label и separator на каждый элемент, хотя у обоих в дереве стоит if:1.
   Промпт с этим разбором закрыл пару с первого раза: 2 821 139 -> 388 150, ноль ухудшившихся.

   Печатает три вещи: высоту документа и первого корня, список прямых детей корня с тегом и
   высотой, и те слоты ВНУТРИ корня, где счётчики разошлись. Высоты в списке детей важны не
   меньше состава: у page-hero состав отличается одним узлом body, и ровно он даёт +168
   пикселей высоты корня.

   Сторона приложения обязана быть остилённой — проверяется так же, как в classes.mjs. */
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
const KIT = opt.kit
const APP_ROOT = opt.app ?? '.output/public'
const only = parseOnly(opt.only, 'имена страниц')
const allNames = pageNames()
const NAMES = allNames.filter((n) => !only || ['light', 'dark'].some((t) => only.matches(n, t)))
if (!NAMES.length) throw new Error('нет страниц для разбора')
const MIME = { '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2' }
const srv = createServer(async (req, res) => {
  const f = path.join(APP_ROOT, decodeURIComponent(req.url.split('?')[0]))
  const send = (b, e) => { res.setHeader('content-type', MIME[e] || 'text/html'); res.end(b) }
  try { send(await readFile(f), path.extname(f)); return } catch {}
  try { send(await readFile(path.join(f, 'index.html')), '.html'); return } catch {}
  res.statusCode = 404; res.end('')
})
await new Promise((r) => srv.listen(0, r))
const port = srv.address().port
const b = await chromium.launch()
const page = await b.newPage({ viewport: { width: 1280, height: 800 }, colorScheme: 'light' })
const grab = () => page.evaluate(() => {
  if (getComputedStyle(document.body).marginTop !== '0px') return { unstyled: true }
  const root = document.querySelector('[data-slot="root"]') || document.querySelector('[data-slot]')
  if (!root) return { docH: document.documentElement.scrollHeight, none: true }
  const hist = {}
  for (const e of root.querySelectorAll('[data-slot]')) hist[e.dataset.slot] = (hist[e.dataset.slot] || 0) + 1
  const kids = [...root.children].map((e) => (e.dataset.slot || '—') + ':' + e.tagName.toLowerCase() + ':' + Math.round(e.getBoundingClientRect().height))
  /* Высоты ВСЕХ корней, а не только первого. Без этого «расходится везде» не отличить от
     «расходится в одном месте», и промпт уходит про всю страницу вместо одного примера.
     У table пятнадцать корней из шестнадцати сошлись, а шестнадцатый — пустая таблица — дал
     48 против 312; у pricing-plan разница оказалась постоянной, ровно +44 на каждой из
     девяти карточек, и постоянство само по себе было подсказкой. */
  const allRoots = [...document.querySelectorAll('[data-slot="root"]')].map((e) => Math.round(e.getBoundingClientRect().height))
  /* Картинки — отдельной строкой, потому что у них обычно нет `data-slot`, и обоим другим
     замерам они невидимы. У page-hero это и оказалось всем остатком пары: размеры трёх
     картинок совпадали до пикселя, но первая стояла у приложения в правой колонке (x=672),
     а у кита в левой (x=48) — 922 821 пикселя диффа при полностью совпавшем составе узлов
     и нулевом missingArea. Ни счёт слотов, ни сравнение классов такого не показывают. */
  const imgs = [...document.querySelectorAll('img')].map((e) => {
    const r = e.getBoundingClientRect()
    return `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`
  })
  return { docH: document.documentElement.scrollHeight, rootSlot: root.dataset.slot,
           rootH: Math.round(root.getBoundingClientRect().height), kids, hist, allRoots, imgs }
})
for (const n of NAMES) {
  await page.goto(`http://127.0.0.1:${port}/parity/${n}/`, { waitUntil: 'networkidle' }); await page.waitForTimeout(300)
  const app = await grab()
  if (app.unstyled) throw new Error(`страница приложения ${n} без стилей — замер бессмыслен`)
  await page.goto(KIT.replace('PAGE', n), { waitUntil: 'networkidle', timeout: 45000 }); await page.waitForTimeout(400)
  const kit = await grab()
  console.log(`=== ${n}  docH ${app.docH}/${kit.docH}  первый корень «${app.rootSlot}» h ${app.rootH}/${kit.rootH}`)
  console.log('  app дети: ' + (app.kids || []).slice(0, 10).join(' | '))
  console.log('  kit дети: ' + (kit.kids || []).slice(0, 10).join(' | '))
  const keys = [...new Set([...Object.keys(app.hist || {}), ...Object.keys(kit.hist || {})])]
  const d = keys.filter((k) => (app.hist?.[k] || 0) !== (kit.hist?.[k] || 0)).map((k) => `${k} ${app.hist?.[k] || 0}/${kit.hist?.[k] || 0}`)
  console.log('  слоты внутри корня, где разошлось: ' + (d.join(', ') || 'нет'))
  const ar = app.allRoots || []; const kr = kit.allRoots || []
  if (ar.length || kr.length) {
    const same = ar.length === kr.length && ar.every((v, i) => v === kr[i])
    console.log('  высоты корней app: ' + ar.join(' '))
    console.log('  высоты корней kit: ' + kr.join(' ') + (same ? '  — совпали' : ''))
  }
  const ai = app.imgs || []; const ki = kit.imgs || []
  if (ai.length || ki.length) {
    const same = ai.length === ki.length && ai.every((v, i) => v === ki[i])
    console.log('  картинки app: ' + (ai.join(' | ') || 'нет'))
    console.log('  картинки kit: ' + (ki.join(' | ') || 'нет') + (same ? '  — совпали' : ''))
  }
}
await b.close(); srv.close()
