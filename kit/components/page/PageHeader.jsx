import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-header.ts (source/themes.json -> "page-header").
   Values are literal: no rounding, no cross-component alignment. */
export const pageHeaderTheme = {
  "slots": {
    "root": "relative border-b border-default py-8",
    "container": "",
    "wrapper": "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4",
    "headline": "mb-2.5 text-sm font-semibold text-primary flex items-center gap-1.5",
    "title": "text-3xl sm:text-4xl text-pretty font-bold text-highlighted",
    "description": "text-lg text-pretty text-muted",
    "links": "flex flex-wrap items-center gap-1.5"
  },
  "variants": {
    "title": {
      "true": {
        "description": "mt-4"
      }
    }
  }
};

/* DOM extracted from PageHeader.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"headline","if":1},{"t":"div","s":"container","c":[{"t":"div","s":"wrapper","c":[{"t":"h1","s":"title","if":1},{"t":"div","s":"links","if":1}]},{"t":"div","s":"description","if":1}]}]}];

const render = createRenderer('page-header', pageHeaderTheme, tree);

export function PageHeader(props) {
  return render(props);
}
