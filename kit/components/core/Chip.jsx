import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { AvatarGroupContext } from './Avatar.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/chip.ts (source/themes.json -> "chip").
   Values are literal: no rounding, no cross-component alignment. */
export const chipTheme = {
  "slots": {
    "root": "relative inline-flex items-center justify-center shrink-0",
    "base": "rounded-full ring ring-bg flex items-center justify-center text-inverted font-medium whitespace-nowrap"
  },
  "variants": {
    "color": {
      "primary": "bg-primary",
      "secondary": "bg-secondary",
      "success": "bg-success",
      "info": "bg-info",
      "warning": "bg-warning",
      "error": "bg-error",
      "neutral": "bg-inverted"
    },
    "size": {
      "3xs": "h-[4px] min-w-[4px] text-[4px]",
      "2xs": "h-[5px] min-w-[5px] text-[5px]",
      "xs": "h-[6px] min-w-[6px] text-[6px]",
      "sm": "h-[7px] min-w-[7px] text-[7px]",
      "md": "h-[8px] min-w-[8px] text-[8px]",
      "lg": "h-[9px] min-w-[9px] text-[9px]",
      "xl": "h-[10px] min-w-[10px] text-[10px]",
      "2xl": "h-[11px] min-w-[11px] text-[11px]",
      "3xl": "h-[12px] min-w-[12px] text-[12px]"
    },
    "position": {
      "top-right": "top-0 right-0",
      "bottom-right": "bottom-0 right-0",
      "top-left": "top-0 left-0",
      "bottom-left": "bottom-0 left-0"
    },
    "inset": {
      "false": ""
    },
    "standalone": {
      "false": "absolute"
    }
  },
  "compoundVariants": [
    {
      "position": "top-right",
      "inset": false,
      "class": "-translate-y-1/2 translate-x-1/2 transform"
    },
    {
      "position": "bottom-right",
      "inset": false,
      "class": "translate-y-1/2 translate-x-1/2 transform"
    },
    {
      "position": "top-left",
      "inset": false,
      "class": "-translate-y-1/2 -translate-x-1/2 transform"
    },
    {
      "position": "bottom-left",
      "inset": false,
      "class": "translate-y-1/2 -translate-x-1/2 transform"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "position": "top-right"
  }
};

/* DOM extracted from Chip.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"span","s":"base","if":1}]}];

/* the dot is `v-if="show"` — shown by default, not driven by slot content */
const render = createRenderer('chip', chipTheme, tree, {
  renderIf(slot, { props }) {
    if (slot === 'base') return props.show !== false;
    return undefined;
  },
  /* Chip.vue:43-47 — `<slot name="content">{{ props.text }}</slot>` inside base */
  slotContent(slot, { props }) {
    if (slot === 'base' && props.text !== undefined && props.text !== null) return props.text;
    return undefined;
  }
});

/* Chip.vue:27-31 — useAvatarGroup reads the outer group and provides
   `{ size, color }` to the avatars inside */
export function Chip(props) {
  const outer = React.useContext(AvatarGroupContext);
  const size = props.size ?? (outer ? outer.size : undefined);
  const color = props.color ?? (outer ? outer.color : undefined);
  const value = React.useMemo(() => ({ size, color }), [size, color]);
  return React.createElement(AvatarGroupContext.Provider, { value }, render(props));
}
