// Собирает пакет для импорта дизайн-системы Nuxt UI в Claude Design.
//
// Источники (все — из этого проекта, после `nuxt prepare`):
//   .nuxt/ui/*.ts                                — темы, разрешённые для установленной версии
//   node_modules/@nuxt/ui/dist/runtime/components — шаблоны компонентов (Vue SFC)
//   .nuxt/ui.css + dist/runtime/index.css + keyframes.css — токены и CSS-переменные
//
// Результат: dist/nuxt-ui-<version>-ds.zip из шести файлов. Именно такой компактный
// пакет Claude Design принимает целиком; прямая загрузка ~300 исходных файлов
// упирается в лимит числа файлов (проверено 2026-08-25).
import { mkdir, readdir, readFile, rm, writeFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { keepComponent, keepDir } from './skip-dirs.mjs'
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const uiDir = path.join(root, 'node_modules', '@nuxt', 'ui')
const uiPkg = JSON.parse(await readFile(path.join(uiDir, 'package.json'), 'utf8'))
const version = uiPkg.version

const themesDir = path.join(root, '.nuxt', 'ui')
const componentsDir = path.join(uiDir, 'dist', 'runtime', 'components')
const out = path.join(root, 'dist', 'work', `nuxt-ui-${version}-ds`)
const zipPath = path.join(root, 'dist', `nuxt-ui-${version}-ds.zip`)

// Порог разбиения markdown с шаблонами (байт). Два файла по ~370 КБ платформа приняла.
const PART_LIMIT = 380_000

async function exists(p) { return stat(p).then(() => true, () => false) }

if (!(await exists(themesDir))) {
  console.error('Нет .nuxt/ui — сначала `pnpm nuxt prepare`.')
  process.exit(1)
}

await rm(path.dirname(out), { recursive: true, force: true })
await mkdir(out, { recursive: true })

// 1. Темы → themes.json. Импортируем .ts напрямую: Node снимает типы сам,
//    а `as const` / `as typeof x[number]` — стираемый синтаксис.
const themes = {}
for (const f of (await readdir(themesDir)).filter(n => n.endsWith('.ts') && n !== 'index.ts' && keepComponent(n)).sort()) {
  const mod = await import(pathToFileURL(path.join(themesDir, f)).href)
  themes[f.replace(/\.ts$/, '')] = mod.default
}
await writeFile(path.join(out, 'themes.json'), JSON.stringify(themes, null, 1))

// 2. Шаблоны → components-N.md
async function* walk(dir, rel = '') {
  for (const e of (await readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const r = path.join(rel, e.name)
    if (e.isDirectory()) { if (keepDir(e.name)) yield* walk(path.join(dir, e.name), r) }
    else if (e.name.endsWith('.vue') && keepComponent(e.name)) yield r
  }
}
const chunks = []
for await (const rel of walk(componentsDir)) {
  const txt = (await readFile(path.join(componentsDir, rel), 'utf8')).trimEnd()
  chunks.push(`\n\n## ${rel}\n\n\`\`\`vue\n${txt}\n\`\`\`\n`)
}
const parts = []
let cur = [], size = 0
for (const c of chunks) {
  if (size + c.length > PART_LIMIT && cur.length) { parts.push(cur); cur = []; size = 0 }
  cur.push(c); size += c.length
}
if (cur.length) parts.push(cur)
for (const [i, p] of parts.entries()) {
  const head = `# Шаблоны компонентов @nuxt/ui ${version} — часть ${i + 1} из ${parts.length}\n`
    + 'Источник истины по структуре DOM. Узлы помечены `data-slot`; имя слота совпадает\n'
    + 'с ключом в `slots` соответствующей темы из `themes.json`.\n'
  await writeFile(path.join(out, `components-${i + 1}.md`), head + p.join(''))
}

// 3. Токены → tokens.css: сгенерированный ui.css (палитра oklch, @theme) + index.css
//    (переменные --ui-* для light/dark) + keyframes. @source/@import-директивы Nuxt
//    вне сборки бессмысленны — убираем.
const strip = s => s.replace(/@(source|import)\s[^;]*;/g, '').trim()
const tokens = [
  `/* Nuxt UI ${version} — токены. Собрано из .nuxt/ui.css, dist/runtime/index.css, keyframes.css */`,
  strip(await readFile(path.join(root, '.nuxt', 'ui.css'), 'utf8')),
  strip(await readFile(path.join(uiDir, 'dist', 'runtime', 'index.css'), 'utf8')),
  strip(await readFile(path.join(uiDir, 'dist', 'runtime', 'keyframes.css'), 'utf8')),
].join('\n\n')
await writeFile(path.join(out, 'tokens.css'), tokens)

// 4. Дефолтные иконки → icons.json. В шаблонах они читаются как appConfig.ui.icons.X
//    (chevronDown, check, close, loading…); без карты генератор их не находит и
//    компоненты остаются без стрелок, галочек и разделителей (проверено 2026-09-13).
const shared = path.join(uiDir, 'dist', 'shared')
const sharedFile = (await readdir(shared)).find(f => f.startsWith('ui.') && f.endsWith('.mjs'))
const sharedSrc = await readFile(path.join(shared, sharedFile), 'utf8')
const iconsBlock = sharedSrc.slice(sharedSrc.indexOf('const defaultIcons = {'), sharedSrc.indexOf('};', sharedSrc.indexOf('const defaultIcons = {')) + 1)
const icons = Object.fromEntries([...iconsBlock.matchAll(/(\w+): "([^"]+)"/g)].map(m => [m[1], m[2]]))
await writeFile(path.join(out, 'icons.json'), JSON.stringify(icons, null, 1))

// 5. README для модели, собирающей кит.
const componentCount = chunks.length
const readme = (await readFile(path.join(root, 'pipeline', 'bundle-README.md'), 'utf8'))
  .replaceAll('{{version}}', version)
  .replaceAll('{{themes}}', String(Object.keys(themes).length))
  .replaceAll('{{components}}', String(componentCount))
  .replaceAll('{{parts}}', String(parts.length))
  .replaceAll('{{icons}}', String(Object.keys(icons).length))
await writeFile(path.join(out, 'README.md'), readme)

// 6. zip
await rm(zipPath, { force: true })
execFileSync('zip', ['-qr', zipPath, path.basename(out)], { cwd: path.dirname(out) })

const files = await readdir(out)
console.log(`@nuxt/ui ${version}: тем ${Object.keys(themes).length}, шаблонов ${componentCount}, частей ${parts.length}`)
for (const f of files.sort()) console.log(`  ${String((await stat(path.join(out, f))).size).padStart(8)}  ${f}`)
console.log(`\n${zipPath}  (${(await stat(zipPath)).size} байт)`)
