import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { ICONS } from '../../lib/icons.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/empty.ts (source/themes.json -> "empty").
   Values are literal: no rounding, no cross-component alignment. */
export const emptyTheme = {
  "slots": {
    "root": "relative flex flex-col items-center justify-center gap-4 rounded-lg p-4 sm:p-6 lg:p-8 min-w-0",
    "header": "flex flex-col items-center gap-2 max-w-sm text-center",
    "avatar": "shrink-0 mb-2",
    "title": "text-highlighted text-pretty font-medium",
    "description": "text-balance text-center",
    "body": "flex flex-col items-center gap-4 max-w-sm",
    "actions": "flex flex-wrap justify-center gap-2 shrink-0",
    "footer": "flex flex-col items-center gap-2 max-w-sm"
  },
  "variants": {
    "size": {
      "xs": {
        "avatar": "size-8 text-base",
        "title": "text-sm",
        "description": "text-xs"
      },
      "sm": {
        "avatar": "size-9 text-lg",
        "title": "text-sm",
        "description": "text-xs"
      },
      "md": {
        "avatar": "size-10 text-xl",
        "title": "text-base",
        "description": "text-sm"
      },
      "lg": {
        "avatar": "size-11 text-[22px]",
        "title": "text-base",
        "description": "text-sm"
      },
      "xl": {
        "avatar": "size-12 text-2xl",
        "title": "text-lg",
        "description": "text-base"
      }
    },
    "variant": {
      "solid": {
        "root": "bg-inverted",
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
    "loading": {
      "true": {
        "avatar": "[&>[data-slot=icon]]:animate-spin"
      }
    }
  },
  "defaultVariants": {
    "variant": "outline",
    "size": "md"
  }
};

/* DOM extracted from Empty.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"header","if":1,"c":[{"t":"slot","c":[{"t":"slot","c":[{"t":"UAvatar","s":"avatar","if":1}]},{"t":"h2","s":"title","if":1},{"t":"div","s":"description","if":1}]}]},{"t":"div","s":"body","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"actions","if":1}]}]},{"t":"div","s":"footer","if":1}]}];

const render = createRenderer('empty', emptyTheme, tree);

/* Empty.vue:30 — `props.loading ? props.loadingIcon || icons.loading : props.icon` */
export function Empty(props) {
  if (!props.loading) return render(props);
  return render({ ...props, icon: props.loadingIcon || ICONS.loading });
}
