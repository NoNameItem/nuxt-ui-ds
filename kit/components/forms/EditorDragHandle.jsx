import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/editor-drag-handle.ts (source/themes.json -> "editor-drag-handle").
   Values are literal: no rounding, no cross-component alignment. */
export const editorDragHandleTheme = {
  "slots": {
    "root": "hidden sm:flex items-center justify-center transition-[top,left] duration-200 ease-out motion-reduce:transition-none",
    "handle": "cursor-grab px-1"
  }
};

/* DOM extracted from EditorDragHandle.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"DragHandle","s":"root","c":[{"t":"slot","c":[{"t":"UButton","s":"handle"}]}]}];

const render = createRenderer('editor-drag-handle', editorDragHandleTheme, tree);

export function EditorDragHandle(props) {
  return render(props);
}
