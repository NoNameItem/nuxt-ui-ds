import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { createServer } from 'node:http'
import { mkdir, mkdtemp, readdir, readFile, rm, utimes, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { compareWithDir, exportKit, fileUrl, LISTING_MAX_AGE_MS, listingAgeRefusal, parseListing, serveBase, stripInjected, turnRefusal } from '../kit-export.mjs'

const run = promisify(execFile)
const SCRIPT = path.resolve('pipeline/kit-export.mjs')
/* Путь serve собирается из частей и без схемы: целиком он похож на настоящий serve_url, и
   сканер публичного дерева (publish-scan.test.mjs) принял бы его за утечку. */
const SERVE_PATH = 'v1/design/projects/p/serve/'
const serveUrl = (origin, token = 'ok') => new URL(`${SERVE_PATH}_ds_bundle.js?t=${token}&direct=1`, origin).href

const INJECTED = '\n<style data-omelette-injected>.o{}</style><script data-omelette-injected>void 0</script>\n'
const PAGE = '<!doctype html><html><head><title>Кнопка</title></head><body>ok</body></html>'
const KIT = {
  '_ds_bundle.js': 'window.X = 1\n',
  'styles.css': '@import "./tokens/base.css";\n',
  'tokens/base.css': ':root{}\n',
  'components/forms/Button.card.html': PAGE,
  'guidelines/Кнопки и поля.md': '# кнопки\n'
}
const listingOf = (kit, etag = (p) => (p === '_ds_bundle.js' ? '20' : '10')) =>
  Object.entries(kit).map(([p, body]) => ({ path: p, type: 'file', size: Buffer.byteLength(body), etag: etag(p) }))

/* Платформа в миниатюре: отдаёт файлы по пути serve, в HTML вставляет блок omelette сразу
   после <head>, с чужим токеном отвечает 302 и телом в 119 байт, как протухший serve_url. */
async function platform(kit, { broken = {} } = {}) {
  const server = createServer((req, res) => {
    const u = new URL(req.url, 'http://h')
    if (u.searchParams.get('t') !== 'ok') {
      res.writeHead(302, { location: '/login' })
      return res.end('x'.repeat(119))
    }
    const rel = decodeURIComponent(u.pathname.slice(1 + SERVE_PATH.length))
    if (!(rel in kit)) {
      res.writeHead(404)
      return res.end()
    }
    let body = broken[rel] ?? kit[rel]
    if (rel.endsWith('.html')) body = body.replace('<head>', `<head>${INJECTED}`)
    res.writeHead(200)
    res.end(body)
  })
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok))
  return { server, origin: `http://127.0.0.1:${server.address().port}/` }
}
const tmp = () => mkdtemp(path.join(tmpdir(), 'kit-export-'))
async function writeKit(dir, kit) {
  for (const [p, body] of Object.entries(kit)) {
    await mkdir(path.dirname(path.join(dir, p)), { recursive: true })
    await writeFile(path.join(dir, p), body)
  }
}

test('листинг: каталоги и .thumbnail отбрасываются, файлы остаются', () => {
  const files = parseListing(JSON.stringify([
    { path: 'components', type: 'directory' },
    { path: '.thumbnail', type: 'file', size: 3444, etag: '1' },
    { path: '_ds_bundle.js', type: 'file', size: 10, etag: '5' }
  ]))
  assert.deepEqual(files, [{ path: '_ds_bundle.js', size: 10, etag: '5' }])
})

test('листинг: не массив, запись без size, путь наружу и пустой — отказ', () => {
  assert.throws(() => parseListing('{"files": []}'), /array/)
  assert.throws(() => parseListing('[{"path": "a.js", "type": "file"}]'), /size/)
  assert.throws(() => parseListing('[{"path": "../a.js", "type": "file", "size": 1}]'), /outside/)
  assert.throws(() => parseListing('[{"path": "/a.js", "type": "file", "size": 1}]'), /outside/)
  assert.throws(() => parseListing('[]'), /no files/)
})

test('конец хода: исходник новее бандла — отказ с именем исходника', () => {
  const files = parseListing(JSON.stringify(listingOf(KIT, (p) => (p === 'styles.css' ? '30' : p === '_ds_bundle.js' ? '20' : '10'))))
  assert.match(turnRefusal(files), /styles\.css.*newer/)
})

