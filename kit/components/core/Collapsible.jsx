import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/collapsible.ts (source/themes.json -> "collapsible").
   Values are literal: no rounding, no cross-component alignment. */
export const collapsibleTheme = {
  "slots": {
    "root": "",
    "content": "data-[state=open]:animate-[collapsible-down_200ms_var(--ease-out)] data-[state=closed]:animate-[collapsible-up_200ms_var(--ease-out)] data-[state=closed]:overflow-hidden"
  }
};

/* DOM extracted from Collapsible.vue — element nesting and data-slot names as shipped. */
/* Collapsible.vue:30-40 — the trigger is gated on `!!slots.default` ALONE, not
   on the open state, and `CollapsibleContent` stays in the tree either way
   (reka hides it with `hidden`, it is not removed). Extraction kept only the
   content node, so a closed collapsible rendered an empty 0-height root: no
   trigger, no label, no chevron. `CollapsibleTrigger` is `as-child`, so it
   contributes no element of its own. */
const tree = [{"t":"CollapsibleRoot","s":"root","c":[{"t":"CollapsibleTrigger","c":[{"t":"slot"}]},{"t":"CollapsibleContent","s":"content"}]}];

const render = createRenderer('collapsible', collapsibleTheme, tree, {
  /* the children ARE the trigger: the bare `<slot />` inside the (as-child,
     element-less) CollapsibleTrigger is where they go, not into `content` */
  childSlot: false,
  childAnchor: true,
  slotAttrs(slot, props) {
    if (slot !== 'root' && slot !== 'content') return null;
    const state = props.open ? 'open' : 'closed';
    if (slot !== 'content') return { 'data-state': state };
    /* reka keeps the content element and hides it — `content` is 2 on both
       sides of the diff, open or not. Open, the theme animates its height to
       `var(--reka-collapsible-content-height)`, a value reka measures at
       runtime; on a static render the keyframe would land on 0, so the open
       panel is simply its own height with no animation. */
    return props.open
      ? { 'data-state': state, style: { animation: 'none', height: 'auto' } }
      : { 'data-state': state, hidden: true };
  }
});

export function Collapsible(props) {
  return render(props);
}
