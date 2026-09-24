Sidebar — Nuxt UI 4.11.1 `USidebar`; classes come straight from themes/sidebar.ts.

```jsx
<Sidebar transition="true" side="left" collapsible="offcanvas">Content</Sidebar>
```

Variants: `transition` (true), `side` (left | right), `collapsible` (offcanvas | icon | none), `variant` (sidebar | floating | inset)

Slots (each is a prop taking ReactNode): root, gap, container, inner, header, wrapper, title, description, actions, close, body, footer, rail

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.