test('конец хода: выходы сборки новее бандла не мешают, ход закончен', () => {
  const files = [
    { path: '_ds_bundle.js', size: 1, etag: '20' },
    { path: '_ds_manifest.json', size: 1, etag: '25' },
    { path: '_adherence.oxlintrc.json', size: 1, etag: '20' },
    { path: 'readme.md', size: 1, etag: '19' }
  ]
  assert.equal(turnRefusal(files), null)
})

test('конец хода: readme.md новее бандла не мешает — в сборку он не входит', () => {
  /* 24.09.2026, раунд 126: шаг платформы «Fixing design-system issues» дописал строку в
     readme.md через 8 секунд после пересборки, и бандл за ним уже не пересобирался. */
  const files = [
    { path: '_ds_bundle.js', size: 1, etag: '20' },
    { path: 'components/x/X.jsx', size: 1, etag: '19' },
    { path: 'readme.md', size: 1, etag: '28' }
  ]
  assert.equal(turnRefusal(files), null)
  assert.match(turnRefusal([...files, { path: 'components/x/Y.jsx', size: 1, etag: '27' }]), /Y\.jsx.*newer/)
})

test('конец хода: без бандла и с нечисловым etag — отказ', () => {
  assert.match(turnRefusal([{ path: 'a.js', size: 1, etag: '1' }]), /_ds_bundle\.js/)
  assert.match(turnRefusal([{ path: '_ds_bundle.js', size: 1, etag: '2' }, { path: 'a.js', size: 1, etag: 'x' }]), /etag/)
})

test('листинг старше десяти минут — отказ, свежий — нет', () => {
  const now = Date.parse('2026-09-24T12:00:00Z')
  assert.equal(listingAgeRefusal(now - LISTING_MAX_AGE_MS + 1000, now), null)
  assert.match(listingAgeRefusal(now - LISTING_MAX_AGE_MS - 1000, now), /old/)
})

test('serve: основа и хвост разбираются, путь кодируется по сегментам, токен в сообщения не попадает', () => {
  const s = serveBase(new URL(`${SERVE_PATH}components/x.html?t=secret-token&direct=1`, 'https://h.example/').href)
  assert.equal(s.base, new URL(SERVE_PATH, 'https://h.example/').href)
  assert.equal(s.query, '?t=secret-token&direct=1')
  assert.equal(fileUrl(s, 'guidelines/Кнопки и поля.md'), `${s.base}guidelines/${encodeURIComponent('Кнопки и поля.md')}?t=secret-token&direct=1`)
  assert.throws(() => serveBase(undefined), /KIT_SERVE_URL/)
  assert.throws(() => serveBase('https://h.example/x.html?t=secret-token'), (e) => /serve/.test(e.message) && !e.message.includes('secret-token'))
})

test('блок omelette вырезается побайтно, кириллица цела, без блока файл не меняется', () => {
  const served = Buffer.from(PAGE.replace('<head>', `<head>${INJECTED}`))
  assert.deepEqual(stripInjected(served), Buffer.from(PAGE))
  assert.deepEqual(stripInjected(Buffer.from(PAGE)), Buffer.from(PAGE))
})

test('выгрузка: все файлы побайтно, блок omelette вырезан, прежняя цель заменена целиком', async () => {
  const { server, origin } = await platform(KIT)
  const dir = await tmp()
  try {
    const target = path.join(dir, 'kit-live')
    await mkdir(target)
    await writeFile(path.join(target, 'stale.txt'), 'old')
    const r = await exportKit({ files: parseListing(JSON.stringify(listingOf(KIT))), serve: serveBase(serveUrl(origin)), target })
    assert.equal(r.count, Object.keys(KIT).length)
    for (const [p, body] of Object.entries(KIT)) assert.equal(await readFile(path.join(target, p), 'utf8'), body, p)
    await assert.rejects(readFile(path.join(target, 'stale.txt')), 'файл прежней выгрузки должен исчезнуть')
    assert.deepEqual(await readdir(dir), ['kit-live'], 'временной папки остаться не должно')
  } finally {
    server.closeAllConnections()
    server.close()
    await rm(dir, { recursive: true, force: true })
  }
})

