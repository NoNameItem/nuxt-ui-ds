import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile, readdir } from 'node:fs/promises'
import { buildSections, coverage } from '../doc-pages/examples.mjs'
import { parseDocBlocks } from '../doc-pages/parse-doc-blocks.mjs'
import { ensureDocs } from '../doc-pages/fetch-docs.mjs'
import { MANUAL_FIXTURES } from '../doc-pages/fixtures.mjs'

test('покрытие 100% по всем темам', async (t) => {
  if (!existsSync('dist/docs/themes.json')) {
    return t.skip('нет dist/docs/themes.json: выполни pnpm build:ds и скопируй темы, см. шаг 5 задачи 6')
  }
  const themes = JSON.parse(await readFile('dist/docs/themes.json', 'utf8'))
  /* путь берём у ensureDocs: каталог кэша ключуется тегом, хардкодить его нельзя */
  const docsDir = await ensureDocs('dist/docs/uidocs')
  const files = new Set(await readdir(docsDir))
  let vT = 0, vH = 0, rT = 0, rH = 0
  const bad = []
  for (const [themeName, theme] of Object.entries(themes)) {
    const short = themeName.split('/').pop()
    const md = files.has(`${short}.md`) ? await readFile(`${docsDir}/${short}.md`, 'utf8') : ''
    const blocks = md ? parseDocBlocks(md) : []
    const fixture = blocks[0] ? {} : (MANUAL_FIXTURES[short] || {})
    const secs = buildSections({ themeName: short, theme, sfcDef: {}, blocks, fixture, docSlug: short })
    const c = coverage(theme, secs)
    vT += c.values.total; vH += c.values.hit; rT += c.rules.total; rH += c.rules.hit
    if (c.values.missing.length || c.rules.missing.length) bad.push(`${short}: значений ${c.values.missing.length}, правил ${c.rules.missing.length}`)
  }
  console.log(`значения ${vH}/${vT}, правила ${rH}/${rT}`)
  assert.deepEqual(bad, [])
})
