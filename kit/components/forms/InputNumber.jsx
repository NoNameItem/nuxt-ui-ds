import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/input-number.ts (source/themes.json -> "input-number").
   Values are literal: no rounding, no cross-component alignment. */
export const inputNumberTheme = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 placeholder:text-dimmed disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "increment": "absolute flex items-center",
    "decrement": "absolute flex items-center"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "size": {
      "xs": "px-2 py-1 text-sm/4 gap-1",
      "sm": "px-2.5 py-1.5 text-sm/4 gap-1.5",
      "md": "px-2.5 py-1.5 text-base/5 gap-1.5",
      "lg": "px-3 py-2 text-base/5 gap-2",
      "xl": "px-3 py-2 text-base gap-2"
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent focus:outline-none"
    },
    "disabled": {
      "true": {
        "increment": "opacity-75 cursor-not-allowed",
        "decrement": "opacity-75 cursor-not-allowed"
      }
    },
    "orientation": {
      "horizontal": {
        "base": "text-center",
        "increment": "inset-y-0 end-0 pe-1",
        "decrement": "inset-y-0 start-0 ps-1"
      },
      "vertical": {
        "increment": "top-0 end-0 pe-1 [&>button]:py-0 scale-80",
        "decrement": "bottom-0 end-0 pe-1 [&>button]:py-0 scale-80"
      }
    },
    "highlight": {
      "true": ""
    },
    "fixed": {
      "false": ""
    },
    "increment": {
      "false": ""
    },
    "decrement": {
      "false": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-secondary/25 focus-visible:outline-3 focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-success/25 focus-visible:outline-3 focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-info/25 focus-visible:outline-3 focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-warning/25 focus-visible:outline-3 focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-error/25 focus-visible:outline-3 focus-visible:ring-error"
    },
    {
      "color": "primary",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-primary/25 focus-visible:outline-3"
    },
    {
      "color": "secondary",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-secondary/25 focus-visible:outline-3"
    },
    {
      "color": "success",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-success/25 focus-visible:outline-3"
    },
    {
      "color": "info",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-info/25 focus-visible:outline-3"
    },
    {
      "color": "warning",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-warning/25 focus-visible:outline-3"
    },
    {
      "color": "error",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-error/25 focus-visible:outline-3"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-inverted/25 focus-visible:outline-3 focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-inverted/25 focus-visible:outline-3"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "orientation": "horizontal",
      "decrement": false,
      "class": "text-start"
    },
    {
      "decrement": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "decrement": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "decrement": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "decrement": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "decrement": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "increment": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "increment": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "increment": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "increment": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "increment": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "fixed": false,
      "size": "xs",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "sm",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "md",
      "class": "md:text-sm"
    },
    {
      "fixed": false,
      "size": "lg",
      "class": "md:text-sm"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};

/* DOM extracted from InputNumber.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"NumberFieldRoot","s":"root","c":[{"t":"NumberFieldInput","s":"base"},{"t":"div","s":"increment","if":1},{"t":"div","s":"decrement","if":1}]}];

const render = createRenderer('input-number', inputNumberTheme, tree);

/* InputNumber.vue:140-168 — both steppers are `UButton variant="link" :color="color" :size="size"`
   with the prop's object bound over them: the field's colour, not neutral */
const STEPPERS = ['increment', 'decrement'];
function recolor(node, props) {
  if (Array.isArray(node)) return node.map((n) => recolor(n, props));
  if (!React.isValidElement(node)) return node;
  const label = node.props['aria-label'];
  if (typeof node.type !== 'string' && STEPPERS.includes(label) && node.props.variant === 'link') {
    const own = props[label] && typeof props[label] === 'object' ? props[label] : {};
    /* InputNumber.vue:78-79 — horizontal: plus/minus; otherwise chevronUp/chevronDown */
    const vertical = (props.orientation || 'horizontal') !== 'horizontal';
    const iconProp = props[label + 'Icon'];
    const icon = iconProp || (vertical ? (label === 'increment' ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down') : node.props.icon);
    return React.cloneElement(node, { color: props.color || 'primary', icon, ...own });
  }
  const ch = node.props.children;
  if (ch === undefined || ch === null) return node;
  const next = recolor(ch, props);
  return React.cloneElement(node, undefined, ...(Array.isArray(next) ? next : [next]));
}

export function InputNumber(props) {
  return recolor(render(props), props);
}