test('выгрузка: размер не сошёлся — отказ, прежняя цель цела, временной папки нет', async () => {
  const { server, origin } = await platform(KIT, { broken: { 'styles.css': '@import "./tokens/base.css";\n/* лишнее */\n' } })
  const dir = await tmp()
  try {
    const target = path.join(dir, 'kit')
    await mkdir(target)
    await writeFile(path.join(target, 'keep.txt'), 'old')
    await assert.rejects(
      exportKit({ files: parseListing(JSON.stringify(listingOf(KIT))), serve: serveBase(serveUrl(origin)), target }),
      /styles\.css: \d+ bytes, listing says \d+/
    )
    assert.equal(await readFile(path.join(target, 'keep.txt'), 'utf8'), 'old')
    assert.deepEqual(await readdir(dir), ['kit'])
  } finally {
    server.closeAllConnections()
    server.close()
    await rm(dir, { recursive: true, force: true })
  }
})

/* Листинг переносится из ответа MCP в файл руками, и потерянная запись — это файл, которого
   не будет в выгрузке. Размеры такую потерю не ловят: сверять не с чем. Ловит манифест кита:
   он перечисляет файлы компонентов, карточек, экранов и токенов. */
test('выгрузка: манифест ссылается на файл не из листинга — отказ, прежняя цель цела', async () => {
  const manifest = JSON.stringify({ components: [{ name: 'Button', sourcePath: 'components/forms/Button.jsx' }], startingPoints: [], cards: [], templates: [], globalCssPaths: ['tokens/base.css'], tokens: [] })
  const kit = { ...KIT, '_ds_manifest.json': manifest, 'components/forms/Button.jsx': 'export {}\n' }
  const { server, origin } = await platform(kit)
  const dir = await tmp()
  try {
    const target = path.join(dir, 'kit')
    await mkdir(target)
    await writeFile(path.join(target, 'keep.txt'), 'old')
    const lost = listingOf(kit).filter((f) => f.path !== 'components/forms/Button.jsx')
    await assert.rejects(
      exportKit({ files: parseListing(JSON.stringify(lost)), serve: serveBase(serveUrl(origin)), target }),
      /_ds_manifest\.json names 1 file.*components\/forms\/Button\.jsx/s
    )
    assert.equal(await readFile(path.join(target, 'keep.txt'), 'utf8'), 'old')
    assert.deepEqual(await readdir(dir), ['kit'])
  } finally {
    server.closeAllConnections()
    server.close()
    await rm(dir, { recursive: true, force: true })
  }
})

test('выгрузка: протухший токен — отказ с кодом ответа, без токена в сообщении', async () => {
  const { server, origin } = await platform(KIT)
  const dir = await tmp()
  try {
    await assert.rejects(
      exportKit({ files: parseListing(JSON.stringify(listingOf(KIT))), serve: serveBase(serveUrl(origin, 'stale-token-42')), target: path.join(dir, 'kit') }),
      (e) => /HTTP 302/.test(e.message) && !e.message.includes('stale-token-42')
    )
    assert.deepEqual(await readdir(dir), [])
  } finally {
    server.closeAllConnections()
    server.close()
    await rm(dir, { recursive: true, force: true })
  }
})

