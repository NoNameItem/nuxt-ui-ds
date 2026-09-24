Banner — Nuxt UI 4.11.1 `UBanner`; classes come straight from themes/banner.ts.

```jsx
<Banner color="primary" to="true">Content</Banner>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `to` (true)

Defaults: {"color":"primary"}

Slots (each is a prop taking ReactNode): root, container, left, center, right, icon, title, actions, close

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.