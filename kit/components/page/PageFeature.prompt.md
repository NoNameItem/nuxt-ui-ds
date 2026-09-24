PageFeature — Nuxt UI 4.11.1 `UPageFeature`; classes come straight from themes/page-feature.ts.

```jsx
<PageFeature orientation="horizontal" to="true" title="true">Content</PageFeature>
```

Variants: `orientation` (horizontal | vertical), `to` (true), `title` (true)

Slots (each is a prop taking ReactNode): root, wrapper, leading, leadingIcon, title, description

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.