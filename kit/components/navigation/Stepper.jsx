import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/stepper.ts (source/themes.json -> "stepper").
   Values are literal: no rounding, no cross-component alignment. */
export const stepperTheme = {
  "slots": {
    "root": "flex gap-4",
    "header": "flex",
    "item": "group text-center relative w-full",
    "container": "relative",
    "trigger": "rounded-full font-medium text-center align-middle flex items-center justify-center font-semibold group-data-[state=completed]:text-inverted group-data-[state=active]:text-inverted text-muted bg-elevated focus-visible:outline-3",
    "indicator": "flex items-center justify-center size-full",
    "icon": "shrink-0",
    "separator": "absolute rounded-full group-data-[disabled]:opacity-75 bg-accented",
    "wrapper": "",
    "title": "font-medium text-default",
    "description": "text-muted text-wrap",
    "content": "size-full"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "container": "flex justify-center",
        "separator": "top-[calc(50%-2px)] h-0.5",
        "wrapper": "mt-1"
      },
      "vertical": {
        "header": "flex-col gap-4",
        "item": "flex text-start",
        "separator": "start-[calc(50%-1px)] -bottom-[10px] w-0.5"
      }
    },
    "size": {
      "xs": {
        "trigger": "size-6 text-xs",
        "icon": "size-3",
        "title": "text-xs",
        "description": "text-xs",
        "wrapper": "mt-1.5"
      },
      "sm": {
        "trigger": "size-8 text-sm",
        "icon": "size-4",
        "title": "text-xs",
        "description": "text-xs",
        "wrapper": "mt-2"
      },
      "md": {
        "trigger": "size-10 text-base",
        "icon": "size-5",
        "title": "text-sm",
        "description": "text-sm",
        "wrapper": "mt-2.5"
      },
      "lg": {
        "trigger": "size-12 text-lg",
        "icon": "size-6",
        "title": "text-base",
        "description": "text-base",
        "wrapper": "mt-3"
      },
      "xl": {
        "trigger": "size-14 text-xl",
        "icon": "size-7",
        "title": "text-lg",
        "description": "text-lg",
        "wrapper": "mt-3.5"
      }
    },
    "color": {
      "primary": {
        "trigger": "group-data-[state=completed]:bg-primary group-data-[state=active]:bg-primary outline-primary/25",
        "separator": "group-data-[state=completed]:bg-primary"
      },
      "secondary": {
        "trigger": "group-data-[state=completed]:bg-secondary group-data-[state=active]:bg-secondary outline-secondary/25",
        "separator": "group-data-[state=completed]:bg-secondary"
      },
      "success": {
        "trigger": "group-data-[state=completed]:bg-success group-data-[state=active]:bg-success outline-success/25",
        "separator": "group-data-[state=completed]:bg-success"
      },
      "info": {
        "trigger": "group-data-[state=completed]:bg-info group-data-[state=active]:bg-info outline-info/25",
        "separator": "group-data-[state=completed]:bg-info"
      },
      "warning": {
        "trigger": "group-data-[state=completed]:bg-warning group-data-[state=active]:bg-warning outline-warning/25",
        "separator": "group-data-[state=completed]:bg-warning"
      },
      "error": {
        "trigger": "group-data-[state=completed]:bg-error group-data-[state=active]:bg-error outline-error/25",
        "separator": "group-data-[state=completed]:bg-error"
      },
      "neutral": {
        "trigger": "group-data-[state=completed]:bg-inverted group-data-[state=active]:bg-inverted outline-inverted/25",
        "separator": "group-data-[state=completed]:bg-inverted"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": {
        "separator": "start-[calc(50%+16px)] end-[calc(-50%+16px)]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": {
        "separator": "start-[calc(50%+20px)] end-[calc(-50%+20px)]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": {
        "separator": "start-[calc(50%+28px)] end-[calc(-50%+28px)]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": {
        "separator": "start-[calc(50%+32px)] end-[calc(-50%+32px)]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": {
        "separator": "start-[calc(50%+36px)] end-[calc(-50%+36px)]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": {
        "separator": "top-[30px]",
        "item": "gap-1.5"
      }
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": {
        "separator": "top-[38px]",
        "item": "gap-2"
      }
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": {
        "separator": "top-[46px]",
        "item": "gap-2.5"
      }
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": {
        "separator": "top-[54px]",
        "item": "gap-3"
      }
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": {
        "separator": "top-[62px]",
        "item": "gap-3.5"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary"
  }
};

/* DOM extracted from Stepper.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"StepperRoot","s":"root","c":[{"t":"div","s":"header","c":[{"t":"StepperItem","s":"item","for":1,"c":[{"t":"div","s":"container","c":[{"t":"StepperTrigger","s":"trigger","c":[{"t":"StepperIndicator","s":"indicator","c":[{"t":"slot","c":[{"t":"UIcon","s":"icon","if":1}]}]}]},{"t":"StepperSeparator","s":"separator","if":1}]},{"t":"div","s":"wrapper","c":[{"t":"slot","c":[{"t":"div","s":"title","if":1},{"t":"div","s":"description","if":1}]}]}]}]},{"t":"div","s":"content","if":1}]}];

/* StepperSeparator renders between steps, not inside the last one. */
/* StepperItem carries data-state=completed|active|inactive; the theme colours the
   trigger and the separator through group-data-[state=…], so without it every
   circle stays bg-elevated. The separator renders between steps, not after the
   last one. */
function currentStep(props) {
  const items = props.items || [];
  const v = props.modelValue ?? props.defaultValue ?? 0;
  if (typeof v === 'number') return v;
  const key = props.valueKey || 'value';
  const i = items.findIndex((it) => it && it[key] === v);
  return i === -1 ? 0 : i;
}

const render = createRenderer('stepper', stepperTheme, tree, {
  renderIf(slot, { index, count }) {
    if (slot === 'separator') return index !== undefined && index < count - 1;
    return undefined;
  },
  slotAttrs(slot, props, v, { item, index }) {
    if (slot !== 'item' || index === undefined) return null;
    const cur = currentStep(props);
    const attrs = { 'data-state': index < cur ? 'completed' : (index === cur ? 'active' : 'inactive') };
    if (item && item.disabled) attrs['data-disabled'] = 'true';
    return attrs;
  }
});

export function Stepper(props) {
  return render(props);
}
