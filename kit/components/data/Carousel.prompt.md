Carousel — Nuxt UI 4.11.1 `UCarousel`; classes come straight from themes/carousel.ts.

```jsx
<Carousel orientation="vertical" active="true">Content</Carousel>
```

Variants: `orientation` (vertical | horizontal), `active` (true)

Slots (each is a prop taking ReactNode): root, viewport, container, item, controls, arrows, prev, next, dots, dot

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.