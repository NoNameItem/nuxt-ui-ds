PageCard — Nuxt UI 4.11.1 `UPageCard`; classes come straight from themes/page-card.ts.

```jsx
<PageCard orientation="horizontal" reverse="true" variant="solid">Content</PageCard>
```

Variants: `orientation` (horizontal | vertical), `reverse` (true), `variant` (solid | outline | soft | subtle | ghost | naked), `to` (true), `title` (true), `highlight` (true), `highlightColor` (primary | secondary | success | info | warning | error | neutral), `spotlight` (true), `spotlightColor` (primary | secondary | success | info | warning | error | neutral)

Defaults: {"variant":"outline","highlightColor":"primary","spotlightColor":"primary"}

Slots (each is a prop taking ReactNode): root, spotlight, container, wrapper, header, body, footer, leading, leadingIcon, title, description

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.