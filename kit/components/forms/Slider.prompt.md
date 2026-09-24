Slider — Nuxt UI 4.11.1 `USlider`; classes come straight from themes/slider.ts.

```jsx
<Slider color="primary" size="xs" orientation="horizontal">Content</Slider>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `size` (xs | sm | md | lg | xl), `orientation` (horizontal | vertical), `disabled` (true)

Defaults: {"size":"md","color":"primary"}

Slots (each is a prop taking ReactNode): root, track, range, thumb

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.