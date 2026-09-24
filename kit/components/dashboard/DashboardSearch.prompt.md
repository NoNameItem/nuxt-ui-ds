DashboardSearch — Nuxt UI 4.11.1 `UDashboardSearch`; classes come straight from themes/dashboard-search.ts.

```jsx
<DashboardSearch fullscreen="false" size="xs">Content</DashboardSearch>
```

Variants: `fullscreen` (false), `size` (xs | sm | md | lg | xl)

Defaults: {"size":"md"}

Slots (each is a prop taking ReactNode): modal, input

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.