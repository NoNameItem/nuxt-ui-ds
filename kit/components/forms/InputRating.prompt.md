InputRating — Nuxt UI 4.11.1 `UInputRating`; classes come straight from themes/input-rating.ts.

```jsx
<InputRating orientation="horizontal" size="xs" color="primary">Content</InputRating>
```

Variants: `orientation` (horizontal | vertical), `size` (xs | sm | md | lg | xl), `color` (primary | secondary | success | info | warning | error | neutral), `readonly` (true | false), `disabled` (true | false)

Defaults: {"color":"primary","size":"md"}

Slots (each is a prop taking ReactNode): root, item, indicator, icon, emptyIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.