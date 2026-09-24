import React from 'react';
import { register } from '../../lib/registry.js';
import { tvd } from '../../lib/tv.js';
import { ICONS } from '../../lib/icons.js';
import { Button } from '../core/Button.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/dashboard-sidebar-toggle.ts (source/themes.json -> "dashboard-sidebar-toggle").
   Values are literal: no rounding, no cross-component alignment. */
export const dashboardSidebarToggleTheme = {
  "base": "lg:hidden",
  "variants": {
    "side": {
      "left": "",
      "right": ""
    }
  }
};

const resolve = tvd('dashboard-sidebar-toggle', dashboardSidebarToggleTheme);

/* DashboardSidebarToggle.vue:54-63 is a UButton — color="neutral",
   variant="ghost", the appConfig menu icon (close once the sidebar is open) and
   its own theme's class. The extracted DOM kept only the bare wrapper, which
   rendered an empty div. */
export function DashboardSidebarToggle(props) {
  const { open = false, side = 'left', icon, ui: uiProp = {}, class: className, className: classNameAlt, ...rest } = props;
  const ui = resolve({ side });
  return (
    <Button
      color="neutral"
      variant="ghost"
      square
      icon={icon ?? (open ? ICONS.close : ICONS.menu)}
      aria-label="Toggle sidebar"
      data-ds-component="DashboardSidebarToggle"
      class={ui.base(uiProp.base, className || classNameAlt)}
      {...rest}
    />
  );
}

/* nested inside other components' DOM — the renderer mounts it by name */
register('DashboardSidebarToggle', DashboardSidebarToggle);
