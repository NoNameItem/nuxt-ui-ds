import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-anchors.ts (source/themes.json -> "page-anchors").
   Values are literal: no rounding, no cross-component alignment. */
export const pageAnchorsTheme = {
  "slots": {
    "root": "",
    "list": "",
    "item": "relative",
    "link": "group text-sm flex items-center gap-1.5 py-1 rounded-sm outline-primary/25 focus-visible:outline-3",
    "linkLeading": "rounded-md p-1 inline-flex ring-inset ring",
    "linkLeadingIcon": "size-4 shrink-0",
    "linkLabel": "truncate",
    "linkLabelExternalIcon": "size-3 absolute top-0 text-dimmed"
  },
  "variants": {
    "active": {
      "true": {
        "link": "text-primary font-semibold",
        "linkLeading": "bg-primary ring-primary text-inverted"
      },
      "false": {
        "link": [
          "text-muted hover:text-default font-medium",
          "transition-colors"
        ],
        "linkLeading": [
          "bg-elevated/50 ring-accented text-dimmed group-hover:bg-primary group-hover:ring-primary group-hover:text-inverted",
          "transition"
        ]
      }
    }
  }
};

/* DOM extracted from PageAnchors.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"ul","s":"list","c":[{"t":"li","s":"item","for":1,"c":[{"t":"ULink","c":[{"t":"ULinkBase","s":"link","c":[{"t":"slot","c":[{"t":"div","s":"linkLeading","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"linkLeadingIcon","if":1}]}]},{"t":"span","s":"linkLabel","if":1,"c":[{"t":"UIcon","s":"linkLabelExternalIcon","if":1}]}]}]}]}]}]}]}];

/* PageAnchors.vue:24 — the root tv() gets no props; each link's `active` is
   ULink's (:31-45): item.active, else false without a route */
const render = createRenderer('page-anchors', pageAnchorsTheme, tree, {
  itemOnlyVariants: ['active'],
  itemVariants: (item) => ({ active: !!(item && typeof item === 'object' && item.active) })
});

export function PageAnchors(props) {
  return render(props);
}
