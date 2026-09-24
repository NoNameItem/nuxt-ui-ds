Page — Nuxt UI 4.11.1 `UPage`; classes come straight from themes/page.ts.

```jsx
<Page left="true" right="true">Content</Page>
```

Variants: `left` (true), `right` (true)

Slots (each is a prop taking ReactNode): root, left, center, right

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.