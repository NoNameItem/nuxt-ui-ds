Kbd — Nuxt UI 4.11.1 `UKbd`; classes come straight from themes/kbd.ts.

```jsx
<Kbd color="primary" variant="solid" size="sm">Content</Kbd>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `variant` (solid | outline | soft | subtle), `size` (sm | md | lg)

Defaults: {"variant":"outline","color":"neutral","size":"md"}

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.