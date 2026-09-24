Tabs — Nuxt UI 4.11.1 `UTabs`; classes come straight from themes/tabs.ts.

```jsx
<Tabs color="primary" variant="pill" orientation="horizontal">Label</Tabs>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `variant` (pill | link), `orientation` (horizontal | vertical), `size` (xs | sm | md | lg | xl)

Defaults: {"color":"primary","variant":"pill","size":"md"}

Slots (each is a prop taking ReactNode): root, list, indicator, trigger, leadingIcon, leadingAvatar, leadingAvatarSize, label, trailingBadge, trailingBadgeSize, content

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.