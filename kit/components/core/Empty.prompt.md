Empty — Nuxt UI 4.11.1 `UEmpty`; classes come straight from themes/empty.ts.

```jsx
<Empty size="xs" variant="solid" loading="true">Content</Empty>
```

Variants: `size` (xs | sm | md | lg | xl), `variant` (solid | outline | soft | subtle | naked), `loading` (true)

Defaults: {"variant":"outline","size":"md"}

Slots (each is a prop taking ReactNode): root, header, avatar, title, description, body, actions, footer

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.