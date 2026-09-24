import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { buildAll } from '../build-docs.mjs'
import { componentsFromManifest } from '../doc-pages/names.mjs'
import { keepComponent } from '../skip-dirs.mjs'

test('сборка даёт страницу на каждый компонент и полное покрытие', async (t) => {
  if (!existsSync('dist/kit-live/_ds_manifest.json') || !existsSync('dist/docs/themes.json')) {
    return t.skip('нет манифеста кита или themes.json — выполни pnpm kit:pull и пайплайн до build:docs')
  }
  const res = await buildAll({ dryRun: true })
  /* Страница на каждый компонент манифеста, кроме выведенных из кита (SKIP_COMPONENTS):
     число считается из того же снимка манифеста, а не записывается константой — снимок
     перезабирается с кита, и константа устаревала вместе с ним. */
  const manifest = JSON.parse(await readFile('dist/kit-live/_ds_manifest.json', 'utf8'))
  const expected = componentsFromManifest(manifest).filter((c) => keepComponent(c.name))
  assert.ok(expected.length > 100, `в манифесте ${expected.length} компонентов — снимок не тот`)
  assert.deepEqual(res.pages.map((p) => p.name).sort(), expected.map((c) => c.name).sort())
  assert.equal(res.coverage.values.missing.length, 0)
  assert.equal(res.coverage.rules.missing.length, 0)
  assert.ok(res.pages.every((p) => p.html.includes('id="ds-doc"')))
})

test('в таблице пропов нет повторяющихся имён', async (t) => {
  if (!existsSync('dist/kit-live/_ds_manifest.json') || !existsSync('dist/docs/themes.json')) {
    return t.skip('нет манифеста кита или themes.json — выполни pnpm kit:pull и пайплайн до build:docs')
  }
  const res = await buildAll({ dryRun: true })
  const dupes = []
  for (const p of res.pages) {
    const doc = JSON.parse(/id="ds-doc">([\s\S]*?)<\/script>/.exec(p.html)[1])
    const seen = new Set()
    for (const r of doc.propsTable) {
      if (seen.has(r.prop)) dupes.push(`${doc.name}.${r.prop}`)
      seen.add(r.prop)
    }
  }
  assert.deepEqual(dupes, [], 'слот и проп с одним именем должны давать одну строку')
})
