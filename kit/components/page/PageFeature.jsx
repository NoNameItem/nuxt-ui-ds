import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { register } from '../../lib/registry.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-feature.ts (source/themes.json -> "page-feature").
   Values are literal: no rounding, no cross-component alignment. */
export const pageFeatureTheme = {
  "slots": {
    "root": "relative rounded-sm",
    "wrapper": "",
    "leading": "inline-flex items-center justify-center",
    "leadingIcon": "size-5 shrink-0 text-primary",
    "title": "text-base text-pretty font-semibold text-highlighted",
    "description": "text-[15px] text-pretty text-muted"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "root": "flex items-start gap-2.5",
        "leading": "p-0.5"
      },
      "vertical": {
        "leading": "mb-2.5"
      }
    },
    "to": {
      "true": {
        "root": [
          "outline-primary/25 has-focus-visible:outline-3",
          "transition"
        ]
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    }
  }
};

/* DOM extracted from PageFeature.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"leading","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"leadingIcon","if":1}]}]},{"t":"div","s":"wrapper","c":[{"t":"slot","c":[{"t":"div","s":"title","if":1},{"t":"div","s":"description","if":1}]}]}]}];

const render = createRenderer('page-feature', pageFeatureTheme, tree);

export function PageFeature(props) {
  return render(props);
}

/* mounted inside PageSection's features list — the renderer looks it up by name */
register('PageFeature', PageFeature);
