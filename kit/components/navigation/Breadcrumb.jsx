import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/breadcrumb.ts (source/themes.json -> "breadcrumb").
   Values are literal: no rounding, no cross-component alignment. */
export const breadcrumbTheme = {
  "slots": {
    "root": "relative min-w-0",
    "list": "flex items-center gap-1.5",
    "item": "flex min-w-0",
    "link": "group relative flex items-center gap-1.5 text-sm min-w-0 rounded-md",
    "linkLeadingIcon": "shrink-0 size-5",
    "linkLeadingAvatar": "shrink-0",
    "linkLeadingAvatarSize": "2xs",
    "linkLabel": "truncate",
    "separator": "flex",
    "separatorIcon": "shrink-0 size-5 text-muted"
  },
  "variants": {
    "active": {
      "true": {
        "link": "font-semibold"
      },
      "false": {
        "link": "text-muted font-medium"
      }
    },
    "disabled": {
      "true": {
        "link": "cursor-not-allowed opacity-75"
      }
    },
    "to": {
      "true": ""
    },
    "color": {
      "primary": {
        "link": "outline-primary/25 focus-visible:outline-3"
      },
      "secondary": {
        "link": "outline-secondary/25 focus-visible:outline-3"
      },
      "success": {
        "link": "outline-success/25 focus-visible:outline-3"
      },
      "info": {
        "link": "outline-info/25 focus-visible:outline-3"
      },
      "warning": {
        "link": "outline-warning/25 focus-visible:outline-3"
      },
      "error": {
        "link": "outline-error/25 focus-visible:outline-3"
      },
      "neutral": {
        "link": "outline-inverted/25 focus-visible:outline-3"
      }
    }
  },
  "compoundVariants": [
    {
      "disabled": false,
      "active": false,
      "to": true,
      "class": {
        "link": [
          "hover:text-default",
          "transition-colors"
        ]
      }
    },
    {
      "color": "primary",
      "active": true,
      "class": {
        "link": "text-primary"
      }
    },
    {
      "color": "secondary",
      "active": true,
      "class": {
        "link": "text-secondary"
      }
    },
    {
      "color": "success",
      "active": true,
      "class": {
        "link": "text-success"
      }
    },
    {
      "color": "info",
      "active": true,
      "class": {
        "link": "text-info"
      }
    },
    {
      "color": "warning",
      "active": true,
      "class": {
        "link": "text-warning"
      }
    },
    {
      "color": "error",
      "active": true,
      "class": {
        "link": "text-error"
      }
    },
    {
      "color": "neutral",
      "active": true,
      "class": {
        "link": "text-highlighted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary"
  }
};

/* DOM extracted from Breadcrumb.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"ol","s":"list","c":[{"t":"template","for":1,"c":[{"t":"li","s":"item","c":[{"t":"ULink","c":[{"t":"span","s":"link","c":[{"t":"slot","c":[{"t":"slot","c":[{"t":"UIcon","s":"linkLeadingIcon","if":1},{"t":"UAvatar","s":"linkLeadingAvatar","if":1}]},{"t":"span","s":"linkLabel","if":1}]}]}]}]},{"t":"li","s":"separator","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"separatorIcon"}]}]}]}]}]}];

/* the separator renders between items, never after the last one */
const breadcrumbOptions = {
  /* Breadcrumb.vue:32-34 — the root tv() gets `color` only; :43, 46-47 — each
     link is active by `item.active ?? index === items.length - 1` */
  itemOnlyVariants: ['active'],
  itemVariants: (item, { index, count }) => ({
    active: item && typeof item === 'object' && item.active !== undefined ? item.active : index === count - 1
  }),
  renderIf(slot, { index, count }) {
    if (slot === 'separator') return index !== undefined && index < count - 1;
    return undefined;
  }
};
const render = createRenderer('breadcrumb', breadcrumbTheme, tree, breadcrumbOptions);

/* Breadcrumb.vue:31 — `props.separatorIcon || icons.chevronRight`. The icon node
   sits inside the item loop, where the renderer reads the ITEM's field, so the
   prop is written onto the tree node itself (its `icon` fallback) — one
   renderer per icon name, built once. */
const withIcon = (nodes, name) => nodes.map((n) => ({
  ...n, ...(n.s === 'separatorIcon' ? { icon: name } : {}), ...(n.c ? { c: withIcon(n.c, name) } : {})
}));
const renderers = new Map();
function rendererFor(name) {
  if (!renderers.has(name)) renderers.set(name, createRenderer('breadcrumb', breadcrumbTheme, withIcon(tree, name), breadcrumbOptions));
  return renderers.get(name);
}

export function Breadcrumb(props) {
  const { separatorIcon, ...rest } = props;
  return separatorIcon ? rendererFor(separatorIcon)(rest) : render(rest);
}
