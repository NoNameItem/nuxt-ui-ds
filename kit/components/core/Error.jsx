import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/error.ts (source/themes.json -> "error").
   Values are literal: no rounding, no cross-component alignment. */
export const errorTheme = {
  "slots": {
    "root": "min-h-[calc(100vh-var(--ui-header-height))] flex flex-col items-center justify-center text-center",
    "leading": "mb-4 flex items-center justify-center",
    "leadingIcon": "size-10 shrink-0 text-primary",
    "statusCode": "text-base font-semibold text-primary",
    "statusMessage": "mt-2 text-4xl sm:text-5xl font-bold text-highlighted text-balance",
    "message": "mt-4 text-lg text-muted text-balance",
    "links": "mt-8 flex items-center justify-center gap-6"
  }
};

/* DOM extracted from Error.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"leading","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"leadingIcon","if":1}]}]},{"t":"p","s":"statusCode","if":1},{"t":"h1","s":"statusMessage","if":1},{"t":"p","s":"message","if":1},{"t":"div","s":"links","if":1}]}];

const render = createRenderer('error', errorTheme, tree, {
  /* Error.vue:57 — the clear button's literals, written at the use site */
  slotProps: { links: { size: 'lg', color: 'primary', variant: 'solid' } },
  renderIf(slot, { props }) {
    /* Error.vue:19,55 — `clear` defaults to TRUE, so the links row is drawn
       unless it is switched off; without it everything above lost the row's
       36px plus its `mt-8` and rode 34px too high in the centred column. */
    if (slot === 'links') return props.clear !== false || !!props.links;
    return undefined;
  }
});

export function Error(props) {
  const { clear = true, links, ...rest } = props;
  /* the default row holds one button labelled from the locale (`error.clear`) */
  const row = links !== undefined ? links
    : (clear ? [{ label: typeof clear === 'object' && clear.label ? clear.label : 'Back to home', ...(typeof clear === 'object' ? clear : {}) }] : undefined);
  return render({ ...rest, clear, ...(row !== undefined ? { links: row } : {}) });
}
