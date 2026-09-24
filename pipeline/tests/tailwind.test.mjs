import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { libraryTailwind } from '../audit/tailwind.mjs'
import { checkCssPresence } from '../audit/checks.mjs'

/* Проба повторяет замер 24.09: три класса из тем библиотеки правила не получают и у неё
   самой, а классы, которых не хватает CSS кита, — настоящие утилиты. Если Tailwind или
   тема Nuxt UI начнут их генерировать (или перестанут), тест скажет об этом раньше
   приёмки. */
test('Tailwind библиотеки: мёртвые классы тем против настоящих утилит', async (t) => {
  if (!existsSync('node_modules/@nuxt/ui')) return t.skip('нет node_modules/@nuxt/ui')
  const tw = await libraryTailwind()
  for (const c of ['align-center', 'column-1', '[&_pre_code]:font-inherit']) assert.equal(tw.generates(c), false, `${c}: правило появилось — исключение больше не нужно`)
  for (const c of ['text-inherit', 'rotate-180', 'text-highlighted', 'bg-elevated/50', 'min-h-[100dvh]']) assert.equal(tw.generates(c), true, `${c}: Tailwind библиотеки должен давать правило`)
})

test('проверка 3: класс без правила и у библиотеки уходит в отдельный список, остальные — расхождения', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'p-4 align-center rotate-180' }] }] }
  const res = checkCssPresence(payload, '.p-4 { padding: 16px }', new Set(['align-center']), { generates: (c) => c !== 'align-center' })
  assert.deepEqual(res.failures.map((f) => f.got), ['rotate-180'], 'класс, который библиотека генерирует, остаётся пробелом кита')
  assert.deepEqual(res.deadInLibrary.map((f) => f.got), ['align-center'])
  const bare = checkCssPresence(payload, '.p-4 { padding: 16px }')
  assert.equal(bare.failures.length, 2, 'без пробы поведение прежнее')
})
