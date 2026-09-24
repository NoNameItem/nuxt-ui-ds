import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/checkbox-group.ts (source/themes.json -> "checkbox-group").
   Values are literal: no rounding, no cross-component alignment. */
export const checkboxGroupTheme = {
  "slots": {
    "root": "relative",
    "fieldset": "flex gap-x-2",
    "legend": "mb-1 block font-medium text-default",
    "item": ""
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "fieldset": "flex-row"
      },
      "vertical": {
        "fieldset": "flex-col"
      }
    },
    "color": {
      "primary": {},
      "secondary": {},
      "success": {},
      "info": {},
      "warning": {},
      "error": {},
      "neutral": {}
    },
    "variant": {
      "list": {
        "fieldset": "flex-wrap"
      },
      "card": {
        "fieldset": "flex-wrap"
      },
      "table": {
        "item": [
          "border border-default hover:not-has-disabled:not-has-focus-visible:not-has-data-[state=checked]:bg-elevated/50",
          "transition-colors"
        ]
      }
    },
    "size": {
      "xs": {
        "fieldset": "gap-y-0.5",
        "legend": "text-xs"
      },
      "sm": {
        "fieldset": "gap-y-0.5",
        "legend": "text-xs"
      },
      "md": {
        "fieldset": "gap-y-1",
        "legend": "text-sm"
      },
      "lg": {
        "fieldset": "gap-y-1",
        "legend": "text-sm"
      },
      "xl": {
        "fieldset": "gap-y-1.5",
        "legend": "text-base"
      }
    },
    "required": {
      "true": {
        "legend": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "highlight": {
      "true": {},
      "false": {}
    },
    "disabled": {
      "true": {}
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "table",
      "class": {
        "item": "outline-primary/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-primary has-focus-visible:z-[1]"
      }
    },
    {
      "color": "secondary",
      "variant": "table",
      "class": {
        "item": "outline-secondary/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-secondary has-focus-visible:z-[1]"
      }
    },
    {
      "color": "success",
      "variant": "table",
      "class": {
        "item": "outline-success/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-success has-focus-visible:z-[1]"
      }
    },
    {
      "color": "info",
      "variant": "table",
      "class": {
        "item": "outline-info/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-info has-focus-visible:z-[1]"
      }
    },
    {
      "color": "warning",
      "variant": "table",
      "class": {
        "item": "outline-warning/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-warning has-focus-visible:z-[1]"
      }
    },
    {
      "color": "error",
      "variant": "table",
      "class": {
        "item": "outline-error/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-error has-focus-visible:z-[1]"
      }
    },
    {
      "color": "neutral",
      "variant": "table",
      "class": {
        "item": "outline-inverted/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-inverted has-focus-visible:z-[1]"
      }
    },
    {
      "variant": "table",
      "highlight": false,
      "class": {
        "item": "hover:not-has-disabled:not-has-focus-visible:not-has-data-[state=checked]:border-accented"
      }
    },
    {
      "size": "xs",
      "variant": "table",
      "class": {
        "item": "p-2.5"
      }
    },
    {
      "size": "sm",
      "variant": "table",
      "class": {
        "item": "p-3"
      }
    },
    {
      "size": "md",
      "variant": "table",
      "class": {
        "item": "p-3.5"
      }
    },
    {
      "size": "lg",
      "variant": "table",
      "class": {
        "item": "p-4"
      }
    },
    {
      "size": "xl",
      "variant": "table",
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
      "variant": "table",
      "disabled": true,
      "class": {
        "item": "cursor-not-allowed"
      }
    }
  ],
  "defaultVariants": {
    "highlight": false,
    "size": "md",
    "variant": "list",
    "color": "primary"
  }
};

/* DOM extracted from CheckboxGroup.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"CheckboxGroupRoot","s":"root","c":[{"t":"fieldset","s":"fieldset","c":[{"t":"legend","s":"legend","if":1},{"t":"UCheckbox","s":"item","for":1,"fwd":["color","variant","size","indicator","disabled"]}]}]}];

const render = createRenderer('checkbox-group', checkboxGroupTheme, tree);

export function CheckboxGroup(props) {
  /* the group owns the value, and each box learns its own state from it
     (CheckboxGroupRoot passes the model down through reka's context). Mapped
     onto the ITEMS here rather than through a renderer hook: the item props are
     what the mount spreads into each UCheckbox, and a per-item `checked` is the
     one path that demonstrably reaches it. */
  const { items, modelValue, defaultValue, ...rest } = props;
  const model = modelValue !== undefined ? modelValue : defaultValue;
  const list = model === undefined || model === null ? null : (Array.isArray(model) ? model : [model]);
  const mapped = !list || !Array.isArray(items) ? items : items.map((item) => {
    if (item === null || typeof item !== 'object') {
      return list.some((v) => v === item) ? { label: item, value: item, checked: true } : item;
    }
    const id = item.value !== undefined ? item.value : item.label;
    return list.some((v) => v === id) ? { ...item, checked: true } : item;
  });
  return render({ ...rest, items: mapped, modelValue, defaultValue });
}
