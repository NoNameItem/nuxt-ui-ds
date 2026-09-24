PinInput — Nuxt UI 4.11.1 `UPinInput`; classes come straight from themes/pin-input.ts.

```jsx
<PinInput size="xs" variant="outline" color="primary">Content</PinInput>
```

Variants: `size` (xs | sm | md | lg | xl), `variant` (outline | soft | subtle | ghost | none), `color` (primary | secondary | success | info | warning | error | neutral), `highlight` (true), `fixed` (false)

Defaults: {"size":"md","color":"primary","variant":"outline"}

Slots (each is a prop taking ReactNode): root, base, separator

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.