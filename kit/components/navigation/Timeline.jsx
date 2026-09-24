import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/timeline.ts (source/themes.json -> "timeline").
   Values are literal: no rounding, no cross-component alignment. */
export const timelineTheme = {
  "slots": {
    "root": "flex gap-1.5",
    "item": "group relative flex flex-1 gap-3",
    "container": "relative flex items-center gap-1.5",
    "indicator": "group-data-[state=completed]:text-inverted group-data-[state=active]:text-inverted text-muted",
    "separator": "flex-1 rounded-full bg-elevated",
    "wrapper": "w-full",
    "date": "text-dimmed text-xs/5",
    "title": "font-medium text-highlighted text-sm",
    "description": "text-muted text-wrap text-sm"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "root": "flex-row w-full",
        "item": "flex-col",
        "separator": "h-0.5"
      },
      "vertical": {
        "root": "flex-col",
        "container": "flex-col",
        "separator": "w-0.5"
      }
    },
    "color": {
      "primary": {
        "indicator": "group-data-[state=completed]:bg-primary group-data-[state=active]:bg-primary"
      },
      "secondary": {
        "indicator": "group-data-[state=completed]:bg-secondary group-data-[state=active]:bg-secondary"
      },
      "success": {
        "indicator": "group-data-[state=completed]:bg-success group-data-[state=active]:bg-success"
      },
      "info": {
        "indicator": "group-data-[state=completed]:bg-info group-data-[state=active]:bg-info"
      },
      "warning": {
        "indicator": "group-data-[state=completed]:bg-warning group-data-[state=active]:bg-warning"
      },
      "error": {
        "indicator": "group-data-[state=completed]:bg-error group-data-[state=active]:bg-error"
      },
      "neutral": {
        "indicator": "group-data-[state=completed]:bg-inverted group-data-[state=active]:bg-inverted"
      }
    },
    "size": {
      "3xs": "",
      "2xs": "",
      "xs": "",
      "sm": "",
      "md": "",
      "lg": "",
      "xl": "",
      "2xl": "",
      "3xl": ""
    },
    "reverse": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "reverse": false,
      "class": {
        "separator": "group-data-[state=completed]:bg-primary"
      }
    },
    {
      "color": "secondary",
      "reverse": false,
      "class": {
        "separator": "group-data-[state=completed]:bg-secondary"
      }
    },
    {
      "color": "success",
      "reverse": false,
      "class": {
        "separator": "group-data-[state=completed]:bg-success"
      }
    },
    {
      "color": "info",
      "reverse": false,
      "class": {
        "separator": "group-data-[state=completed]:bg-info"
      }
    },
    {
      "color": "warning",
      "reverse": false,
      "class": {
        "separator": "group-data-[state=completed]:bg-warning"
      }
    },
    {
      "color": "error",
      "reverse": false,
      "class": {
        "separator": "group-data-[state=completed]:bg-error"
      }
    },
    {
      "color": "primary",
      "reverse": true,
      "class": {
        "separator": "group-data-[state=active]:bg-primary group-data-[state=completed]:bg-primary"
      }
    },
    {
      "color": "secondary",
      "reverse": true,
      "class": {
        "separator": "group-data-[state=active]:bg-secondary group-data-[state=completed]:bg-secondary"
      }
    },
    {
      "color": "success",
      "reverse": true,
      "class": {
        "separator": "group-data-[state=active]:bg-success group-data-[state=completed]:bg-success"
      }
    },
    {
      "color": "info",
      "reverse": true,
      "class": {
        "separator": "group-data-[state=active]:bg-info group-data-[state=completed]:bg-info"
      }
    },
    {
      "color": "warning",
      "reverse": true,
      "class": {
        "separator": "group-data-[state=active]:bg-warning group-data-[state=completed]:bg-warning"
      }
    },
    {
      "color": "error",
      "reverse": true,
      "class": {
        "separator": "group-data-[state=active]:bg-error group-data-[state=completed]:bg-error"
      }
    },
    {
      "color": "neutral",
      "reverse": false,
      "class": {
        "separator": "group-data-[state=completed]:bg-inverted"
      }
    },
    {
      "color": "neutral",
      "reverse": true,
      "class": {
        "separator": "group-data-[state=active]:bg-inverted group-data-[state=completed]:bg-inverted"
      }
    },
    {
      "orientation": "horizontal",
      "size": "3xs",
      "class": {
        "wrapper": "pe-4.5"
      }
    },
    {
      "orientation": "horizontal",
      "size": "2xs",
      "class": {
        "wrapper": "pe-5"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": {
        "wrapper": "pe-5.5"
      }
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": {
        "wrapper": "pe-6"
      }
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": {
        "wrapper": "pe-6.5"
      }
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": {
        "wrapper": "pe-7"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": {
        "wrapper": "pe-7.5"
      }
    },
    {
      "orientation": "horizontal",
      "size": "2xl",
      "class": {
        "wrapper": "pe-8"
      }
    },
    {
      "orientation": "horizontal",
      "size": "3xl",
      "class": {
        "wrapper": "pe-8.5"
      }
    },
    {
      "orientation": "vertical",
      "size": "3xs",
      "class": {
        "wrapper": "-mt-0.5 pb-4.5"
      }
    },
    {
      "orientation": "vertical",
      "size": "2xs",
      "class": {
        "wrapper": "pb-5"
      }
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": {
        "wrapper": "mt-0.5 pb-5.5"
      }
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": {
        "wrapper": "mt-1 pb-6"
      }
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": {
        "wrapper": "mt-1.5 pb-6.5"
      }
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": {
        "wrapper": "mt-2 pb-7"
      }
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": {
        "wrapper": "mt-2.5 pb-7.5"
      }
    },
    {
      "orientation": "vertical",
      "size": "2xl",
      "class": {
        "wrapper": "mt-3 pb-8"
      }
    },
    {
      "orientation": "vertical",
      "size": "3xl",
      "class": {
        "wrapper": "mt-3.5 pb-8.5"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary"
  }
};

/* DOM extracted from Timeline.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"item","for":1,"c":[{"t":"div","s":"container","c":[{"t":"UAvatar","s":"indicator"},{"t":"Separator","s":"separator","if":1}]},{"t":"div","s":"wrapper","c":[{"t":"slot","c":[{"t":"div","s":"date","if":1},{"t":"div","s":"title","if":1},{"t":"div","s":"description","if":1}]}]}]}]}];

/* Timeline.vue:36-55 — the step's state is an attribute on the item, and the
   theme colours the indicator and separator through it
   (`group-data-[state=completed]`). Only the `active` branch was derived, so a
   step BEFORE the current one stayed neutral grey instead of primary. */
function currentStepIndex(props) {
  const items = props.items || [];
  const model = props.modelValue !== undefined ? props.modelValue : props.defaultValue;
  if (model === undefined || model === null) return -1;
  const byValue = items.findIndex((it) => it && typeof it === 'object' && it.value !== undefined && it.value === model);
  if (byValue !== -1) return byValue;
  const n = Number(model);
  return Number.isInteger(n) && n >= 0 && n < items.length ? n : -1;
}

const render = createRenderer('timeline', timelineTheme, tree, {
  slotAttrs(slot, props, variants, { index }) {
    if (slot !== 'item' || index === undefined) return null;
    const current = currentStepIndex(props);
    if (current === -1) return null;
    if (index === current) return { 'data-state': 'active' };
    const done = props.reverse ? index > current : index < current;
    return done ? { 'data-state': 'completed' } : null;
  }
});

export function Timeline(props) {
  return render(props);
}
