import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/blog-post.ts (source/themes.json -> "blog-post").
   Values are literal: no rounding, no cross-component alignment. */
export const blogPostTheme = {
  "slots": {
    "root": "relative group/blog-post flex flex-col rounded-lg overflow-hidden",
    "header": "relative overflow-hidden aspect-[16/9] w-full pointer-events-none",
    "body": "min-w-0 flex-1 flex flex-col",
    "footer": "",
    "image": "object-cover object-top w-full h-full",
    "title": "text-xl text-pretty font-semibold text-highlighted",
    "description": "mt-1 text-base text-pretty",
    "authors": "pt-4 mt-auto flex flex-wrap gap-x-3 gap-y-1.5",
    "avatar": "",
    "meta": "flex items-center gap-2 mb-2",
    "date": "text-sm",
    "badge": ""
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "root": "lg:grid lg:grid-cols-2 lg:items-center gap-x-8",
        "body": "justify-center p-4 sm:p-6 lg:px-0"
      },
      "vertical": {
        "root": "flex flex-col",
        "body": "p-4 sm:p-6"
      }
    },
    "variant": {
      "outline": {
        "root": "bg-default ring ring-default",
        "date": "text-toned",
        "description": "text-muted"
      },
      "soft": {
        "root": "bg-elevated/50",
        "date": "text-muted",
        "description": "text-toned"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default",
        "date": "text-muted",
        "description": "text-toned"
      },
      "ghost": {
        "date": "text-toned",
        "description": "text-muted",
        "header": "shadow-lg rounded-lg"
      },
      "naked": {
        "root": "p-0 sm:p-0",
        "date": "text-toned",
        "description": "text-muted",
        "header": "shadow-lg rounded-lg"
      }
    },
    "to": {
      "true": {
        "root": [
          "outline-primary/25 has-[>a:focus-visible]:outline-3",
          "transition"
        ],
        "image": "transform transition-transform ease-out motion-reduce:transition-none group-hover/blog-post:scale-110",
        "avatar": "inline-flex transform transition-transform ease-out motion-reduce:transition-none hover:scale-115 rounded-full outline-primary/25 focus-visible:outline-3"
      }
    },
    "image": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "variant": "outline",
      "to": true,
      "class": {
        "root": "hover:bg-elevated/50"
      }
    },
    {
      "variant": "soft",
      "to": true,
      "class": {
        "root": "hover:bg-elevated"
      }
    },
    {
      "variant": "subtle",
      "to": true,
      "class": {
        "root": "hover:bg-elevated hover:ring-accented"
      }
    },
    {
      "variant": [
        "outline",
        "subtle"
      ],
      "to": true,
      "class": {
        "root": "has-[>a:focus-visible]:ring-primary"
      }
    },
    {
      "variant": "ghost",
      "to": true,
      "class": {
        "root": "hover:bg-elevated/50",
        "header": [
          "group-hover/blog-post:shadow-none",
          "transition-[box-shadow,border-radius] ease-out"
        ]
      }
    },
    {
      "variant": "ghost",
      "to": true,
      "orientation": "vertical",
      "class": {
        "header": "group-hover/blog-post:rounded-b-none"
      }
    },
    {
      "variant": "ghost",
      "to": true,
      "orientation": "horizontal",
      "class": {
        "header": "group-hover/blog-post:rounded-e-none"
      }
    },
    {
      "orientation": "vertical",
      "image": false,
      "variant": "naked",
      "class": {
        "body": "p-0 sm:p-0"
      }
    }
  ],
  "defaultVariants": {
    "variant": "outline"
  }
};

/* DOM extracted from BlogPost.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"header","if":1,"c":[{"t":"slot","c":[{"t":"component","s":"image"}]}]},{"t":"div","s":"body","c":[{"t":"slot","c":[{"t":"div","s":"meta","if":1,"c":[{"t":"slot","c":[{"t":"UBadge","s":"badge","if":1,"p":{"color":"neutral","variant":"subtle"}}]},{"t":"time","s":"date","if":1}]},{"t":"h2","s":"title","if":1},{"t":"div","s":"description","if":1},{"t":"div","s":"authors","if":1,"c":[{"t":"slot","c":[{"t":"template","if":1,"c":[{"t":"UAvatarGroup","if":1,"c":[{"t":"ULink","s":"avatar","for":1}]}]}]}]}]}]},{"t":"div","s":"footer","if":1}]}];

/* BlogPost.vue:136 draws the authors block only for a non-empty `authors` (or
   its own slot); the node's own `if` cannot see that, and the kit drew an empty
   authors row on every post. */
const render = createRenderer('blog-post', blogPostTheme, tree, {
  renderIf(slot, { props }) {
    if (slot === 'authors') return !!(props.authors && props.authors.length);
    return undefined;
  },
  /* BlogPost.vue:41, 49-66 — useDateFormatter('en').custom(date, { dateStyle: 'medium', timeZone: 'UTC' }),
     the raw string on failure; datetime is the ISO form */
  slotContent(slot, { props }) {
    if (slot !== 'date' || props.date === undefined || props.date === null) return undefined;
    const d = parseDate(props.date);
    return d ? DATE_FORMAT.format(d) : undefined;
  },
  slotAttrs(slot, props) {
    if (slot !== 'date') return null;
    const d = parseDate(props.date);
    return d ? { dateTime: d.toISOString() } : null;
  }
});

const DATE_FORMAT = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' });
function parseDate(v) {
  if (v === undefined || v === null || v === '') return null;
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

export function BlogPost(props) {
  return render(props);
}
