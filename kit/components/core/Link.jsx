import React from 'react';
import { register } from '../../lib/registry.js';
import { tvd, slotStyle } from '../../lib/tv.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/link.ts (source/themes.json -> "link").
   Values are literal: no rounding, no cross-component alignment. */
export const linkTheme = {
  "base": "outline-primary/25 focus-visible:outline-3 rounded-md",
  "variants": {
    "active": {
      "true": "text-primary",
      "false": "text-muted"
    },
    "disabled": {
      "true": "cursor-not-allowed opacity-75"
    }
  },
  "compoundVariants": [
    {
      "active": false,
      "disabled": false,
      "class": [
        "hover:text-default",
        "transition-colors"
      ]
    }
  ]
};

/* Link.vue -> LinkBase.vue: with `to` (or `href`) the link IS an <a href>,
   theme classes on it and the children straight inside, no data-slot; without
   one it is `<button type="button">` (Link.vue:20-21, `as`/`type` default
   "button"). `label` is what the kit's renderer hands a mounted ULink as its
   text (Header's `title`). */
const resolve = tvd('link', linkTheme);

export function Link(props) {
  const { to, href, as, type, label, children, raw, active, disabled, exact, exactQuery, exactHash,
    inactiveClass, activeClass, external, target, rel, noRel, replace, prefetch, noPrefetch,
    ui: _ui, class: className, className: classNameAlt, selected: _selected, ...rest } = props;
  const dest = to ?? href;
  const ui = resolve({ active: !!active, disabled: !!disabled });
  const cls = raw ? [className || classNameAlt, active ? activeClass : inactiveClass].filter(Boolean).join(' ')
    : ui.base(active ? activeClass : inactiveClass, className || classNameAlt);
  const content = children !== undefined && children !== null && children !== false ? children : label;
  if (dest !== undefined && dest !== null && !disabled) {
    return React.createElement('a', {
      ...slotStyle(cls), href: typeof dest === 'string' ? dest : String(dest.path ?? dest),
      ...(target ? { target } : {}), ...(rel ? { rel } : {}),
      ...(active ? { 'aria-current': 'page' } : {}),
      'data-ds-component': 'Link', ...rest
    }, content);
  }
  return React.createElement(as || 'button', {
    ...slotStyle(cls), ...((as || 'button') === 'button' ? { type: type || 'button' } : {}),
    ...(disabled ? { disabled: true, 'aria-disabled': 'true' } : {}),
    'data-ds-component': 'Link', ...rest
  }, content);
}

register('Link', Link);
