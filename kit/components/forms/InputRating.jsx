import React from 'react';
import { tvd, slotStyle, domRest } from '../../lib/tv.js';
import { renderIcon } from '../../lib/iconify.jsx';
import { ICONS } from '../../lib/icons.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/input-rating.ts (source/themes.json -> "input-rating").
   Values are literal: no rounding, no cross-component alignment. */
export const inputRatingTheme = {
  "slots": {
    "root": "",
    "item": [
      "relative inline-block cursor-pointer select-none rounded-sm has-focus-visible:outline-3",
      "transition"
    ],
    "indicator": "absolute inset-0 overflow-hidden outline-none text-transparent w-(--reka-rating-item-step-width) opacity-(--reka-rating-item-step-opacity) z-(--reka-rating-item-step-z-index)",
    "icon": "block",
    "emptyIcon": "block w-full h-full text-muted pointer-events-none"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "root": "inline-flex items-center gap-0.5"
      },
      "vertical": {
        "root": "inline-flex flex-col items-center gap-0.5"
      }
    },
    "size": {
      "xs": {
        "item": "size-3",
        "icon": "size-3"
      },
      "sm": {
        "item": "size-4",
        "icon": "size-4"
      },
      "md": {
        "item": "size-5",
        "icon": "size-5"
      },
      "lg": {
        "item": "size-6",
        "icon": "size-6"
      },
      "xl": {
        "item": "size-7",
        "icon": "size-7"
      }
    },
    "color": {
      "primary": {
        "indicator": "data-[state=active]:text-primary",
        "item": "outline-primary/25"
      },
      "secondary": {
        "indicator": "data-[state=active]:text-secondary",
        "item": "outline-secondary/25"
      },
      "success": {
        "indicator": "data-[state=active]:text-success",
        "item": "outline-success/25"
      },
      "info": {
        "indicator": "data-[state=active]:text-info",
        "item": "outline-info/25"
      },
      "warning": {
        "indicator": "data-[state=active]:text-warning",
        "item": "outline-warning/25"
      },
      "error": {
        "indicator": "data-[state=active]:text-error",
        "item": "outline-error/25"
      },
      "neutral": {
        "indicator": "data-[state=active]:text-highlighted",
        "item": "outline-inverted/25"
      }
    },
    "readonly": {
      "true": {
        "root": "cursor-default",
        "item": "cursor-default"
      },
      "false": {}
    },
    "disabled": {
      "true": {
        "root": "opacity-75 cursor-not-allowed",
        "item": "cursor-not-allowed pointer-events-none"
      },
      "false": {}
    }
  },
  "compoundVariants": [
    {
      "readonly": false,
      "disabled": false,
      "class": {
        "item": "hover:scale-110"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "size": "md"
  }
};

/* RatingRoot renders `length` items (defineProps default 5), not `items`.
   Each item stacks an empty icon under an indicator that reveals the filled
   icon; reka drives the reveal through --reka-rating-item-step-* variables. */
const resolve = tvd('input-rating', inputRatingTheme);

export function InputRating(props) {
  const { length = 5, value, modelValue, defaultValue, icon, emptyIcon,
    ui: uiProp = {}, class: className, className: classNameAlt, active: _active, selected: _selected, ...rest } = props;
  const ui = resolve(props);
  const current = Number(value ?? modelValue ?? defaultValue ?? 0);
  const star = icon || ICONS.star;
  return (
    <div {...slotStyle(ui.root(uiProp.root, className || classNameAlt))} data-ds-component="InputRating" data-slot="root" role="radiogroup" {...domRest(rest, inputRatingTheme)}>
      {Array.from({ length }, (_, i) => {
        const filled = i + 1 <= current;
        return (
          <span key={i} {...slotStyle(ui.item(uiProp.item))} data-slot="item" data-state={filled ? 'active' : 'inactive'}>
            {/* the background star is the emptyIcon slot (InputRating.vue:87-89),
                not a second `icon` — marking both the same hides the front one */}
            {renderIcon(emptyIcon || star, ui.emptyIcon(uiProp.emptyIcon), 'e', 'emptyIcon')}
            <span {...slotStyle(ui.indicator(uiProp.indicator), { style: { '--reka-rating-item-step-width': '100%', '--reka-rating-item-step-opacity': filled ? 1 : 0, '--reka-rating-item-step-z-index': 1 } })} data-slot="indicator" data-state={filled ? 'active' : 'inactive'}>
              {renderIcon(star, ui.icon(uiProp.icon), 'f')}
            </span>
          </span>
        );
      })}
    </div>
  );
}
