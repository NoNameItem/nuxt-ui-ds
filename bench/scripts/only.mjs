/* Разбор ключа --only для трёх скриптов стенда: shoot.mjs, diff.mjs, pairs.mjs.

   Токен — либо имя целиком (обе темы), либо <имя>.<тема>, где тема — light или dark:
   `--force --only page-cta.dark` переснимает одну сторону и не трогает вторую. Раньше
   ключ брал имя целиком, и такой командой сносило обе темы; в прогоне 2026-09-17 так
   потеряли готовый светлый снимок.

   Разбор общий, потому что до этого он был скопирован трижды, а с темой стал сложнее
   ровно настолько, чтобы копии разошлись незаметно.

   Суффиксом считается только точное `.light`/`.dark` при непустом имени — `page-cta.darkk`
   остаётся именем, не находится среди известных и попадает в предупреждение, вместо того
   чтобы молча не выбрать ничего.

   Неизвестные проверяются по-разному, и это не небрежность: shoot.mjs зовут до съёмки,
   файлов ещё нет, и сверить он может только имя страницы (тема в токене законна всегда);
   diff.mjs и pairs.mjs работают по готовым снимкам, и там промах по теме — такой же
   промах, как по имени. */

const THEMES = ['light', 'dark']

const split = (token) => {
  const dot = token.lastIndexOf('.')
  const theme = token.slice(dot + 1)
  if (dot > 0 && THEMES.includes(theme)) return { name: token.slice(0, dot), theme, token }
  return { name: token, theme: null, token }
}

export function parseOnly(raw, noun) {
  if (raw === undefined) return null
  const tokens = raw.split(',').map((s) => s.trim()).filter(Boolean)
  if (tokens.length === 0) throw new Error(`--only передан пустым: перечисли ${noun} или убери флаг`)
  const parsed = tokens.map(split)
  return {
    matches: (name, theme) => parsed.some((t) => t.name === name && (t.theme === null || t.theme === theme)),
    unknownNames: (names) => parsed.filter((t) => !names.includes(t.name)).map((t) => t.token),
    unknownPairs: (pairs) =>
      parsed
        .filter((t) => ![...pairs].some((p) => p.name === t.name && (t.theme === null || t.theme === p.theme)))
        .map((t) => t.token)
  }
}
