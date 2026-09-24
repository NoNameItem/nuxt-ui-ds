Tree — Nuxt UI 4.11.1 `UTree`; classes come straight from themes/tree.ts.

```jsx
<Tree virtualize="true" color="primary" size="xs">Content</Tree>
```

Variants: `virtualize` (true), `color` (primary | secondary | success | info | warning | error | neutral), `size` (xs | sm | md | lg | xl), `selected` (true), `disabled` (true)

Defaults: {"color":"primary","size":"md"}

Slots (each is a prop taking ReactNode): root, item, listWithChildren, itemWithChildren, link, linkLeadingIcon, linkLabel, linkTrailing, linkTrailingIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.