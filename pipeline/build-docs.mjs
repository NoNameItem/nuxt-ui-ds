/* Сборка doc-страниц кита. Результат — файлы в dist/docs/pages; заливкой в
   проект занимается агент через MCP write_files, скрипт к MCP не ходит.

   Внимание: pnpm build:ds стирает dist/work целиком, поэтому здесь только dist/docs. */
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { keepComponent, keepDir } from './skip-dirs.mjs'
import { KIT_LIVE } from './kit-export.mjs'
import { componentsFromManifest } from './doc-pages/names.mjs'
import { ensureDocs, assertVersionMatch, DOCS_TAG } from './doc-pages/fetch-docs.mjs'
import { parseDocBlocks } from './doc-pages/parse-doc-blocks.mjs'
import { parseDefineProps, sfcDefaults } from './doc-pages/parse-props.mjs'
import { MANUAL_FIXTURES, OVERLAY_THEMES } from './doc-pages/fixtures.mjs'
import { baseProps, blockBase, buildSections, coverage } from './doc-pages/examples.mjs'
import { pageHtml } from './doc-pages/page.mjs'

const OUT = 'dist/docs'
const SFC_DIR = 'node_modules/@nuxt/ui/dist/runtime/components'

async function findSfc(name) {
  const stack = [SFC_DIR]
  while (stack.length) {
    const dir = stack.pop()
    for (const e of await readdir(dir, { withFileTypes: true })) {
      if (e.isDirectory()) { if (keepDir(e.name)) stack.push(path.join(dir, e.name)) }
      else if (e.name === `${name}.vue`) return path.join(dir, e.name)
    }
  }
  return null
}

/* Три источника пропов, первый выигрывает: вариант темы, слот, проп из SFC.

   Отсеивать повторы надо по наличию имени, а не по истинности значения:
   слот без собственных классов — пустая строка, она falsy, и одноимённый проп
   из SFC проскакивал второй строкой. Пустых слотов в темах 97, на них
   попадались 12 компонентов: DashboardNavbar (toggle), CommandPalette
   (input, close), PricingPlan (badge, button) и другие. */
function propsTable(theme, parsed) {
  const variants = theme.variants || {}
  const rows = []
  const taken = new Set()
  const add = (row) => { if (taken.has(row.prop)) return; taken.add(row.prop); rows.push(row) }
  for (const [k, vals] of Object.entries(variants)) {
    add({ prop: k, type: 'variant', values: Object.keys(vals).join(' | '), def: (theme.defaultVariants || {})[k], from: 'variants' })
  }
  for (const s of Object.keys(theme.slots || {})) {
    add({ prop: s, type: 'ReactNode', values: 'содержимое слота', def: '', from: 'slot' })
  }
  for (const [k, p] of Object.entries(parsed)) {
    add({ prop: k, type: p.type, values: '', def: p.default, from: 'SFC' })
  }
  return rows
}

