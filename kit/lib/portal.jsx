/* Overlay and shell positioning: the artboard is the screen.

   Nuxt UI's themes pin overlays and app shells to the viewport — `fixed inset-0`,
   `min-h-svh`, `w-[calc(100vw-2rem)]`, `min-h-[calc(100vh-var(--ui-header-height))]`
   — because in a real app the window *is* the frame. In this kit a component is
   shown inside an artboard, so:

     fixed                        -> absolute
     svh / dvh / lvh / vh / vw    -> %          (hard sizes: w/h/max-w/max-h)
     svh / dvh / lvh / vh / vw    -> dvh / dvw  (MINIMUMS: min-h / min-w)
     screen                       -> full / 100dvh

   A percentage needs a sized ancestor. Overlays have one — they are absolute
   inside the artboard — but a shell laid out in flow does not: DashboardMain's
   `min-h-[calc(100vh-var(--ui-header-height))]` became `100%` of `auto` and the
   panel collapsed from 736px to 24. A minimum keeps a viewport unit instead,
   which is the frame's own viewport since every artboard is its own document;
   giving the page a height basis is not the answer — it also stretches the
   sidebar the library draws at its content height.

   `inset-0`, `inset-y-0 right-0`, `top-1/2 left-1/2` + translate centring and the
   close button's `absolute top-4 end-4` then all resolve against the artboard.

   Classes are rewritten in place, never dropped, and percent sizes are also emitted
   inline: the generated utility sheet only carries the class strings the library
   itself ships, so a rewritten class may have no rule of its own. */
const SIZE_PROP = { w: 'width', h: 'height', 'min-w': 'minWidth', 'min-h': 'minHeight', 'max-w': 'maxWidth', 'max-h': 'maxHeight' };
const AXIS = { w: 'w', h: 'h' };
/* not global: a /g/ regex carries lastIndex between .test() calls and would
   skip every other match */
const VIEWPORT = /\d(vw|vh|dvh|svh|lvh)\b/;
const SIZE_PREFIX = /^(?:([\w:[\]&.-]+):)?(w|h|min-w|min-h|max-w|max-h)-(.+)$/;

const toPercent = (v) => v.replace(/(\d+)(vw|vh|dvh|svh|lvh)/g, '$1%');
/* dvh/dvw ARE the artboard for a lower bound: each artboard is its own document,
   so the frame's viewport is the frame. A percentage needs a sized ancestor and
   the shell pages have none — `min-h-[calc(100vh-var(--ui-header-height))]`
   became `100%` of `auto`, and DashboardMain collapsed from 736px to 24. Only
   MINIMUMS keep a viewport unit: a hard `h-svh` turned into `h-dvh` would stretch
   a sidebar that the library draws at its content height. */
const toFrameUnit = (v) => v.replace(/(\d+)(vw|vh|dvh|svh|lvh)/g, (_, n, u) => n + (u === 'vw' ? 'dvw' : 'dvh'));
const MIN = /^min-/;

export function localizeFixed(cls) {
  if (!cls) return [cls, null];
  const out = [];
  let style = null;
  const inline = (prop, value) => {
    /* var(--name) holds hyphens that are NOT operators: spacing them turned
       `var(--ui-header-height)` into `var(--ui - header - height)` */
    const vars = [];
    const masked = value.replace(/_/g, ' ')
      .replace(/var\([^()]*\)/g, (v) => { vars.push(v); return `\u0000${vars.length - 1}\u0000`; });
    (style || (style = {}))[prop] = masked
      /* Tailwind spaces calc() operators when it emits the rule; an inline
         value has to carry those spaces itself or calc() is invalid — and the
         operand may be a unit-suffixed number (100dvh-4rem) or a masked var */
      .replace(/([\d%)a-z\u0000])([+*/-])(?=[\d.(a-z\u0000])/g, '$1 $2 ')
      .replace(/\u0000(\d+)\u0000/g, (_, i) => vars[Number(i)]);
  };

  for (const token of cls.split(/\s+/).filter(Boolean)) {
    if (token === 'fixed' || /:fixed$/.test(token)) { out.push(token.replace(/fixed$/, 'absolute')); continue; }
    const m = SIZE_PREFIX.exec(token);
    if (!m) { out.push(token); continue; }
    const [, variant, prefix, rest] = m;

    /* named viewport units: h-svh, min-h-screen, max-h-dvh */
    if (/^(screen|svh|dvh|lvh|vh|vw)$/.test(rest)) {
      if (MIN.test(prefix)) {
        const unit = rest === 'vw' ? '100dvw' : '100dvh';
        out.push(`${variant ? variant + ':' : ''}${prefix}-[${unit}]`);
        if (!variant) inline(SIZE_PROP[prefix], unit);
        continue;
      }
      out.push(`${variant ? variant + ':' : ''}${prefix}-full`);
      if (!variant) inline(SIZE_PROP[prefix], '100%');
      continue;
    }
    /* arbitrary values holding a viewport unit: min-h-[calc(100vh-…)] */
    const arb = /^\[(.+)\]$/.exec(rest);
    if (arb && VIEWPORT.test(arb[1])) {
      const value = MIN.test(prefix) ? toFrameUnit(arb[1]) : toPercent(arb[1]);
      out.push(`${variant ? variant + ':' : ''}${prefix}-[${value}]`);
      /* a responsive variant cannot be expressed inline; the unprefixed class
         in the same list already sizes the element to the frame */
      if (!variant) inline(SIZE_PROP[prefix], value);
      continue;
    }
    out.push(token);
  }
  return [out.join(' '), style];
}
