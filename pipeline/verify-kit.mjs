// Приёмка кита в Claude Design: сверяет темы, зашитые в собранный платформой
// `_ds_bundle.js`, с `themes.json` из нашего пакета — по значениям, не по названиям.
//
//   node pipeline/verify-kit.mjs <путь-или-URL к _ds_bundle.js> [dist/work/nuxt-ui-<v>-ds/themes.json]
//
// URL бандла даёт `render_preview` (MCP claude-design) для любого файла проекта:
// в serve_url заменить путь на `_ds_bundle.js`. Успех — «отличается: 0, нет в ките: 0».
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const [src, themesArg] = process.argv.slice(2)
if (!src) { console.error('Укажите путь или URL к _ds_bundle.js'); process.exit(2) }

const root = path.resolve(import.meta.dirname, '..')
const themesPath = themesArg ?? await (async () => {
  const work = path.join(root, 'dist', 'work')
  const dirs = (await readdir(work)).filter(d => d.endsWith('-ds'))
  if (dirs.length !== 1) throw new Error(`Ожидал одну папку в dist/work, нашёл: ${dirs.join(', ') || 'ничего'}. Укажите themes.json явно.`)
  return path.join(work, dirs[0], 'themes.json')
})()

const ref = JSON.parse(await readFile(themesPath, 'utf8'))
const bundle = /^https?:/.test(src) ? await (await fetch(src)).text() : await readFile(src, 'utf8')

function balanced(s, i) {
  let d = 0
  for (let j = i; j < s.length; j++) {
    if (s[j] === '{') d++
    else if (s[j] === '}' && --d === 0) return s.slice(i, j + 1)
  }
  return null
}

// Платформа оставляет в каждом компоненте комментарий со ссылкой на themes/<name>.ts
// и рядом объявляет `const theme = {…}` — литерал в JSON-совместимой записи.
const found = {}
for (const m of bundle.matchAll(/themes\/([a-z0-9-]+)\.ts/g)) {
  const name = m[1]
  // Форма объявления менялась от генерации к генерации:
  // 2026-08-25 — `const theme = {`, 2026-09-13 — `export const buttonTheme = {`.
  const decl = /(?:const theme|Theme) = \{/g
  decl.lastIndex = m.index + m[0].length
  const d = decl.exec(bundle)
  if (!d || d.index - m.index > 4000) continue
  const body = balanced(bundle, d.index + d[0].length - 1)
  if (!body) continue
  try { found[name] = JSON.parse(body) } catch { found[name] ??= null }
}

const same = [], diff = [], missing = [], unparsed = []
for (const [name, theme] of Object.entries(ref)) {
  if (!(name in found)) { missing.push(name); continue }
  if (found[name] === null) { unparsed.push(name); continue }
  ;(JSON.stringify(found[name]) === JSON.stringify(theme) ? same : diff).push(name)
}
console.log(`тем в ките: ${Object.keys(found).length}   тем в источнике: ${Object.keys(ref).length}`)
console.log(`совпало полностью: ${same.length}`)
console.log(`отличается:        ${diff.length}  ${diff.sort().join(' ')}`)
console.log(`не разобрано:      ${unparsed.length}  ${unparsed.sort().join(' ')}`)
console.log(`нет в ките:        ${missing.length}  ${missing.sort().join(' ')}`)
process.exit(diff.length || missing.length ? 1 : 0)
