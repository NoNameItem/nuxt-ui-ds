/* Дока Nuxt UI по закреплённому тегу. Источник разделов и содержимого примеров.
   Тег обязан совпадать с версией установленного пакета: иначе фикстуры разъедутся
   с темами, и страница будет обещать не то, что кит рисует. */
import { execFileSync } from 'node:child_process'
import { mkdir, readdir, rm, stat } from 'node:fs/promises'
import path from 'node:path'

export const DOCS_TAG = 'v4.11.1'
const CONTENT = 'docs/content/docs/2.components'
// Порог полноты каталога доки. Общий и для свежей распаковки, и для проверки кэша —
// иначе обрыв прошлой загрузки или смена тега без очистки destDir молча отдаст
// неполный или устаревший каталог.
export const MIN_MD_FILES = 120

// Кэш битый (не найден, или файлов меньше порога) — вызывающий код обязан перекачать.
export async function assertDocsComplete(dir) {
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'))
  if (files.length < MIN_MD_FILES) {
    throw new Error(`В каталоге ${dir} ${files.length} файлов доки, ожидалось не меньше ${MIN_MD_FILES}.`)
  }
}

export function assertVersionMatch(pkgVersion, tag) {
  if (`v${pkgVersion}` !== tag) {
    throw new Error(`@nuxt/ui ${pkgVersion} не совпадает с тегом доки ${tag}. Обнови DOCS_TAG в pipeline/doc-pages/fetch-docs.mjs.`)
  }
}

export async function ensureDocs(destDir) {
  // Каталог кэша ключуется тегом, чтобы смена DOCS_TAG не могла попасть в чужой кэш.
  const tagDir = path.join(destDir, DOCS_TAG)
  const out = path.join(tagDir, CONTENT)
  if (await stat(out).then(() => true, () => false)) {
    try {
      await assertDocsComplete(out)
      return out
    } catch {
      // Кэш неполный (оборвалась прошлая загрузка) — сносим и качаем заново.
      await rm(tagDir, { recursive: true, force: true })
    }
  }
  await mkdir(tagDir, { recursive: true })
  const tgz = path.join(destDir, 'ui.tgz')
  execFileSync('curl', ['-sSL', '--max-time', '300', '-o', tgz,
    `https://codeload.github.com/nuxt/ui/tar.gz/refs/tags/${DOCS_TAG}`])
  execFileSync('tar', ['-xzf', tgz, '-C', tagDir, '--strip-components=1',
    `ui-${DOCS_TAG.slice(1)}/${CONTENT}`])
  await rm(tgz, { force: true })
  await assertDocsComplete(out)
  return out
}
