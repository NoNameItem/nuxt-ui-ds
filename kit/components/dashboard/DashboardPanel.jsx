import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/dashboard-panel.ts (source/themes.json -> "dashboard-panel").
   Values are literal: no rounding, no cross-component alignment. */
export const dashboardPanelTheme = {
  "slots": {
    "root": "relative flex flex-col min-w-0 min-h-svh lg:not-last:border-e lg:not-last:border-default shrink-0",
    "body": "flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6",
    "handle": ""
  },
  "variants": {
    "size": {
      "true": {
        "root": "w-full lg:w-(--width)"
      },
      "false": {
        "root": "flex-1"
      }
    }
  }
};

/* DOM extracted from DashboardPanel.vue — element nesting and data-slot names as shipped.
   The header and footer are bare Vue slots (DashboardPanel.vue:45, :51) — they
   create no element of their own, so their content goes straight into the panel,
   above and below the body. */
const tree = [{"t":"div","s":"root","c":[{"t":"slot","s":"header"},{"t":"div","s":"body"},{"t":"slot","s":"footer"}]},{"t":"slot","c":[{"t":"UDashboardResizeHandle","s":"handle","if":1}]}];

const render = createRenderer('dashboard-panel', dashboardPanelTheme, tree, {
  /* DashboardPanel.vue:42 sizes the panel through a VARIABLE, exactly as the
     sidebar does — `:style="size ? { '--width': \`${size}${unit}\` } : undefined"` —
     and the theme's `size: true` branch is `w-full lg:w-(--width)`. Without it
     that rule is invalid and the panel takes its content width (773 instead of
     the library's 384 = 30% of 1280). */
  slotAttrs(slot, props) {
    if (slot !== 'root' || props.defaultSize === undefined || props.defaultSize === null) return null;
    return { style: { '--width': `${props.defaultSize}${props.unit || '%'}` } };
  }
});

export function DashboardPanel(props) {
  const { defaultSize, ...rest } = props;
  /* the `size` VARIANT is `!!size` (DashboardPanel.vue:30), and `size` comes
     from `defaultSize` — with none the panel stays `flex-1` */
  const sized = defaultSize !== undefined && defaultSize !== null;
  return render({ ...rest, ...(sized ? { defaultSize, size: true } : {}) });
}
