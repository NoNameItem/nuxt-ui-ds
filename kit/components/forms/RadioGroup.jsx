import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/radio-group.ts (source/themes.json -> "radio-group").
   Values are literal: no rounding, no cross-component alignment. */
export const radioGroupTheme = {
  "slots": {
    "root": "relative",
    "fieldset": "flex gap-x-2",
    "legend": "mb-1 block font-medium text-default",
    "item": "flex items-start",
    "container": "flex items-center",
    "base": "rounded-full ring ring-inset ring-accented overflow-hidden focus-visible:outline-none",
    "indicator": "flex items-center justify-center size-full after:bg-default after:rounded-full",
    "wrapper": "w-full",
    "label": "block font-medium text-default",
    "icon": "shrink-0",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "indicator": "bg-primary"
      },
      "secondary": {
        "indicator": "bg-secondary"
      },
      "success": {
        "indicator": "bg-success"
      },
      "info": {
        "indicator": "bg-info"
      },
      "warning": {
        "indicator": "bg-warning"
      },
      "error": {
        "indicator": "bg-error"
      },
      "neutral": {
        "indicator": "bg-inverted"
      }
    },
    "variant": {
      "list": {
        "fieldset": "flex-wrap",
        "item": ""
      },
      "card": {
        "fieldset": "flex-wrap",
        "item": [
          "border border-default rounded-lg hover:not-has-disabled:not-has-focus-visible:not-has-data-[state=checked]:bg-elevated/50",
          "transition-colors"
        ]
      },
      "table": {
        "item": [
          "border border-default hover:not-has-disabled:not-has-focus-visible:not-has-data-[state=checked]:bg-elevated/50",
          "transition-colors"
        ]
      }
    },
    "orientation": {
      "horizontal": {
        "fieldset": "flex-row"
      },
      "vertical": {
        "fieldset": "flex-col"
      }
    },
    "indicator": {
      "start": {
        "item": "flex-row",
        "wrapper": "ms-2"
      },
      "end": {
        "item": "flex-row-reverse",
        "wrapper": "me-2"
      },
      "hidden": {
        "base": "sr-only",
        "wrapper": "flex flex-col items-center gap-1 text-center"
      }
    },
    "size": {
      "xs": {
        "fieldset": "gap-y-0.5",
        "legend": "text-xs",
        "base": "size-3",
        "item": "text-xs",
        "container": "h-4",
        "indicator": "after:size-1"
      },
      "sm": {
        "fieldset": "gap-y-0.5",
        "legend": "text-xs",
        "base": "size-3.5",
        "item": "text-xs",
        "container": "h-4",
        "indicator": "after:size-1"
      },
      "md": {
        "fieldset": "gap-y-1",
        "legend": "text-sm",
        "base": "size-4",
        "item": "text-sm",
        "container": "h-5",
        "indicator": "after:size-1.5"
      },
      "lg": {
        "fieldset": "gap-y-1",
        "legend": "text-sm",
        "base": "size-4.5",
        "item": "text-sm",
        "container": "h-5",
        "indicator": "after:size-1.5"
      },
      "xl": {
        "fieldset": "gap-y-1.5",
        "legend": "text-base",
        "base": "size-5",
        "item": "text-base",
        "container": "h-6",
        "indicator": "after:size-2"
      }
    },
    "highlight": {
      "true": "",
      "false": ""
    },
    "disabled": {
      "true": {
        "item": "opacity-75",
        "base": "cursor-not-allowed",
        "label": "cursor-not-allowed",
        "description": "cursor-not-allowed"
      }
    },
    "required": {
      "true": {
        "legend": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    }
  },
  "compoundVariants": [
    {
      "indicator": "hidden",
      "class": {
        "container": "h-auto"
      }
    },
    {
      "variant": [
        "card",
        "table"
      ],
      "highlight": false,
      "class": {
        "item": "hover:not-has-disabled:not-has-focus-visible:not-has-data-[state=checked]:border-accented"
      }
    },
    {
      "size": "xs",
      "indicator": "hidden",
      "class": {
        "icon": "size-3"
      }
    },
    {
      "size": "sm",
      "indicator": "hidden",
      "class": {
        "icon": "size-3.5"
      }
    },
    {
      "size": "md",
      "indicator": "hidden",
      "class": {
        "icon": "size-4"
      }
    },
    {
      "size": "lg",
      "indicator": "hidden",
      "class": {
        "icon": "size-4.5"
      }
    },
    {
      "size": "xl",
      "indicator": "hidden",
      "class": {
        "icon": "size-5"
      }
    },
    {
      "size": "xs",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-2.5"
      }
    },
    {
      "size": "sm",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-3"
      }
    },
    {
      "size": "md",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-3.5"
      }
    },
    {
      "size": "lg",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-4"
      }
    },
    {
      "size": "xl",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-4.5"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "table",
      "class": {
        "item": "first-of-type:rounded-s-lg last-of-type:rounded-e-lg",
        "fieldset": "gap-0 -space-x-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "table",
      "class": {
        "item": "first-of-type:rounded-t-lg last-of-type:rounded-b-lg",
        "fieldset": "gap-0 -space-y-px"
      }
    },
    {
      "color": "primary",
      "variant": "list",
      "indicator": [
        "start",
        "end"
      ],
      "class": {
        "base": "outline-primary/25 focus-visible:outline-solid focus-visible:outline-3 focus-visible:ring-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "list",
      "indicator": [
        "start",
        "end"
      ],
      "class": {
        "base": "outline-secondary/25 focus-visible:outline-solid focus-visible:outline-3 focus-visible:ring-secondary"
      }
    },
    {
      "color": "success",
      "variant": "list",
      "indicator": [
        "start",
        "end"
      ],
      "class": {
        "base": "outline-success/25 focus-visible:outline-solid focus-visible:outline-3 focus-visible:ring-success"
      }
    },
    {
      "color": "info",
      "variant": "list",
      "indicator": [
        "start",
        "end"
      ],
      "class": {
        "base": "outline-info/25 focus-visible:outline-solid focus-visible:outline-3 focus-visible:ring-info"
      }
    },
    {
      "color": "warning",
      "variant": "list",
      "indicator": [
        "start",
        "end"
      ],
      "class": {
        "base": "outline-warning/25 focus-visible:outline-solid focus-visible:outline-3 focus-visible:ring-warning"
      }
    },
    {
      "color": "error",
      "variant": "list",
      "indicator": [
        "start",
        "end"
      ],
      "class": {
        "base": "outline-error/25 focus-visible:outline-solid focus-visible:outline-3 focus-visible:ring-error"
      }
    },
    {
      "color": "neutral",
      "variant": "list",
      "indicator": [
        "start",
        "end"
      ],
      "class": {
        "base": "outline-inverted/25 focus-visible:outline-solid focus-visible:outline-3 focus-visible:ring-inverted"
      }
    },
    {
      "color": "primary",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "outline-primary/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-primary has-focus-visible:z-[1]"
      }
    },
    {
      "color": "secondary",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "outline-secondary/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-secondary has-focus-visible:z-[1]"
      }
    },
    {
      "color": "success",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "outline-success/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-success has-focus-visible:z-[1]"
      }
    },
    {
      "color": "info",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "outline-info/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-info has-focus-visible:z-[1]"
      }
    },
    {
      "color": "warning",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "outline-warning/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-warning has-focus-visible:z-[1]"
      }
    },
    {
      "color": "error",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "outline-error/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-error has-focus-visible:z-[1]"
      }
    },
    {
      "color": "neutral",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "outline-inverted/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-inverted has-focus-visible:z-[1]"
      }
    },
    {
      "color": "primary",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "item": "outline-primary/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-primary has-focus-visible:z-[1]"
      }
    },
    {
      "color": "secondary",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "item": "outline-secondary/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-secondary has-focus-visible:z-[1]"
      }
    },
    {
      "color": "success",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "item": "outline-success/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-success has-focus-visible:z-[1]"
      }
    },
    {
      "color": "info",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "item": "outline-info/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-info has-focus-visible:z-[1]"
      }
    },
    {
      "color": "warning",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "item": "outline-warning/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-warning has-focus-visible:z-[1]"
      }
    },
    {
      "color": "error",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "item": "outline-error/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-error has-focus-visible:z-[1]"
      }
    },
    {
      "color": "neutral",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "item": "outline-inverted/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-inverted has-focus-visible:z-[1]"
      }
    },
    {
      "color": "primary",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-primary/10"
      }
    },
    {
      "color": "secondary",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-secondary/50 has-data-[state=checked]:bg-secondary/10"
      }
    },
    {
      "color": "success",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-success/50 has-data-[state=checked]:bg-success/10"
      }
    },
    {
      "color": "info",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-info/50 has-data-[state=checked]:bg-info/10"
      }
    },
    {
      "color": "warning",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-warning/50 has-data-[state=checked]:bg-warning/10"
      }
    },
    {
      "color": "error",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-error/50 has-data-[state=checked]:bg-error/10"
      }
    },
    {
      "color": "neutral",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-inverted/50 has-data-[state=checked]:bg-elevated"
      }
    },
    {
      "color": "primary",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-primary/10 has-data-[state=checked]:border-primary/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "secondary",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-secondary/10 has-data-[state=checked]:border-secondary/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "success",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-success/10 has-data-[state=checked]:border-success/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "info",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-info/10 has-data-[state=checked]:border-info/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "warning",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-warning/10 has-data-[state=checked]:border-warning/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "error",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-error/10 has-data-[state=checked]:border-error/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "neutral",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-elevated has-data-[state=checked]:border-inverted/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "variant": [
        "card",
        "table"
      ],
      "disabled": true,
      "class": {
        "item": "cursor-not-allowed"
      }
    },
    {
      "color": "primary",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "item": "not-has-disabled:border-primary not-has-disabled:has-data-[state=checked]:border-primary"
      }
    },
    {
      "color": "secondary",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "item": "not-has-disabled:border-secondary not-has-disabled:has-data-[state=checked]:border-secondary"
      }
    },
    {
      "color": "success",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "item": "not-has-disabled:border-success not-has-disabled:has-data-[state=checked]:border-success"
      }
    },
    {
      "color": "info",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "item": "not-has-disabled:border-info not-has-disabled:has-data-[state=checked]:border-info"
      }
    },
    {
      "color": "warning",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "item": "not-has-disabled:border-warning not-has-disabled:has-data-[state=checked]:border-warning"
      }
    },
    {
      "color": "error",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "item": "not-has-disabled:border-error not-has-disabled:has-data-[state=checked]:border-error"
      }
    },
    {
      "color": "neutral",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "item": "not-has-disabled:border-inverted not-has-disabled:has-data-[state=checked]:border-inverted"
      }
    },
    {
      "color": "primary",
      "highlight": true,
      "class": {
        "base": "ring-primary"
      }
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": {
        "base": "ring-secondary"
      }
    },
    {
      "color": "success",
      "highlight": true,
      "class": {
        "base": "ring-success"
      }
    },
    {
      "color": "info",
      "highlight": true,
      "class": {
        "base": "ring-info"
      }
    },
    {
      "color": "warning",
      "highlight": true,
      "class": {
        "base": "ring-warning"
      }
    },
    {
      "color": "error",
      "highlight": true,
      "class": {
        "base": "ring-error"
      }
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": {
        "base": "ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "highlight": false,
    "size": "md",
    "color": "primary",
    "variant": "list",
    "indicator": "start"
  }
};

