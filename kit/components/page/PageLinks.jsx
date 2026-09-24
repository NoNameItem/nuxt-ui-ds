import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-links.ts (source/themes.json -> "page-links").
   Values are literal: no rounding, no cross-component alignment. */
export const pageLinksTheme = {
  "slots": {
    "root": "flex flex-col gap-3",
    "title": "text-sm font-semibold flex items-center gap-1.5",
    "list": "flex flex-col gap-2",
    "item": "relative",
    "link": "group text-sm flex items-center gap-1.5 rounded-sm outline-primary/25 focus-visible:outline-3",
    "linkLeadingIcon": "size-5 shrink-0",
    "linkLabel": "truncate",
    "linkLabelExternalIcon": "size-3 absolute top-0 text-dimmed"
  },
  "variants": {
    "active": {
      "true": {
        "link": "text-primary font-medium"
      },
      "false": {
        "link": [
          "text-muted hover:text-default",
          "transition-colors"
        ]
      }
    }
  }
};

/* DOM extracted from PageLinks.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"p","s":"title","if":1},{"t":"ul","s":"list","c":[{"t":"li","s":"item","for":1,"c":[{"t":"ULink","c":[{"t":"ULinkBase","s":"link","c":[{"t":"slot","c":[{"t":"slot","c":[{"t":"UIcon","s":"linkLeadingIcon","if":1}]},{"t":"span","s":"linkLabel","if":1,"c":[{"t":"UIcon","s":"linkLabelExternalIcon","if":1}]}]}]}]}]}]}]}];

/* PageLinks.vue:25 — the root tv() gets no props; each link's `active` is
   ULink's (:38-50): item.active, else false without a route */
const render = createRenderer('page-links', pageLinksTheme, tree, {
  itemOnlyVariants: ['active'],
  itemVariants: (item) => ({ active: !!(item && typeof item === 'object' && item.active) })
});

export function PageLinks(props) {
  return render(props);
}
