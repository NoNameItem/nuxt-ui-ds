Timeline — Nuxt UI 4.11.1 `UTimeline`; classes come straight from themes/timeline.ts.

```jsx
<Timeline orientation="horizontal" color="primary" size="3xs">Content</Timeline>
```

Variants: `orientation` (horizontal | vertical), `color` (primary | secondary | success | info | warning | error | neutral), `size` (3xs | 2xs | xs | sm | md | lg | xl | 2xl | 3xl), `reverse` (true)

Defaults: {"size":"md","color":"primary"}

Slots (each is a prop taking ReactNode): root, item, container, indicator, separator, wrapper, date, title, description

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.