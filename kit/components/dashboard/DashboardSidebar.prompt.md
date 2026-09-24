DashboardSidebar — Nuxt UI 4.11.1 `UDashboardSidebar`; classes come straight from themes/dashboard-sidebar.ts.

```jsx
<DashboardSidebar menu="true" side="left" toggleSide="left">Content</DashboardSidebar>
```

Variants: `menu` (true), `side` (left | right), `toggleSide` (left | right)

Slots (each is a prop taking ReactNode): root, header, body, footer, toggle, handle, content, overlay

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.