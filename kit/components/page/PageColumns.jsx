import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-columns.ts (source/themes.json -> "page-columns").
   Values are literal: no rounding, no cross-component alignment. */
export const pageColumnsTheme = {
  "base": "relative column-1 md:columns-2 lg:columns-3 gap-8 space-y-8 *:break-inside-avoid-column *:will-change-transform"
};

/* DOM extracted from PageColumns.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"div","s":"base"}];

const render = createRenderer('page-columns', pageColumnsTheme, tree);

export function PageColumns(props) {
  return render(props);
}
