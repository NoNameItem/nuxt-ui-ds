import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/skeleton.ts (source/themes.json -> "skeleton").
   Values are literal: no rounding, no cross-component alignment. */
export const skeletonTheme = {
  "base": "animate-pulse rounded-md bg-elevated"
};

/* DOM extracted from Skeleton.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"div","s":"base"}];

const render = createRenderer('skeleton', skeletonTheme, tree);

export function Skeleton(props) {
  return render(props);
}
