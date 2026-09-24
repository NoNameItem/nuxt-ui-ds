Listbox — Nuxt UI 4.11.1 `UListbox`; classes come straight from themes/listbox.ts.

```jsx
<Listbox size="xs" color="primary" virtualize="true">Label</Listbox>
```

Variants: `size` (xs | sm | md | lg | xl), `color` (primary | secondary | success | info | warning | error | neutral), `virtualize` (true | false), `disabled` (true), `highlight` (true)

Defaults: {"color":"primary","size":"md"}

Slots (each is a prop taking ReactNode): root, input, content, group, label, separator, empty, loading, loadingIcon, item, itemLeadingIcon, itemLeadingAvatar, itemLeadingAvatarSize, itemLeadingChip, itemLeadingChipSize, itemWrapper, itemLabel, itemDescription, itemTrailing, itemTrailingIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.