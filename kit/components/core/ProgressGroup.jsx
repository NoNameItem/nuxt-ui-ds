import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/progress-group.ts (source/themes.json -> "progress-group").
   Values are literal: no rounding, no cross-component alignment. */
export const progressGroupTheme = {
  "slots": {
    "root": "gap-2",
    "base": "flex overflow-hidden rounded-full bg-accented",
    "segment": "duration-200 ease-out motion-reduce:transition-none",
    "indicator": "size-full",
    "status": "flex text-dimmed duration-200 ease-out motion-reduce:transition-none",
    "list": "flex flex-col gap-1",
    "item": "flex items-center gap-1.5 min-w-0",
    "itemLeadingIcon": "shrink-0",
    "itemLeadingDot": "shrink-0 rounded-full",
    "itemLabel": "truncate",
    "itemTrailing": "ms-auto shrink-0 text-dimmed"
  },
  "variants": {
    "color": {
      "primary": {
        "indicator": "bg-primary",
        "itemLeadingIcon": "text-primary",
        "itemLeadingDot": "bg-primary"
      },
      "secondary": {
        "indicator": "bg-secondary",
        "itemLeadingIcon": "text-secondary",
        "itemLeadingDot": "bg-secondary"
      },
      "success": {
        "indicator": "bg-success",
        "itemLeadingIcon": "text-success",
        "itemLeadingDot": "bg-success"
      },
      "info": {
        "indicator": "bg-info",
        "itemLeadingIcon": "text-info",
        "itemLeadingDot": "bg-info"
      },
      "warning": {
        "indicator": "bg-warning",
        "itemLeadingIcon": "text-warning",
        "itemLeadingDot": "bg-warning"
      },
      "error": {
        "indicator": "bg-error",
        "itemLeadingIcon": "text-error",
        "itemLeadingDot": "bg-error"
      },
      "neutral": {
        "indicator": "bg-inverted",
        "itemLeadingIcon": "text-highlighted",
        "itemLeadingDot": "bg-inverted"
      }
    },
    "size": {
      "2xs": {
        "status": "text-xs",
        "list": "text-xs",
        "itemLeadingIcon": "size-3",
        "itemLeadingDot": "size-1.5"
      },
      "xs": {
        "status": "text-xs",
        "list": "text-xs",
        "itemLeadingIcon": "size-3",
        "itemLeadingDot": "size-1.5"
      },
      "sm": {
        "status": "text-sm",
        "list": "text-sm",
        "itemLeadingIcon": "size-4",
        "itemLeadingDot": "size-2"
      },
      "md": {
        "status": "text-sm",
        "list": "text-sm",
        "itemLeadingIcon": "size-4",
        "itemLeadingDot": "size-2"
      },
      "lg": {
        "status": "text-sm",
        "list": "text-sm",
        "itemLeadingIcon": "size-4",
        "itemLeadingDot": "size-2"
      },
      "xl": {
        "status": "text-base",
        "list": "text-base",
        "itemLeadingIcon": "size-5",
        "itemLeadingDot": "size-2.5"
      },
      "2xl": {
        "status": "text-base",
        "list": "text-base",
        "itemLeadingIcon": "size-5",
        "itemLeadingDot": "size-2.5"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex flex-col",
        "base": "w-full flex-row",
        "segment": "h-full transition-[width]",
        "status": "flex-row items-center justify-end w-(--percent) min-w-fit transition-[width]"
      },
      "vertical": {
        "root": "h-full flex flex-row",
        "base": "h-full flex-col",
        "segment": "w-full transition-[height]",
        "status": "flex-col justify-end h-(--percent) min-h-fit transition-[height]"
      }
    }
  },
  "compoundVariants": [
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
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "size": "md"
  }
};

/* DOM extracted from ProgressGroup.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"status","if":1},{"t":"div","s":"base","c":[{"t":"ProgressRoot","s":"segment","for":1,"c":[{"t":"ProgressIndicator","s":"indicator"}]}]},{"t":"ul","s":"list","if":1,"c":[{"t":"li","s":"item","for":1,"c":[{"t":"slot","c":[{"t":"slot","c":[{"t":"UIcon","s":"itemLeadingIcon","if":1},{"t":"span","s":"itemLeadingDot"}]},{"t":"span","s":"itemLabel","if":1},{"t":"span","s":"itemTrailing"}]}]}]}]}];

/* ProgressGroup.vue:31-38 — shares are of `max` (default 100), not of the sum */
function groupMath(props) {
  const m = Number(props.max);
  const max = Number.isFinite(m) && m > 0 ? m : 100;
  const values = (props.items || []).map(v => Math.min(Math.max(Number(v && typeof v === 'object' ? v.value : v) || 0, 0), max));
  const percents = values.map(v => v / max * 100);
  const percent = Math.min(100, Math.round(percents.reduce((a, b) => a + b, 0)));
  return { percents, percent };
}

const render = createRenderer('progress-group', progressGroupTheme, tree, {
  /* `v-if="item.icon"` / `v-else` (ProgressGroup.vue:79-81): the icon when the
     item names one, the coloured dot otherwise — exactly one of the two. Drawn
     together, an item with an icon carried a dot as well. */
  /* each segment is a ProgressRoot sized by its share of the group's total
     (ProgressGroup.vue reads `itemPercentages[index]`): with no width of its own
     the flex item computed 0px and its `size-full` indicator with it, so the
     whole bar was an empty grey pill. */
  /* ProgressGroup.vue:43-46 — the segment's size runs along the orientation:
     `height` for vertical, `width` for horizontal */
  slotAttrs(slot, props, variants, { item, index }) {
    if (slot === 'status') return { style: { '--percent': groupMath(props).percent + '%' } };
    if (slot !== 'segment') return null;
    const value = item && typeof item === 'object' ? Number(item.value) : NaN;
    if (!(value > 0)) return null;
    const share = (groupMath(props).percents[index] ?? 0) + '%';
    const vertical = (variants && variants.orientation ? variants.orientation : props.orientation) === 'vertical';
    return { style: { ...(vertical ? { height: share } : { width: share }), flex: '0 0 auto' }, 'data-state': 'loading', 'data-value': value };
  },
  /* ProgressGroup.vue:90-94 — the trailing cell's default content is a COMPUTED
     expression, `{{ Math.round(percents[index] ?? 0) }}%`, not a literal, so it
     was skipped as "not a literal" and the cell rendered 0x0 empty. Same class
     of defect as the line-height ratios and Select's "\xA0" default. */
  /* ProgressGroup.vue:55-58 — `status` default text is the computed
     `{{ percent }}%`, same mechanism as itemTrailing */
  slotContent(slot, { props, index }) {
    if (slot === 'status') return groupMath(props).percent + '%';
    if (slot !== 'itemTrailing') return undefined;
    return Math.round(groupMath(props).percents[index] ?? 0) + '%';
  },
  renderIf(slot, { props, item }) {
    /* ProgressGroup.vue:55 — v-if="props.status || !!slots.status" */
    if (slot === 'status') return !!props.status;
    if (slot === 'itemLeadingIcon') return !!(item && item.icon);
    if (slot === 'itemLeadingDot') return !(item && item.icon);
    return undefined;
  }
});

export function ProgressGroup(props) {
  return render(props);
}
