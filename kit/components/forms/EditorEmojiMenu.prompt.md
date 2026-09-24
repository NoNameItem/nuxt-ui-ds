EditorEmojiMenu — Nuxt UI 4.11.1 `UEditorEmojiMenu`; classes come straight from themes/editor-emoji-menu.ts.

```jsx
<EditorEmojiMenu size="xs" active="true">Label</EditorEmojiMenu>
```

Variants: `size` (xs | sm | md | lg | xl), `active` (true | false)

Defaults: {"size":"md"}

Slots (each is a prop taking ReactNode): content, viewport, group, label, separator, item, itemLeadingIcon, itemLeadingAvatar, itemLeadingAvatarSize, itemWrapper, itemLabel, itemDescription, itemLabelExternalIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.