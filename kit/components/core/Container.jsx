import React from 'react';
import { register } from '../../lib/registry.js';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/container.ts (source/themes.json -> "container").
   Values are literal: no rounding, no cross-component alignment. */
export const containerTheme = {
  "base": "w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8"
};

/* DOM extracted from Container.vue — element nesting and data-slot names as shipped.
   Container.vue is four lines: one Primitive carrying the theme's base class, with
   an unnamed slot inside. The extractor had spliced the templates of several
   neighbouring files in here instead, which left the container with 25 foreign
   slot names, no `base` node among them, and therefore no classes at all. */
const tree = [{"t":"Primitive","s":"base","c":[{"t":"slot"}]}];

const render = createRenderer('container', containerTheme, tree);

export function Container(props) {
  return render(props);
}

/* nested inside other components' DOM — the renderer mounts it by name */
register('Container', Container);
