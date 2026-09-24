import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/toaster.ts (source/themes.json -> "toaster").
   Values are literal: no rounding, no cross-component alignment. */
export const toasterTheme = {
  "slots": {
    "viewport": "fixed flex flex-col w-[calc(100%-2rem)] sm:w-96 z-[100] data-[expanded=true]:h-(--height) focus:outline-none",
    "base": "pointer-events-auto absolute inset-x-0 z-(--index) transform-(--transform) data-[expanded=false]:data-[front=false]:h-(--front-height) data-[expanded=false]:data-[front=false]:*:opacity-0 data-[front=false]:*:transition-opacity data-[front=false]:*:duration-100 data-[state=closed]:animate-[toast-closed_200ms_var(--ease-out)] data-[state=closed]:data-[expanded=false]:data-[front=false]:animate-[toast-collapsed-closed_200ms_var(--ease-out)] motion-safe:data-[state=open]:data-[pulsing=odd]:animate-[toast-pulse-a_200ms_var(--ease-out)] motion-safe:data-[state=open]:data-[pulsing=even]:animate-[toast-pulse-b_200ms_var(--ease-out)] data-[swipe=move]:transition-none transition-[transform,translate,height] duration-200 ease-out motion-reduce:transition-none"
  },
  "variants": {
    "position": {
      "top-left": {
        "viewport": "left-4"
      },
      "top-center": {
        "viewport": "left-1/2 transform -translate-x-1/2"
      },
      "top-right": {
        "viewport": "right-4"
      },
      "bottom-left": {
        "viewport": "left-4"
      },
      "bottom-center": {
        "viewport": "left-1/2 transform -translate-x-1/2"
      },
      "bottom-right": {
        "viewport": "right-4"
      }
    },
    "swipeDirection": {
      "up": "data-[swipe=end]:animate-[toast-slide-up_200ms_var(--ease-out)]",
      "right": "data-[swipe=end]:animate-[toast-slide-right_200ms_var(--ease-out)]",
      "down": "data-[swipe=end]:animate-[toast-slide-down_200ms_var(--ease-out)]",
      "left": "data-[swipe=end]:animate-[toast-slide-left_200ms_var(--ease-out)]"
    }
  },
  "compoundVariants": [
    {
      "position": [
        "top-left",
        "top-center",
        "top-right"
      ],
      "class": {
        "viewport": "top-4",
        "base": "top-0 data-[state=open]:animate-[toast-slide-in-from-top_200ms_var(--ease-out)]"
      }
    },
    {
      "position": [
        "bottom-left",
        "bottom-center",
        "bottom-right"
      ],
      "class": {
        "viewport": "bottom-4",
        "base": "bottom-0 data-[state=open]:animate-[toast-slide-in-from-bottom_200ms_var(--ease-out)]"
      }
    },
    {
      "swipeDirection": [
        "left",
        "right"
      ],
      "class": "data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x) data-[swipe=cancel]:translate-x-0"
    },
    {
      "swipeDirection": [
        "up",
        "down"
      ],
      "class": "data-[swipe=move]:translate-y-(--reka-toast-swipe-move-y) data-[swipe=end]:translate-y-(--reka-toast-swipe-end-y) data-[swipe=cancel]:translate-y-0"
    }
  ],
  "defaultVariants": {
    "position": "bottom-right"
  }
};

/* DOM extracted from Toaster.vue. `ToastViewport` is the CONTAINER of the
   stack, not a sibling of it: reka collects every toast into the viewport its
   portal holds, which is where the viewport's own `--height` and each toast's
   `--front-height` come from. Extracted as siblings, the viewport stayed empty
   at zero height and the toasts sat in page flow at full width. */
const tree = [{"t":"ToastProvider","c":[{"t":"ToastPortal","c":[{"t":"ToastViewport","s":"viewport","c":[{"t":"UToast","s":"base","for":1}]}]}]}];

const top = (props) => String(props.position || 'bottom-right').startsWith('top');

/* `--offset` is the summed height of the toasts AFTER this one, 16px apiece
   (Toaster.vue:70-72), and the viewport's `--height` / `--front-height` come
   from the same measure. The heights are measured once on mount and passed
   back in as a prop, so every value is part of the RENDER — an inline mutation
   from an effect had no second chance when the first frame measured zero. */
function stackTotals(props) {
  const heights = Array.isArray(props.stackHeights) ? props.stackHeights : [];
  const offsets = [];
  let acc = 0;
  for (let i = heights.length - 1; i >= 0; i--) { offsets[i] = acc; acc += heights[i] + 16; }
  return { heights, offsets, total: acc ? acc - 16 : 0, front: heights[heights.length - 1] || 0 };
}

