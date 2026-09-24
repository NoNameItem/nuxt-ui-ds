import React from 'react';
import { placeFloating, arrowOffset, arrowSpanStyle, contentOptions, isPlainObject } from '../../lib/popper.js';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/popover.ts (source/themes.json -> "popover").
   Values are literal: no rounding, no cross-component alignment. */
export const popoverTheme = {
  "slots": {
    "content": "bg-default shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_var(--ease-out)] data-[state=closed]:animate-[scale-out_100ms_var(--ease-out)] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto",
    "arrow": "fill-bg stroke-default"
  }
};

/* DOM extracted from Popover.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Component.Content","s":"content","c":[{"t":"Component.Arrow","s":"arrow","if":1}]}];

/* Popover.vue:62-78 — Root > Trigger(as-child) + Portal > Content. The trigger
   and the portal are drawn by Anchored below; the tree is the content alone. */
const render = createRenderer('popover', popoverTheme, tree, {
  contentNeedsOpen: true,
  childSlot: false,
  /* the arrow is drawn by Anchored below the way reka's PopperArrow draws it (an
     absolute span around the svg), not as an in-flow element of the content */
  renderIf(slot) {
    if (slot === 'arrow') return false;
    return undefined;
  },
  slotAttrs(slot, props) {
    if (slot === 'content') return { 'data-state': 'open', 'data-side': (props && props['data-side']) || 'bottom', 'data-align': (props && props['data-align']) || 'center', role: 'dialog' };
    return null;
  }
});

/* reka's popper: the content is portalled to <body> inside a fixed wrapper,
   placed by floating-ui — contentProps defaults side "bottom", sideOffset 8,
   collisionPadding 8, align "center" on the trigger. The children ARE the
   trigger (`Trigger as-child`): rendered on their own, never inside content. */
/* floating-ui rounds to the device pixel before writing the transform (roundByDPR) */
function useAnchor(id, open, opts, arrowW) {
  const wrapRef = React.useRef(null);
  const [pos, setPos] = React.useState(null);
  const { side: preferSide, align, sideOffset, alignOffset, collisionPadding } = opts;
  React.useLayoutEffect(() => {
    if (!open) return undefined;
    const place = () => {
      const trigger = document.querySelector('[aria-controls="' + id + '"]');
      const wrap = wrapRef.current;
      if (!trigger || !wrap) return;
      const t = trigger.getBoundingClientRect();
      const r = wrap.getBoundingClientRect();
      const p = placeFloating(t, r.width, r.height, { side: preferSide, align, sideOffset, alignOffset, collisionPadding });
      const el = wrap.querySelector('[data-slot="content"]');
      const ax = arrowOffset(t, p, r.width, r.height, el, arrowW);
      setPos((q) => (q && q.x === p.x && q.y === p.y && q.side === p.side && q.align === p.align && q.ax === ax && q.el === el ? q : { x: p.x, y: p.y, side: p.side, align: p.align, ax, el }));
    };
    place();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(place) : null;
    if (ro && wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true); };
  }, [id, open, preferSide, align, sideOffset, alignOffset, collisionPadding, arrowW]);
  return [wrapRef, pos];
}

function Anchored(props) {
  const { children, trigger, content: contentProp, contentSlot, portal, ...rest } = props;
  /* Popover.vue has both a `content` prop (placement) and a `#content` slot. A
     plain object in `content` is the placement; an element or string is still the
     slot; `contentSlot` carries the slot when `content` holds the placement. */
  const placement = isPlainObject(contentProp) ? contentProp : undefined;
  const slotValue = contentSlot !== undefined ? contentSlot : (placement ? undefined : contentProp);
  if (slotValue !== undefined) rest.content = slotValue;
  const open = !!props.open;
  const raw = React.useId();
  const id = 'reka-popover-content-' + raw.replace(/[^a-zA-Z0-9]/g, '');
  const opts = contentOptions(props, placement);
  /* Popover.vue:78 / Tooltip.vue:65 — `<Arrow v-bind="{ rounded: true, ...props.arrow }">`;
     reka's PopperContent adds the arrow height to the main-axis offset */
  const arrowOpt = props.arrow;
  const hasArrow = !!arrowOpt;
  const arrowConf = { rounded: true, width: 10, height: 5, ...(typeof arrowOpt === 'object' && arrowOpt ? arrowOpt : {}) };
  const arrowH = hasArrow ? arrowConf.height : 0;
  const [wrapRef, pos] = useAnchor(id, open, { ...opts, sideOffset: opts.sideOffset + arrowH }, hasArrow ? arrowConf.width : 0);
  const kids = React.Children.toArray(children);
  const triggerEl = kids.length === 1 && React.isValidElement(kids[0])
    ? React.cloneElement(kids[0], { 'aria-haspopup': 'dialog', 'aria-expanded': open ? 'true' : 'false', 'aria-controls': id, 'data-state': open ? 'open' : 'closed' })
    : (kids.length ? kids : null);
  let content = null;
  let arrowPortal = null;
  if (open) {
    const panel = render({ ...rest, children: undefined, id, 'data-side': pos ? pos.side : opts.side, 'data-align': pos ? pos.align : opts.align });
    const wrapper = React.createElement('div', {
      ref: wrapRef,
      'data-reka-popper-content-wrapper': '',
      style: {
        position: 'fixed', left: 0, top: 0, minWidth: 'max-content', zIndex: 50,
        transform: pos ? 'translate(' + pos.x + 'px, ' + pos.y + 'px)' : 'translate(0, -200%)',
        visibility: pos ? undefined : 'hidden'
      }
    }, panel);
    const RD = typeof window !== 'undefined' ? window.ReactDOM : null;
    if (hasArrow && pos && pos.el && pos.ax !== null && RD && RD.createPortal) {
      const arrowCls = [popoverTheme.slots.arrow, props.ui && props.ui.arrow, arrowConf.class].filter(Boolean).join(' ');
      const arrowEl = React.createElement('span', {
        style: arrowSpanStyle(pos.side, pos.ax)
      }, React.createElement('svg', {
        width: arrowConf.width, height: arrowConf.height, viewBox: '0 0 12 6', preserveAspectRatio: 'none',
        'data-slot': 'arrow', className: arrowCls, style: { display: 'block' }
      }, React.createElement('path', { d: arrowConf.rounded ? 'M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0' : 'M0 0L6 6L12 0Z' })));
      arrowPortal = RD.createPortal(arrowEl, pos.el);
    }
    /* `portal: false` keeps the (still fixed) wrapper in place, inside the component */
    content = portal !== false && RD && RD.createPortal && typeof document !== 'undefined' ? RD.createPortal(wrapper, document.body) : wrapper;
  }
  return React.createElement(React.Fragment, null, triggerEl, content, arrowPortal);
}


export function Popover(props) {
  return React.createElement(Anchored, props);
}
