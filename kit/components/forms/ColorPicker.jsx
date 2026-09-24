import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/color-picker.ts (source/themes.json -> "color-picker").
   Values are literal: no rounding, no cross-component alignment. */
export const colorPickerTheme = {
  "slots": {
    "root": "data-[disabled]:opacity-75",
    "picker": "flex gap-4",
    "selector": "rounded-md touch-none",
    "selectorBackground": "w-full h-full relative rounded-md",
    "selectorThumb": "-translate-y-1/2 -translate-x-1/2 absolute size-4 ring-2 ring-white rounded-full cursor-pointer data-[disabled]:cursor-not-allowed",
    "track": "w-[8px] relative rounded-md touch-none",
    "trackThumb": "absolute transform -translate-y-1/2 -translate-x-[4px] rtl:translate-x-[4px] size-4 rounded-full ring-2 ring-white cursor-pointer data-[disabled]:cursor-not-allowed"
  },
  "variants": {
    "size": {
      "xs": {
        "selector": "w-38 h-38",
        "track": "h-38"
      },
      "sm": {
        "selector": "w-40 h-40",
        "track": "h-40"
      },
      "md": {
        "selector": "w-42 h-42",
        "track": "h-42"
      },
      "lg": {
        "selector": "w-44 h-44",
        "track": "h-44"
      },
      "xl": {
        "selector": "w-46 h-46",
        "track": "h-46"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};

/* DOM extracted from ColorPicker.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"picker","c":[{"t":"div","s":"selector","c":[{"t":"div","s":"selectorBackground","c":[{"t":"div","s":"selectorThumb"}]}]},{"t":"div","s":"track","c":[{"t":"div","s":"trackThumb"}]}]}]}];

/* `ColorTranslator` in three functions: the library only ever needs hex in and
   hex out, plus the HSV coordinates the thumbs are positioned by. */
function normalizeHex(value) {
  const v = String(value).trim();
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(v);
  if (!m) return v;
  const d = m[1].length === 3 ? m[1].split('').map((c) => c + c).join('') : m[1];
  return '#' + d.toUpperCase();
}

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex));
  if (!m) return { r: 255, g: 255, b: 255 };
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHsv({ r, g, b }) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d) {
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
  }
  if (h < 0) h += 360;
  return { h, s: max ? (d / max) * 100 : 0, v: (max / 255) * 100 };
}

function hsvToHex({ h, s, v }) {
  const c = (v / 100) * 255, sat = s / 100;
  const hp = ((h % 360) + 360) % 360 / 60;
  const x = c * (1 - sat), y = c * (1 - sat * (hp % 1)), z = c * (1 - sat * (1 - (hp % 1)));
  const seg = Math.floor(hp) % 6;
  const rgb = [[c, z, x], [y, c, x], [x, c, z], [x, y, c], [z, x, c], [c, x, y]][seg];
  return '#' + rgb.map((n) => Math.round(n).toString(16).padStart(2, '0')).join('').toUpperCase();
}

const render = createRenderer('color-picker', colorPickerTheme, tree, {
  /* The three inline styles ColorPicker.vue:163-179 computes. All of them come
     from one prop by arithmetic — the thumbs' positions ARE the colour's
     coordinates — so they exist on the first paint, before any pointer event:

       selector       backgroundColor = the hue at full saturation and value
       selectorThumb  backgroundColor = the colour itself
                      left = saturation %, top = 100 - value %
       trackThumb     backgroundColor = the hue at full s/v, top = hue/360 %

     Without them the three nodes had no background at all
     (`rgba(0, 0, 0, 0)`) and both thumbs sat at the origin. */
  slotAttrs(slot, props) {
    /* the hooks ColorPicker.vue's scoped block paints through — the field's
       black/white overlay and the hue rainbow (rules in tokens/utilities-extra.css) */
    if (slot === 'selectorBackground') return { 'data-color-picker-background': '' };
    if (slot === 'track') return { 'data-color-picker-track': '' };
    if (slot !== 'selector' && slot !== 'selectorThumb' && slot !== 'trackThumb') return undefined;
    const hex = normalizeHex(props.modelValue || props.defaultValue || '#FFFFFF');
    const { h, s, v } = rgbToHsv(hexToRgb(hex));
    const hueHex = hsvToHex({ h, s: 100, v: 100 });
    if (slot === 'selector') return { style: { backgroundColor: hueHex } };
    if (slot === 'selectorThumb') {
      return { style: { backgroundColor: hex, left: `${s}%`, top: `${100 - v}%` } };
    }
    return { style: { backgroundColor: hueHex, top: `${h * 100 / 360}%` } };
  }
});

export function ColorPicker(props) {
  return render(props);
}
