import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/form-field.ts (source/themes.json -> "form-field").
   Values are literal: no rounding, no cross-component alignment. */
export const formFieldTheme = {
  "slots": {
    "root": "",
    "wrapper": "",
    "labelWrapper": "flex content-center items-center justify-between gap-1",
    "label": "block font-medium text-default",
    "container": "relative",
    "description": "text-muted",
    "error": "mt-2 text-error",
    "hint": "text-muted",
    "help": "mt-2 text-muted"
  },
  "variants": {
    "size": {
      "xs": {
        "root": "text-xs"
      },
      "sm": {
        "root": "text-xs"
      },
      "md": {
        "root": "text-sm"
      },
      "lg": {
        "root": "text-sm"
      },
      "xl": {
        "root": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "orientation": {
      "vertical": {
        "container": "mt-1"
      },
      "horizontal": {
        "root": "flex justify-between place-items-baseline gap-2"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};

/* DOM extracted from FormField.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"wrapper","c":[{"t":"div","s":"labelWrapper","if":1,"c":[{"t":"Label","s":"label"},{"t":"span","s":"hint","if":1}]},{"t":"p","s":"description","if":1}]},{"t":"div","s":"container","c":[{"t":"slot"},{"t":"div","s":"error","if":1},{"t":"div","s":"help","if":1}]}]}];

const render = createRenderer('form-field', formFieldTheme, tree, {
  /* the bare `<slot />` above is the field's place: without it the children
     fell through to the root and the error/help lines — the container's only
     other children — rendered ABOVE the field */
  childAnchor: true,
  /* FormField.vue:63 puts the orientation on the root, and the theme's
     `container` classes hang off it: base `relative` plus `mt-1` in the
     vertical branch, which is the default (:25). Nameless, the container took
     no classes and the field sat 4px high. */
  slotAttrs(slot, props) {
    return slot === 'root' ? { 'data-orientation': props.orientation || 'vertical' } : null;
  }
});

export function FormField(props) {
  /* FormField.vue provides `size` and the error state to the field inside it
     through inject(), which has no equivalent here: React children arrive
     already built. Cloning them with the values they did not set themselves is
     that provide/inject — without it the nested input kept its own default size
     and never turned red on an error. */
  const { children, size, error, name, orientation = 'vertical', ...rest } = props;
  const inherited = {};
  if (size !== undefined) inherited.size = size;
  if (error) inherited.highlight = true;
  if (error) inherited.color = 'error';
  if (name !== undefined) inherited.name = name;
  const kids = Object.keys(inherited).length
    ? React.Children.map(children, (child) => (React.isValidElement(child)
      ? React.cloneElement(child, Object.fromEntries(Object.entries(inherited).filter(([k]) => child.props[k] === undefined)))
      : child))
    : children;
  /* `size` is ALSO the field's own variant (`root: text-xs|text-sm|text-base`,
     FormField.vue:33): handing it only to the children left every label at the
     theme default `md`, so a `size="xs"` field's label measured 20px instead of
     16. It goes both ways — into the nested field and into the theme — and the
     root's class is written directly from the theme's own table, because that
     is the channel that reaches this node on every path the renderer takes. */
  const ROOT_TEXT = { xs: 'text-xs', sm: 'text-xs', md: 'text-sm', lg: 'text-sm', xl: 'text-base' };
  const uiProp = rest.ui || {};
  const rootText = ROOT_TEXT[size !== undefined ? size : 'md'];
  const ui = { ...uiProp, root: [uiProp.root || '', rootText].filter(Boolean).join(' ') };
  return render({ ...rest, size, orientation, error, name, ui, children: kids });
}
