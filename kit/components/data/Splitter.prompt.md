Splitter — Nuxt UI 4.11.1 `USplitter`; classes come straight from themes/splitter.ts.

```jsx
<Splitter orientation="horizontal">Content</Splitter>
```

Variants: `orientation` (horizontal | vertical)

Slots (each is a prop taking ReactNode): root, panel, handle

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.