/* DOM extracted from RadioGroup.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"RadioGroupRoot","s":"root","c":[{"t":"fieldset","s":"fieldset","c":[{"t":"legend","s":"legend","if":1},{"t":"component","s":"item","for":1,"c":[{"t":"div","s":"container","c":[{"t":"RRadioGroupItem","s":"base","c":[{"t":"RadioGroupIndicator","s":"indicator"}]}]},{"t":"div","s":"wrapper","if":1,"c":[{"t":"UIcon","s":"icon","if":1},{"t":"component","s":"label","if":1},{"t":"p","s":"description","if":1}]}]}]}]}];

/* RadioGroupIndicator exists only inside the checked item. */
const render = createRenderer('radio-group', radioGroupTheme, tree, {
  renderIf(slot, { props, item }) {
    const model = props.modelValue !== undefined ? props.modelValue : (props.defaultValue !== undefined ? props.defaultValue : props.value);
    if (slot === 'indicator') return !!(item && (item.active || (model !== undefined && (item.value === model || item.label === model))));
    return undefined;
  },
  slotAttrs(slot, props, v, { item }) {
    if (slot !== 'base' || !item) return null;
    const model = props.modelValue !== undefined ? props.modelValue : (props.defaultValue !== undefined ? props.defaultValue : props.value);
    const on = item.active || (model !== undefined && (item.value === model || item.label === model));
    return { 'data-state': on ? 'checked' : 'unchecked' };
  }
});

export function RadioGroup(props) {
  return render(props);
}
