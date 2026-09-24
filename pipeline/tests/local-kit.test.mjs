import { test } from 'node:test'
import assert from 'node:assert/strict'
import { access, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { missingKitImports, serve } from '../audit/local-kit.mjs'

test('локальная копия несёт все файлы, которые импортирует styles.css', async (t) => {
  try {
    await access('dist/kit-live/styles.css')
  } catch { return t.skip('нет dist/kit-live — выполни pnpm kit:pull') }
  assert.deepEqual(await missingKitImports(), [])
})

// Кейс с недостающим файлом собирается на фикстуре во временном каталоге, а не на
// dist/kit-live: он и есть доказательство, что защита в assembleLocalKit()
// действительно ловит неполноту, а не проходит вхолостую, когда статика на месте.
test('missingKitImports называет файл, которого не хватает на диске', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'local-kit-'))
  try {
    await mkdir(path.join(dir, 'tokens'), { recursive: true })
    await writeFile(path.join(dir, 'tokens', 'base.css'), '')
    await writeFile(
      path.join(dir, 'styles.css'),
      '@import "./tokens/base.css";\n@import "./tokens/missing.css";\n',
    )
    assert.deepEqual(await missingKitImports(dir), ['tokens/missing.css'])
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('serve отдаёт index.html для URL каталога', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'serve-'))
  try {
    await mkdir(path.join(dir, 'parity', 'badge'), { recursive: true })
    await writeFile(path.join(dir, 'parity', 'badge', 'index.html'), '<p>ok</p>')
    const { server, port } = await serve(dir)
    try {
      const res = await fetch(`http://127.0.0.1:${port}/parity/badge/`)
      assert.equal(res.status, 200)
      assert.equal(res.headers.get('content-type'), 'text/html')
      assert.equal(await res.text(), '<p>ok</p>')
      assert.equal((await fetch(`http://127.0.0.1:${port}/nope.html`)).status, 404)
    } finally {
      server.close()
    }
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})
