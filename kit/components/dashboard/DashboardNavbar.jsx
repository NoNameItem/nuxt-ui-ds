import React from 'react';
import { tvd, slotStyle } from '../../lib/tv.js';
import { renderIcon } from '../../lib/iconify.jsx';
import { DashboardSidebarToggle } from './DashboardSidebarToggle.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/dashboard-navbar.ts (source/themes.json -> "dashboard-navbar").
   Values are literal: no rounding, no cross-component alignment. */
export const dashboardNavbarTheme = {
  "slots": {
    "root": "h-(--ui-header-height) shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5",
    "left": "flex items-center gap-1.5 min-w-0",
    "icon": "shrink-0 size-5 self-center me-1.5",
    "title": "flex items-center gap-1.5 font-semibold text-highlighted truncate",
    "center": "hidden lg:flex",
    "right": "flex items-center shrink-0 gap-1.5",
    "toggle": ""
  },
  "variants": {
    "toggleSide": {
      "left": {
        "toggle": ""
      },
      "right": {
        "toggle": ""
      }
    }
  }
};

/* DashboardNavbar.vue puts the toggle in a DefineToggleTemplate and gates the
   title on `props.title || !!slots.title` — both were lost with the Reuse node,
   leaving the bar empty. This is the shipped structure: toggle on the requested
   side, icon + h1 title in `left`, `center`, then `right`. */
const resolve = tvd('dashboard-navbar', dashboardNavbarTheme);

export function DashboardNavbar(props) {
  const {
    title, icon, toggle = true, toggleSide = 'left', center, right,
    ui: uiProp = {}, class: className, className: classNameAlt, children, ...rest
  } = props;
  const ui = resolve({ ...props, toggleSide });
  /* the toggle is its own component (DashboardSidebarToggle), not inline markup:
     the `toggle` slot carries no classes of its own, and the button's menu icon
     must belong to the button rather than become the navbar's first `icon`. */
  const toggleEl = toggle ? (
    <DashboardSidebarToggle side={toggleSide} class={ui.toggle(uiProp.toggle)} />
  ) : null;

  return (
    <nav {...slotStyle(ui.root(uiProp.root, className || classNameAlt))} data-ds-component="DashboardNavbar" data-slot="root" {...rest}>
      {toggleSide === 'left' ? toggleEl : null}
      <div {...slotStyle(ui.left(uiProp.left))} data-slot="left">
        {icon ? renderIcon(icon, ui.icon(uiProp.icon)) : null}
        {title ? <h1 {...slotStyle(ui.title(uiProp.title))} data-slot="title">{title}</h1> : null}
      </div>
      {center ? <div {...slotStyle(ui.center(uiProp.center))} data-slot="center">{center}</div> : null}
      <div {...slotStyle(ui.right(uiProp.right))} data-slot="right">
        {right ?? children}
      </div>
      {toggleSide === 'right' ? toggleEl : null}
    </nav>
  );
}
