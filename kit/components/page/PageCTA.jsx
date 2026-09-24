import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-cta.ts (source/themes.json -> "page-cta").
   Values are literal: no rounding, no cross-component alignment. */
export const pageCtaTheme = {
  "slots": {
    "root": "relative isolate rounded-xl overflow-hidden",
    "container": "flex flex-col lg:grid px-6 py-12 sm:px-12 sm:py-24 lg:px-16 lg:py-24 gap-8 sm:gap-16",
    "wrapper": "",
    "header": "",
    "title": "text-3xl sm:text-4xl text-pretty tracking-tight font-bold text-highlighted",
    "description": "text-base sm:text-lg text-muted",
    "body": "mt-8",
    "footer": "mt-8",
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
        "title": "text-center",
        "description": "text-center text-balance",
        "links": "justify-center"
      }
    },
    "reverse": {
      "true": {
        "wrapper": "order-last"
      }
    },
    "variant": {
      "solid": {
        "root": "bg-inverted text-inverted",
        "title": "text-inverted",
        "description": "text-dimmed"
      },
      "outline": {
        "root": "bg-default ring ring-default",
        "description": "text-muted"
      },
      "soft": {
        "root": "bg-elevated/50",
        "description": "text-toned"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default",
        "description": "text-toned"
      },
      "naked": {
        "description": "text-muted"
      }
    },
    "title": {
      "true": {
        "description": "mt-6"
      }
    }
  },
  "defaultVariants": {
    "variant": "outline"
  }
};

/* DOM extracted from PageCTA.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"UContainer","s":"container","c":[{"t":"div","s":"wrapper","if":1,"c":[{"t":"div","s":"header","if":1,"c":[{"t":"slot","c":[{"t":"h2","s":"title","if":1},{"t":"div","s":"description","if":1}]}]},{"t":"div","s":"body","if":1},{"t":"div","s":"footer","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"links","if":1}]}]}]}]}]}];

/* same as PageHero: no unnamed slot, so children must not fall into `body` */
const render = createRenderer('page-cta', pageCtaTheme, tree, { childSlot: 'container', childSlotAt: 'end' });

export function PageCTA(props) {
  return render(props);
}
