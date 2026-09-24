InputTime — Nuxt UI 4.11.1 `UInputTime`; classes come straight from themes/input-time.ts.

```jsx
<InputTime fieldGroup="horizontal" size="xs" variant="outline">Content</InputTime>
```

Variants: `fieldGroup` (horizontal | vertical), `size` (xs | sm | md | lg | xl), `variant` (outline | soft | subtle | ghost | none), `color` (primary | secondary | success | info | warning | error | neutral), `leading` (true), `trailing` (true), `loading` (true), `highlight` (true), `fixed` (false), `type` (file)

Defaults: {"size":"md","color":"primary","variant":"outline"}

Slots (each is a prop taking ReactNode): base, leading, leadingIcon, leadingAvatar, leadingAvatarSize, trailing, trailingIcon, segment, separatorIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.