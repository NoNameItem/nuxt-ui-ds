/* Локальная копия кита: страницы документации открываются со своего сервера,
   без обращения к проекту и без короткоживущего serve_url.

   Так был отлажен весь десятый шаг. Через serve_url браузер не доходил до
   состояния «загружено», консоль была недоступна, и причина зависания (она
   оказалась бесконечной рекурсией в фабрике кита) нашлась только на локальной
   копии — за минуты вместо часов. Приёмке та же независимость нужна постоянно:
   serve_url живёт около часа, а прогон 118 страниц идёт дольше. */
import { createServer } from 'node:http'
import { access, cp, mkdir, readdir, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { componentsFromManifest } from '../doc-pages/names.mjs'
import { KIT_LIVE } from '../kit-export.mjs'

const OUT = 'dist/docs/local'
/* статика кита — рабочая копия, которую пишет pnpm kit:pull: styles.css, _ds_bundle.js, tokens/ */
const STATIC = KIT_LIVE
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png' }

/* Неполный набор токенов иначе молча соберётся в OUT: cp тут же копирует
   каталог tokens/ целиком, не зная, чего в нём не хватает, а расхождения от
   недокачанного файла приёмка не отличит от настоящих — восемь минут прогона
   уйдут на находки, которые на самом деле значат «файл не докачан». */
export async function missingKitImports(dir = STATIC) {
  const styles = await readFile(path.join(dir, 'styles.css'), 'utf8')
  /* Ожидаемая форма — вывод сборки Tailwind v4 кита: `@import "./relative/path.css";`,
     двойные кавычки, явный `./`. Смена сборщика кита на другой синтаксис (url(), одинарные
     кавычки, путь без `./`) молча вернёт пустой список вместо находок — тогда защита ниже
     станет фиктивной без явной ошибки, и это надо будет заметить руками. */
  const imports = [...styles.matchAll(/@import\s+"\.\/([^"]+)"/g)].map((m) => m[1])
  const missing = []
  for (const rel of imports) {
    try {
      await access(path.join(dir, rel))
    } catch {
      missing.push(rel)
    }
  }
  return missing
}

export async function assembleLocalKit() {
  const missing = await missingKitImports()
  if (missing.length > 0) {
    throw new Error(`статика кита неполна, не хватает: ${missing.join(', ')}`)
  }
  await rm(OUT, { recursive: true, force: true })
  await mkdir(path.join(OUT, 'lib'), { recursive: true })
  await cp(path.join(STATIC, 'styles.css'), path.join(OUT, 'styles.css'))
  await cp(path.join(STATIC, '_ds_bundle.js'), path.join(OUT, '_ds_bundle.js'))
  await cp(path.join(STATIC, 'tokens'), path.join(OUT, 'tokens'), { recursive: true })
  await cp('pipeline/lib/docs.js', path.join(OUT, 'lib', 'docs.js'))
  await cp('pipeline/lib/docs.css', path.join(OUT, 'lib', 'docs.css'))
  const man = JSON.parse(await readFile(path.join(STATIC, '_ds_manifest.json'), 'utf8'))
  const group = new Map(componentsFromManifest(man).map((c) => [c.name, c.group]))
  const pages = []
  for (const f of await readdir('dist/docs/pages')) {
    const name = f.replace(/\.doc\.html$/, '')
    const rel = path.join('components', group.get(name), f)
    await mkdir(path.join(OUT, path.dirname(rel)), { recursive: true })
    await cp(path.join('dist/docs/pages', f), path.join(OUT, rel))
    pages.push({ name, rel })
  }
  await cp('dist/docs/index.html', path.join(OUT, 'index.html'))
  return { root: OUT, pages }
}

/* Статический сервер локальной копии и стенда сверки. URL со слешом на конце
   отдаёт index.html каталога: так `nuxt generate` раскладывает страницы.

   `path.join(root, rel)` намеренно оставлен без защиты от `..`: модель угроз — петлевой
   сервер на 127.0.0.1 со случайным портом, поднятый на время собственной съёмки, и
   единственный его клиент — Playwright того же процесса, ходящий по нашим же адресам.
   Выносить его наружу нельзя — тогда защита понадобится.

   Разбор пути целиком под `try`: `decodeURIComponent` бросает `URIError` на битом
   %-экранировании, а обработчик асинхронный — исключение из него уходит в unhandled
   rejection и убивает процесс посреди прогона, вместо того чтобы стать 404. */
export function serve(root) {
  const server = createServer(async (req, res) => {
    try {
      let rel = decodeURIComponent(req.url.split('?')[0])
      if (rel.endsWith('/')) rel += 'index.html'
      const file = path.join(root, rel)
      const data = await readFile(file)
      res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' })
      res.end(data)
    } catch {
      res.writeHead(404)
      res.end()
    }
  })
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok({ server, port: server.address().port })))
}
