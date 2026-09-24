import React from 'react';
import { tvd, slotStyle, domRest } from '../../lib/tv.js';
import { renderIcon } from '../../lib/iconify.jsx';
import { ICONS } from '../../lib/icons.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/slider.ts (source/themes.json -> "slider").
   Values are literal: no rounding, no cross-component alignment. */
export const sliderTheme = {
  "slots": {
    "root": "relative flex items-center select-none touch-none",
    "track": "relative bg-accented overflow-hidden rounded-full grow",
    "range": "absolute rounded-full",
    "thumb": "rounded-full bg-default ring-2 focus-visible:outline-3 focus-visible:outline-offset-2"
  },
  "variants": {
    "color": {
      "primary": {
        "range": "bg-primary",
        "thumb": "ring-primary outline-primary/25"
      },
      "secondary": {
        "range": "bg-secondary",
        "thumb": "ring-secondary outline-secondary/25"
      },
      "success": {
        "range": "bg-success",
        "thumb": "ring-success outline-success/25"
      },
      "info": {
        "range": "bg-info",
        "thumb": "ring-info outline-info/25"
      },
      "warning": {
        "range": "bg-warning",
        "thumb": "ring-warning outline-warning/25"
      },
      "error": {
        "range": "bg-error",
        "thumb": "ring-error outline-error/25"
      },
      "neutral": {
        "range": "bg-inverted",
        "thumb": "ring-inverted outline-inverted/25"
      }
    },
    "size": {
      "xs": {
        "thumb": "size-3"
      },
      "sm": {
        "thumb": "size-3.5"
      },
      "md": {
        "thumb": "size-4"
      },
      "lg": {
        "thumb": "size-4.5"
      },
      "xl": {
        "thumb": "size-5"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full",
        "range": "h-full"
      },
      "vertical": {
        "root": "flex-col h-full",
        "range": "w-full"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75 cursor-not-allowed"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": {
        "track": "h-[6px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": {
        "track": "h-[7px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": {
        "track": "h-[8px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": {
        "track": "h-[9px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": {
        "track": "h-[10px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": {
        "track": "w-[6px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": {
        "track": "w-[7px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": {
        "track": "w-[8px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": {
        "track": "w-[9px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": {
        "track": "w-[10px]"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary"
  }
};

/* SliderRoot positions the range and every thumb with inline styles computed
   from min / max / value — the theme only colours and sizes them. */
const resolve = tvd('slider', sliderTheme);

export function Slider(props) {
  const { min = 0, max = 100, value, modelValue, defaultValue, orientation = 'horizontal',
    ui: uiProp = {}, class: className, className: classNameAlt, active: _active, selected: _selected, ...rest } = props;
  const ui = resolve({ ...props, orientation });
  const raw = value ?? modelValue ?? defaultValue ?? min;
  const values = (Array.isArray(raw) ? raw : [raw]).map(Number);
  const pct = (v) => Math.max(0, Math.min(100, ((v - min) / (max - min || 1)) * 100));
  const vertical = orientation === 'vertical';
  const lo = values.length > 1 ? pct(Math.min(...values)) : 0;
  const hi = values.length > 1 ? pct(Math.max(...values)) : pct(values[0]);
  /* reka SliderThumbImpl + utils.getThumbInBoundsOffset: thumb pulled inside the track by
     halfWidth − percent·halfWidth/50 (direction 1); thumb side from the theme size */
  const thumbPx = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 }[props.size || 'md'] ?? 16;
  const inBounds = (p) => thumbPx / 2 - (p * (thumbPx / 2)) / 50;
  const rangeStyle = vertical ? { bottom: lo + '%', top: (100 - hi) + '%' } : { left: lo + '%', right: (100 - hi) + '%' };
  return (
    <div {...slotStyle(ui.root(uiProp.root, className || classNameAlt))} data-ds-component="Slider" data-slot="root" data-orientation={orientation} {...domRest(rest, sliderTheme)}>
      <span {...slotStyle(ui.track(uiProp.track))} data-slot="track">
        <span {...slotStyle(ui.range(uiProp.range), { style: rangeStyle })} data-slot="range"></span>
      </span>
      {values.map((v, i) => (
        <span key={i} role="slider" tabIndex={0} aria-valuemin={min} aria-valuemax={max} aria-valuenow={v}
          data-slot="thumb"
          {...slotStyle(ui.thumb(uiProp.thumb), { style: vertical
            ? { position: 'absolute', bottom: `calc(${pct(v)}% + ${inBounds(pct(v))}px)`, transform: 'translateY(50%)' }
            : { position: 'absolute', left: `calc(${pct(v)}% + ${inBounds(pct(v))}px)`, transform: 'translateX(-50%)' } })}></span>
      ))}
    </div>
  );
}
