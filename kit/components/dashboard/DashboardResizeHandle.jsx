import React from 'react';
import { register } from '../../lib/registry.js';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/dashboard-resize-handle.ts (source/themes.json -> "dashboard-resize-handle").
   Values are literal: no rounding, no cross-component alignment. */
export const dashboardResizeHandleTheme = {
  "base": "hidden lg:block touch-none select-none cursor-ew-resize relative before:absolute before:inset-y-0 before:-left-1.5 before:-right-1.5 before:z-1"
};

/* DOM extracted from DashboardResizeHandle.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"div","s":"base"}];

const render = createRenderer('dashboard-resize-handle', dashboardResizeHandleTheme, tree);

export function DashboardResizeHandle(props) {
  return render(props);
}

/* nested inside other components' DOM — the renderer mounts it by name */
register('DashboardResizeHandle', DashboardResizeHandle);
