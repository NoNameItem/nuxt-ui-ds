import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-hero.ts (source/themes.json -> "page-hero").
   Values are literal: no rounding, no cross-component alignment. */
export const pageHeroTheme = {
  "slots": {
    "root": "relative isolate",
    "container": "flex flex-col lg:grid py-24 sm:py-32 lg:py-40 gap-16 sm:gap-y-24",
    "wrapper": "",
    "header": "",
    "headline": "mb-4",
    "title": "text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-highlighted",
    "description": "text-lg sm:text-xl/8 text-muted",
    "body": "mt-10",
    "footer": "mt-10",
    "links": "flex flex-wrap gap-x-6 gap-y-3"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "container": "lg:grid-cols-2 lg:items-center",
        "description": "text-pretty"
      },
      "vertical": {
        "container": "",
        "headline": "justify-center",
        "wrapper": "text-center",
        "description": "text-balance",
        "links": "justify-center"
      }
    },
    "reverse": {
      "true": {
        "wrapper": "order-last"
      }
    },
    "headline": {
      "true": {
        "headline": "font-semibold text-primary flex items-center gap-1.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-6"
      }
    }
  }
};

/* DOM extracted from PageHero.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"UContainer","s":"container","c":[{"t":"div","s":"wrapper","if":1,"c":[{"t":"div","s":"header","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"headline","if":1},{"t":"h1","s":"title","if":1},{"t":"div","s":"description","if":1}]}]},{"t":"div","s":"body","if":1},{"t":"div","s":"footer","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"links","if":1}]}]}]}]}]}];

/* PageHero.vue has no unnamed <slot/> in the grid: its children go into the
   second column, not into `body`. Letting the child-slot fallback pick `body`
   filled one column and left the other empty, so the row's height became the
   SUM of the columns — +168px on the hero. Its children belong INSIDE the
   container (the grid's second column): left at the root they became a sibling
   of it, and the hero's image grew the root to 1228px against 670. */
const render = createRenderer('page-hero', pageHeroTheme, tree, { childSlot: 'container', childSlotAt: 'end' });

export function PageHero(props) {
  return render(props);
}
