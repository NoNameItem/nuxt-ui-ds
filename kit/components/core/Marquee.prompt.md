Marquee — Nuxt UI 4.11.1 `UMarquee`; classes come straight from themes/marquee.ts.

```jsx
<Marquee orientation="horizontal" pauseOnHover="true" reverse="true">Content</Marquee>
```

Variants: `orientation` (horizontal | vertical), `pauseOnHover` (true), `reverse` (true), `overlay` (true)

Slots (each is a prop taking ReactNode): root, content

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.