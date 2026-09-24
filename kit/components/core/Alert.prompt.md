Alert — Nuxt UI 4.11.1 `UAlert`; classes come straight from themes/alert.ts.

```jsx
<Alert color="primary" variant="solid" orientation="horizontal">Content</Alert>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `variant` (solid | outline | soft | subtle), `orientation` (horizontal | vertical), `title` (true)

Defaults: {"color":"primary","variant":"solid"}

Slots (each is a prop taking ReactNode): root, wrapper, title, description, icon, avatar, avatarSize, actions, close

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.