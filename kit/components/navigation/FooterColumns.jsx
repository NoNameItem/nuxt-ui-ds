import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/footer-columns.ts (source/themes.json -> "footer-columns").
   Values are literal: no rounding, no cross-component alignment. */
export const footerColumnsTheme = {
  "slots": {
    "root": "xl:grid xl:grid-cols-3 xl:gap-8",
    "left": "mb-10 xl:mb-0",
    "center": "flex flex-col lg:grid grid-flow-col auto-cols-fr gap-8 xl:col-span-2",
    "right": "mt-10 xl:mt-0",
    "label": "text-sm font-semibold",
    "list": "mt-6 space-y-4",
    "item": "relative",
    "link": "group text-sm flex items-center gap-1.5 rounded-sm outline-primary/25 focus-visible:outline-3",
    "linkLeadingIcon": "size-5 shrink-0",
    "linkLabel": "truncate",
    "linkLabelExternalIcon": "size-3 absolute top-0 text-dimmed inline-block"
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

/* DOM extracted from FooterColumns.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"left","if":1},{"t":"div","s":"center","if":1,"c":[{"t":"slot","c":[{"t":"div","for":1,"c":[{"t":"h3","s":"label"},{"t":"ul","s":"list","c":[{"t":"li","s":"item","for":1,"c":[{"t":"ULink","c":[{"t":"ULinkBase","s":"link","c":[{"t":"slot","c":[{"t":"slot","c":[{"t":"UIcon","s":"linkLeadingIcon","if":1}]},{"t":"span","s":"linkLabel","if":1,"c":[{"t":"UIcon","s":"linkLabelExternalIcon","if":1}]}]}]}]}]}]}]}]}]},{"t":"div","s":"right","if":1}]}];

/* FooterColumns.vue:18, 33-45: two levels — `columns`, then each column's
   `children` links. The outer loop is named explicitly, or the renderer would
   treat the list as one group and pour every column into a single list. */
const render = createRenderer('footer-columns', footerColumnsTheme, tree, {
  /* FooterColumns.vue:24 — the root tv() gets no props; each link's `active`
     is ULink's (:45-56): item.active, else false without a route */
  itemOnlyVariants: ['active'],
  itemVariants: (item) => ({ active: !!(item && typeof item === 'object' && item.active) }),
  listFor: (node, { props, item }) => {
    if (node.t === 'div' && !node.s && item === undefined) return props.columns || [];
    return undefined;
  }
});

export function FooterColumns(props) {
  return render(props);
}
