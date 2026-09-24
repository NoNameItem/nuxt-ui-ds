Drawer — Nuxt UI 4.11.1 `UDrawer`; classes come straight from themes/drawer.ts.

```jsx
<Drawer direction="top" inset="true" snapPoints="true">Content</Drawer>
```

Variants: `direction` (top | right | bottom | left), `inset` (true), `snapPoints` (true)

Slots (each is a prop taking ReactNode): overlay, content, handle, container, header, wrapper, title, description, actions, body, footer, close

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.