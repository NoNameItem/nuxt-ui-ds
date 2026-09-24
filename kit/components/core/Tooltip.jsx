import React from 'react';
import { placeFloating, arrowOffset, arrowSpanStyle, contentOptions, isPlainObject } from '../../lib/popper.js';
import { createRenderer } from '../../lib/factory.jsx';
import { lookup } from '../../lib/registry.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/tooltip.ts (source/themes.json -> "tooltip").
   Values are literal: no rounding, no cross-component alignment. */
export const tooltipTheme = {
  "slots": {
    "content": "flex items-center gap-1 bg-default text-highlighted shadow-sm rounded-sm ring ring-default h-6 px-2.5 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_var(--ease-out)] data-[state=closed]:animate-[scale-out_100ms_var(--ease-out)] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto",
    "arrow": "fill-bg stroke-default",
    "text": "truncate",
    "kbds": "hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:content-['·'] not-first-of-type:before:me-0.5",
    "kbdsSize": "sm"
  }
};

/* DOM extracted from Tooltip.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"TooltipContent","s":"content","c":[{"t":"slot","c":[{"t":"span","s":"text","if":1},{"t":"span","s":"kbds","if":1}]},{"t":"TooltipArrow","s":"arrow","if":1}]}];

/* Tooltip.vue:50-65 — Root > Trigger(as-child) + Portal > Content. The trigger
   and the portal are drawn by Anchored below; the tree is the content alone. */
const render = createRenderer('tooltip', tooltipTheme, tree, {
  contentNeedsOpen: true,
  childSlot: false,
  /* the arrow is drawn by Anchored below the way reka's PopperArrow draws it (an
     absolute span around the svg), not as an in-flow element of the content */
  renderIf(slot) {
    if (slot === 'arrow') return false;
    return undefined;
  },
  slotAttrs(slot, props) {
    if (slot === 'content') return { 'data-state': 'delayed-open', 'data-side': (props && props['data-side']) || 'bottom', 'data-align': (props && props['data-align']) || 'center' };
    return null;
  },
  /* Tooltip.vue:61 — `<UKbd :size="props.ui?.kbdsSize || ui.kbdsSize()" />`, theme "sm" */
  slotContent(slot, { props }) {
    if (slot !== 'kbds' || !props.kbds || !props.kbds.length) return undefined;
    const Kbd = lookup('Kbd');
    if (!Kbd) return undefined;
    const size = (props.ui && props.ui.kbdsSize) || tooltipTheme.slots.kbdsSize;
    return props.kbds.map((k, i) => React.createElement(Kbd, { key: i, size, ...(typeof k === 'string' ? { value: k } : k) }));
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
      const trigger = document.querySelector('[aria-describedby="' + id + '"]');
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
  const { children, trigger, content: contentProp, portal, ...rest } = props;
  /* Tooltip.vue's `content` prop is the placement (side, align, offsets) */
  const placement = isPlainObject(contentProp) ? contentProp : undefined;
  if (contentProp !== undefined && !placement) rest.content = contentProp;
  const open = !!props.open;
  const raw = React.useId();
  const id = 'reka-tooltip-content-' + raw.replace(/[^a-zA-Z0-9]/g, '');
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
    ? React.cloneElement(kids[0], { 'data-state': open ? 'delayed-open' : 'closed', ...(open ? { 'aria-describedby': id } : {}) })
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
      const arrowCls = [tooltipTheme.slots.arrow, props.ui && props.ui.arrow, arrowConf.class].filter(Boolean).join(' ');
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


export function Tooltip(props) {
  return React.createElement(Anchored, props);
}
