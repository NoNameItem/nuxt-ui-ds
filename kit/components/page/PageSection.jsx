import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-section.ts (source/themes.json -> "page-section").
   Values are literal: no rounding, no cross-component alignment. */
export const pageSectionTheme = {
  "slots": {
    "root": "relative isolate",
    "container": "flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16",
    "wrapper": "",
    "header": "",
    "leading": "flex items-center mb-6",
    "leadingIcon": "size-10 shrink-0 text-primary",
    "headline": "mb-3",
    "title": "text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted",
    "description": "text-base sm:text-lg text-muted",
    "body": "mt-8",
    "features": "grid",
    "footer": "mt-8",
    "links": "flex flex-wrap gap-x-6 gap-y-3"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "container": "lg:grid-cols-2 lg:items-center",
        "description": "text-pretty",
        "features": "gap-4"
      },
      "vertical": {
        "container": "",
        "headline": "justify-center",
        "leading": "justify-center",
        "title": "text-center",
        "description": "text-center text-balance",
        "links": "justify-center",
        "features": "sm:grid-cols-2 lg:grid-cols-3 gap-8"
      }
    },
    "reverse": {
      "true": {
        "wrapper": "order-last"
      }
    },
    "headline": {
      "true": {
        "headline": "font-semibold text-primary flex items-center gap-1.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-6"
      }
    },
    "description": {
      "true": ""
    },
    "body": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "orientation": "vertical",
      "title": true,
      "class": {
        "body": "mt-16"
      }
    },
    {
      "orientation": "vertical",
      "description": true,
      "class": {
        "body": "mt-16"
      }
    },
    {
      "orientation": "vertical",
      "body": true,
      "class": {
        "footer": "mt-16"
      }
    }
  ]
};

/* DOM extracted from PageSection.vue — element nesting and data-slot names as shipped. */
/* The bare `<slot />` at PageSection.vue:102 is a direct child of `container`,
   AFTER `wrapper` closes — the same node extraction dropped from PageCard. And
   `slots.default` is absent from the `wrapper` gate (:47): a section whose only
   content is that slot has no `wrapper` and no `body` at all, just text in the
   container. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"UContainer","s":"container","c":[{"t":"div","s":"wrapper","if":1,"c":[{"t":"div","s":"header","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"leading","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"leadingIcon","if":1}]}]},{"t":"div","s":"headline","if":1},{"t":"h2","s":"title","if":1},{"t":"div","s":"description","if":1}]}]},{"t":"div","s":"body","if":1,"c":[{"t":"slot","c":[{"t":"ul","s":"features","if":1,"c":[{"t":"UPageFeature","for":1,"p":{"as":"li"}}]}]}]},{"t":"div","s":"footer","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"links","if":1}]}]}]},{"t":"slot"}]}]}];

/* PageSection.vue renders every `features` entry as its own mounted
   UPageFeature (`as="li"`, `v-bind="feature"`) — its root is the `li` the
   library counts, with the feature's own leading/title/description inside. The
   kit drew the `ul` and nothing in it. */
const render = createRenderer('page-section', pageSectionTheme, tree, {
  listFor(node, { props }) {
    if (node.t === 'UPageFeature') return props.features;
    return undefined;
  },
  /* `v-if="props.features?.length || !!slots.features"` — an empty section had a
     bare `ul` the library never draws */
  /* the bare `<slot />` restored in the tree above is where children belong */
  childAnchor: true,
  renderIf(slot, { props }) {
    if (slot === 'features') return !!(props.features && props.features.length);
    if (slot === 'links') return !!(props.links && props.links.length);
    /* PageSection.vue:47 — the gate lists every prop-driven part but NOT
       `slots.default`, so a children-only section skips the wrapper entirely */
    if (slot === 'wrapper') {
      return !!(props.title || props.description || props.headline || props.icon
        || (props.features && props.features.length) || (props.links && props.links.length)
        || props.header || props.body || props.footer);
    }
    return undefined;
  }
});

export function PageSection(props) {
  return render(props);
}
