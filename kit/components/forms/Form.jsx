import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/form.ts (source/themes.json -> "form").
   Values are literal: no rounding, no cross-component alignment. */
export const formTheme = {
  "base": ""
};

/* DOM extracted from Form.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"div","s":"base"}];

const render = createRenderer('form', formTheme, tree);

export function Form(props) {
  return render(props);
}
