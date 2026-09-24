import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page.ts (source/themes.json -> "page").
   Values are literal: no rounding, no cross-component alignment. */
export const pageTheme = {
  "slots": {
    "root": "flex flex-col lg:grid lg:grid-cols-10 lg:gap-10",
    "left": "lg:col-span-2",
    "center": "lg:col-span-8",
    "right": "lg:col-span-2 order-first lg:order-last"
  },
  "variants": {
    "left": {
      "true": ""
    },
    "right": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "left": true,
      "right": true,
      "class": {
        "center": "lg:col-span-6"
      }
    },
    {
      "left": false,
      "right": false,
      "class": {
        "center": "lg:col-span-10"
      }
    }
  ]
};

/* DOM extracted from Page.vue — element nesting and data-slot names as shipped. */
/* Page.vue:37-39 - the bare slot lives INSIDE `center`, so the page own
 children take the centre column width; extraction dropped it and they
 became siblings of the column (an 89px-wide paragraph 240px tall). */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"Slot","s":"left","if":1},{"t":"div","s":"center","c":[{"t":"slot"}]},{"t":"Slot","s":"right","if":1}]}];

const render = createRenderer('page', pageTheme, tree, {
  /* the bare slot restored in the tree above is where children belong */
  childAnchor: true
});

export function Page(props) {
  return render(props);
}
