import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/dashboard-group.ts (source/themes.json -> "dashboard-group").
   Values are literal: no rounding, no cross-component alignment. */
export const dashboardGroupTheme = {
  "base": "fixed inset-0 flex overflow-hidden"
};

/* DOM extracted from DashboardGroup.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"div","s":"base"}];

const render = createRenderer('dashboard-group', dashboardGroupTheme, tree);

export function DashboardGroup(props) {
  return render(props);
}
