import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { CompactScope } from '../../lib/compact.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/chat-palette.ts (source/themes.json -> "chat-palette").
   Values are literal: no rounding, no cross-component alignment. */
export const chatPaletteTheme = {
  "slots": {
    "root": "relative flex-1 flex flex-col min-h-0 min-w-0",
    "prompt": "px-0 rounded-t-none border-t border-default",
    "close": "",
    "content": "overflow-y-auto flex-1 flex flex-col py-3"
  }
};

/* DOM extracted from ChatPalette.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"content"},{"t":"Slot","s":"prompt","if":1}]}];

const render = createRenderer('chat-palette', chatPaletteTheme, tree, { childAnchor: true });

export function ChatPalette(props) {
  const { children, ...rest } = props;
  /* ChatPalette.vue:25 wraps its body in `<Slot compact>`: everything inside a
     palette is compact, which is what turns a message's `px-4 py-3` into
     `px-2 py-1`. Declared for the whole subtree rather than cloned onto the
     immediate children — the renderer places children as slot values, and a
     clone's extra prop does not survive that. */
  return render({ ...rest, children: React.createElement(CompactScope, { value: true }, children) });
}
