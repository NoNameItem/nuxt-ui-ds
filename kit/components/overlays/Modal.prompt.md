Modal — Nuxt UI 4.11.1 `UModal`; classes come straight from themes/modal.ts.

```jsx
<Modal transition="true" fullscreen="true" overlay="true">Content</Modal>
```

Variants: `transition` (true), `fullscreen` (true | false), `overlay` (true), `scrollable` (true | false)

Slots (each is a prop taking ReactNode): overlay, content, header, wrapper, body, footer, title, description, close

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.