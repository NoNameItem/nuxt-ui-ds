import React from 'react';
import { tvd, slotStyle } from '../../lib/tv.js';
import { ICONS } from '../../lib/icons.js';
import { Button } from '../core/Button.jsx';
import { Kbd } from '../core/Kbd.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/dashboard-search-button.ts (source/themes.json -> "dashboard-search-button").
   Values are literal: no rounding, no cross-component alignment. */
export const dashboardSearchButtonTheme = {
  "slots": {
    "base": "",
    "label": "",
    "trailing": "hidden lg:flex items-center gap-0.5 ms-auto"
  },
  "variants": {
    "collapsed": {
      "true": {
        "label": "hidden",
        "trailing": "lg:hidden"
      }
    }
  }
};

/* The whole button lives in a DefineButtonTemplate whose Reuse node is not in
   the extracted DOM. It is a UButton with the appConfig search icon, the
   "Search…" label, and one UKbd per shortcut key in its trailing slot. */
const resolve = tvd('dashboard-search-button', dashboardSearchButtonTheme);

export function DashboardSearchButton(props) {
  const {
    icon, label, kbds = ['meta', 'k'], collapsed = false, color = 'neutral', variant,
    ui: uiProp = {}, class: className, className: classNameAlt, ...rest
  } = props;
  const ui = resolve({ ...props, collapsed });
  /* the label node always exists; the theme hides it when collapsed
     (dashboard-search-button, collapsed.true -> label: "hidden") */
  const button = Button({
    color,
    variant: variant ?? (collapsed ? 'ghost' : 'outline'),
    leadingIcon: icon ?? ICONS.search,
    label: label ?? 'Search…',
    square: collapsed,
    class: ui.base(uiProp.base, className || classNameAlt),
    ui: { label: ui.label(uiProp.label) },
    ...rest
  });
  if (collapsed) return React.cloneElement(button, { 'data-ds-component': 'DashboardSearchButton' });
  /* the kbd strip is Button's `#trailing` slot — the LAST child of the button's
     `base` element, after the label. The returned element wraps `base` (ULink),
     so appending to the outer element put the strip beside the button. Each kbd
     is `<UKbd variant="subtle" v-bind="…">` with Kbd's own default size (md). */
  const strip = (
    <span key="trailing" {...slotStyle(ui.trailing(uiProp.trailing))} data-slot="trailing">
      {kbds.map((k, i) => <Kbd key={i} variant="subtle" {...(typeof k === 'string' ? { value: k } : k)} />)}
    </span>
  );
  const intoBase = (el) => {
    if (!React.isValidElement(el)) return null;
    if (el.props['data-slot'] === 'base') return React.cloneElement(el, null, ...React.Children.toArray(el.props.children), strip);
    const kids = React.Children.toArray(el.props.children);
    for (let i = 0; i < kids.length; i++) {
      const hit = intoBase(kids[i]);
      if (hit) return React.cloneElement(el, null, ...kids.slice(0, i), hit, ...kids.slice(i + 1));
    }
    return null;
  };
  const placed = intoBase(button);
  if (placed) return React.cloneElement(placed, { 'data-ds-component': 'DashboardSearchButton' });
  return React.cloneElement(button, { 'data-ds-component': 'DashboardSearchButton' }, [...React.Children.toArray(button.props.children), strip]);
}
