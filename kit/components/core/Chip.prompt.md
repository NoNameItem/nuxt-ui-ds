Chip — Nuxt UI 4.11.1 `UChip`; classes come straight from themes/chip.ts.

```jsx
<Chip color="primary" size="3xs" position="top-right">Content</Chip>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `size` (3xs | 2xs | xs | sm | md | lg | xl | 2xl | 3xl), `position` (top-right | bottom-right | top-left | bottom-left), `inset` (false), `standalone` (false)

Defaults: {"size":"md","color":"primary","position":"top-right"}

Slots (each is a prop taking ReactNode): root, base

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.