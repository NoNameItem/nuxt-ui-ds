/* Фикстуры для компонентов, у которых в доке нет блоков ::component-code.
   Ключ — имя темы. Значение — базовые пропы, поверх которых кладутся варианты. */

export const OVERLAY_THEMES = new Set([
  'modal', 'slideover', 'drawer', 'popover', 'tooltip', 'toast', 'toaster',
  'context-menu', 'dropdown-menu', 'command-palette', 'chat-palette'
])

const ITEMS = [
  { label: 'Home', icon: 'i-lucide-house' },
  { label: 'Inbox', icon: 'i-lucide-inbox', badge: '4' },
  { label: 'Settings', icon: 'i-lucide-settings' }
]

export const MANUAL_FIXTURES = {
  'icon': { name: 'i-lucide-rocket' },
  'chat-palette': { open: true, items: ITEMS, placeholder: 'Спросить…' },
  'container': { children: 'Содержимое контейнера' },
  'skeleton': { class: 'h-4 w-48' },
  'dashboard-group': { children: 'Группа панелей' },
  'dashboard-resize-handle': { class: 'w-1' },
  'dashboard-search': { open: true, items: ITEMS, placeholder: 'Поиск…' },
  'dashboard-toolbar': { children: 'Toolbar' },
  'carousel': { items: ['1', '2', '3', '4'], arrows: true, dots: true },
  'scroll-area': { children: 'Длинный текст', class: 'h-40' },
  'editor-drag-handle': { class: 'size-4' },
  'editor-emoji-menu': { open: true, items: [{ label: '😀 grinning' }, { label: '🚀 rocket' }] },
  'editor-mention-menu': { open: true, items: [{ label: 'Анна' }, { label: 'Борис' }] },
  'editor-suggestion-menu': { open: true, items: [{ label: 'Heading 1' }, { label: 'Bullet list' }] },
  'editor-toolbar': { items: [{ icon: 'i-lucide-bold' }, { icon: 'i-lucide-italic' }] },
  'form': { children: 'Поля формы' },
  'footer': { children: 'Подвал' },
  'footer-columns': { columns: [{ label: 'Продукт', children: [{ label: 'Возможности' }] }] },
  'main': { children: 'Основная область' },
  'toast': { open: true, title: 'Сохранено', description: 'Изменения применены' },
  'toaster': { open: true, children: 'Toaster' },
  'page': { children: 'Страница' },
  'page-aside': { children: 'Боковая колонка' },
  'page-body': { children: 'Тело страницы' },
  'page-cta': { title: 'Начать работу', description: 'Соберите первый макет за минуту' },
  'page-columns': { children: 'Колонки' },
  'page-grid': { children: 'Сетка' },
  'page-list': { children: 'Список' }
}
