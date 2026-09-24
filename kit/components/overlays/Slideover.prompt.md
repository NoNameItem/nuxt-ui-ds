Slideover — Nuxt UI 4.11.1 `USlideover`; classes come straight from themes/slideover.ts.

```jsx
<Slideover side="top" inset="true" transition="true">Content</Slideover>
```

Variants: `side` (top | right | bottom | left), `inset` (true), `transition` (true)

Slots (each is a prop taking ReactNode): overlay, content, header, wrapper, body, footer, title, description, close

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.