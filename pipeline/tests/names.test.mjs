import { test } from 'node:test'
import assert from 'node:assert/strict'
import { kebab, componentsFromManifest } from '../doc-pages/names.mjs'

test('kebab переводит PascalCase в имя темы', () => {
  assert.equal(kebab('Badge'), 'badge')
  assert.equal(kebab('AvatarGroup'), 'avatar-group')
  assert.equal(kebab('ChatPromptSubmit'), 'chat-prompt-submit')
  assert.equal(kebab('PageCTA'), 'page-cta')
  assert.equal(kebab('InputNumber'), 'input-number')
})

test('из манифеста отбрасываются не-компоненты', () => {
  const manifest = {
    components: [
      { name: 'Badge', sourcePath: 'components/core/Badge.jsx' },
      { name: 'PROP_DEFAULTS', sourcePath: 'lib/defaults.js' },
      { name: 'ICONS', sourcePath: 'lib/icons.js' }
    ]
  }
  const list = componentsFromManifest(manifest)
  assert.deepEqual(list, [{ name: 'Badge', group: 'core', themeName: 'badge' }])
})

/* Манифест платформы перечисляет в components все экспорты файлов кита, а не только
   компоненты: контексты, лежащие рядом с компонентом, и константы из lib/. Снимок манифеста
   от 14.09 знал из них только PROP_DEFAULTS и ICONS, свежий — ещё двенадцать, и каждый из
   них получил бы свою doc-страницу. Компонент — это запись, чьё имя совпадает с именем её
   файла в components/. */
test('контексты и константы кита не компоненты, даже если их нет в списке исключений', () => {
  const manifest = {
    components: [
      { name: 'AvatarGroup', sourcePath: 'components/core/AvatarGroup.jsx' },
      { name: 'AvatarGroupContext', sourcePath: 'components/core/Avatar.jsx' },
      { name: 'NBSP', sourcePath: 'lib/use-site.js' },
      { name: 'CompactScope', sourcePath: 'lib/compact.jsx' }
    ]
  }
  assert.deepEqual(componentsFromManifest(manifest).map((c) => c.name), ['AvatarGroup'])
})
