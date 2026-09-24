import { createRequire } from 'node:module'
import { realpathSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

/* Настоящий Tailwind с CSS самой библиотеки — ответ на вопрос «есть ли у класса правило
   в библиотеке», а не только в ките. Проверка 3 ловит класс без правила в tokens кита, но
   часть таких классов не существует и у библиотеки: тема пишет `align-center` (Separator),
   `column-1` (PageColumns), `[&_pre_code]:font-inherit` (Editor), и Tailwind с темой
   Nuxt UI для них не выдаёт ничего. Это не пробел кита — он повторяет библиотеку
   буквально.

   CSS стенда (`.output`) для этого не годится: в нём только классы, которые встретились на
   страницах стенда, и отсутствие там правила ничего не доказывает. Здесь каждый класс
   компилируется поштучно тем же @tailwindcss/node, которым собирает библиотека, поверх
   `@import "tailwindcss"` и `dist/runtime/index.css` из node_modules/@nuxt/ui.

   tailwindcss и @tailwindcss/node в корень проекта не подняты — их приносит библиотека
   (pnpm), поэтому разрешение идёт от её каталога: @nuxt/ui → @tailwindcss/vite →
   @tailwindcss/node. */
export async function libraryTailwind(root = process.cwd()) {
  const ui = realpathSync(path.join(root, 'node_modules/@nuxt/ui'))
  const vite = createRequire(path.join(ui, 'package.json')).resolve('@tailwindcss/vite')
  const { compile } = await import(pathToFileURL(createRequire(vite).resolve('@tailwindcss/node')).href)
  const compiler = await compile(`@import "tailwindcss"; @import "${path.join(ui, 'dist/runtime/index.css')}";`, { base: ui, onDependency() {} })
  const cache = new Map()
  const esc = (c) => '.' + c.replace(/[^A-Za-z0-9_\u0080-￿-]/g, (ch) => '\\' + ch)
  return {
    /* Даёт ли Tailwind библиотеки правило для класса. build накопителен (каждый вызов
       добавляет кандидата к уже собранным), поэтому ищется селектор именно этого класса. */
    generates(c) {
      if (!cache.has(c)) cache.set(c, compiler.build([c]).includes(esc(c)))
      return cache.get(c)
    }
  }
}
