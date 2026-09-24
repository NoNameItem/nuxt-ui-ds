import React from 'react';
import { register } from '../../lib/registry.js';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/chat-shimmer.ts (source/themes.json -> "chat-shimmer").
   Values are literal: no rounding, no cross-component alignment. */
export const chatShimmerTheme = {
  "base": "text-transparent bg-clip-text bg-no-repeat bg-size-[calc(200%+var(--spread)*2+2px)_100%,auto] bg-[image:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--ui-text-highlighted),#0000_calc(50%+var(--spread))),linear-gradient(var(--ui-text-muted),var(--ui-text-muted))] motion-safe:animate-[shimmer_var(--duration)_linear_infinite] motion-safe:rtl:animate-[shimmer-rtl_var(--duration)_linear_infinite] will-change-[background-position] motion-reduce:bg-none motion-reduce:text-muted"
};

/* DOM extracted from ChatShimmer.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"base"}];

const render = createRenderer('chat-shimmer', chatShimmerTheme, tree);

export function ChatShimmer(props) {
  return render(props);
}

/* nested inside other components' DOM — the renderer mounts it by name */
register('ChatShimmer', ChatShimmer);
