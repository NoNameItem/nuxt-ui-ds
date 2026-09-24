Pagination — Nuxt UI 4.11.1 `UPagination`; classes come straight from themes/pagination.ts.

```jsx
<Pagination>Label</Pagination>
```

Slots (each is a prop taking ReactNode): root, list, ellipsis, label, first, prev, item, next, last

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.