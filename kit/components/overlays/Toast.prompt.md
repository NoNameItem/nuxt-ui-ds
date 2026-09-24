Toast — Nuxt UI 4.11.1 `UToast`; classes come straight from themes/toast.ts.

```jsx
<Toast color="primary" orientation="horizontal" title="true">Content</Toast>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `orientation` (horizontal | vertical), `title` (true)

Defaults: {"color":"primary"}

Slots (each is a prop taking ReactNode): root, wrapper, title, description, icon, avatar, avatarSize, actions, progress, close

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.