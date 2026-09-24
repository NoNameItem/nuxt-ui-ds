DropdownMenu — Nuxt UI 4.11.1 `UDropdownMenu`; classes come straight from themes/dropdown-menu.ts.

```jsx
<DropdownMenu color="primary" active="true" loading="true">Label</DropdownMenu>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `active` (true | false), `loading` (true), `size` (xs | sm | md | lg | xl)

Defaults: {"size":"md"}

Slots (each is a prop taking ReactNode): content, input, empty, viewport, arrow, group, label, separator, item, itemLeadingIcon, itemLeadingAvatar, itemLeadingAvatarSize, itemTrailing, itemTrailingIcon, itemTrailingKbds, itemTrailingKbdsSize, itemWrapper, itemLabel, itemDescription, itemLabelExternalIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.