/* Выгрузка кита с платформы Claude Design и сверка импорта. Подробности — pipeline/README.md.

     KIT_SERVE_URL='<serve_url>' node pipeline/kit-export.mjs pull <листинг.json>     → dist/kit-live/ и отметка в bench/ledger.yaml
     KIT_SERVE_URL='<serve_url>' node pipeline/kit-export.mjs release <листинг.json>  → kit/
     node pipeline/kit-export.mjs check-import <листинг.json>                          → сверка листинга проекта с kit/

   Листинг — JSON-массив из list_files(depth: -1) MCP claude-design. Он есть только в MCP,
   поэтому в скрипт приходит файлом. Адрес serve — только переменной окружения: это URL с
   токеном, и ни на диск, ни в вывод он не попадает.

   Обе выгрузки забирают кит с платформы заново. Копирования из dist/kit-live в kit/ нет
   намеренно: иначе в релиз уходит протухшее, если в конце хода забыли перевыкачать.

   Верхние импорты — только node:*. check-import запускает пользователь по docs/import.md, у
   него нет node_modules; pull грузит yaml (через ledger-stamp) динамически. Держит это тест
   в pipeline/tests/kit-export.test.mjs. Сообщения английские по той же причине. */
import { execFileSync } from 'node:child_process'
import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const KIT_LIVE = 'dist/kit-live'
export const KIT_DIR = 'kit'
export const LEDGER = 'bench/ledger.yaml'
/* Выходы сборки платформы: бандл пересобирается последним, и эта тройка пишется одним ходом
   сборки. В «исходники» для проверки конца хода они не входят. */
export const BUILD_OUTPUTS = new Set(['_ds_bundle.js', '_ds_manifest.json', '_adherence.oxlintrc.json'])
/* Файлы, которые ни в один выход сборки не попадают: их свежесть о конце хода ничего не
   говорит. readme.md платформа правит шагом «Fixing design-system issues» уже после
   пересборки (24.09.2026, раунд 126: на 8 секунд позже бандла), и без исключения каждый
   такой ход выглядел бы незаконченным навсегда. */
const NOT_BUILT = new Set(['readme.md'])
export const LISTING_MAX_AGE_MS = 10 * 60 * 1000
const MANIFEST = '_ds_manifest.json'
/* .thumbnail платформа генерирует сама и отдаёт перекодированным — в кит он не входит. */
const THUMBNAIL = '.thumbnail'
/* .DS_Store кладёт Finder в любую открытую папку; git его игнорирует, сверка тоже. */
const LOCAL_NOISE = new Set(['.DS_Store'])
const SERVE_SEGMENT = '/serve/'
/* serve вставляет этот блок в каждый HTML сразу после <head> (проба 2026-09-24). */
const INJECTED = /(<head[^>]*>)\n<style data-omelette-injected>[\s\S]*?<\/style><script data-omelette-injected>[\s\S]*?<\/script>\n/

export function parseListing(text) {
  let raw
  try {
    raw = JSON.parse(text)
  } catch (e) {
    throw new Error(`listing is not JSON: ${e.message}`)
  }
  if (!Array.isArray(raw)) throw new Error('listing must be the JSON array returned by list_files(depth: -1)')
  const files = []
  for (const e of raw) {
    if (e?.type === 'directory') continue
    if (typeof e?.path !== 'string' || !Number.isInteger(e?.size) || e.size < 0) {
      throw new Error(`listing entry without path or size: ${JSON.stringify(e)}`)
    }
    /* Путь из листинга становится путём на диске — наружу цели он вести не должен. */
    if (e.path.startsWith('/') || e.path.split('/').some((s) => s === '..' || s === '')) {
      throw new Error(`listing path points outside the kit: ${e.path}`)
    }
    if (path.posix.basename(e.path) === THUMBNAIL) continue
    files.push({ path: e.path, size: e.size, etag: e.etag })
  }
  if (files.length === 0) throw new Error('listing has no files')
  return files
}

/* Конец хода платформы (CLAUDE.md, раздел «Работа с Claude Design»): бандл пересобирается
   последним, и ход закончен, только когда etag бандла не старше ни одного исходника.
   Стабильность корня листинга признаком не является — 20.09.2026 ход оборвался на лимите,
   корень замер, а исходники ушли вперёд бандла. etag — время в микросекундах; сравнение
   через BigInt, чтобы не зависеть от длины числа. */
export function turnRefusal(files) {
  const bundle = files.find((f) => f.path === '_ds_bundle.js')
  if (!bundle) return 'no _ds_bundle.js in the listing — not a design system project, or the listing is partial'
  const tag = (f) => {
    try {
      return BigInt(f.etag)
    } catch {
      return null
    }
  }
  const bundleTag = tag(bundle)
  if (bundleTag === null) return `_ds_bundle.js has a non-numeric etag «${bundle.etag}»`
  let newest = null
  for (const f of files) {
    if (BUILD_OUTPUTS.has(f.path) || NOT_BUILT.has(f.path)) continue
    const t = tag(f)
    if (t === null) return `${f.path} has a non-numeric etag «${f.etag}»`
    if (t > bundleTag && (!newest || t > newest.t)) newest = { path: f.path, t }
  }
  return newest ? `${newest.path} is newer than _ds_bundle.js — the platform turn is not finished (the bundle is rebuilt last)` : null
}