const render = createRenderer('toaster', toasterTheme, tree, {
  portal: true,
  /* the viewport's theme string starts with `fixed` and it means it: the stack
     is pinned to the window, not to a positioned ancestor */
  keepFixed: ['viewport'],
  /* the viewport carries the stack's layout variables (Toaster.vue:108-112);
     three are constants of `position` and the fourth is the front toast's
     height, so all four are known before any interaction */
  slotAttrs(slot, props, variants, ctx) {
    const isTop = top(props);
    const expanded = props.expand !== false;
    if (slot === 'viewport') {
      return {
        'data-stack': props['data-stack'],
        'data-expanded': expanded ? 'true' : 'false',
        style: {
          '--scale-factor': '0.05',
          '--translate-factor': isTop ? '1px' : '-1px',
          '--gap': isTop ? '16px' : '-16px',
          /* published from the measured heights (below): the library fills both
             from its `refs`, and they are what `h-(--height)` reads */
          /* `auto` until the toasts have been measured: published as 0 on the
             first paint, the theme's `data-[expanded=true]:h-(--height)` pinned
             the viewport to zero height and squashed the flex children to 32px,
             so the measure that followed read the squashed boxes */
          '--front-height': stackTotals(props).heights.length ? String(stackTotals(props).front) : 'auto',
          '--height': stackTotals(props).heights.length ? String(stackTotals(props).total) : 'auto',
          /* The stack, laid out in flow. Absolute toasts inside a viewport
             whose own height is `h-(--height)` are circular — the column
             collapses to zero, the viewport is pinned to that, and every toast
             measures 0 — and the flow result is identical: `--offset` is just
             "sum of the heights after this one, 16px apiece", which is what a
             16px gap produces.
             The ORDER is the sign of `--translate-factor`: a `top-*` stack
             pushes each earlier toast DOWN (the first toast ends up lowest), a
             `bottom-*` stack pushes them UP. */
          display: 'flex',
          flexDirection: isTop ? 'column-reverse' : 'column',
          gap: '16px'
        }
      };
    }
    return undefined;
  },
  /* Toaster.vue:99-104 writes the stacking variables on every toast, and the
     toast's own theme reads them (`z-(--index)`, `transform-(--transform)`).
     The front toast is the last one, so `--before` counts how many sit on top of
     it; `--offset` is the summed height of the toasts after this one, which only
     the live queue knows — expanded (the default) nothing reads it. Each toast
     also stays in flow: the stacking classes pin it `absolute inset-x-0 bottom-0`
     inside a viewport the host sizes from real measured heights, and in an
     artboard that collapses the stack onto one point. */
  mountStyle(slot, { props, index, count }) {
    if (slot !== 'base' || index === undefined) return null;
    const expanded = props.expand !== false;
    const before = (count || 1) - 1 - index;
    return {
      '--index': index,
      '--before': before,
      '--offset': stackTotals(props).offsets[index] || 0,
      ...(stackTotals(props).heights[index] ? { '--height': stackTotals(props).heights[index] } : null),
      '--scale': expanded ? '1' : 'calc(1 - var(--before) * var(--scale-factor))',
      /* the variables the library publishes stay as it writes them, but the
         TRANSFORM is identity here: in flow the gap already places the toast,
         and translating it again would move it twice */
      '--translate': expanded ? 'calc(var(--offset) * var(--translate-factor))' : 'calc(var(--before) * var(--gap))',
      '--transform': 'none',
      position: 'relative',
      /* the stack's FINAL position, which reka reaches by moving each toast into
         the viewport at runtime: inside it a toast fills the viewport's width
         (`inset-x-0` cleared with the absolute positioning) and the toasts
         follow one another, which is what gives the viewport its height and
         each toast `--front-height` a value instead of `auto`. */
      inset: 'auto',
      width: '100%'
    };
  }
});

/* Toaster.vue:97 iterates `toasts` — the queue the `useToast()` composable
   fills — and mounts each one as `<UToast data-slot="base">`, so a toast inside
   a Toaster carries `base` and never its own `root`; the single `viewport` that
   holds them lives in the portal after the list (Toaster.vue:106). */
let stackSeq = 0;

export function Toaster(props) {
  const { toasts, items, ...rest } = props;
  const list = toasts || items;
  const ref = React.useRef(null);
  const idRef = React.useRef(null);
  if (idRef.current === null) idRef.current = 'toaster-' + (++stackSeq);
  const id = idRef.current;
  const [heights, setHeights] = React.useState([]);
  React.useEffect(() => {
    let raf = 0;
    let observer = null;
    let done = false;
    const measure = () => {
      const viewport = document.querySelector('[data-stack="' + id + '"]');
      /* the toasts are the viewport's OWN children — a plain `[data-slot="base"]`
         query also catches each toast's progress bar, which carries the same name */
      const nodes = viewport ? Array.from(viewport.children).filter((n) => n.getAttribute('data-slot') === 'base') : [];
      if (!nodes.length) return false;
      const next = nodes.map((n) => n.offsetHeight);
      if (next.some((h) => !h)) return false;
      setHeights((prev) => (prev.length === next.length && prev.every((h, i) => h === next[i]) ? prev : next));
      if (!observer && typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(() => measure());
        observer.observe(viewport);
        nodes.forEach((n) => observer.observe(n));
      }
      return true;
    };
    const attempt = () => { if (!done && !measure()) raf = requestAnimationFrame(attempt); };
    attempt();
    /* a webfont swap re-lays the toasts out after the frames above have run */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!done) measure(); });
    return () => { done = true; if (raf) cancelAnimationFrame(raf); if (observer) observer.disconnect(); };
  }, [id, list && list.length]);
  return React.createElement('div', { ref, style: { display: 'contents' } },
    render({ ...rest, 'data-stack': id, stackHeights: heights, ...(list ? { items: list } : {}) }));
}