test('сверка импорта: совпадение, нехватка, лишнее и размер; .DS_Store не в счёт', async () => {
  const dir = await tmp()
  try {
    await writeKit(dir, KIT)
    await writeFile(path.join(dir, '.DS_Store'), 'x')
    const all = parseListing(JSON.stringify(listingOf(KIT)))
    assert.deepEqual(await compareWithDir(all, dir), { matched: 5, total: 5, missing: [], extra: [], sizeMismatch: [] })
    const partial = all
      .filter((f) => f.path !== 'styles.css')
      .map((f) => (f.path === '_ds_bundle.js' ? { ...f, size: f.size + 1 } : f))
      .concat([{ path: 'extra.md', size: 1, etag: '1' }])
    const bad = await compareWithDir(partial, dir)
    assert.equal(bad.matched, 3)
    assert.deepEqual(bad.missing, ['styles.css'])
    assert.deepEqual(bad.extra, ['extra.md'])
    assert.deepEqual(bad.sizeMismatch.map((m) => m.path), ['_ds_bundle.js'])
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('check-import: код 0 при полном совпадении, 1 при расхождении', async () => {
  const dir = await tmp()
  try {
    await writeKit(path.join(dir, 'kit'), KIT)
    await writeFile(path.join(dir, 'listing.json'), JSON.stringify(listingOf(KIT)))
    const { stdout } = await run('node', [SCRIPT, 'check-import', 'listing.json'], { cwd: dir })
    assert.match(stdout, /matched: 5 of 5/)
    await writeFile(path.join(dir, 'short.json'), JSON.stringify(listingOf(KIT).slice(1)))
    const e = await run('node', [SCRIPT, 'check-import', 'short.json'], { cwd: dir }).then(() => null, (err) => err)
    assert.equal(e?.code, 1)
    assert.match(e.stdout, /missing in the project \(1\)/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('release: листинг теряет отслеживаемый файл kit/ — отказ до выгрузки; --allow-removals пропускает', async () => {
  const { server, origin } = await platform(KIT)
  const dir = await tmp()
  try {
    await writeKit(path.join(dir, 'kit'), KIT)
    await run('git', ['init', '-q'], { cwd: dir })
    await run('git', ['add', 'kit'], { cwd: dir })
    await writeFile(path.join(dir, 'listing.json'), JSON.stringify(listingOf(KIT).filter((f) => f.path !== 'tokens/base.css')))
    const env = { ...process.env, KIT_SERVE_URL: serveUrl(origin) }
    const e = await run('node', [SCRIPT, 'release', 'listing.json'], { cwd: dir, env }).then(() => null, (err) => err)
    assert.equal(e?.code, 1)
    assert.match(e.stderr, /drops 1 tracked file.*tokens\/base\.css/s)
    assert.equal(await readFile(path.join(dir, 'kit/tokens/base.css'), 'utf8'), KIT['tokens/base.css'])
    await run('node', [SCRIPT, 'release', 'listing.json', '--allow-removals'], { cwd: dir, env })
    await assert.rejects(readFile(path.join(dir, 'kit/tokens/base.css')), 'с --allow-removals файл уходит из kit/')
  } finally {
    server.closeAllConnections()
    server.close()
    await rm(dir, { recursive: true, force: true })
  }
})

test('pull без KIT_SERVE_URL отказывает до выгрузки и ничего не пишет', async () => {
  const dir = await tmp()
  try {
    await writeFile(path.join(dir, 'listing.json'), JSON.stringify(listingOf(KIT)))
    const env = { ...process.env }
    delete env.KIT_SERVE_URL
    const e = await run('node', [SCRIPT, 'pull', 'listing.json'], { cwd: dir, env }).then(() => null, (err) => err)
    assert.equal(e?.code, 1)
    assert.match(e.stderr, /KIT_SERVE_URL/)
    assert.deepEqual(await readdir(dir), ['listing.json'])
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('pull со старым листингом отказывает', async () => {
  const dir = await tmp()
  try {
    const listing = path.join(dir, 'listing.json')
    await writeFile(listing, JSON.stringify(listingOf(KIT)))
    const old = (Date.now() - LISTING_MAX_AGE_MS - 60_000) / 1000
    await utimes(listing, old, old)
    const env = { ...process.env, KIT_SERVE_URL: new URL(`${SERVE_PATH}x.html?t=1`, 'https://h.example/').href }
    const e = await run('node', [SCRIPT, 'pull', 'listing.json'], { cwd: dir, env }).then(() => null, (err) => err)
    assert.equal(e?.code, 1)
    assert.match(e.stderr, /old/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

/* check-import запускает пользователь на свежем клоне без pnpm install. Запуск из временной
   папки этого не проверяет: пакеты ищутся от файла скрипта, а он лежит в репозитории с
   node_modules. Поэтому проверяется сам текст модуля. */
test('верхние импорты kit-export — только node:*', async () => {
  const src = await readFile(SCRIPT, 'utf8')
  const specs = [...src.matchAll(/^import\s[^'"]*['"]([^'"]+)['"]/gm)].map((m) => m[1])
  assert.ok(specs.length > 0, 'импорты не найдены — поменялась форма записи, поправь регулярку')
  assert.deepEqual(specs.filter((s) => !s.startsWith('node:')), [])
})
