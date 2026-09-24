Popover — Nuxt UI 4.11.1 `UPopover`; classes come straight from themes/popover.ts.

```jsx
<Popover open content={<div className="p-4">Content</div>}><Button label="Open" /></Popover>
<Popover open content={{ side: 'right', align: 'start' }} contentSlot={<div className="p-4">Content</div>}><Button label="Open" /></Popover>
```

`content`: a plain object is the placement (Vue's `:content` prop — side, align, sideOffset, alignOffset, collisionPadding); a React element or string is the `#content` slot. To set both, put the placement in `content` and the slot in `contentSlot`.

`portal={false}` renders the panel inside the component instead of `document.body`.

Slots (each is a prop taking ReactNode): content (or contentSlot), arrow

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.
