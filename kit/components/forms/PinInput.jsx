import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/pin-input.ts (source/themes.json -> "pin-input").
   Values are literal: no rounding, no cross-component alignment. */
export const pinInputTheme = {
  "slots": {
    "root": "relative inline-flex items-center gap-1.5",
    "base": [
      "rounded-md border-0 placeholder:text-dimmed text-center disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "separator": "text-dimmed flex items-center justify-center"
  },
  "variants": {
    "size": {
      "xs": {
        "base": "size-6 text-sm/4"
      },
      "sm": {
        "base": "size-7 text-sm/4"
      },
      "md": {
        "base": "size-8 text-base/5"
      },
      "lg": {
        "base": "size-9 text-base/5"
      },
      "xl": {
        "base": "size-10 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent focus:outline-none"
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
    "highlight": {
      "true": ""
    },
    "fixed": {
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

/* DOM extracted from PinInput.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"PinInputRoot","s":"root","c":[{"t":"template","for":1,"c":[{"t":"PinInputInput","s":"base"},{"t":"span","s":"separator","if":1}]}]}];

/* PinInput.vue:20, 115-119: the cells repeat over `length` (default 5), not
   over items — `v-for="(ids, index) in looseToNumber(props.length)"`. A
   separator follows every cell but the last, and only when one is asked for. */
const render = createRenderer('pin-input', pinInputTheme, tree, {
  listFor: (node, { props }) => {
    if (node.t !== 'template') return undefined;
    const n = Math.max(0, Math.floor(Number(props.length ?? 5)) || 0);
    return Array.from({ length: n }, (_, i) => i);
  },
  renderIf: (slot, { props }) => (slot === 'separator' && !props.separator ? false : undefined),
  /* PinInputInput (reka) shows `context.currentModelValue[index]`: the model is
     one entry per cell. The renderer would give every input the whole array, so
     the model is handed over as `cellValues` and read per cell here. */
  slotAttrs: (slot, props, variants, { item, index }) => {
    if (slot !== 'base' || !Array.isArray(props.cellValues)) return null;
    const i = typeof item === 'number' ? item : index;
    const v = props.cellValues[i];
    return { defaultValue: v === undefined || v === null ? '' : String(v) };
  },
  slotContent: (slot, { props }) => (slot === 'separator' ? (typeof props.separator === 'string' ? props.separator : '•') : undefined)
});

export function PinInput(props) {
  const { modelValue, defaultValue, ...rest } = props;
  const model = modelValue !== undefined ? modelValue : defaultValue;
  if (!Array.isArray(model)) return render(props);
  return render({ ...rest, cellValues: model });
}
