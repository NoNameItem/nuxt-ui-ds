ColorPicker — Nuxt UI 4.11.1 `UColorPicker`; classes come straight from themes/color-picker.ts.

```jsx
<ColorPicker size="xs">Content</ColorPicker>
```

Variants: `size` (xs | sm | md | lg | xl)

Defaults: {"size":"md"}

Slots (each is a prop taking ReactNode): root, picker, selector, selectorBackground, selectorThumb, track, trackThumb

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.