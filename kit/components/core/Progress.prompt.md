Progress — Nuxt UI 4.11.1 `UProgress`; classes come straight from themes/progress.ts.

```jsx
<Progress animation="carousel" color="primary" size="2xs">Content</Progress>
```

Variants: `animation` (carousel | carousel-inverse | swing | elastic), `color` (primary | secondary | success | info | warning | error | neutral), `size` (2xs | xs | sm | md | lg | xl | 2xl), `step` (active | first | other | last), `orientation` (horizontal | vertical), `inverted` (true)

Defaults: {"animation":"carousel","color":"primary","size":"md"}

Slots (each is a prop taking ReactNode): root, base, indicator, status, steps, step

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.