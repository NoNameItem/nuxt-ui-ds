import React from 'react';
import { register } from '../../lib/registry.js';
import { createRenderer } from '../../lib/factory.jsx';
import { toasterTheme } from './Toaster.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/toast.ts (source/themes.json -> "toast").
   Values are literal: no rounding, no cross-component alignment. */
export const toastTheme = {
  "slots": {
    "root": "relative group overflow-hidden bg-default shadow-lg rounded-lg ring ring-default p-4 flex gap-2.5",
    "wrapper": "w-0 flex-1 flex flex-col",
    "title": "text-sm font-medium text-highlighted",
    "description": "text-sm text-muted",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex gap-1.5 shrink-0",
    "progress": "absolute inset-x-0 bottom-0",
    "close": "p-0"
  },
  "variants": {
    "color": {
      "primary": {
        "root": "outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary",
        "icon": "text-primary"
      },
      "secondary": {
        "root": "outline-secondary/25 focus-visible:outline-3 focus-visible:ring-secondary",
        "icon": "text-secondary"
      },
      "success": {
        "root": "outline-success/25 focus-visible:outline-3 focus-visible:ring-success",
        "icon": "text-success"
      },
      "info": {
        "root": "outline-info/25 focus-visible:outline-3 focus-visible:ring-info",
        "icon": "text-info"
      },
      "warning": {
        "root": "outline-warning/25 focus-visible:outline-3 focus-visible:ring-warning",
        "icon": "text-warning"
      },
      "error": {
        "root": "outline-error/25 focus-visible:outline-3 focus-visible:ring-error",
        "icon": "text-error"
      },
      "neutral": {
        "root": "outline-inverted/25 focus-visible:outline-3 focus-visible:ring-inverted",
        "icon": "text-highlighted"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "items-center",
        "actions": "items-center"
      },
      "vertical": {
        "root": "items-start",
        "actions": "items-start mt-2.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    }
  },
  "defaultVariants": {
    "color": "primary"
  }
};

/* DOM extracted from Toast.vue. As in Alert, the two `actions` nodes are the
   template's two mutually exclusive branches (Toast.vue:96,105): the vertical
   one sits INSIDE `wrapper`, the horizontal one is a sibling resolved with
   `orientation: 'horizontal'` — that variant is what drops the vertical
   branch's top margin. `gate` says which orientation each belongs to. */
const tree = [{"t":"ToastRoot","s":"root","c":[{"t":"slot","c":[{"t":"UAvatar","s":"avatar","if":1},{"t":"UIcon","s":"icon","if":1}]},{"t":"div","s":"wrapper","c":[{"t":"ToastTitle","s":"title","if":1},{"t":"ToastDescription","s":"description","if":1},{"t":"div","s":"actions","if":1,"gate":"vertical"}]},{"t":"div","s":"actions","if":1,"gate":"horizontal","sv":{"orientation":"horizontal"},"c":[{"t":"ToastClose","if":1,"c":[{"t":"slot","c":[{"t":"UButton","s":"close","if":1}]}]}]},{"t":"UProgress","s":"progress","p":{"size":"sm"},"fwd":["color"],"if":1}]}];

const render = createRenderer('toast', toastTheme, tree, {
  portal: true,
  /* Toaster.vue:97 mounts every toast as `<UToast data-slot="base"
     :class="ui.base(…)">`, so a toast carries the toaster's `base` and never its
     own `root` — the library has no other way of rendering one. */
  hostSlot: { slot: 'base', theme: toasterTheme },
  nodeFilter(node, { props }) {
    if (node.gate) {
      const orientation = props.orientation || 'vertical';
      /* the horizontal branch also carries the close button, so it exists for a
         closable vertical toast too (Toast.vue:105) */
      /* `close` is declared `default: true` (PROP_DEFAULTS.toast), and nodeFilter
         sees the caller's raw props — so the test is "not switched off" */
      if (node.gate === 'horizontal') return orientation === 'horizontal' || props.close !== false;
      return orientation === 'vertical';
    }
    return undefined;
  },
  /* Toast.vue:57 puts the orientation on the root as an attribute */
  slotAttrs(slot, props) {
    if (slot === 'root') return { 'data-orientation': props.orientation || 'vertical' };
    return undefined;
  }
});

/* A toast only ever exists inside a Toaster, and the stacking variables its
   theme reads — `z-(--index)`, `transform-(--transform)`, `h-(--front-height)` —
   are written by that host on each toast (Toaster.vue:99-104). The `viewport`
   that holds the stack is NOT per toast: `ToastPortal` sits after the v-for, at
   the Toaster's own level, so there is exactly one however many toasts there are.
   A toast rendered on its own therefore renders itself, and nothing more — it
   only supplies what the host would have given it: the variables of the front of
   a one-toast stack, and flow positioning in place of the `absolute inset-x-0
   bottom-0` that pins a toast inside a host-measured viewport (in an artboard
   that collapses the row to zero height and piles the toasts on one point — the
   same call `fixed -> absolute` makes for every other overlay). */
export function Toast(props) {
  if (props['data-slot'] === 'base') return render(props);
  return render({
    ...props,
    style: {
      '--index': 0,
      '--before': 0,
      '--offset': 0,
      '--scale': '1',
      '--translate': '0px',
      '--transform': 'translateY(0px) scale(1)',
      '--front-height': 'auto',
      position: 'relative',
      inset: 'auto',
      ...(props.style || {})
    }
  });
}

/* nested inside other components' DOM — the renderer mounts it by name */
register('Toast', Toast);
