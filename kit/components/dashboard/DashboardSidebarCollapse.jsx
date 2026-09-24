import React from 'react';
import { tvd } from '../../lib/tv.js';
import { ICONS } from '../../lib/icons.js';
import { Button } from '../core/Button.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/dashboard-sidebar-collapse.ts (source/themes.json -> "dashboard-sidebar-collapse").
   Values are literal: no rounding, no cross-component alignment. */
export const dashboardSidebarCollapseTheme = {
  "base": "hidden lg:flex",
  "variants": {
    "side": {
      "left": "",
      "right": ""
    }
  }
};

const resolve = tvd('dashboard-sidebar-collapse', dashboardSidebarCollapseTheme);

/* DashboardSidebarCollapse.vue:53 is a UButton — its own theme supplies only
   `hidden lg:flex`, the button classes come from the delegate, and the icon is
   the appConfig panelClose (panelOpen once the panel is collapsed). The
   extracted DOM had kept just the bare wrapper, which rendered an empty div. */
export function DashboardSidebarCollapse(props) {
  const {
    collapsed = false, side = 'left', icon,
    color = 'neutral', variant = 'ghost',
    ui: uiProp = {}, class: className, className: classNameAlt, ...rest
  } = props;
  const ui = resolve({ side });
  return (
    <Button
      color={color}
      variant={variant}
      square
      icon={icon ?? (collapsed ? ICONS.panelOpen : ICONS.panelClose)}
      aria-label="Collapse sidebar"
      data-ds-component="DashboardSidebarCollapse"
      class={ui.base(uiProp.base, className || classNameAlt)}
      {...rest}
    />
  );
}
