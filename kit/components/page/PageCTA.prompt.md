PageCTA — Nuxt UI 4.11.1 `UPageCTA`; classes come straight from themes/page-cta.ts.

```jsx
<PageCTA orientation="horizontal" reverse="true" variant="solid">Content</PageCTA>
```

Variants: `orientation` (horizontal | vertical), `reverse` (true), `variant` (solid | outline | soft | subtle | naked), `title` (true)

Defaults: {"variant":"outline"}

Slots (each is a prop taking ReactNode): root, container, wrapper, header, title, description, body, footer, links

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.