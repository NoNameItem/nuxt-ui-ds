Separator — Nuxt UI 4.11.1 `USeparator`; classes come straight from themes/separator.ts.

```jsx
<Separator color="primary" orientation="horizontal" size="xs">Label</Separator>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `orientation` (horizontal | vertical), `size` (xs | sm | md | lg | xl), `position` (start | center | end), `type` (solid | dashed | dotted)

Defaults: {"color":"neutral","size":"xs","type":"solid"}

Slots (each is a prop taking ReactNode): root, border, container, icon, avatar, avatarSize, label

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.