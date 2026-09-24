import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/footer.ts (source/themes.json -> "footer").
   Values are literal: no rounding, no cross-component alignment. */
export const footerTheme = {
  "slots": {
    "root": "",
    "top": "py-8 lg:py-12",
    "bottom": "py-8 lg:py-12",
    "container": "py-8 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3",
    "left": "flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1",
    "center": "mt-3 lg:mt-0 lg:order-2 flex items-center justify-center",
    "right": "lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3"
  }
};

/* DOM extracted from Footer.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"top","if":1},{"t":"UContainer","s":"container","c":[{"t":"div","s":"right"},{"t":"div","s":"center","c":[{"t":"slot"}]},{"t":"div","s":"left"}]},{"t":"div","s":"bottom","if":1}]}];

const render = createRenderer('footer', footerTheme, tree, {
  /* Footer.vue — the default slot lives in `center` */
  childAnchor: true
});

export function Footer(props) {
  return render(props);
}
