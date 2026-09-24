/* Соответствие имён: компонент кита (PascalCase) -> тема и файл доки (kebab-case). */
import path from 'node:path'

/* Манифест платформы перечисляет в components все экспорты файлов кита: рядом с компонентами
   там контексты (AvatarGroupContext в Avatar.jsx) и константы lib/ (PROP_DEFAULTS, ICONS,
   READS, NBSP…). Список исключений по именам устаревал с каждой сборкой кита, поэтому
   компонент определяется по файлу: запись из components/, чьё имя совпадает с именем файла. */
const isComponent = (c) => c.sourcePath.startsWith('components/') && path.posix.basename(c.sourcePath).replace(/\.jsx?$/, '') === c.name

export function kebab(pascal) {
  return pascal.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

export function componentsFromManifest(manifest) {
  return manifest.components
    .filter(isComponent)
    .map((c) => ({ name: c.name, group: c.sourcePath.split('/')[1], themeName: kebab(c.name) }))
}
