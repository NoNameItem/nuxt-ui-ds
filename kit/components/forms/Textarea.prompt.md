Textarea — Nuxt UI 4.11.1 `UTextarea`; classes come straight from themes/textarea.ts.

```jsx
<Textarea fieldGroup="horizontal" size="xs" variant="outline">Content</Textarea>
```

Variants: `fieldGroup` (horizontal | vertical), `size` (xs | sm | md | lg | xl), `variant` (outline | soft | subtle | ghost | none), `color` (primary | secondary | success | info | warning | error | neutral), `leading` (true), `trailing` (true), `loading` (true), `highlight` (true), `fixed` (false), `type` (file), `autoresize` (true)

Defaults: {"size":"md","color":"primary","variant":"outline"}

Slots (each is a prop taking ReactNode): root, base, leading, leadingIcon, leadingAvatar, leadingAvatarSize, trailing, trailingIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.