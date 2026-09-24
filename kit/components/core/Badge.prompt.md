Badge — Nuxt UI 4.11.1 `UBadge`; classes come straight from themes/badge.ts.

```jsx
<Badge fieldGroup="horizontal" color="primary" variant="solid">Label</Badge>
```

Variants: `fieldGroup` (horizontal | vertical), `color` (primary | secondary | success | info | warning | error | neutral), `variant` (solid | outline | soft | subtle), `size` (xs | sm | md | lg | xl), `square` (true)

Defaults: {"color":"primary","variant":"solid","size":"md"}

Slots (each is a prop taking ReactNode): base, label, leadingIcon, leadingAvatar, leadingAvatarSize, trailingIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.