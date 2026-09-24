InputMenu — Nuxt UI 4.11.1 `UInputMenu`; classes come straight from themes/input-menu.ts.

```jsx
<InputMenu fieldGroup="horizontal" size="xs" variant="outline">Label</InputMenu>
```

Variants: `fieldGroup` (horizontal | vertical), `size` (xs | sm | md | lg | xl), `variant` (outline | soft | subtle | ghost | none), `color` (primary | secondary | success | info | warning | error | neutral), `leading` (true), `trailing` (true), `loading` (true), `highlight` (true), `fixed` (false), `type` (file), `virtualize` (true | false), `multiple` (true | false)

Defaults: {"size":"md","color":"primary","variant":"outline"}

Slots (each is a prop taking ReactNode): root, base, leading, leadingIcon, leadingAvatar, leadingAvatarSize, trailing, trailingIcon, trailingClear, arrow, content, viewport, group, empty, label, separator, item, itemLeadingIcon, itemLeadingAvatar, itemLeadingAvatarSize, itemLeadingChip, itemLeadingChipSize, itemTrailing, itemTrailingIcon, itemWrapper, itemLabel, itemDescription, tagsItem, tagsItemText, tagsItemDelete, tagsItemDeleteIcon, tagsInput

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.