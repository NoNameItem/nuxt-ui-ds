SelectMenu — Nuxt UI 4.11.1 `USelectMenu`; classes come straight from themes/select-menu.ts.

```jsx
<SelectMenu fieldGroup="horizontal" size="xs" variant="outline">Label</SelectMenu>
```

Variants: `fieldGroup` (horizontal | vertical), `size` (xs | sm | md | lg | xl), `variant` (outline | soft | subtle | ghost | none), `color` (primary | secondary | success | info | warning | error | neutral), `leading` (true), `trailing` (true), `loading` (true), `highlight` (true), `fixed` (false), `type` (file), `position` (popper | item-aligned), `multiple` (true), `virtualize` (true | false)

Defaults: {"size":"md","color":"primary","variant":"outline","position":"popper"}

Slots (each is a prop taking ReactNode): base, leading, leadingIcon, leadingAvatar, leadingAvatarSize, trailing, trailingIcon, value, placeholder, arrow, content, viewport, group, empty, label, separator, item, itemLeadingIcon, itemLeadingAvatar, itemLeadingAvatarSize, itemLeadingChip, itemLeadingChipSize, itemTrailing, itemTrailingIcon, itemWrapper, itemLabel, itemDescription, input, focusScope, trailingClear

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.