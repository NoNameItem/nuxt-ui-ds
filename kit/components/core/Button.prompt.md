Button — Nuxt UI 4.11.1 `UButton`; classes come straight from themes/button.ts.

```jsx
<Button fieldGroup="horizontal" color="primary" variant="solid">Label</Button>
```

Variants: `fieldGroup` (horizontal | vertical), `color` (primary | secondary | success | info | warning | error | neutral), `variant` (solid | outline | soft | subtle | ghost | link), `size` (xs | sm | md | lg | xl), `block` (true), `square` (true), `leading` (true), `trailing` (true), `loading` (true), `active` (true | false)

Defaults: {"color":"primary","variant":"solid","size":"md"}

Slots (each is a prop taking ReactNode): base, label, leadingIcon, leadingAvatar, leadingAvatarSize, trailingIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.