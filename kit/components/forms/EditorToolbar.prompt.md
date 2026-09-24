EditorToolbar — Nuxt UI 4.11.1 `UEditorToolbar`; classes come straight from themes/editor-toolbar.ts.

```jsx
<EditorToolbar layout="bubble">Content</EditorToolbar>
```

Variants: `layout` (bubble | floating | fixed)

Slots (each is a prop taking ReactNode): root, base, group, separator

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.