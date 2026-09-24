import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/splitter.ts (source/themes.json -> "splitter").
   Values are literal: no rounding, no cross-component alignment. */
export const splitterTheme = {
  "slots": {
    "root": "",
    "panel": "flex",
    "handle": "group relative shrink-0 focus-visible:outline-2 focus-visible:outline-primary data-[panel-resize-handle-enabled=false]:cursor-default"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "handle": "w-2 cursor-col-resize"
      },
      "vertical": {
        "handle": "h-2 cursor-row-resize"
      }
    }
  }
};

/* DOM extracted from Splitter.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"SplitterGroup","s":"root","c":[{"t":"template","for":1,"c":[{"t":"SplitterPanel","s":"panel"},{"t":"SplitterResizeHandle","s":"handle","if":1}]}]}];

/* reka's SplitterGroup owns the layout, not the theme (Splitter.vue:55-57,86):
   the group makes the root a flex box in the `direction` it was given, full
   width and height with `overflow: hidden`, and gives each panel `flex-grow`
   by share with `flex-basis: 0`. None of that is in the theme, so extraction
   left the root at `display: block` / height 0 and the panels unsized — the
   whole splitter collapsed. The handle sits BETWEEN panels, so there is one
   fewer than panels. */
const render = createRenderer('splitter', splitterTheme, tree, {
  /* the handle count follows from the panel count, not from an index the
     renderer may not supply: `items.length - 1` handles, drawn between them */
  renderIf(slot, { props, index }) {
    if (slot !== 'handle') return undefined;
    const total = (props.items || []).length;
    if (total < 2) return false;
    return index === undefined ? true : index < total - 1;
  },
  /* the layout goes through the `ui` classes (see the wrapper below), which is
     the channel that reaches these nodes on every path the renderer takes */
  slotAttrs(slot, props) {
    return slot === 'root' ? { 'data-orientation': props.orientation || 'horizontal' } : undefined;
  }
});

export function Splitter(props) {
  const orientation = props.orientation || 'horizontal';
  const uiProp = props.ui || {};
  const add = (slot, extra) => ({ [slot]: [uiProp[slot] || '', extra].filter(Boolean).join(' ') });
  const ui = {
    ...uiProp,
    ...add('root', `flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} size-full overflow-hidden`),
    ...add('panel', 'grow basis-0 overflow-hidden')
  };
  return render({ ...props, orientation, ui });
}
