import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { tvd } from '../../lib/tv.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/input-time.ts (source/themes.json -> "input-time").
   Values are literal: no rounding, no cross-component alignment. */
export const inputTimeTheme = {
  "slots": {
    "base": [
      "group relative inline-flex items-center rounded-md select-none",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "segment": [
      "rounded-sm text-center outline-hidden data-placeholder:text-dimmed data-[segment=literal]:text-muted data-invalid:text-error data-disabled:cursor-not-allowed data-disabled:opacity-75",
      "transition-colors"
    ],
    "separatorIcon": "shrink-0 size-4 text-muted"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": [
          "px-2 py-1 text-sm/4 gap-1",
          "gap-0.25"
        ],
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "segment": "not-data-[segment=literal]:w-8"
      },
      "sm": {
        "base": [
          "px-2.5 py-1.5 text-sm/4 gap-1.5",
          "gap-0.5"
        ],
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "segment": "not-data-[segment=literal]:w-8"
      },
      "md": {
        "base": [
          "px-2.5 py-1.5 text-base/5 gap-1.5",
          "gap-0.5"
        ],
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "segment": "not-data-[segment=literal]:w-9"
      },
      "lg": {
        "base": [
          "px-3 py-2 text-base/5 gap-2",
          "gap-0.75"
        ],
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "segment": "not-data-[segment=literal]:w-9"
      },
      "xl": {
        "base": [
          "px-3 py-2 text-base gap-2",
          "gap-0.75"
        ],
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "segment": "not-data-[segment=literal]:w-10"
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
    },
    {
      "variant": "outline",
      "class": {
        "segment": "focus:bg-elevated"
      }
    },
    {
      "variant": "soft",
      "class": {
        "segment": "focus:bg-accented/50 group-hover:focus:bg-accented"
      }
    },
    {
      "variant": "subtle",
      "class": {
        "segment": "focus:bg-accented"
      }
    },
    {
      "variant": "ghost",
      "class": {
        "segment": "focus:bg-elevated group-hover:focus:bg-accented"
      }
    },
    {
      "variant": "none",
      "class": {
        "segment": "focus:bg-elevated"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};

/* DOM extracted from InputTime.vue — element nesting and data-slot names as shipped. */
/* :149-150 of the same shape as InputDate: the ReuseSegmentsTemplate inside
   TimeField.Root was lost in extraction along with both v-if branches. */
const tree = [{"t":"DefineSegmentsTemplate","c":[{"t":"TimeField.Input","s":"segment","for":1}]},{"t":"TimeField.Root","s":"base","c":[{"t":"template","c":[{"t":"slot","c":[{"t":"UIcon","s":"separatorIcon"}]}]},{"t":"span","s":"leading","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"leadingIcon","if":1},{"t":"UAvatar","s":"leadingAvatar","if":1}]}]},{"t":"span","s":"trailing","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"trailingIcon","if":1}]}]}]}];

/* reka fills this list at runtime through TimeField.Root's scoped slot; a
   static render carries it as a literal. en-US, no value set: the hour and
   minute placeholders are EN DASHES (U+2013), and `dayPeriod` shows a real
   value ("AM"), so it carries no `data-placeholder` — which is why the theme
   paints it `text-highlighted` and the others `text-dimmed`. The two trailing
   literals are empty and measure 0. */
const TIME_SEGMENTS = [
  { part: 'hour', label: '\u2013\u2013', placeholder: true },
  { part: 'literal', label: ':' },
  { part: 'minute', label: '\u2013\u2013', placeholder: true },
  { part: 'literal', label: '' },
  { part: 'dayPeriod', label: 'AM' },
  { part: 'literal', label: '' }
];

const render = createRenderer('input-time', inputTimeTheme, tree, { childSlot: 'base' });
const resolve = tvd('input-time', inputTimeTheme);

export function InputTime(props) {
  /* :120-131,149-150 — the segments live in a DefineSegmentsTemplate that
     DateField.Root reuses, and BOTH branches of that v-if were lost in
     extraction: the field rendered as an empty 20x12 box. reka fills the list
     from its own scoped slot at runtime, so it is built here as the children of
     `base` — the plainest path there is — with the theme's `segment` class and
     the two attributes the theme reads (`data-[segment=literal]:text-muted`,
     the size variant's `data-[segment=day]:w-9`, `data-placeholder:text-dimmed`). */
  const ui = resolve(props);
  const uiProp = props.ui || {};
  const segments = TIME_SEGMENTS.map((seg, i) => React.createElement('div', {
    key: i,
    'data-slot': 'segment',
    'data-segment': seg.part,
    ...(seg.placeholder ? { 'data-placeholder': '' } : {}),
    className: ui.segment(uiProp.segment)
  }, seg.label));
  return render({ ...props, children: props.children !== undefined ? props.children : segments });
}
