EditorMentionMenu — Nuxt UI 4.11.1 `UEditorMentionMenu`; classes come straight from themes/editor-mention-menu.ts.

```jsx
<EditorMentionMenu size="xs" active="true">Label</EditorMentionMenu>
```

Variants: `size` (xs | sm | md | lg | xl), `active` (true | false)

Defaults: {"size":"md"}

Slots (each is a prop taking ReactNode): content, viewport, group, label, separator, item, itemLeadingIcon, itemLeadingAvatar, itemLeadingAvatarSize, itemWrapper, itemLabel, itemDescription, itemLabelExternalIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.