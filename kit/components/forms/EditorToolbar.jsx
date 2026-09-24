import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/editor-toolbar.ts (source/themes.json -> "editor-toolbar").
   Values are literal: no rounding, no cross-component alignment. */
export const editorToolbarTheme = {
  "slots": {
    "root": "focus:outline-none",
    "base": "flex items-stretch gap-1.5",
    "group": "flex items-center gap-0.5",
    "separator": "w-px self-stretch bg-border"
  },
  "variants": {
    "layout": {
      "bubble": {
        "base": "bg-default border border-default rounded-lg p-1"
      },
      "floating": {
        "base": "bg-default border border-default rounded-lg p-1"
      },
      "fixed": {
        "base": ""
      }
    }
  }
};

/* DOM extracted from EditorToolbar.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","c":[{"t":"Primitive","s":"base","c":[{"t":"template","for":1,"c":[{"t":"div","s":"group"},{"t":"Separator","s":"separator","if":1}]}]}]}];

const render = createRenderer('editor-toolbar', editorToolbarTheme, tree);

export function EditorToolbar(props) {
  return render(props);
}
