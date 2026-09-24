User — Nuxt UI 4.11.1 `UUser`; classes come straight from themes/user.ts.

```jsx
<User orientation="horizontal" to="true" size="3xs">Content</User>
```

Variants: `orientation` (horizontal | vertical), `to` (true | false), `size` (3xs | 2xs | xs | sm | md | lg | xl | 2xl | 3xl)

Defaults: {"size":"md"}

Slots (each is a prop taking ReactNode): root, wrapper, name, description, avatar

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.