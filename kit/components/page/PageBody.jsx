import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-body.ts (source/themes.json -> "page-body").
   Values are literal: no rounding, no cross-component alignment. */
export const pageBodyTheme = {
  "base": "mt-8 pb-24 space-y-12"
};

/* DOM extracted from PageBody.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"div","s":"base"}];

const render = createRenderer('page-body', pageBodyTheme, tree);

export function PageBody(props) {
  return render(props);
}
