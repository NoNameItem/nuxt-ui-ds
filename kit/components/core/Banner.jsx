import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/banner.ts (source/themes.json -> "banner").
   Values are literal: no rounding, no cross-component alignment. */
export const bannerTheme = {
  "slots": {
    "root": [
      "relative z-50 w-full",
      "transition-colors"
    ],
    "container": "flex items-center justify-between gap-3 h-12",
    "left": "hidden lg:flex-1 lg:flex lg:items-center",
    "center": "flex items-center gap-1.5 min-w-0",
    "right": "lg:flex-1 flex items-center justify-end",
    "icon": "size-5 shrink-0 text-inverted pointer-events-none",
    "title": "text-sm text-inverted font-medium truncate",
    "actions": "flex gap-1.5 shrink-0 isolate",
    "close": "text-inverted hover:bg-default/10 focus-visible:bg-default/10 -me-1.5 lg:me-0"
  },
  "variants": {
    "color": {
      "primary": {
        "root": "bg-primary"
      },
      "secondary": {
        "root": "bg-secondary"
      },
      "success": {
        "root": "bg-success"
      },
      "info": {
        "root": "bg-info"
      },
      "warning": {
        "root": "bg-warning"
      },
      "error": {
        "root": "bg-error"
      },
      "neutral": {
        "root": "bg-inverted"
      }
    },
    "to": {
      "true": {
        "root": "outline-(--ui-bg)/25 -outline-offset-3 has-[>a:focus-visible]:outline-3"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "to": true,
      "class": {
        "root": "hover:bg-primary/90"
      }
    },
    {
      "color": "secondary",
      "to": true,
      "class": {
        "root": "hover:bg-secondary/90"
      }
    },
    {
      "color": "success",
      "to": true,
      "class": {
        "root": "hover:bg-success/90"
      }
    },
    {
      "color": "info",
      "to": true,
      "class": {
        "root": "hover:bg-info/90"
      }
    },
    {
      "color": "warning",
      "to": true,
      "class": {
        "root": "hover:bg-warning/90"
      }
    },
    {
      "color": "error",
      "to": true,
      "class": {
        "root": "hover:bg-error/90"
      }
    },
    {
      "color": "neutral",
      "to": true,
      "class": {
        "root": "hover:bg-inverted/90"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary"
  }
};

/* DOM extracted from Banner.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"UContainer","s":"container","c":[{"t":"div","s":"left"},{"t":"div","s":"center","c":[{"t":"slot","c":[{"t":"UIcon","s":"icon","if":1}]},{"t":"div","s":"title","if":1},{"t":"div","s":"actions","if":1}]},{"t":"div","s":"right","c":[{"t":"slot","c":[{"t":"UButton","s":"close","if":1}]}]}]}]}];

const render = createRenderer('banner', bannerTheme, tree);

export function Banner(props) {
  return render(props);
}
