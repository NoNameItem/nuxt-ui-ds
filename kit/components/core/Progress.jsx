import React from 'react';
import { register } from '../../lib/registry.js';
import { createRenderer } from '../../lib/factory.jsx';
import { tvd } from '../../lib/tv.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/progress.ts (source/themes.json -> "progress").
   Values are literal: no rounding, no cross-component alignment. */
export const progressTheme = {
  "slots": {
    "root": "gap-2",
    "base": "relative overflow-hidden rounded-full bg-accented",
    "indicator": "rounded-full size-full transition-transform duration-200 ease-out motion-reduce:transition-none motion-reduce:data-[state=indeterminate]:animate-pulse",
    "status": "flex text-dimmed duration-200 ease-out motion-reduce:transition-none",
    "steps": "grid items-end",
    "step": "truncate text-end row-start-1 col-start-1 transition-opacity ease-out"
  },
  "variants": {
    "animation": {
      "carousel": "",
      "carousel-inverse": "",
      "swing": "",
      "elastic": ""
    },
    "color": {
      "primary": {
        "indicator": "bg-primary",
        "steps": "text-primary"
      },
      "secondary": {
        "indicator": "bg-secondary",
        "steps": "text-secondary"
      },
      "success": {
        "indicator": "bg-success",
        "steps": "text-success"
      },
      "info": {
        "indicator": "bg-info",
        "steps": "text-info"
      },
      "warning": {
        "indicator": "bg-warning",
        "steps": "text-warning"
      },
      "error": {
        "indicator": "bg-error",
        "steps": "text-error"
      },
      "neutral": {
        "indicator": "bg-inverted",
        "steps": "text-highlighted"
      }
    },
    "size": {
      "2xs": {
        "status": "text-xs",
        "steps": "text-xs"
      },
      "xs": {
        "status": "text-xs",
        "steps": "text-xs"
      },
      "sm": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "md": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "lg": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "xl": {
        "status": "text-base",
        "steps": "text-base"
      },
      "2xl": {
        "status": "text-base",
        "steps": "text-base"
      }
    },
    "step": {
      "active": {
        "step": "opacity-100"
      },
      "first": {
        "step": "opacity-100 text-muted"
      },
      "other": {
        "step": "opacity-0"
      },
      "last": {
        "step": ""
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex flex-col",
        "base": "w-full",
        "status": "flex-row items-center justify-end w-(--percent) min-w-fit transition-[width]"
      },
      "vertical": {
        "root": "h-full flex flex-row-reverse",
        "base": "h-full",
        "status": "flex-col justify-end h-(--percent) min-h-fit transition-[height]"
      }
    },
    "inverted": {
      "true": {
        "status": "self-end"
      }
    }
  },
  "compoundVariants": [
    {
      "inverted": true,
      "orientation": "horizontal",
      "class": {
        "step": "text-start",
        "status": "flex-row-reverse"
      }
    },
    {
      "inverted": true,
      "orientation": "vertical",
      "class": {
        "steps": "items-start",
        "status": "flex-col-reverse"
      }
    },
    {
      "orientation": "horizontal",
      "size": "2xs",
      "class": "h-px"
    },
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": "h-0.5"
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": "h-1"
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": "h-2"
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": "h-3"
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": "h-4"
    },
    {
      "orientation": "horizontal",
      "size": "2xl",
      "class": "h-5"
    },
    {
      "orientation": "vertical",
      "size": "2xs",
      "class": "w-px"
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": "w-0.5"
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": "w-1"
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": "w-2"
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": "w-3"
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": "w-4"
    },
    {
      "orientation": "vertical",
      "size": "2xl",
      "class": "w-5"
    },
    {
      "orientation": "horizontal",
      "animation": "carousel",
      "class": {
        "indicator": "motion-safe:data-[state=indeterminate]:animate-[carousel_2s_linear_infinite] motion-safe:data-[state=indeterminate]:rtl:animate-[carousel-rtl_2s_linear_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "carousel",
      "class": {
        "indicator": "motion-safe:data-[state=indeterminate]:animate-[carousel-vertical_2s_linear_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "carousel-inverse",
      "class": {
        "indicator": "motion-safe:data-[state=indeterminate]:animate-[carousel-inverse_2s_linear_infinite] motion-safe:data-[state=indeterminate]:rtl:animate-[carousel-inverse-rtl_2s_linear_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "carousel-inverse",
      "class": {
        "indicator": "motion-safe:data-[state=indeterminate]:animate-[carousel-inverse-vertical_2s_linear_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "swing",
      "class": {
        "indicator": "motion-safe:data-[state=indeterminate]:animate-[swing_2s_var(--ease-in-out)_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "swing",
      "class": {
        "indicator": "motion-safe:data-[state=indeterminate]:animate-[swing-vertical_2s_var(--ease-in-out)_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "elastic",
      "class": {
        "indicator": "relative motion-safe:data-[state=indeterminate]:animate-[elastic_2s_var(--ease-in-out)_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "elastic",
      "class": {
        "indicator": "relative motion-safe:data-[state=indeterminate]:animate-[elastic-vertical_2s_var(--ease-in-out)_infinite]"
      }
    }
  ],
  "defaultVariants": {
    "animation": "carousel",
    "color": "primary",
    "size": "md"
  }
};

/* DOM extracted from Progress.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"status","if":1},{"t":"ProgressRoot","s":"base","c":[{"t":"ProgressIndicator","s":"indicator"}]},{"t":"div","s":"steps","if":1,"c":[{"t":"div","s":"step","for":1}]}]}];

/* Progress.vue computes the indicator transform and data-state in <script setup>:
   an explicit `value` drives translate by the remaining percentage, a null
   value is the indeterminate state the theme animates. */
const resolveStep = tvd('progress', progressTheme);

function modelOf(props) {
  return props.modelValue !== undefined ? props.modelValue : (props.defaultValue !== undefined ? props.defaultValue : props.value);
}

/* Progress.vue:89-100 — the step variant, with realMax = max.length - 1 (line 37) */
function stepVariant(index, model, realMax) {
  if (index === model && index !== 0) return 'active';
  if (index === 0 && index === model) return 'first';
  if (index === realMax && index === model) return 'last';
  return 'other';
}

/* Progress.vue:37-58 — realMax: unset → undefined, array → length - 1, else
   Number(max); percent rounds against realMax ?? 100 */
function percentOf(props) {
  const model = modelOf(props);
  if (model === undefined || model === null) return null;
  const realMax = props.max === undefined || props.max === null ? undefined
    : (Array.isArray(props.max) ? props.max.length - 1 : Number(props.max));
  const max = realMax ?? 100;
  const n = Number(model);
  if (n < 0) return 0;
  if (n > max) return 100;
  return Math.round(n / max * 100);
}

const render = createRenderer('progress', progressTheme, tree, {
  /* Progress.vue:126 — v-for="(step, index) in props.max": steps repeat over the
     max array itself, not over items */
  listFor(node, { props }) {
    if (node.s === 'step' && Array.isArray(props.max)) return props.max;
    return undefined;
  },
  slotContent(slot, { props, item }) {
    /* Progress.vue: status default text is the computed `{{ percent }}%` */
    if (slot === 'status') { const p = percentOf(props); return p === null ? undefined : p + '%'; }
    if (slot === 'step' && Array.isArray(props.max)) return item === undefined || item === null ? null : String(item);
    return undefined;
  },
  /* Progress.vue:81 draws the step list only when `max` is an array of labels —
     with a numeric max the steps wrapper does not exist */
  renderIf(slot, { props }) {
    /* Progress.vue:115 — v-if="!isIndeterminate && (props.status || !!slots.status)" */
    if (slot === 'status') return percentOf(props) !== null && !!props.status;
    if (slot === 'steps' || slot === 'step') return Array.isArray(props.max);
    return undefined;
  },
  slotAttrs(slot, props, v, { index }) {
    if (slot === 'step' && Array.isArray(props.max) && index !== undefined) {
      const step = stepVariant(index, modelOf(props), props.max.length - 1);
      return { className: resolveStep({ ...v, step }).step((props.ui || {}).step) };
    }
    /* Progress.vue reads modelValue, and a null modelValue is what makes the
       bar indeterminate — reading `value` left every example on the animation */
    const pct = percentOf(props);
    if (slot === 'indicator') {
      const state = pct === null ? 'indeterminate' : (pct >= 100 ? 'complete' : 'loading');
      if (pct === null) return { 'data-state': state };
      const axis = (v.orientation || props.orientation) === 'vertical' ? 'translateY' : 'translateX';
      const sign = props.inverted ? '' : '-';
      return { 'data-state': state, style: { transform: axis + '(' + sign + (100 - pct) + '%)' } };
    }
    if (slot === 'status' && pct !== null) return { style: { '--percent': Math.max(pct, 0) + '%' } };
    if (slot === 'root' && pct !== null) return { style: { '--percent': pct + '%' } };
    return null;
  }
});

export function Progress(props) {
  return render(props);
}

/* nested inside other components' DOM — the renderer mounts it by name */
register('Progress', Progress);
