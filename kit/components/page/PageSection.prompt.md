PageSection — Nuxt UI 4.11.1 `UPageSection`; classes come straight from themes/page-section.ts.

```jsx
<PageSection orientation="horizontal" reverse="true" headline="true">Content</PageSection>
```

Variants: `orientation` (horizontal | vertical), `reverse` (true), `headline` (true), `title` (true), `description` (true), `body` (true)

Slots (each is a prop taking ReactNode): root, container, wrapper, header, leading, leadingIcon, headline, title, description, body, features, footer, links

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.