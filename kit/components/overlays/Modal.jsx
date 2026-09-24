import React from 'react';
import { register } from '../../lib/registry.js';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/modal.ts (source/themes.json -> "modal").
   Values are literal: no rounding, no cross-component alignment. */
export const modalTheme = {
  "slots": {
    "overlay": "fixed inset-0",
    "content": "bg-default divide-y divide-default flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-(--ui-header-height)",
    "wrapper": "",
    "body": "flex-1 p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_var(--ease-out)] data-[state=closed]:animate-[fade-out_200ms_var(--ease-out)]",
        "content": "data-[state=open]:animate-[scale-in_200ms_var(--ease-out)] data-[state=closed]:animate-[scale-out_200ms_var(--ease-out)]"
      }
    },
    "fullscreen": {
      "true": {
        "content": "inset-0"
      },
      "false": {
        "content": "w-[calc(100vw-2rem)] max-w-lg rounded-lg shadow-lg ring ring-default"
      }
    },
    "overlay": {
      "true": {
        "overlay": "bg-elevated/75"
      }
    },
    "scrollable": {
      "true": {
        "overlay": "overflow-y-auto",
        "content": "relative"
      },
      "false": {
        "content": "fixed",
        "body": "overflow-y-auto"
      }
    }
  },
  "compoundVariants": [
    {
      "scrollable": true,
      "fullscreen": false,
      "class": {
        "overlay": "grid place-items-center p-4 sm:py-8"
      }
    },
    {
      "scrollable": false,
      "fullscreen": false,
      "class": {
        "content": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden"
      }
    }
  ]
};

/* DOM extracted from Modal.vue. The two `template` branches inside the portal
   are Modal.vue:150-168's `v-if="props.scrollable"` pair, and they differ in
   WHERE the content goes: scrollable puts it INSIDE the overlay (the theme gives
   `content: "relative"` and lets `overlay: "grid place-items-center"` centre it),
   plain puts it beside the overlay (there the content centres itself with
   `fixed top-1/2 left-1/2 -translate-*`). `gate` says which branch is which. */
const tree = [{"t":"DialogRoot","c":[{"t":"DefineContentTemplate","c":[{"t":"DialogContent","s":"content","c":[{"t":"slot","c":[{"t":"div","s":"header","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"wrapper","if":1,"c":[{"t":"DialogTitle","s":"title","if":1},{"t":"DialogDescription","s":"description","if":1}]},{"t":"DialogClose","if":1,"c":[{"t":"slot","c":[{"t":"UButton","s":"close","if":1}]}]}]}]},{"t":"div","s":"body","if":1},{"t":"div","s":"footer","if":1}]}]}]},{"t":"DialogPortal","c":[{"t":"FieldGroupReset","c":[{"t":"template","if":1,"gate":"scrollable","c":[{"t":"DialogOverlay","s":"overlay"}]},{"t":"template","gate":"plain","c":[{"t":"DialogOverlay","s":"overlay","if":1}]}]}]}]}];

/* Modal.vue declares its content in a DefineContentTemplate and inserts it with
   ReuseContentTemplate inside DialogPortal, after the overlay; that Reuse node is
   not present in the extracted DOM, so the content body is appended here — and,
   like the real dialog, only in the open state. */
const render = createRenderer('modal', modalTheme, tree, {
  portal: true,
  /* the theme's `fixed` stays fixed, as in Drawer and Slideover */
  keepFixed: ['content'],
  /* reka moves the focus into an open dialog, onto its close button */
  focusOnOpen: 'close',
  inlineOrphanDefines: true,
  orphanDefinesNeedOpen: true,
  /* Modal.vue puts the content next to the overlay inside the portal, not
     inside an element — the one define that really is a sibling */
  orphanDefinesOutside: true,
  /* Modal.vue:170 puts `props.class` on the DialogContent, not on the overlay
     (which is this tree's first root) */
  primarySlot: 'content',
  /* scrollable only: the content is the overlay's child there, and its sibling
     otherwise — which is what the orphan-define path above already does */
  inlineDefineInto: { Content: 'overlay' },
  inlineDefineIntoPick(name, slot, props) {
    if (name !== 'Content') return undefined;
    return !!props.scrollable && !!props.open;
  },
  nodeFilter(node, { props }) {
    if (node.gate) return node.gate === (props.scrollable ? 'scrollable' : 'plain');
    return undefined;
  },
  openOnlySlots: ['overlay']
});

export function Modal(props) {
  /* in the scrollable branch the overlay is unconditional (Modal.vue:151 has no
     `v-if`) — it is the element that centres the dialog there, so `overlay: false`
     only applies to the plain branch */
  if (props.scrollable && props.overlay === false) return render({ ...props, overlay: true });
  return render(props);
}

/* nested inside other components' DOM — the renderer mounts it by name */
register('Modal', Modal);
