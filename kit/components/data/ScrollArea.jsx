import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/scroll-area.ts (source/themes.json -> "scroll-area").
   Values are literal: no rounding, no cross-component alignment. */
export const scrollAreaTheme = {
  "slots": {
    "root": "relative outline-primary/25 focus-visible:outline-3",
    "viewport": "relative flex",
    "item": ""
  },
  "variants": {
    "orientation": {
      "vertical": {
        "root": "overflow-y-auto overflow-x-hidden",
        "viewport": "flex-col",
        "item": ""
      },
      "horizontal": {
        "root": "overflow-x-auto overflow-y-hidden",
        "viewport": "flex-row",
        "item": ""
      }
    },
    "externalScroll": {
      "true": {
        "root": "overflow-visible"
      }
    }
  }
};

/* DOM extracted from ScrollArea.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"template","if":1,"c":[{"t":"div","s":"viewport","c":[{"t":"div","s":"item","for":1}]}]},{"t":"template","c":[{"t":"div","s":"viewport","c":[{"t":"template","if":1,"c":[{"t":"div","s":"item","for":1}]}]}]}]}];

const render = createRenderer('scroll-area', scrollAreaTheme, tree, {
  /* ScrollArea.vue, non-virtualized branch: `<slot />` sits INSIDE the viewport */
  childSlot: 'viewport',
  /* ScrollArea.vue:31 wraps the CONTENT it is given; the `item` div repeats over
     children, not over an `items` prop, and the template pair is v-if/v-else —
     one viewport, not both. Drawing both branches and one item per `items` entry
     gave six viewports and ten items where the library has three and none. */
  nodeFilter(node) {
    if (node.t === 'template' && !node.if) return false;
    return true;
  },
  renderIf(slot) {
    if (slot === 'item') return false;
    return undefined;
  }
});

export function ScrollArea(props) {
  return render(props);
}
