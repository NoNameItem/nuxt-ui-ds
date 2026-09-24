/* appConfig.ui.icons — the default icon set Nuxt UI 4.11.1 ships.

   Templates read these through `props.xIcon ?? appConfig.ui.icons.x`, so a
   component rendered without an explicit icon prop still shows a glyph
   (Select's chevron, Breadcrumb's separator, Alert's close, …). The renderer
   looks slots up in SLOT_ICONS below and falls back to this map. */
export const ICONS = {
  arrowDown: 'i-lucide-arrow-down', arrowLeft: 'i-lucide-arrow-left', arrowRight: 'i-lucide-arrow-right', arrowUp: 'i-lucide-arrow-up',
  caution: 'i-lucide-circle-alert', check: 'i-lucide-check',
  chevronDoubleLeft: 'i-lucide-chevrons-left', chevronDoubleRight: 'i-lucide-chevrons-right',
  chevronDown: 'i-lucide-chevron-down', chevronLeft: 'i-lucide-chevron-left', chevronRight: 'i-lucide-chevron-right', chevronUp: 'i-lucide-chevron-up',
  close: 'i-lucide-x', copy: 'i-lucide-copy', copyCheck: 'i-lucide-copy-check', dark: 'i-lucide-moon', drag: 'i-lucide-grip-vertical',
  ellipsis: 'i-lucide-ellipsis', error: 'i-lucide-circle-x', external: 'i-lucide-arrow-up-right', eye: 'i-lucide-eye', eyeOff: 'i-lucide-eye-off',
  file: 'i-lucide-file', folder: 'i-lucide-folder', folderOpen: 'i-lucide-folder-open', hash: 'i-lucide-hash', info: 'i-lucide-info',
  light: 'i-lucide-sun', loading: 'i-lucide-loader-circle', menu: 'i-lucide-menu', minus: 'i-lucide-minus',
  panelClose: 'i-lucide-panel-left-close', panelOpen: 'i-lucide-panel-left-open', plus: 'i-lucide-plus', reload: 'i-lucide-rotate-ccw',
  search: 'i-lucide-search', stop: 'i-lucide-square', star: 'i-lucide-star', success: 'i-lucide-circle-check',
  system: 'i-lucide-monitor', tip: 'i-lucide-lightbulb', upload: 'i-lucide-upload', warning: 'i-lucide-triangle-alert'
};

/* theme name -> slot -> icon key, taken from each SFC's `appConfig.ui.icons.*` reads. */
const SLOT_ICONS = {
  accordion: { trailingIcon: 'chevronDown' },
  alert: { close: 'close' },
  banner: { close: 'close' },
  breadcrumb: { separatorIcon: 'chevronRight' },
  calendar: { prevIcon: 'chevronLeft', nextIcon: 'chevronRight' },
  carousel: { prev: 'arrowLeft', next: 'arrowRight' },
  'chat-messages': { autoScrollIcon: 'arrowDown' },
  /* ChatReasoning.vue:95 — `props.chevronIcon || appConfig.ui.icons.chevronDown`,
     on whichever side `chevron` names */
  'chat-reasoning': { chevronIcon: 'chevronDown', trailingIcon: 'chevronDown' },
  /* ChatTool.vue:98 — same chevron as ChatReasoning, on the side `chevron` names */
  'chat-tool': { chevronIcon: 'chevronDown', trailingIcon: 'chevronDown' },
  'chat-prompt-submit': { icon: 'arrowUp' },
  checkbox: { icon: 'check' },
  'command-palette': { itemTrailingIcon: 'check', close: 'close', back: 'arrowLeft' },
  'content-navigation': { trailingIcon: 'chevronDown', linkTrailingIcon: 'chevronDown' },
  'content-toc': { trailingIcon: 'chevronDown' },
  'context-menu': { itemTrailingIcon: 'check' },
  drawer: { close: 'close' },
  'dropdown-menu': { itemTrailingIcon: 'check' },
  'editor-drag-handle': { handle: 'drag' },
  'file-upload': { icon: 'upload' },
  header: { toggle: 'menu' },
  'input-menu': { trailingIcon: 'chevronDown', itemTrailingIcon: 'check' },
  'input-number': { increment: 'plus', decrement: 'minus' },
  'input-rating': { emptyIcon: 'star', icon: 'star' },
  listbox: { itemTrailingIcon: 'check' },
  modal: { close: 'close' },
  'navigation-menu': { linkTrailingIcon: 'chevronDown', linkLabelExternalIcon: 'external', childLinkLabelExternalIcon: 'external' },
  popover: { close: 'close' },
  select: { trailingIcon: 'chevronDown', itemTrailingIcon: 'check' },
  /* a tag's delete cross (InputTags.vue:141) — every tag carries one */
  'input-tags': { itemDeleteIcon: 'close' },
  'input-menu': { trailingIcon: 'chevronDown', itemTrailingIcon: 'check', tagsItemDeleteIcon: 'close' },
  'select-menu': { trailingIcon: 'chevronDown', itemTrailingIcon: 'check' },
  sidebar: { close: 'close' },
  slideover: { close: 'close' },
  toast: { close: 'close' },
  tree: { linkTrailingIcon: 'chevronDown' }
};

export function defaultIcon(themeName, slot) {
  const key = (SLOT_ICONS[themeName] || {})[slot];
  return key ? ICONS[key] : null;
}
