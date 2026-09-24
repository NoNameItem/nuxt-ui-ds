import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/input-tags.ts (source/themes.json -> "input-tags").
   Values are literal: no rounding, no cross-component alignment. */
export const inputTagsTheme = {
  "slots": {
    "root": [
      "relative inline-flex items-center",
      "flex-wrap"
    ],
    "base": [
      "rounded-md",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "item": "px-1.5 py-0.5 rounded-sm font-medium inline-flex items-center gap-0.5 ring ring-inset ring-accented bg-elevated text-default data-disabled:cursor-not-allowed data-disabled:opacity-75 wrap-anywhere data-[state=\"active\"]:bg-accented",
    "itemText": "",
    "itemDelete": [
      "inline-flex items-center rounded-xs text-dimmed hover:text-default hover:bg-accented/75 disabled:pointer-events-none",
      "transition-colors"
    ],
    "itemDeleteIcon": "shrink-0",
    "input": "flex-1 border-0 bg-transparent placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-sm/4 gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "item": "text-[10px]/3",
        "itemDeleteIcon": "size-3"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-sm/4 gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "item": "text-[10px]/3",
        "itemDeleteIcon": "size-3"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-base/5 gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "item": "text-xs",
        "itemDeleteIcon": "size-3.5"
      },
      "lg": {
        "base": "px-3 py-2 text-base/5 gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "item": "text-xs",
        "itemDeleteIcon": "size-3.5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "item": "text-sm",
        "itemDeleteIcon": "size-4"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated has-focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated has-focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent has-focus:outline-none"
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
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "fixed": {
      "false": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-primary/25 has-focus-visible:outline-3 has-focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-secondary/25 has-focus-visible:outline-3 has-focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-success/25 has-focus-visible:outline-3 has-focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-info/25 has-focus-visible:outline-3 has-focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-warning/25 has-focus-visible:outline-3 has-focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-error/25 has-focus-visible:outline-3 has-focus-visible:ring-error"
    },
    {
      "color": "primary",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-primary/25 has-focus-visible:outline-3"
    },
    {
      "color": "secondary",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-secondary/25 has-focus-visible:outline-3"
    },
    {
      "color": "success",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-success/25 has-focus-visible:outline-3"
    },
    {
      "color": "info",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-info/25 has-focus-visible:outline-3"
    },
    {
      "color": "warning",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-warning/25 has-focus-visible:outline-3"
    },
    {
      "color": "error",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-error/25 has-focus-visible:outline-3"
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
      "class": "outline-inverted/25 has-focus-visible:outline-3 has-focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-inverted/25 has-focus-visible:outline-3"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
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

/* DOM extracted from InputTags.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"TagsInputRoot","s":"root","c":[{"t":"TagsInputItem","s":"item","for":1,"c":[{"t":"TagsInputItemText","s":"itemText"},{"t":"TagsInputItemDelete","s":"itemDelete","c":[{"t":"slot","c":[{"t":"UIcon","s":"itemDeleteIcon"}]}]}]},{"t":"TagsInputInput","s":"input"},{"t":"span","s":"leading","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"leadingIcon","if":1},{"t":"UAvatar","s":"leadingAvatar","if":1}]}]},{"t":"span","s":"trailing","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"trailingIcon","if":1}]}]}]}];

const render = createRenderer('input-tags', inputTagsTheme, tree);

export function InputTags(props) {
  /* the tags are the model (InputTags.vue:64): whichever way the caller names
     it, the renderer's repeated list is `items` — without it no tag rendered and
     every input-tags root was the bare input's 24px */
  const { modelValue, defaultValue, items, ...rest } = props;
  const list = items || modelValue || defaultValue;
  return clearInput(render({ ...rest, modelValue, defaultValue, items: list }), props);
}

/* InputTags.vue:149-158 — TagsInputInput has no modelValue bound: its value is
   only the tag being typed, empty at first */
function clearInput(node, props) {
  if (Array.isArray(node)) return node.map((n) => clearInput(n, props));
  if (!React.isValidElement(node)) return node;
  if (node.type === 'input' && node.props['data-slot'] === 'input') {
    return props.value !== undefined ? node : React.cloneElement(node, { defaultValue: undefined });
  }
  const ch = node.props.children;
  if (ch === undefined || ch === null) return node;
  const next = clearInput(ch, props);
  return React.cloneElement(node, undefined, ...(Array.isArray(next) ? next : [next]));
}
