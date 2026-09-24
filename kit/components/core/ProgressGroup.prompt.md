ProgressGroup — Nuxt UI 4.11.1 `UProgressGroup`; classes come straight from themes/progress-group.ts.

```jsx
<ProgressGroup color="primary" size="2xs" orientation="horizontal">Content</ProgressGroup>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `size` (2xs | xs | sm | md | lg | xl | 2xl), `orientation` (horizontal | vertical)

Defaults: {"color":"primary","size":"md"}

Slots (each is a prop taking ReactNode): root, base, segment, indicator, status, list, item, itemLeadingIcon, itemLeadingDot, itemLabel, itemTrailing

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.