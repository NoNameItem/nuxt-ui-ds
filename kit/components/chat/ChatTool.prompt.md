ChatTool — Nuxt UI 4.11.1 `UChatTool`; classes come straight from themes/chat-tool.ts.

```jsx
<ChatTool variant="inline" chevron="leading" loading="true">Label</ChatTool>
```

Variants: `variant` (inline | card), `chevron` (leading | trailing), `loading` (true), `alone` (false)

Slots (each is a prop taking ReactNode): root, trigger, leading, leadingIcon, chevronIcon, label, suffix, trailingIcon, content, body, actions

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.