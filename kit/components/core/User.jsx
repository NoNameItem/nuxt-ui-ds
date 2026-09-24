import React from 'react';
import { register } from '../../lib/registry.js';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/user.ts (source/themes.json -> "user").
   Values are literal: no rounding, no cross-component alignment. */
export const userTheme = {
  "slots": {
    "root": "relative group/user",
    "wrapper": "",
    "name": "font-medium",
    "description": "text-muted",
    "avatar": "shrink-0"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "root": "flex items-center"
      },
      "vertical": {
        "root": "flex flex-col"
      }
    },
    "to": {
      "true": {
        "root": [
          "rounded-md outline-primary/25 has-focus-visible:outline-3",
          "transition"
        ],
        "name": [
          "text-default peer-hover:text-highlighted peer-focus-visible:text-highlighted",
          "transition-colors"
        ],
        "description": [
          "peer-hover:text-toned peer-focus-visible:text-toned",
          "transition-colors"
        ],
        "avatar": "transform transition-transform ease-out motion-reduce:transition-none group-hover/user:scale-115 group-has-focus-visible/user:scale-115"
      },
      "false": {
        "name": "text-highlighted",
        "description": ""
      }
    },
    "size": {
      "3xs": {
        "root": "gap-1",
        "wrapper": "flex items-center gap-1",
        "name": "text-xs",
        "description": "text-xs"
      },
      "2xs": {
        "root": "gap-1.5",
        "wrapper": "flex items-center gap-1.5",
        "name": "text-xs",
        "description": "text-xs"
      },
      "xs": {
        "root": "gap-1.5",
        "wrapper": "flex items-center gap-1.5",
        "name": "text-xs",
        "description": "text-xs"
      },
      "sm": {
        "root": "gap-2",
        "name": "text-xs",
        "description": "text-xs"
      },
      "md": {
        "root": "gap-2",
        "name": "text-sm",
        "description": "text-xs"
      },
      "lg": {
        "root": "gap-2.5",
        "name": "text-sm",
        "description": "text-sm"
      },
      "xl": {
        "root": "gap-2.5",
        "name": "text-base",
        "description": "text-sm"
      },
      "2xl": {
        "root": "gap-3",
        "name": "text-base",
        "description": "text-base"
      },
      "3xl": {
        "root": "gap-3",
        "name": "text-lg",
        "description": "text-base"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};

/* DOM extracted from User.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"slot","c":[{"t":"UChip","if":1,"c":[{"t":"UAvatar","s":"avatar"}]},{"t":"UAvatar","s":"avatar","if":1}]},{"t":"div","s":"wrapper","c":[{"t":"slot","c":[{"t":"p","s":"name","if":1},{"t":"p","s":"description","if":1}]}]}]}];

/* the template's v-if / v-else pair is exclusive: the chip-wrapped avatar or
   the bare one, never both. `to` is a theme variant driven by the prop. */
const render = createRenderer('user', userTheme, tree, {
  nodeFilter(node, { props }) {
    if (node.t === 'UChip') return !!props.chip;
    return true;
  },
  renderIf(slot, { props }) {
    if (slot === 'avatar') return !props.chip;
    return undefined;
  }
});

export function User(props) {
  return render({ to: !!props.to, ...props });
}

register('User', User);
