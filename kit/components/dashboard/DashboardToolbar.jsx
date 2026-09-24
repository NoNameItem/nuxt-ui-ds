import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/dashboard-toolbar.ts (source/themes.json -> "dashboard-toolbar").
   Values are literal: no rounding, no cross-component alignment. */
export const dashboardToolbarTheme = {
  "slots": {
    "root": "shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5 overflow-x-auto min-h-[49px]",
    "left": "flex items-center gap-1.5",
    "right": "flex items-center gap-1.5"
  }
};

/* DOM extracted from DashboardToolbar.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"slot","c":[{"t":"div","s":"left"},{"t":"div","s":"right"}]}]}];

const render = createRenderer('dashboard-toolbar', dashboardToolbarTheme, tree);

export function DashboardToolbar(props) {
  return render(props);
}
