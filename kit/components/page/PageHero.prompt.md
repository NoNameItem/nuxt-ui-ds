PageHero — Nuxt UI 4.11.1 `UPageHero`; classes come straight from themes/page-hero.ts.

```jsx
<PageHero orientation="horizontal" reverse="true" headline="true">Content</PageHero>
```

Variants: `orientation` (horizontal | vertical), `reverse` (true), `headline` (true), `title` (true)

Slots (each is a prop taking ReactNode): root, container, wrapper, header, headline, title, description, body, footer, links

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.