Avatar — Nuxt UI 4.11.1 `UAvatar`; classes come straight from themes/avatar.ts.

```jsx
<Avatar color="primary" size="3xs">Content</Avatar>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `size` (3xs | 2xs | xs | sm | md | lg | xl | 2xl | 3xl)

Defaults: {"size":"md","color":"neutral"}

Slots (each is a prop taking ReactNode): root, image, fallback, icon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.