export async function buildAll({ dryRun = false } = {}) {
  const pkg = JSON.parse(await readFile('node_modules/@nuxt/ui/package.json', 'utf8'))
  assertVersionMatch(pkg.version, DOCS_TAG)
  const docsDir = await ensureDocs(path.join(OUT, 'uidocs'))
  const docFiles = new Set(await readdir(docsDir))
  const manifest = JSON.parse(await readFile(path.join(KIT_LIVE, '_ds_manifest.json'), 'utf8'))
  const themes = JSON.parse(await readFile(path.join(OUT, 'themes.json'), 'utf8'))
  const byShort = new Map(Object.entries(themes).map(([k, v]) => [k.split('/').pop(), v]))

  const pages = []
  const total = { values: { total: 0, hit: 0, missing: [] }, rules: { total: 0, hit: 0, missing: [] } }

  for (const c of componentsFromManifest(manifest)) {
    /* манифест — снимок кита: выведенный компонент мог в нём задержаться до раунда удаления */
    if (!keepComponent(c.name)) continue
    const theme = byShort.get(c.themeName) || { slots: {}, variants: {}, compoundVariants: [], defaultVariants: {} }
    const sfcPath = await findSfc(c.name)
    const parsed = sfcPath ? parseDefineProps(await readFile(sfcPath, 'utf8')) : {}
    const blocks = docFiles.has(`${c.themeName}.md`)
      ? parseDocBlocks(await readFile(path.join(docsDir, `${c.themeName}.md`), 'utf8'))
      : []
    /* Фикстура — первый блок доки целиком, через тот же blockBase, что и остальные
       разделы: у 43 блоков содержимое лежит в items, а не в props/slots. */
    const fixture = blocks.length ? blockBase(blocks[0]) : (MANUAL_FIXTURES[c.themeName] || {})
    /* Оверлеи рисуют содержимое только в открытом состоянии, а в доке их первый блок
       описывает кнопку-триггер и про open ничего не знает. Без этого страницы
       modal, slideover, drawer, popover, tooltip и меню вышли бы пустыми рамками. */
    if (OVERLAY_THEMES.has(c.themeName)) fixture.open = true
    const sections = buildSections({
      themeName: c.themeName, theme, sfcDef: sfcDefaults(parsed), blocks, fixture, docSlug: c.themeName
    })
    const cov = coverage(theme, sections)
    total.values.total += cov.values.total; total.values.hit += cov.values.hit
    total.rules.total += cov.rules.total; total.rules.hit += cov.rules.hit
    for (const m of cov.values.missing) total.values.missing.push(`${c.name}: ${m}`)
    for (const m of cov.rules.missing) total.rules.missing.push(`${c.name}: правило ${m}`)

    const doc = {
      name: c.name, theme: c.themeName, group: c.group,
      framed: OVERLAY_THEMES.has(c.themeName),
      docUrl: `https://ui.nuxt.com/docs/components/${c.themeName}`,
      propsTable: propsTable(theme, parsed), sections,
      /* Дефолты пропов, которые применяет живой компонент. Разделы, взятые из
         доки, несут только пропы блока, а не то, что компонент подставляет
         сам — приёмке нужны и те и другие, сниппетам Vue (baseProps внутри
         buildSections) — только свои. */
      defaults: baseProps(theme, sfcDefaults(parsed))
    }
    pages.push({ name: c.name, group: c.group, path: `components/${c.group}/${c.name}.doc.html`, html: pageHtml(doc) })
  }

  if (!dryRun) {
    await rm(path.join(OUT, 'pages'), { recursive: true, force: true })
    await mkdir(path.join(OUT, 'pages'), { recursive: true })
    for (const p of pages) await writeFile(path.join(OUT, 'pages', `${p.name}.doc.html`), p.html)
    await writeFile(path.join(OUT, 'coverage.md'), report(total, pages))
    await writeFile(path.join(OUT, 'index.html'), indexHtml(pages))
  }
  return { pages, coverage: total }
}

function report(t, pages) {
  return `# Покрытие\n\nСтраниц: ${pages.length}\n\n`
    + `Значения variants: ${t.values.hit} / ${t.values.total}\n\n`
    + `Правила compoundVariants: ${t.rules.hit} / ${t.rules.total}\n\n`
    + (t.values.missing.length ? `## Не покрытые значения\n\n${t.values.missing.map((x) => '- ' + x).join('\n')}\n\n` : '')
    + (t.rules.missing.length ? `## Не покрытые правила\n\n${t.rules.missing.map((x) => '- ' + x).join('\n')}\n` : '')
}

function indexHtml(pages) {
  const groups = {}
  for (const p of pages) (groups[p.group] ||= []).push(p)
  const body = Object.entries(groups).sort().map(([g, list]) =>
    `<section class="ds-section"><h2>${g}</h2><ul class="ds-index">`
    + list.sort((a, b) => a.name.localeCompare(b.name))
        .map((p) => `<li><a href="${p.path}">${p.name}</a></li>`).join('')
    + '</ul></section>').join('\n')
  return `<!-- @dsCard group="Docs" viewport="900x600" name="Все компоненты" subtitle="Страница на каждый из ${pages.length} компонентов: вариации по пропам и код" -->
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="lib/docs.css">
</head><body class="bg-default text-default">
<main class="ds-page"><h1>Компоненты</h1>
${body}
<footer class="ds-foot">Разделы и содержимое примеров — из документации @nuxt/ui 4.11.1 (MIT).</footer>
</main></body></html>
`
}

if (import.meta.filename === process.argv[1]) {
  const res = await buildAll()
  console.log(`страниц ${res.pages.length}, значения ${res.coverage.values.hit}/${res.coverage.values.total}, правила ${res.coverage.rules.hit}/${res.coverage.rules.total}`)
  if (res.coverage.values.missing.length || res.coverage.rules.missing.length) {
    console.error('покрытие неполное, см. dist/docs/coverage.md')
    process.exit(1)
  }
}
