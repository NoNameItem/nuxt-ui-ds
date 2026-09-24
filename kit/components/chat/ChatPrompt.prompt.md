ChatPrompt — Nuxt UI 4.11.1 `UChatPrompt`; classes come straight from themes/chat-prompt.ts.

```jsx
<ChatPrompt color="primary" variant="outline">Content</ChatPrompt>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `variant` (outline | soft | subtle | naked)

Defaults: {"color":"primary","variant":"outline"}

Slots (each is a prop taking ReactNode): root, header, body, footer, base

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.