import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/card.ts (source/themes.json -> "card").
   Values are literal: no rounding, no cross-component alignment. */
export const cardTheme = {
  "slots": {
    "root": "rounded-lg overflow-hidden",
    "header": "p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "body": "p-4 sm:p-6",
    "footer": "p-4 sm:px-6"
  },
  "variants": {
    "variant": {
      "solid": {
        "root": "bg-inverted text-inverted",
        "title": "text-inverted",
        "description": "text-dimmed"
      },
      "outline": {
        "root": "bg-default ring ring-default divide-y divide-default"
      },
      "soft": {
        "root": "bg-elevated/50 divide-y divide-default"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default divide-y divide-default"
      }
    }
  },
  "defaultVariants": {
    "variant": "outline"
  }
};

/* DOM extracted from Card.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"header","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"title","if":1},{"t":"div","s":"description","if":1}]}]},{"t":"div","s":"body","if":1},{"t":"div","s":"footer","if":1}]}];

const render = createRenderer('card', cardTheme, tree);

export function Card(props) {
  return render(props);
}