export function listingAgeRefusal(mtimeMs, now = Date.now()) {
  const age = now - mtimeMs
  if (age <= LISTING_MAX_AGE_MS) return null
  return `listing is ${Math.round(age / 60000)} min old (limit ${LISTING_MAX_AGE_MS / 60000} min) — take a fresh list_files`
}

/* Из serve_url любого файла проекта: основа до сегмента serve включительно и хвост с
   токеном. Сам адрес в сообщения не попадает. */
export function serveBase(url) {
  if (!url) throw new Error('KIT_SERVE_URL is not set — pass the serve_url of any kit file (render_preview) through the environment')
  let u
  try {
    u = new URL(url)
  } catch {
    throw new Error('KIT_SERVE_URL is not a URL')
  }
  const i = u.pathname.indexOf(SERVE_SEGMENT)
  if (i < 0) throw new Error('KIT_SERVE_URL has no serve segment — not a serve_url')
  return { base: `${u.origin}${u.pathname.slice(0, i + SERVE_SEGMENT.length)}`, query: u.search }
}

export const fileUrl = ({ base, query }, rel) => base + rel.split('/').map(encodeURIComponent).join('/') + query

/* latin1 — взаимно однозначное отображение байтов в символы, поэтому вырезание по строке не
   трогает ни одного байта вокруг блока, в какой бы кодировке ни был файл. */
export function stripInjected(buf) {
  const text = buf.toString('latin1')
  const out = text.replace(INJECTED, '$1')
  return out === text ? buf : Buffer.from(out, 'latin1')
}

async function download(url, rel, attempts = 3) {
  for (let i = 1; ; i++) {
    let res
    try {
      res = await fetch(url, { redirect: 'manual' })
    } catch (e) {
      if (i < attempts) continue
      throw new Error(`${rel}: network error (${e.cause?.code ?? e.message})`)
    }
    if (res.status === 200) return Buffer.from(await res.arrayBuffer())
    await res.arrayBuffer().catch(() => {})
    if (res.status >= 500 && i < attempts) continue
    const hint = res.status >= 300 && res.status < 400 ? ' — the serve token has probably expired, take a fresh serve_url' : ''
    throw new Error(`${rel}: HTTP ${res.status}${hint}`)
  }
}

/* Листинг переносится из ответа MCP в файл руками, и потерянная запись — это файл, которого
   нет в выгрузке, а сверять его размер не с чем. Манифест кита называет файлы компонентов,
   экранов, карточек и токенов: всё названное обязано быть в листинге. */
async function manifestGap(dir, files) {
  const listed = new Set(files.map((f) => f.path))
  if (!listed.has(MANIFEST)) return null
  const m = JSON.parse(await readFile(path.join(dir, MANIFEST), 'utf8'))
  const named = [
    ...(m.components ?? []).map((c) => c.sourcePath),
    ...(m.startingPoints ?? []).flatMap((s) => [s.path, s.previewPath]),
    ...(m.cards ?? []).map((c) => c.path),
    ...(m.templates ?? []).map((t) => t.path),
    ...(m.globalCssPaths ?? []),
    ...(m.tokens ?? []).map((t) => t.definedIn)
  ]
  const lost = [...new Set(named.filter((p) => p && !listed.has(p)))].sort()
  if (!lost.length) return null
  return new Error(`${MANIFEST} names ${lost.length} file(s) missing from the listing:\n${lost.map((p) => `  ${p}`).join('\n')}`)
}

/* Запись во временную папку рядом с целью и подмена целиком: оборванная выгрузка не
   оставляет полкита, прежняя цель остаётся нетронутой до последнего шага. Размер каждого
   файла сверяется с листингом после вырезания блока — это же ловит протухший токен, если
   платформа вдруг ответит на него 200. */
export async function exportKit({ files, serve, target, concurrency = 8 }) {
  const tmp = `${target}.tmp-${process.pid}`
  await rm(tmp, { recursive: true, force: true })
  let next = 0
  let bytes = 0
  let failed = false
  const worker = async () => {
    while (!failed && next < files.length) {
      const f = files[next++]
      try {
        let body = await download(fileUrl(serve, f.path), f.path)
        if (f.path.endsWith('.html')) body = stripInjected(body)
        if (body.length !== f.size) throw new Error(`${f.path}: ${body.length} bytes, listing says ${f.size}`)
        const out = path.join(tmp, f.path)
        await mkdir(path.dirname(out), { recursive: true })
        await writeFile(out, body)
        bytes += body.length
      } catch (e) {
        failed = true
        throw e
      }
    }
  }
  const results = await Promise.allSettled(Array.from({ length: Math.min(concurrency, files.length) }, worker))
  const failure = results.find((r) => r.status === 'rejected')?.reason ?? (await manifestGap(tmp, files))
  if (failure) {
    await rm(tmp, { recursive: true, force: true })
    throw failure
  }
  await rm(target, { recursive: true, force: true })
  await rename(tmp, target)
  return { count: files.length, bytes }
}

