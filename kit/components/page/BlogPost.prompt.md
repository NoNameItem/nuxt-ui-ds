BlogPost — Nuxt UI 4.11.1 `UBlogPost`; classes come straight from themes/blog-post.ts.

```jsx
<BlogPost orientation="horizontal" variant="outline" to="true">Content</BlogPost>
```

Variants: `orientation` (horizontal | vertical), `variant` (outline | soft | subtle | ghost | naked), `to` (true), `image` (true)

Defaults: {"variant":"outline"}

Slots (each is a prop taking ReactNode): root, header, body, footer, image, title, description, authors, avatar, meta, date, badge

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.