ChatMessages — Nuxt UI 4.11.1 `UChatMessages`; classes come straight from themes/chat-messages.ts.

```jsx
<ChatMessages compact="true">Content</ChatMessages>
```

Variants: `compact` (true | false)

Slots (each is a prop taking ReactNode): root, indicator, viewport, autoScroll

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.