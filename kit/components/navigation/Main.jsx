import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/main.ts (source/themes.json -> "main").
   Values are literal: no rounding, no cross-component alignment. */
export const mainTheme = {
  "base": "min-h-[calc(100vh-var(--ui-header-height))]"
};

/* DOM extracted from Main.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"div","s":"base"}];

const render = createRenderer('main', mainTheme, tree);

export function Main(props) {
  return render(props);
}
