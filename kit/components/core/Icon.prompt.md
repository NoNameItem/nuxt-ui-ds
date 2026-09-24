Icon — renders a Lucide (or any Iconify) glyph the way Nuxt UI's `UIcon` does; use it wherever a themed component's icon slot is not enough.

```jsx
<Icon name="i-lucide-rocket" class="size-5 text-primary" />
```

Names follow Nuxt UI's `i-<collection>-<icon>` convention (`i-lucide-chevron-down`) and are translated to Iconify's `lucide:chevron-down` at render time. Pages must load Iconify once:
`<script src="https://cdn.jsdelivr.net/npm/iconify-icon@3/dist/iconify-icon.min.js"></script>`
