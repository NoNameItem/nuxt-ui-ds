import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { NavigationMenu } from '../navigation/NavigationMenu.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/dashboard-sidebar.ts (source/themes.json -> "dashboard-sidebar").
   Values are literal: no rounding, no cross-component alignment. */
export const dashboardSidebarTheme = {
  "slots": {
    "root": "relative hidden lg:flex flex-col min-h-svh min-w-16 w-(--width) shrink-0",
    "header": "h-(--ui-header-height) shrink-0 flex items-center gap-1.5 px-4",
    "body": "flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2",
    "footer": "shrink-0 flex items-center gap-1.5 px-4 py-2",
    "toggle": "",
    "handle": "",
    "content": "lg:hidden",
    "overlay": "lg:hidden"
  },
  "variants": {
    "menu": {
      "true": {
        "header": "sm:px-6",
        "body": "sm:px-6",
        "footer": "sm:px-6"
      }
    },
    "side": {
      "left": {
        "root": "border-e border-default"
      },
      "right": {
        "root": ""
      }
    },
    "toggleSide": {
      "left": {
        "toggle": ""
      },
      "right": {
        "toggle": "ms-auto"
      }
    }
  }
};

/* DOM extracted from DashboardSidebar.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"DefineToggleTemplate","c":[{"t":"slot","c":[{"t":"UDashboardSidebarToggle","s":"toggle","if":1}]}]},{"t":"DefineResizeHandleTemplate","c":[{"t":"slot","c":[{"t":"UDashboardResizeHandle","s":"handle","if":1}]}]},{"t":"div","s":"root","c":[{"t":"div","s":"header","if":1},{"t":"div","s":"body"},{"t":"div","s":"footer","if":1}]},{"t":"Menu","c":[{"t":"template","c":[{"t":"slot","c":[{"t":"div","s":"header","if":1},{"t":"div","s":"body"},{"t":"div","s":"footer","if":1}]}]}]}];

/* The template renders the static aside *and* a mobile menu branch (USlideover /
   UModal / UDrawer by `mode`) holding a second copy of header/body/footer. The
   menu is closed until the toggle opens it, so it is not rendered at all. */
const render = createRenderer('dashboard-sidebar', dashboardSidebarTheme, tree, {
  /* DashboardSidebar.vue:118 sizes the panel through a VARIABLE —
     `:style="{ '--width': \`${size || 0}${unit}\` }"` — and the theme's root is
     `w-(--width)`. Without it that rule is invalid and the panel fell back to
     its content width (160 instead of 192), shifting everything to its right by
     32px. `size` defaults to 15 (defaultSize) and the group's unit is "%";
     collapsed, the panel is the theme's `min-w-16`. */
  slotAttrs(slot, props) {
    if (slot !== 'root') return null;
    if (props.collapsed) return { style: { '--width': '64px' } };
    const size = props.size !== undefined ? props.size : 15;
    return { style: { '--width': `${size || 0}${props.unit || '%'}` } };
  },
  nodeFilter(node, { open }) {
    if (node.t === 'Menu') return !!open;
    return true;
  }
});

export function DashboardSidebar(props) {
  /* same as Sidebar: the body is a user slot, and when a caller passes `items`
     the library's own examples put a vertical UNavigationMenu there */
  const { items, body, ...rest } = props;
  const nav = body !== undefined ? body
    : (items && items.length
      ? React.createElement(NavigationMenu, { orientation: 'vertical', items, collapsed: props.collapsed })
      : undefined);
  return render({ ...rest, items, ...(nav !== undefined ? { body: nav } : {}) });
}
