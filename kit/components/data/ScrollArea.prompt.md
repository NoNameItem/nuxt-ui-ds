ScrollArea — Nuxt UI 4.11.1 `UScrollArea`; classes come straight from themes/scroll-area.ts.

```jsx
<ScrollArea orientation="vertical" externalScroll="true">Content</ScrollArea>
```

Variants: `orientation` (vertical | horizontal), `externalScroll` (true)

Slots (each is a prop taking ReactNode): root, viewport, item

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.