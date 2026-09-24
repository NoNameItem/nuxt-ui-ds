import React from 'react';
import { register } from '../../lib/registry.js';
import { tvd, slotStyle, domRest } from '../../lib/tv.js';
import { renderIcon } from '../../lib/iconify.jsx';
import { ICONS } from '../../lib/icons.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/checkbox.ts (source/themes.json -> "checkbox").
   Values are literal: no rounding, no cross-component alignment. */
export const checkboxTheme = {
  "slots": {
    "root": "relative flex items-start",
    "container": "flex items-center",
    "base": "rounded-sm ring ring-inset ring-accented overflow-hidden focus-visible:outline-none",
    "indicator": "flex items-center justify-center size-full text-inverted",
    "icon": "shrink-0",
    "wrapper": "w-full",
    "label": "block font-medium text-default",
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
        "root": ""
      },
      "card": {
        "root": [
          "border border-default rounded-lg hover:not-has-disabled:not-has-focus-visible:not-has-data-[state=checked]:bg-elevated/50",
          "transition-colors"
        ]
      }
    },
    "indicator": {
      "start": {
        "root": "flex-row",
        "wrapper": "ms-2"
      },
      "end": {
        "root": "flex-row-reverse",
        "wrapper": "me-2"
      },
      "hidden": {
        "base": "sr-only",
        "wrapper": "flex flex-col items-center gap-1 text-center"
      }
    },
    "size": {
      "xs": {
        "base": "size-3",
        "icon": "size-2.5",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "size-3.5",
        "icon": "size-3",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "size-4",
        "icon": "size-3.5",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "size-4.5",
        "icon": "size-4",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "size-5",
        "icon": "size-4.5",
        "container": "h-6",
        "wrapper": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75",
        "base": "cursor-not-allowed",
        "label": "cursor-not-allowed",
        "description": "cursor-not-allowed"
      }
    },
    "highlight": {
      "true": "",
      "false": ""
    },
    "checked": {
      "true": ""
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
      "variant": "card",
      "highlight": false,
      "class": {
        "root": "hover:not-has-disabled:not-has-focus-visible:not-has-data-[state=checked]:border-accented"
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
      "variant": "card",
      "class": {
        "root": "p-2.5"
      }
    },
    {
      "size": "sm",
      "variant": "card",
      "class": {
        "root": "p-3"
      }
    },
    {
      "size": "md",
      "variant": "card",
      "class": {
        "root": "p-3.5"
      }
    },
    {
      "size": "lg",
      "variant": "card",
      "class": {
        "root": "p-4"
      }
    },
    {
      "size": "xl",
      "variant": "card",
      "class": {
        "root": "p-4.5"
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
      "variant": "card",
      "class": {
        "root": "outline-primary/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-primary has-focus-visible:z-[1]"
      }
    },
    {
      "color": "secondary",
      "variant": "card",
      "class": {
        "root": "outline-secondary/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-secondary has-focus-visible:z-[1]"
      }
    },
    {
      "color": "success",
      "variant": "card",
      "class": {
        "root": "outline-success/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-success has-focus-visible:z-[1]"
      }
    },
    {
      "color": "info",
      "variant": "card",
      "class": {
        "root": "outline-info/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-info has-focus-visible:z-[1]"
      }
    },
    {
      "color": "warning",
      "variant": "card",
      "class": {
        "root": "outline-warning/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-warning has-focus-visible:z-[1]"
      }
    },
    {
      "color": "error",
      "variant": "card",
      "class": {
        "root": "outline-error/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-error has-focus-visible:z-[1]"
      }
    },
    {
      "color": "neutral",
      "variant": "card",
      "class": {
        "root": "outline-inverted/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-inverted has-focus-visible:z-[1]"
      }
    },
    {
      "color": "primary",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "root": "outline-primary/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-primary has-focus-visible:z-[1]"
      }
    },
    {
      "color": "secondary",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "root": "outline-secondary/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-secondary has-focus-visible:z-[1]"
      }
    },
    {
      "color": "success",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "root": "outline-success/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-success has-focus-visible:z-[1]"
      }
    },
    {
      "color": "info",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "root": "outline-info/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-info has-focus-visible:z-[1]"
      }
    },
    {
      "color": "warning",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "root": "outline-warning/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-warning has-focus-visible:z-[1]"
      }
    },
    {
      "color": "error",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "root": "outline-error/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-error has-focus-visible:z-[1]"
      }
    },
    {
      "color": "neutral",
      "variant": "list",
      "indicator": "hidden",
      "class": {
        "root": "outline-inverted/25 has-focus-visible:outline-3 not-has-disabled:has-focus-visible:border-inverted has-focus-visible:z-[1]"
      }
    },
    {
      "color": "primary",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-primary/10"
      }
    },
    {
      "color": "secondary",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-secondary/50 has-data-[state=checked]:bg-secondary/10"
      }
    },
    {
      "color": "success",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-success/50 has-data-[state=checked]:bg-success/10"
      }
    },
    {
      "color": "info",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-info/50 has-data-[state=checked]:bg-info/10"
      }
    },
    {
      "color": "warning",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-warning/50 has-data-[state=checked]:bg-warning/10"
      }
    },
    {
      "color": "error",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-error/50 has-data-[state=checked]:bg-error/10"
      }
    },
    {
      "color": "neutral",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-inverted/50 has-data-[state=checked]:bg-elevated"
      }
    },
    {
      "variant": "card",
      "disabled": true,
      "class": {
        "root": "cursor-not-allowed"
      }
    },
    {
      "color": "primary",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "root": "not-has-disabled:border-primary not-has-disabled:has-data-[state=checked]:border-primary"
      }
    },
    {
      "color": "secondary",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "root": "not-has-disabled:border-secondary not-has-disabled:has-data-[state=checked]:border-secondary"
      }
    },
    {
      "color": "success",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "root": "not-has-disabled:border-success not-has-disabled:has-data-[state=checked]:border-success"
      }
    },
    {
      "color": "info",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "root": "not-has-disabled:border-info not-has-disabled:has-data-[state=checked]:border-info"
      }
    },
    {
      "color": "warning",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "root": "not-has-disabled:border-warning not-has-disabled:has-data-[state=checked]:border-warning"
      }
    },
    {
      "color": "error",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "root": "not-has-disabled:border-error not-has-disabled:has-data-[state=checked]:border-error"
      }
    },
    {
      "color": "neutral",
      "indicator": "hidden",
      "highlight": true,
      "class": {
        "root": "not-has-disabled:border-inverted not-has-disabled:has-data-[state=checked]:border-inverted"
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

/* Checkbox.vue is reka's CheckboxRoot/Indicator: the state comes from
   modelValue / defaultValue (the string "indeterminate" being the mixed state),
   and the indicator exists only when checked or indeterminate, carrying exactly
   one icon — indeterminateIcon (appConfig minus) or icon (appConfig check). The
   third icon in the template is `v-if="props.icon"` for the card variant and has
   no default. */
const resolve = tvd('checkbox', checkboxTheme);

export function Checkbox(props) {
  const { icon, checkedIcon, indeterminateIcon, label, description,
    modelValue, defaultValue, checked: checkedProp, indeterminate: indeterminateProp,
    ui: uiProp = {}, class: className, className: classNameAlt,
    /* renderer-internal item state must not ride `...rest` onto the DOM */
    active: _active, selected: _selected,
    ...rest } = props;
  const model = modelValue !== undefined ? modelValue : defaultValue;
  const indeterminate = model !== undefined ? model === 'indeterminate' : !!indeterminateProp;
  const checked = model !== undefined ? (model !== 'indeterminate' && !!model) : !!checkedProp;
  const on = checked || indeterminate;
  const ui = resolve({ ...props, checked: on, indeterminate });
  const state = indeterminate ? 'indeterminate' : (checked ? 'checked' : 'unchecked');
  const cardIcon = props.variant === 'card' && icon ? icon : null;
  return (
    <div {...slotStyle(ui.root(uiProp.root, className || classNameAlt))} data-ds-component="Checkbox" data-slot="root" data-state={state} {...domRest(rest, checkboxTheme)}>
      <div {...slotStyle(ui.container(uiProp.container))} data-slot="container">
        <button type="button" role="checkbox" aria-checked={indeterminate ? 'mixed' : checked} disabled={props.disabled}
          data-slot="base" data-state={state} {...slotStyle(ui.base(uiProp.base))}>
          {/* Two conditions, and both matter: `v-if="props.indicator !== 'hidden'"`
              (Checkbox.vue:86, a comparison with a STRING) decides whether the kit
              draws an indicator at all, and reka's CheckboxIndicator then shows it
              only while the box is checked or indeterminate. The theme's
              `indicator` slot is unconditional `bg-primary text-inverted`, so a
              node emitted for an unchecked box paints a filled green square with a
              white check — indistinguishable from "checked". */}
          {props.indicator !== 'hidden' && on ? (
            <span data-slot="indicator" {...slotStyle(ui.indicator(uiProp.indicator))}>
              {renderIcon(indeterminate ? (indeterminateIcon || ICONS.minus) : (checkedIcon || icon || ICONS.check), ui.icon(uiProp.icon), 'i')}
            </span>
          ) : null}
        </button>
      </div>
      {label || description || cardIcon ? (
        <div {...slotStyle(ui.wrapper(uiProp.wrapper))} data-slot="wrapper">
          {cardIcon ? renderIcon(cardIcon, ui.icon(uiProp.icon)) : null}
          {label ? <label data-slot="label" {...slotStyle(ui.label(uiProp.label))}>{label}</label> : null}
          {description ? <p data-slot="description" {...slotStyle(ui.description(uiProp.description))}>{description}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

/* nested inside other components' DOM — the renderer mounts it by name */
register('Checkbox', Checkbox);
