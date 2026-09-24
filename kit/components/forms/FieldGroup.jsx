import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/field-group.ts (source/themes.json -> "field-group").
   Values are literal: no rounding, no cross-component alignment. */
export const fieldGroupTheme = {
  "base": "relative",
  "variants": {
    "size": {
      "xs": "",
      "sm": "",
      "md": "",
      "lg": "",
      "xl": ""
    },
    "orientation": {
      "horizontal": "inline-flex -space-x-px",
      "vertical": "flex flex-col -space-y-px"
    }
  }
};

/* DOM extracted from FieldGroup.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"div","s":"base"}];

const render = createRenderer('field-group', fieldGroupTheme, tree);

/* FieldGroup.vue:23-26 — provide(fieldGroupInjectionKey, { orientation, size }).
   Button.vue:71 and Input.vue:55 read it through useFieldGroup(props) and resolve
   their theme's `fieldGroup` variant with it; outside a group there is none. */
export const FieldGroupContext = React.createContext(null);

export function useFieldGroup(props) {
  let ctx = null;
  try { ctx = React.useContext(FieldGroupContext); } catch (e) { ctx = null; }
  if (!ctx) return {};
  return { orientation: ctx.orientation, size: props.size ?? ctx.size };
}

export function FieldGroup(props) {
  const orientation = props.orientation || 'horizontal';
  const value = React.useMemo(() => ({ orientation, size: props.size }), [orientation, props.size]);
  return React.createElement(FieldGroupContext.Provider, { value }, render({ ...props, orientation }));
}
