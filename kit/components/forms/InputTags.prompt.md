InputTags — Nuxt UI 4.11.1 `UInputTags`; classes come straight from themes/input-tags.ts.

```jsx
<InputTags fieldGroup="horizontal" size="xs" variant="outline">Content</InputTags>
```

Variants: `fieldGroup` (horizontal | vertical), `size` (xs | sm | md | lg | xl), `variant` (outline | soft | subtle | ghost | none), `color` (primary | secondary | success | info | warning | error | neutral), `leading` (true), `trailing` (true), `loading` (true), `highlight` (true), `fixed` (false), `type` (file)

Defaults: {"size":"md","color":"primary","variant":"outline"}

Slots (each is a prop taking ReactNode): root, base, leading, leadingIcon, leadingAvatar, leadingAvatarSize, trailing, trailingIcon, item, itemText, itemDelete, itemDeleteIcon, input

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.