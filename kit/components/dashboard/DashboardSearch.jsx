import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { tvd } from '../../lib/tv.js';
import { CommandPalette } from '../navigation/CommandPalette.jsx';
import { ICONS } from '../../lib/icons.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/dashboard-search.ts (source/themes.json -> "dashboard-search").
   Values are literal: no rounding, no cross-component alignment. */
export const dashboardSearchTheme = {
  "slots": {
    "modal": "",
    "input": ""
  },
  "variants": {
    "fullscreen": {
      "false": {
        "modal": "sm:max-w-3xl h-full sm:h-[28rem]"
      }
    },
    "size": {
      "xs": {},
      "sm": {},
      "md": {},
      "lg": {},
      "xl": {}
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};

/* DOM extracted from DashboardSearch.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"UModal","s":"modal","fwd":["open","title","description","close","overlay","fullscreen","dismissible","content","focusSlot"]}];

const render = createRenderer('dashboard-search', dashboardSearchTheme, tree);
const resolve = tvd('dashboard-search', dashboardSearchTheme);

/* DashboardSearch.vue's `<template #content>` holds a UCommandPalette with the
   component's own theme minus `modal`; extraction kept only the UModal node, so
   the modal opened onto an empty panel (10 slot nodes against the library's 67).

   Given as the modal's `content` value — the same plain slot-value path the
   sidebar's body uses — rather than as a renderer hook. */
export function DashboardSearch(props) {
  const { groups, content, colorMode = true, fullscreen = false, size, ui: uiProp = {}, input: _input, closeIcon: _ci, ...rest } = props;
  const ui = resolve({ fullscreen, size });
  /* the palette's groups are not only the caller's: with `colorMode` on (its
     defineProps default) the computed groups append a `theme` group of
     system / light / dark, which is why the library shows two groups and eight
     items for five caller items */
  /* DashboardSearch.vue:87-110 marks each theme row with
     `active: colorMode.preference === …`, and the preference defaults to
     "system" — so exactly one row carries the theme's `active` variant
     (`text-highlighted before:bg-elevated`) */
  const preference = props.colorModePreference || 'system';
  const themeGroup = {
    id: 'theme', label: 'Theme', items: [
      { label: 'System', icon: ICONS.system, active: preference === 'system' },
      { label: 'Light', icon: ICONS.light, active: preference === 'light' },
      { label: 'Dark', icon: ICONS.dark, active: preference === 'dark' }
    ]
  };
  const allGroups = groups ? (colorMode ? [...groups, themeGroup] : groups) : (colorMode ? [themeGroup] : undefined);
  /* DashboardSearch.vue:19, 66 — `close` (default true) and `closeIcon` travel
     into the palette, which draws the cross in its input's trailing slot;
     :68-73 — the input is `defu(props.input, { fixed: true })`. */
  const close = props.close !== undefined ? props.close : true;
  const inputProps = { fixed: true, ...(props.input && typeof props.input === 'object' && !React.isValidElement(props.input) ? props.input : {}) };
  const palette = content !== undefined ? content
    : prepPalette(CommandPalette({
      groups: allGroups, size, close, closeIcon: props.closeIcon, open: true,
      ui: { input: ui.input(uiProp.input), ...(uiProp.commandPalette || {}) }
    }), inputProps);
  /* the palette fills the modal's `#content` slot, which REPLACES header, body
     and footer — Modal.vue:82-96 then keeps title and description for
     assistive tech only, inside reka's VisuallyHidden */
  const title = props.title !== undefined ? props.title : 'Search';
  const description = props.description;
  const hidden = (title || description) ? React.createElement('span', { key: 'vh', style: VISUALLY_HIDDEN },
    title ? React.createElement('h2', { key: 't' }, title) : null,
    description ? React.createElement('p', { key: 'd' }, description) : null) : null;
  const body = content !== undefined ? palette : React.createElement(React.Fragment, null, hidden, palette);
  /* the focus goes to the palette's input, not to the dialog's close button:
     it is the first focusable element inside this overlay. The value names a
     slot, and `'none'` matches none of them — `null` reads as "not set" on the
     forward path and fell back to the dialog's own default. */
  return render({ ...rest, groups, size, fullscreen, content: body, focusSlot: 'none', ui: uiProp,
    ...(content !== undefined ? {} : { close: false, title: '', description: '' }) });
}

/* reka's VisuallyHidden */
const VISUALLY_HIDDEN = { position: 'absolute', border: 0, width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', clipPath: 'inset(50%)', whiteSpace: 'nowrap', wordWrap: 'normal' };

/* the palette's input gets the search's input props, and — its input holding
   the focus — the first enabled item is highlighted, as in reka's Listbox */
function prepPalette(el, inputProps) {
  let highlighted = false;
  const walk = (node) => {
    if (Array.isArray(node)) return node.map(walk);
    if (!React.isValidElement(node)) return node;
    const slot = node.props['data-slot'];
    if (slot === 'input') return React.cloneElement(node, inputProps);
    if (slot === 'item') {
      if (highlighted || node.props['data-disabled'] !== undefined) return node;
      highlighted = true;
      return React.cloneElement(node, { 'data-highlighted': '' });
    }
    const ch = node.props.children;
    if (ch === undefined || ch === null) return node;
    const next = walk(ch);
    return React.cloneElement(node, undefined, ...(Array.isArray(next) ? next : [next]));
  };
  return walk(el);
}
