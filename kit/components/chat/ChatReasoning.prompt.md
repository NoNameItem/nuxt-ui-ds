ChatReasoning — Nuxt UI 4.11.1 `UChatReasoning`; classes come straight from themes/chat-reasoning.ts.

```jsx
<ChatReasoning chevron="leading" alone="false">Label</ChatReasoning>
```

Variants: `chevron` (leading | trailing), `alone` (false)

Slots (each is a prop taking ReactNode): root, trigger, leading, leadingIcon, chevronIcon, label, trailingIcon, content, body

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.