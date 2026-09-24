Editor — Nuxt UI 4.11.1 `UEditor`; classes come straight from themes/editor.ts.

```jsx
<Editor placeholderMode="firstLine">Content</Editor>
```

Variants: `placeholderMode` (firstLine | everyLine)

Defaults: {"placeholderMode":"everyLine"}

Slots (each is a prop taking ReactNode): root, content, base

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.