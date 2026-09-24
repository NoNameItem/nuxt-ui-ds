import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-grid.ts (source/themes.json -> "page-grid").
   Values are literal: no rounding, no cross-component alignment. */
export const pageGridTheme = {
  "base": "relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
};

/* DOM extracted from PageGrid.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"div","s":"base"}];

const render = createRenderer('page-grid', pageGridTheme, tree);

export function PageGrid(props) {
  return render(props);
}
