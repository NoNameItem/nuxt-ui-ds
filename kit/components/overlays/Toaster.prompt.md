Toaster — Nuxt UI 4.11.1 `UToaster`; classes come straight from themes/toaster.ts.

```jsx
<Toaster position="top-left" swipeDirection="up">Content</Toaster>
```

Variants: `position` (top-left | top-center | top-right | bottom-left | bottom-center | bottom-right), `swipeDirection` (up | right | down | left)

Defaults: {"position":"bottom-right"}

Slots (each is a prop taking ReactNode): viewport, base

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.