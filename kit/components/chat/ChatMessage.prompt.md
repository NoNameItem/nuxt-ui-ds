ChatMessage — Nuxt UI 4.11.1 `UChatMessage`; classes come straight from themes/chat-message.ts.

```jsx
<ChatMessage variant="solid" color="primary" side="left">Content</ChatMessage>
```

Variants: `variant` (solid | outline | soft | subtle | naked), `color` (primary | secondary | success | info | warning | error | neutral), `side` (left | right), `leading` (true), `actions` (true), `compact` (true | false)

Defaults: {"side":"left","variant":"naked","color":"neutral"}

Slots (each is a prop taking ReactNode): root, header, container, body, leading, leadingIcon, leadingAvatar, leadingAvatarSize, files, content, actions

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.