async function walk(dir) {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true })
  return entries
    .filter((e) => e.isFile() && !LOCAL_NOISE.has(e.name))
    .map((e) => path.relative(dir, path.join(e.parentPath, e.name)).split(path.sep).join('/'))
}

/* missing — есть в kit/, нет в проекте; extra — есть в проекте, нет в kit/. */
export async function compareWithDir(files, dir) {
  const listed = new Map(files.map((f) => [f.path, f.size]))
  const local = new Map()
  for (const rel of await walk(dir)) local.set(rel, (await stat(path.join(dir, rel))).size)
  const byPath = (a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0)
  return {
    matched: [...listed].filter(([p, s]) => local.get(p) === s).length,
    total: local.size,
    missing: [...local.keys()].filter((p) => !listed.has(p)).sort(),
    extra: [...listed.keys()].filter((p) => !local.has(p)).sort(),
    sizeMismatch: [...listed].filter(([p, s]) => local.has(p) && local.get(p) !== s).map(([p, s]) => ({ path: p, project: s, kit: local.get(p) })).sort(byPath)
  }
}

function printComparison(r) {
  console.log(`kit/: ${r.total} files`)
  const list = (title, items) => {
    if (items.length) console.log(`${title} (${items.length}):\n${items.map((s) => `  ${s}`).join('\n')}`)
  }
  list('missing in the project', r.missing)
  list('in the project but not in kit/', r.extra)
  list('size differs', r.sizeMismatch.map((m) => `${m.path}: project ${m.project}, kit ${m.kit}`))
  console.log(`matched: ${r.matched} of ${r.total}`)
}

async function main([cmd, listingPath, ...flags]) {
  if (!['pull', 'release', 'check-import'].includes(cmd) || !listingPath) {
    console.error('usage: node pipeline/kit-export.mjs pull|release|check-import <listing.json> [--allow-removals]')
    return 2
  }
  const files = parseListing(await readFile(listingPath, 'utf8'))
  if (cmd === 'check-import') {
    const r = await compareWithDir(files, KIT_DIR)
    printComparison(r)
    return r.matched === r.total && r.extra.length === 0 ? 0 : 1
  }
  const age = listingAgeRefusal((await stat(listingPath)).mtimeMs)
  if (age) throw new Error(age)
  const turn = turnRefusal(files)
  if (turn) throw new Error(turn)
  const serve = serveBase(process.env.KIT_SERVE_URL)
  if (cmd === 'pull') {
    /* Регистр проверяется до выгрузки: не найти его после нескольких минут загрузки обидно. */
    await stat(LEDGER)
    const { stampLedger } = await import('../bench/scripts/ledger-stamp.mjs')
    const { count, bytes } = await exportKit({ files, serve, target: KIT_LIVE })
    console.log(`${KIT_LIVE}: ${count} files, ${bytes} bytes`)
    const at = new Date().toISOString()
    const size = files.find((f) => f.path === '_ds_bundle.js').size
    await writeFile(LEDGER, stampLedger(await readFile(LEDGER, 'utf8'), { at, size }))
    console.log(`${LEDGER}: statics_copied = ${at} · bundle_size = ${size}`)
    return 0
  }
  const git = (...args) => execFileSync('git', args, { encoding: 'utf8' })
  /* Выгрузка подменяет kit/ целиком, поэтому файл, выпавший из листинга, молча ушёл бы из
     релиза. Удаление на платформе бывает и настоящим — тогда его подтверждают флагом. */
  const listed = new Set(files.map((f) => f.path))
  const dropped = git('ls-files', '-z', '--', KIT_DIR).split('\0').filter(Boolean).map((p) => p.slice(KIT_DIR.length + 1)).filter((p) => !listed.has(p))
  if (dropped.length && !flags.includes('--allow-removals')) {
    throw new Error(`listing drops ${dropped.length} tracked file(s) of ${KIT_DIR}/:\n${dropped.map((p) => `  ${p}`).join('\n')}\nrerun with --allow-removals if the platform really deleted them`)
  }
  const { count, bytes } = await exportKit({ files, serve, target: KIT_DIR })
  console.log(`${KIT_DIR}: ${count} files, ${bytes} bytes`)
  console.log(git('diff', '--stat', '--', KIT_DIR).trim() || 'tracked files of kit/ unchanged')
  const fresh = git('ls-files', '--others', '--exclude-standard', '--', KIT_DIR).split('\n').filter(Boolean)
  if (fresh.length) console.log(`new files in kit/: ${fresh.length}`)
  console.log('commit kit/ separately, by hand')
  return 0
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (e) => {
      console.error(`refused: ${e.message}`)
      process.exit(1)
    }
  )
}
