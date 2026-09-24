Table — Nuxt UI 4.11.1 `UTable`; classes come straight from themes/table.ts.

```jsx
<Table pinned="true" sticky="true" loading="true">Content</Table>
```

Variants: `pinned` (true), `sticky` (true | header | footer), `loading` (true), `externalScroll` (true), `loadingAnimation` (carousel | carousel-inverse | swing | elastic), `loadingColor` (primary | secondary | success | info | warning | error | neutral)

Defaults: {"loadingColor":"primary","loadingAnimation":"carousel"}

Slots (each is a prop taking ReactNode): root, base, caption, thead, tbody, tfoot, tr, th, td, separator, empty, loading

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.