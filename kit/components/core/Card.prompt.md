Card — Nuxt UI 4.11.1 `UCard`; classes come straight from themes/card.ts.

```jsx
<Card variant="solid">Content</Card>
```

Variants: `variant` (solid | outline | soft | subtle)

Defaults: {"variant":"outline"}

Slots (each is a prop taking ReactNode): root, header, title, description, body, footer

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.