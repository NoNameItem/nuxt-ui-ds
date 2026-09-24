AvatarGroup — Nuxt UI 4.11.1 `UAvatarGroup`; classes come straight from themes/avatar-group.ts.

```jsx
<AvatarGroup size="3xs" color="primary">Content</AvatarGroup>
```

Variants: `size` (3xs | 2xs | xs | sm | md | lg | xl | 2xl | 3xl), `color` (primary | secondary | success | info | warning | error | neutral)

Defaults: {"size":"md","color":"neutral"}

Slots (each is a prop taking ReactNode): root, base

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.