FileUpload — Nuxt UI 4.11.1 `UFileUpload`; classes come straight from themes/file-upload.ts.

```jsx
<FileUpload color="primary" variant="area" size="xs">Label</FileUpload>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `variant` (area | button), `size` (xs | sm | md | lg | xl), `layout` (list | grid), `position` (inside | outside), `dropzone` (true), `interactive` (true), `highlight` (true), `multiple` (true), `disabled` (true)

Defaults: {"color":"primary","variant":"area","size":"md"}

Slots (each is a prop taking ReactNode): root, base, wrapper, icon, avatar, label, description, actions, files, file, fileLeadingAvatar, fileWrapper, fileName, fileSize, fileTrailingButton

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.