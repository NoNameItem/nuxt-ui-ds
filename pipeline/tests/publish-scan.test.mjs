/* Сканер публичного дерева: всё, что отдаёт `git ls-files`, уходит на GitHub при пуше.
   Отдельный git-хук не нужен и не спорит с хуками beads — сканер идёт в каждом `pnpm test`.

   Читается рабочее дерево по списку индекса. Перед первым коммитом нового репозитория это
   одно и то же: сначала `git add -A`, потом `pnpm test`. До `git add` в пустом репозитории
   список пуст, и сканер прошёл бы, ничего не проверив, — поэтому пустой список здесь
   ошибка, а не ноль находок.

   Шаблоны двух видов. Общие лежат здесь и записаны так, чтобы их собственный текст с ними не
   совпадал: точки и косые экранированы. Частные — journal/scan-patterns.txt: id проектов,
   их префиксы, строки из буфера обмена. Файл частный, потому что шаблоны сами и есть утечка;
   частный шаблон в выводе называется номером строки, а не текстом. */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'

const COMMON = [
  { name: 'хост платформы', re: /claudeusercontent\.com/g },
  /* Только URL: коду выгрузки нужен литерал сегмента, а настоящий serve_url всегда со схемой. */
  { name: 'адрес serve с токеном', re: /https?:\/\/[^\s'"`<>)]*\/serve\//g },
  { name: 'ссылка на проект Claude Design', re: /claude\.ai\/design\/p\//g },
  { name: 'домашний каталог', re: /\/Users\//g },
  { name: 'адрес почты', re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g },
  { name: 'UUID', re: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi }
]

/* Разрешённое вырезается из текста до проверки, и только в названных путях. */
const ALLOW = [
  /* Пространство имён бандла: платформа строит его из имени дизайн-системы и первых шести
     знаков id проекта кита. Записано в бандле, манифесте, карточках и ui_kits кита и во всех
     артбордах стенда; решение оставить — NOTICE.md. Регулярка, а не строка: строка в этом
     файле сама совпала бы с частным шаблоном. */
  { paths: ['kit/', 'bench/artboards/'], re: /NuxtUIDesignSystem_[0-9a-f]{6}/g },
  /* Выдуманные адреса из демо-данных, которые сгенерировала платформа; kit/ хранится
     побайтно, править его нельзя. */
  { paths: ['kit/'], re: /ada@algo\.dev|mh@apollo\.io|kj@nasa\.gov|grace@navy\.mil|alan@bletchley\.uk|you@example\.com/g },
  /* Контакт автора glob в тексте deprecated, который npm кладёт в лок-файл. */
  { paths: ['pnpm-lock.yaml'], re: /i@izs\.me/g },
  /* Адрес атрибуции агента в трейлере Co-Authored-By — не личный. */
  { paths: [''], re: /noreply@anthropic\.com/g }
]

const PRIVATE_FILE = 'journal/scan-patterns.txt'

function privatePatterns() {
  if (!existsSync(PRIVATE_FILE)) return null
  return readFileSync(PRIVATE_FILE, 'utf8')
    .split('\n')
    .map((text, i) => ({ line: i + 1, text: text.trim() }))
    .filter((p) => p.text && !p.text.startsWith('#'))
}

function trackedFiles() {
  const list = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean)
  const files = []
  const unreadable = []
  for (const file of list) {
    let buf
    try {
      buf = readFileSync(file)
    } catch {
      unreadable.push(file)
      continue
    }
    if (buf.subarray(0, 8000).includes(0)) continue // двоичный: demo.png
    files.push({ path: file, text: buf.toString('utf8') })
  }
  return { count: list.length, files, unreadable }
}

function findLeaks(files, { patterns = COMMON, strings = [] } = {}) {
  const leaks = []
  for (const { path, text } of files) {
    let t = text
    for (const a of ALLOW) if (a.paths.some((p) => path.startsWith(p))) t = t.replace(a.re, '')
    for (const p of patterns) for (const m of t.matchAll(p.re)) leaks.push(`${path}: ${p.name} «${m[0]}»`)
    const lower = t.toLowerCase()
    for (const s of strings) if (lower.includes(s.text.toLowerCase())) leaks.push(`${path}: частный шаблон, строка ${s.line} ${PRIVATE_FILE}`)
  }
  return leaks
}

/* Положительный контроль: сканер, который ничего не находит, выглядит так же, как чистое
   дерево. Образцы собираются из частей, чтобы исходник этого файла сам не был находкой. */
test('каждый общий шаблон срабатывает на своём образце', () => {
  const planted = [
    ['claudeusercontent', 'com'].join('.'),
    ['https:', '', 'h.example', 'v1', 'serve', 'x.html'].join('/'),
    ['claude.ai', 'design', 'p', 'x'].join('/'),
    ['', 'Users', 'someone', ''].join('/'),
    ['someone', 'example.org'].join('@'),
    ['12345678', '1234', '1234', '1234', '123456789abc'].join('-')
  ]
  assert.equal(planted.length, COMMON.length, 'на каждый общий шаблон нужен образец')
  planted.forEach((text, i) => {
    const leaks = findLeaks([{ path: 'x.md', text }])
    assert.equal(leaks.length, 1, `шаблон «${COMMON[i].name}» не сработал или сработал не один`)
    assert.ok(leaks[0].includes(COMMON[i].name), leaks[0])
  })
})

test('частный шаблон срабатывает, разрешённое вырезается только в своих путях', () => {
  const ns = ['NuxtUIDesignSystem', 'abcdef'].join('_')
  const strings = [{ line: 1, text: 'abcdef' }]
  assert.deepEqual(findLeaks([{ path: 'kit/x.html', text: ns }], { strings }), [])
  assert.deepEqual(findLeaks([{ path: 'bench/artboards/x.html', text: ns }], { strings }), [])
  assert.equal(findLeaks([{ path: 'README.md', text: ns }], { strings }).length, 1)
  assert.equal(findLeaks([{ path: 'README.md', text: 'ABCDEF' }], { strings }).length, 1, 'без учёта регистра')
})

test('публичное дерево: общие шаблоны', () => {
  const { count, files, unreadable } = trackedFiles()
  assert.ok(count > 0, 'git ls-files пуст — сканировать нечего; в новом репозитории сначала git add -A')
  assert.deepEqual(unreadable, [], 'файлы есть в индексе, но не на диске — проверь git status')
  assert.deepEqual(findLeaks(files), [])
})

test('публичное дерево: частные шаблоны из journal/scan-patterns.txt', (t) => {
  const strings = privatePatterns()
  if (!strings) return t.skip(`нет ${PRIVATE_FILE} — частные шаблоны не проверены`)
  assert.ok(strings.length > 0, `${PRIVATE_FILE} пуст`)
  assert.deepEqual(findLeaks(trackedFiles().files, { patterns: [], strings }), [])
})

test('.gitattributes держит kit/ и bench/artboards/ побайтно', () => {
  const attrs = readFileSync('.gitattributes', 'utf8')
  assert.match(attrs, /^kit\/\*\* -text$/m)
  assert.match(attrs, /^bench\/artboards\/\*\* -text$/m)
})
