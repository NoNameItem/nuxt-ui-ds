CommandPalette — Nuxt UI 4.11.1 `UCommandPalette`; classes come straight from themes/command-palette.ts.

```jsx
<CommandPalette virtualize="true" size="xs" active="true">Label</CommandPalette>
```

Variants: `virtualize` (true | false), `size` (xs | sm | md | lg | xl), `active` (true | false), `loading` (true)

Defaults: {"size":"md"}

Slots (each is a prop taking ReactNode): root, input, close, back, content, footer, viewport, group, empty, label, item, itemLeadingIcon, itemLeadingAvatar, itemLeadingAvatarSize, itemLeadingChip, itemLeadingChipSize, itemTrailing, itemTrailingIcon, itemTrailingHighlightedIcon, itemTrailingKbds, itemTrailingKbdsSize, itemWrapper, itemLabel, itemLabelBase, itemLabelPrefix, itemLabelSuffix, itemDescription

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.