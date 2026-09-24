import React from 'react';
import { placeFloating, contentOptions } from '../../lib/popper.js';
import { createRenderer } from '../../lib/factory.jsx';
import { lookup } from '../../lib/registry.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/dropdown-menu.ts (source/themes.json -> "dropdown-menu").
   Values are literal: no rounding, no cross-component alignment. */
export const dropdownMenuTheme = {
  "slots": {
    "content": "min-w-32 max-h-(--reka-dropdown-menu-content-available-height) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_var(--ease-out)] data-[state=closed]:animate-[scale-out_100ms_var(--ease-out)] origin-(--reka-dropdown-menu-content-transform-origin) flex flex-col",
    "input": "border-b border-default",
    "empty": "text-center text-muted",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "arrow": "fill-bg stroke-default",
    "group": "p-1 isolate",
    "label": "w-full flex items-center font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
    "itemLeadingIcon": "shrink-0",
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
    "itemTrailingKbdsSize": "",
    "itemWrapper": "flex-1 flex flex-col text-start min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted",
    "itemLabelExternalIcon": "inline-block size-3 align-top text-dimmed"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "active": {
      "true": {
        "item": "text-highlighted before:bg-elevated",
        "itemLeadingIcon": "text-default"
      },
      "false": {
        "item": [
          "text-default data-highlighted:text-highlighted data-[state=open]:text-highlighted data-highlighted:before:bg-elevated/50 data-[state=open]:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "itemLeadingIcon": [
          "text-dimmed group-data-highlighted:text-default group-data-[state=open]:text-default",
          "transition-colors"
        ]
      }
    },
    "loading": {
      "true": {
        "itemLeadingIcon": "animate-spin"
      }
    },
    "size": {
      "xs": {
        "label": "p-1 text-xs gap-1",
        "item": "p-1 text-xs gap-1",
        "empty": "p-2 text-xs",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "sm": {
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "empty": "p-2.5 text-xs",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "md": {
        "label": "p-1.5 text-sm gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "empty": "p-2.5 text-sm",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "lg": {
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-sm gap-2",
        "empty": "p-3 text-sm",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "md"
      },
      "xl": {
        "label": "p-2 text-base gap-2",
        "item": "p-2 text-base gap-2",
        "empty": "p-3 text-base",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemTrailingIcon": "size-6",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "lg"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "active": false,
      "class": {
        "item": "text-primary data-highlighted:text-primary data-highlighted:before:bg-primary/10 data-[state=open]:before:bg-primary/10",
        "itemLeadingIcon": "text-primary/75 group-data-highlighted:text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "active": false,
      "class": {
        "item": "text-secondary data-highlighted:text-secondary data-highlighted:before:bg-secondary/10 data-[state=open]:before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary/75 group-data-highlighted:text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "active": false,
      "class": {
        "item": "text-success data-highlighted:text-success data-highlighted:before:bg-success/10 data-[state=open]:before:bg-success/10",
        "itemLeadingIcon": "text-success/75 group-data-highlighted:text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "active": false,
      "class": {
        "item": "text-info data-highlighted:text-info data-highlighted:before:bg-info/10 data-[state=open]:before:bg-info/10",
        "itemLeadingIcon": "text-info/75 group-data-highlighted:text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "active": false,
      "class": {
        "item": "text-warning data-highlighted:text-warning data-highlighted:before:bg-warning/10 data-[state=open]:before:bg-warning/10",
        "itemLeadingIcon": "text-warning/75 group-data-highlighted:text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "active": false,
      "class": {
        "item": "text-error data-highlighted:text-error data-highlighted:before:bg-error/10 data-[state=open]:before:bg-error/10",
        "itemLeadingIcon": "text-error/75 group-data-highlighted:text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "primary",
      "active": true,
      "class": {
        "item": "text-primary before:bg-primary/10",
        "itemLeadingIcon": "text-primary"
      }
    },
    {
      "color": "secondary",
      "active": true,
      "class": {
        "item": "text-secondary before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary"
      }
    },
    {
      "color": "success",
      "active": true,
      "class": {
        "item": "text-success before:bg-success/10",
        "itemLeadingIcon": "text-success"
      }
    },
    {
      "color": "info",
      "active": true,
      "class": {
        "item": "text-info before:bg-info/10",
        "itemLeadingIcon": "text-info"
      }
    },
    {
      "color": "warning",
      "active": true,
      "class": {
        "item": "text-warning before:bg-warning/10",
        "itemLeadingIcon": "text-warning"
      }
    },
    {
      "color": "error",
      "active": true,
      "class": {
        "item": "text-error before:bg-error/10",
        "itemLeadingIcon": "text-error"
      }
    }
  ],
  "defaultVariants": {
    "size": "md"
  }
};

/* DOM extracted from DropdownMenu.vue — element nesting and data-slot names as shipped.
   The content node's own `data-slot="content"` was lost in extraction; without it
   the arrow (`v-if="props.arrow"`, off by default) was the tree's only slotted
   node and the component rendered no slot at all. */
const tree = [{"t":"DropdownMenuRoot","s":"root","c":[{"t":"DropdownMenuPortal","c":[{"t":"div","s":"content","c":[{"t":"div","s":"viewport","c":[{"t":"div","s":"group","for":1,"c":[{"t":"template","for":1,"c":[{"t":"div","s":"label","if":1},{"t":"div","s":"separator","if":1},{"t":"div","s":"item","c":[{"t":"UIcon","s":"itemLeadingIcon","if":1},{"t":"UAvatar","s":"itemLeadingAvatar","if":1},{"t":"span","s":"itemWrapper","c":[{"t":"span","s":"itemLabel","c":[{"t":"UIcon","s":"itemLabelExternalIcon","if":1}]},{"t":"span","s":"itemDescription","if":1}]},{"t":"span","s":"itemTrailing","c":[{"t":"UIcon","s":"itemTrailingIcon","if":1},{"t":"span","s":"itemTrailingKbds","if":1}]}]}]}]}]},{"t":"DropdownMenuArrow","s":"arrow","if":1}]}]}]}];

/* the panel alone: DropdownMenuRoot renders no element and the portal is drawn
   below as reka's fixed popper wrapper, so the renderer gets the content node */
const contentTree = tree[0].c[0].c;

function itemColorClass(color, active, slot) {
  return (dropdownMenuTheme.compoundVariants || [])
    .filter((cv) => cv.color === color && cv.active === active && cv.class && cv.class[slot])
    .map((cv) => cv.class[slot]).join(' ');
}

/* The extracted tree held a single `UDropdownMenuContent` node — the menu body
   lives in its own SFC, which the extraction never reached; the body is written
   out here from DropdownMenuContent.vue, with the same group/item loops the
   sibling menus use. The trigger the caller passes as children stays OUTSIDE
   the panel. */
const render = createRenderer('dropdown-menu', dropdownMenuTheme, contentTree, {
  contentNeedsOpen: true,
  childSlot: false,
  /* DropdownMenu.vue:46-48 — the root tv() gets `size` only; the item's
     `active` is ULink's (DropdownMenuContent.vue:221: item.active, else false
     without a route) and its colour is `item?.color` (applied in slotAttrs) */
  itemOnlyVariants: ['active', 'color', 'loading'],
  itemVariants: (item) => ({ active: !!(item && typeof item === 'object' && item.active) }),
  listFor(node, { props, item }) {
    if (node.s === 'group') {
      const items = props.items || [];
      return Array.isArray(items[0]) ? items : [items];
    }
    if (!node.s && node.for) return Array.isArray(item) ? item : (item && Array.isArray(item.items) ? item.items : undefined);
    return undefined;
  },
  renderIf(slot, { props, item }) {
    if (slot === 'label') return !!(item && item.type === 'label');
    if (slot === 'separator') return !!(item && item.type === 'separator');
    if (slot === 'item') return !(item && (item.type === 'label' || item.type === 'separator'));
    /* DropdownMenuContent.vue — `v-if="item.loading"` draws the loading icon in
       the leading slot, `v-else-if="item.icon"` the item's own */
    if (slot === 'itemLeadingIcon') return !!(item && (item.loading || item.icon));
    if (slot === 'itemLeadingAvatar') return !!(item && item.avatar && !item.loading && !item.icon);
    if (slot === 'itemDescription') return !!(item && item.description);
    if (slot === 'itemTrailingIcon') return !!(item && (item.children || item.trailingIcon));
    if (slot === 'itemTrailingKbds') return !!(item && item.kbds && item.kbds.length);
    if (slot === 'itemLabelExternalIcon') return !!(item && (item.target === '_blank' || /^https?:/.test(item.to || '')));
    return undefined;
  },
  slotContent(slot, { props, item }) {
    if (slot === 'itemLeadingIcon' && item && item.loading) return item.loadingIcon || props.loadingIcon || 'i-lucide-loader-circle';
    if (slot !== 'itemTrailingKbds' || !item || !item.kbds || !item.kbds.length) return undefined;
    /* theme size.<size>.itemTrailingKbdsSize — "md" at the default size; the
       kbds drawn at "sm" made the group cell 128 wide against 132.25 */
    const size = (dropdownMenuTheme.variants.size[props.size || 'md'] || {}).itemTrailingKbdsSize || 'md';
    const Kbd = lookup('Kbd');
    if (!Kbd) return item.kbds.map((k) => (typeof k === 'object' ? k.value : k)).join(' ');
    return item.kbds.map((k, i) => React.createElement(Kbd, { key: i, size, ...(typeof k === 'object' && k ? k : { value: k }) }));
  },
  slotAttrs(slot, props, variants, { item }) {
    if (slot === 'content') return { 'data-state': 'open', 'data-align': (props && props['data-align']) || 'center', role: 'menu' };
    /* DropdownMenuContent.vue:171, 208, 221 — ui.item({ color: item?.color, active }):
       the colour comes from the item, and the renderer resolves only `active` */
    if (slot === 'item' && item && typeof item === 'object' && item.color) {
      const cls = itemColorClass(item.color, !!item.active, 'item');
      if (cls) return { addClass: cls };
    }
    return null;
  }
});

/* reka's popper (Popper/PopperContent.js): a fixed wrapper placed by floating-ui
   with flip, shift and size; DropdownMenu.vue:43 contentProps default side
   "bottom", sideOffset 8, collisionPadding 8, align "center". The boundary is the
   window minus collisionPadding; coordinates are rounded (roundByDPR). */
function useFloating(id, open, portalled, opts) {
  const wrapRef = React.useRef(null);
  const [pos, setPos] = React.useState(null);
  const { side: preferSide, align, sideOffset, alignOffset, collisionPadding } = opts;
  React.useLayoutEffect(() => {
    if (!open) return undefined;
    const place = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const trigger = document.querySelector('[aria-controls="' + id + '"]') || (!portalled ? wrap.previousElementSibling : null);
      if (!trigger) return;
      const t = trigger.getBoundingClientRect();
      const r = wrap.getBoundingClientRect();
      const p = placeFloating(t, r.width, r.height, { side: preferSide, align, sideOffset, alignOffset, collisionPadding });
      setPos((q) => (q && q.x === p.x && q.y === p.y && q.side === p.side && q.align === p.align ? q : { x: p.x, y: p.y, side: p.side, align: p.align }));
    };
    place();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(place) : null;
    if (ro && wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', place);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', place); };
  }, [id, open, portalled, preferSide, align, sideOffset, alignOffset, collisionPadding]);
  return [wrapRef, pos];
}

export function DropdownMenu(props) {
  const { children, content: _content, portal: _portal, sideOffset: _so, collisionPadding: _cp, ...rest } = props;
  const open = !!props.open;
  const raw = React.useId();
  const id = 'reka-dropdown-menu-content-' + raw.replace(/[^a-zA-Z0-9]/g, '');
  const opts = contentOptions(props, props.content);
  const portalled = props.portal !== false;
  const [wrapRef, pos] = useFloating(id, open, portalled, opts);
  /* reka's DropdownMenuTrigger (as-child) stamps its state on the caller's trigger */
  const kids = React.Children.toArray(children);
  const triggerEl = kids.length === 1 && React.isValidElement(kids[0])
    ? React.cloneElement(kids[0], { 'aria-haspopup': 'menu', 'aria-expanded': open ? 'true' : 'false', ...(open ? { 'aria-controls': id } : {}), 'data-state': open ? 'open' : 'closed' })
    : (kids.length ? kids : null);
  let panel = null;
  if (open) {
    const side = pos ? pos.side : opts.side;
    const body = render({ ...rest, id, 'data-side': side, 'data-align': pos ? pos.align : opts.align });
    const wrapper = React.createElement('div', {
      ref: wrapRef,
      'data-reka-popper-content-wrapper': '',
      style: {
        position: 'fixed', left: 0, top: 0, minWidth: 'max-content', zIndex: 50,
        transform: pos ? 'translate(' + pos.x + 'px, ' + pos.y + 'px)' : 'translate(0, -200%)',
        visibility: pos ? undefined : 'hidden'
      }
    }, body);
    const RD = typeof window !== 'undefined' ? window.ReactDOM : null;
    panel = portalled && RD && RD.createPortal && typeof document !== 'undefined' ? RD.createPortal(wrapper, document.body) : wrapper;
  }
  if (!triggerEl) return panel;
  return React.createElement(React.Fragment, null, triggerEl, panel);
}
