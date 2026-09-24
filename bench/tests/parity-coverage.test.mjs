import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile, readdir } from 'node:fs/promises'
import { pageNames } from '../scripts/pages.mjs'

/* Семь ключей из 112 выведены из состава стенда решением спеки
   (journal/specs/2026-09-15-visual-parity-testbed-design.md, «Сознательно не
   входит») — остаётся 105 компонентов. (Pricing и Changelog сюда не входят: они выведены
   из кита целиком, и их тем в themes.json нет вовсе — SKIP_COMPONENTS в pipeline/skip-dirs.mjs.) Причина у обоих одна: статического кадра, годного
   для сверки, у них нет. `Calendar.vue` подставляет `today(getLocalTimeZone())` и читает
   локаль, то есть кадр зависит от дня съёмки; `editor*` работают вокруг живого экземпляра
   Tiptap (`EditorToolbar.vue`: `editor: { required: true }`), которого у кита нет вовсе.
   Эти семь не проверяются ничем другим, поэтому снимать исключение можно только вместе с
   появлением страниц и артбордов на них. */
const EXCLUDED = (name) => name === 'calendar' || name.startsWith('editor')

/* Ловит забытый компонент и забытую тему артборда, не дрейф содержимого. */
test('у каждого компонента есть страница и оба артборда', async (t) => {
  if (!existsSync('dist/docs/themes.json')) {
    return t.skip('нет dist/docs/themes.json: выполни pnpm build:ds и скопируй темы')
  }
  const names = Object.keys(JSON.parse(await readFile('dist/docs/themes.json', 'utf8'))).filter((n) => !EXCLUDED(n))
  const pages = pageNames()
  const artboards = new Set((await readdir('bench/artboards').catch(() => [])).filter((f) => f.endsWith('.html')))

  const expectedArtboards = new Set(pages.flatMap((p) => [`${p}.html`, `${p}.dark.html`]))

  const noPage = names.filter((n) => !pages.some((p) => p === n || p.startsWith(`${n}--`)))
  const noArtboard = [...expectedArtboards].filter((f) => !artboards.has(f))
  const orphanPage = pages.filter((p) => !names.includes(p.split('--')[0]))
  /* Четвёртое направление: артборд, переживший переименование страницы. shoot.mjs его не
     снимет и не заметит, но на платформу он зальётся и будет жить там как действующий. */
  const orphanArtboard = [...artboards].filter((f) => !expectedArtboards.has(f)).sort()

  assert.deepEqual(noPage, [], 'компоненты без страницы')
  assert.deepEqual(noArtboard, [], 'страницы без артборда на одну из тем')
  assert.deepEqual(orphanPage, [], 'страницы, не соответствующие ключу themes.json')
  assert.deepEqual(orphanArtboard, [], 'артборды без страницы')
})
