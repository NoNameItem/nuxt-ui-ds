DashboardNavbar — Nuxt UI 4.11.1 `UDashboardNavbar`; classes come straight from themes/dashboard-navbar.ts.

```jsx
<DashboardNavbar toggleSide="left">Content</DashboardNavbar>
```

Variants: `toggleSide` (left | right)

Slots (each is a prop taking ReactNode): root, left, icon, title, center, right, toggle

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.