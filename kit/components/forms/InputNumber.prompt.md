InputNumber — Nuxt UI 4.11.1 `UInputNumber`; classes come straight from themes/input-number.ts.

```jsx
<InputNumber fieldGroup="horizontal" color="primary" size="xs">Content</InputNumber>
```

Variants: `fieldGroup` (horizontal | vertical), `color` (primary | secondary | success | info | warning | error | neutral), `size` (xs | sm | md | lg | xl), `variant` (outline | soft | subtle | ghost | none), `disabled` (true), `orientation` (horizontal | vertical), `highlight` (true), `fixed` (false), `increment` (false), `decrement` (false)

Defaults: {"size":"md","color":"primary","variant":"outline"}

Slots (each is a prop taking ReactNode): root, base, increment, decrement

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.