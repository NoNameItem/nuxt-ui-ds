import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { assertDocsComplete, assertVersionMatch, DOCS_TAG, MIN_MD_FILES } from '../doc-pages/fetch-docs.mjs'

test('тег доки совпадает с версией пакета', () => {
  assert.equal(DOCS_TAG, 'v4.11.1')
  assert.doesNotThrow(() => assertVersionMatch('4.11.1', 'v4.11.1'))
})

test('расхождение версии и тега — ошибка с внятным текстом', () => {
  assert.throws(() => assertVersionMatch('4.12.0', 'v4.11.1'), /4\.12\.0.*v4\.11\.1/)
})

// Проверка полноты каталога — общий код и для свежей распаковки, и для попадания в кэш,
// поэтому гоняем её на настоящих файлах во временном каталоге, а не на заглушке.
async function makeDocsDir(fileCount) {
  const dir = await mkdtemp(path.join(tmpdir(), 'fetch-docs-'))
  for (let i = 0; i < fileCount; i++) {
    await writeFile(path.join(dir, `component-${i}.md`), '')
  }
  return dir
}

test('assertDocsComplete молчит, когда файлов не меньше порога', async () => {
  const dir = await makeDocsDir(MIN_MD_FILES)
  try {
    await assert.doesNotReject(() => assertDocsComplete(dir))
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('assertDocsComplete бросает, когда файлов меньше порога', async () => {
  const dir = await makeDocsDir(MIN_MD_FILES - 1)
  try {
    await assert.rejects(() => assertDocsComplete(dir), new RegExp(`${MIN_MD_FILES - 1}.*${MIN_MD_FILES}`))
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})
