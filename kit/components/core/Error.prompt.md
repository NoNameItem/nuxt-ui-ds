Error — Nuxt UI 4.11.1 `UError`; classes come straight from themes/error.ts.

```jsx
<Error>Content</Error>
```

Slots (each is a prop taking ReactNode): root, leading, leadingIcon, statusCode, statusMessage, message, links

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.