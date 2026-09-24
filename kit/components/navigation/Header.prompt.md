Header — Nuxt UI 4.11.1 `UHeader`; classes come straight from themes/header.ts.

```jsx
<Header toggleSide="left">Content</Header>
```

Variants: `toggleSide` (left | right)

Slots (each is a prop taking ReactNode): root, container, left, center, right, title, toggle, content, overlay, header, body

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.