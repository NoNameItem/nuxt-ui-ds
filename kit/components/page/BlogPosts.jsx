import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/blog-posts.ts (source/themes.json -> "blog-posts").
   Values are literal: no rounding, no cross-component alignment. */
export const blogPostsTheme = {
  "base": "flex flex-col gap-8 lg:gap-y-16",
  "variants": {
    "orientation": {
      "horizontal": "sm:grid sm:grid-cols-2 lg:grid-cols-3",
      "vertical": ""
    }
  }
};

/* DOM extracted from BlogPosts.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"div","s":"base"}];

const render = createRenderer('blog-posts', blogPostsTheme, tree);

export function BlogPosts(props) {
  return render(props);
}
