import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-list.ts (source/themes.json -> "page-list").
   Values are literal: no rounding, no cross-component alignment. */
export const pageListTheme = {
  "base": "relative flex flex-col",
  "variants": {
    "divide": {
      "true": "*:not-last:after:absolute *:not-last:after:inset-x-1 *:not-last:after:bottom-0 *:not-last:after:bg-border *:not-last:after:h-px"
    }
  }
};

/* DOM extracted from PageList.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"div","s":"base"}];

const render = createRenderer('page-list', pageListTheme, tree);

export function PageList(props) {
  return render(props);
}
