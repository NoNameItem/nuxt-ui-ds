/* Nuxt UI theme resolver — a faithful, dependency-free port of the parts of
   `tailwind-variants` (tv) that the Nuxt UI 4.11.1 themes rely on:
   slots, variants, compoundVariants, defaultVariants, plus a light
   tailwind-merge so `class` / `ui` overrides win over theme defaults.

   Theme objects are copied verbatim out of the library's themes/<name>.ts
   (shipped here as source/themes.json). Nothing is recomputed or rounded. */

import { propDefaults } from './defaults.js';
import { readVariant, hasRead, OMIT } from './reads.js';

const flat = (c) => (Array.isArray(c) ? c.flat(9) : [c]).filter(Boolean).join(' ').split(/\s+/).filter(Boolean);

/* --- light tailwind-merge ------------------------------------------------ */
const SIZES = new Set(['xs','sm','base','md','lg','xl','2xl','3xl','4xl','5xl','6xl','7xl','8xl','9xl']);
const PREFIXES = ['ring-offset-','ring-inset','ring-','inset-x-','inset-y-','inset-','border-x-','border-y-','border-t-','border-r-','border-b-','border-l-','border-s-','border-e-','border-','rounded-t-','rounded-b-','rounded-l-','rounded-r-','rounded-tl-','rounded-tr-','rounded-bl-','rounded-br-','rounded-','bg-','text-','font-','leading-','tracking-','px-','py-','pt-','pr-','pb-','pl-','ps-','pe-','p-','mx-','my-','mt-','mr-','mb-','ml-','ms-','me-','m-','gap-x-','gap-y-','gap-','space-x-','space-y-','min-w-','max-w-','min-h-','max-h-','size-','w-','h-','shadow-','opacity-','divide-x-','divide-y-','divide-','outline-','fill-','stroke-','translate-x-','translate-y-','scale-','rotate-','duration-','delay-','ease-','transition-','overflow-x-','overflow-y-','overflow-','cursor-','justify-','items-','self-','content-','flex-','grid-flow-','grid-cols-','grid-rows-','col-span-','row-span-','order-','shrink-','grow-','basis-','aspect-','z-','top-','right-','bottom-','left-','start-','end-','origin-','pointer-events-','whitespace-','break-','line-clamp-','columns-','place-'];
const WORDS = { block:'display', 'inline-block':'display', 'inline-flex':'display', flex:'display', 'inline-grid':'display', grid:'display', contents:'display', hidden:'display', table:'display', absolute:'position', relative:'position', fixed:'position', sticky:'position', static:'position', truncate:'truncate', italic:'font-style', 'not-italic':'font-style', underline:'decoration', 'line-through':'decoration', 'no-underline':'decoration', uppercase:'case', lowercase:'case', capitalize:'case', 'normal-case':'case', shrink:'shrink-', grow:'grow-' };

const WIDTHY = ['ring-', 'border-x-', 'border-y-', 'border-t-', 'border-r-', 'border-b-', 'border-l-', 'border-s-', 'border-e-', 'border-', 'divide-x-', 'divide-y-', 'divide-', 'outline-'];
/* utilities whose prefix collides with a colour group but whose property is
   something else entirely — checked before the prefix table below */
const EXACT = [
  [/^text-(left|center|right|justify|start|end)$/, 'text-align'],
  [/^text-(wrap|nowrap|balance|pretty)$/, 'text-wrap'],
  [/^text-(ellipsis|clip)$/, 'text-overflow'],
  [/^text-(\[|\()/, 'font-size-arb'],
  [/^flex-(row|col)(-reverse)?$/, 'flex-direction'],
  [/^flex-(wrap|nowrap|wrap-reverse)$/, 'flex-wrap'],
  [/^outline-(solid|dashed|dotted|double|none|hidden)$/, 'outline-style'],
  [/^outline-offset-/, 'outline-offset'],
  /* a line-style keyword sets border-style, not border-width: `border-dashed`
     must not evict the `border` that gives the edge its width */
  [/^border-(solid|dashed|dotted|double|hidden|none)$/, 'border-style'],
  [/^border-[xytrbsle]-(solid|dashed|dotted|double|hidden|none)$/, 'border-style'],
  [/^divide-(solid|dashed|dotted|double|hidden|none)$/, 'divide-style'],
  [/^border-(collapse|separate)$/, 'border-collapse'],
  [/^border-spacing(-|$)/, 'border-spacing'],
  [/^bg-clip-/, 'bg-clip'],
  [/^bg-origin-/, 'bg-origin'],
  [/^bg-(repeat|no-repeat|repeat-x|repeat-y|repeat-round|repeat-space)$/, 'bg-repeat'],
  [/^bg-(size-|cover$|contain$|auto$)/, 'bg-size'],
  [/^bg-(position-|center$|top$|bottom$|left$|right$|top-left$|top-right$|bottom-left$|bottom-right$)/, 'bg-position'],
  [/^bg-(fixed|local|scroll)$/, 'bg-attachment'],
  [/^bg-(none|linear-|radial|radial-|conic-)/, 'bg-image'],
  [/^font-(sans|serif|mono)$/, 'font-family'],
  [/^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/, 'font-weight'],
  [/^font-(\[|\()/, 'font-family']
];
/* a later class in the key group clears these groups set earlier (p-2 beats px-3) */
const CLEARS = {
  'p-': ['px-', 'py-', 'pt-', 'pr-', 'pb-', 'pl-', 'ps-', 'pe-'],
  'px-': ['pl-', 'pr-', 'ps-', 'pe-'], 'py-': ['pt-', 'pb-'],
  'm-': ['mx-', 'my-', 'mt-', 'mr-', 'mb-', 'ml-', 'ms-', 'me-'],
  'mx-': ['ml-', 'mr-', 'ms-', 'me-'], 'my-': ['mt-', 'mb-'],
  'size-': ['w-', 'h-'], 'gap-': ['gap-x-', 'gap-y-'],
  'rounded-': ['rounded-t-', 'rounded-b-', 'rounded-l-', 'rounded-r-', 'rounded-tl-', 'rounded-tr-', 'rounded-bl-', 'rounded-br-'],
  'inset-': ['inset-x-', 'inset-y-', 'top-', 'right-', 'bottom-', 'left-', 'start-', 'end-'],  'inset-x-': ['left-', 'right-', 'start-', 'end-'], 'inset-y-': ['top-', 'bottom-'],
  'overflow-': ['overflow-x-', 'overflow-y-'],
  /* keys here must be exactly what group() returns — WIDTHY prefixes carry a
     |w (width) or |c (colour) suffix, so a key without it never matches and
     the entry is silently dead */
  'border-|w': ['border-x-|w', 'border-y-|w', 'border-t-|w', 'border-r-|w', 'border-b-|w', 'border-l-|w', 'border-s-|w', 'border-e-|w'],
  'border-x-|w': ['border-l-|w', 'border-r-|w', 'border-s-|w', 'border-e-|w'],
  'border-y-|w': ['border-t-|w', 'border-b-|w'],
  'divide-|w': ['divide-x-|w', 'divide-y-|w'],
  'ring-|w': [],
  /* the `flex` shorthand resets flex-grow / flex-shrink / flex-basis, so
     `flex-1` evicts a `shrink-0` that came before it */
  'flex-': ['shrink-', 'grow-', 'basis-']
};

function group(token) {
  // split off variant prefixes (hover:, dark:, data-[..]:, [&_p]: …) — they are part of the group key
  const parts = []; let depth = 0, cur = '';
  for (const ch of token) {
    if (ch === '[') depth++; else if (ch === ']') depth--;
    if (ch === ':' && depth === 0) { parts.push(cur); cur = ''; } else cur += ch;
  }
  const base = cur, variant = parts.join(':');
  const bare = base.replace(/^-/, '').split('/')[0];
  if (WORDS[bare]) return variant + '|' + WORDS[bare];
  for (const [re, key] of EXACT) if (re.test(bare)) return variant + '|' + (key === 'font-size-arb' ? 'font-size' : key);
  if (bare.startsWith('text-')) return variant + '|' + (SIZES.has(bare.slice(5)) ? 'font-size' : 'text-color');
  for (const p of PREFIXES) {
    if (bare.startsWith(p) || bare === p.replace(/-$/, '')) {
      if (WIDTHY.includes(p)) {
        const rest = bare === p.replace(/-$/, '') ? '' : bare.slice(p.length);
        /* width: bare (`border`, `border-t`), a number, `px`, or an arbitrary
           length (`border-s-[2px]`). Everything else on a WIDTHY prefix is a
           colour — style keywords never get here, EXACT claimed them above. */
        const isWidth = rest === '' || /^\d+$/.test(rest) || rest === 'px'
          || /^\[[\d.]+(px|r?em|pt|%|vw|vh)\]$/.test(rest) || /^\(length:/.test(rest);
        return variant + '|' + p + (isWidth ? '|w' : '|c');
      }
      return variant + '|' + p;
    }
  }
  return variant + '|' + bare;
}

function clearedBy(g) {
  const i = g.indexOf('|');
  const variant = g.slice(0, i + 1), key = g.slice(i + 1);
  return (CLEARS[key] || []).map((k) => variant + k);
}

/** Last-wins merge of utility classes that target the same property group. */
export function twMerge(classes) {
  const list = flat(classes);
  const out = [];
  for (const c of list) {
    const g = group(c);
    const kill = new Set([g, ...clearedBy(g)]);
    for (let i = out.length - 1; i >= 0; i--) if (kill.has(out[i].g)) out.splice(i, 1);
    out.push({ c, g });
  }
  return out.map((o) => o.c).join(' ');
}

/** Tailwind arbitrary-property utilities (`[--gap:--spacing(16)]`) set a custom
    property on the element. They are applied as inline custom properties here
    instead of as generated class rules, so the stylesheet holds no design-token
    declarations under utility selectors. Returns [className, styleObject]. */
export function extractVarClasses(cls) {
  if (!cls || !cls.includes('[--')) return [cls, null];
  const keep = []; let style = null;
  for (const token of cls.split(/\s+/)) {
    const m = /^\[--([a-z0-9-]+):(.+)\]$/i.exec(token);
    if (!m) { keep.push(token); continue; }
    let value = m[2].replace(/_/g, ' ');
    const sp = /^--spacing\((\d+(?:\.\d+)?)\)$/.exec(value);
    if (sp) value = `calc(var(--spacing) * ${sp[1]})`;
    (style || (style = {}))['--' + m[1]] = value;
  }
  return [keep.join(' '), style];
}

/** Arbitrary-property utilities (`[--gap:--spacing(16)]`) set a custom property
    on the element, so they cannot be CSS classes. `slotStyle` is what a
    hand-written component uses wherever it sets a slot class: it returns the
    props to spread, with the class stripped of those tokens and the custom
    properties moved into `style`. The generic renderer does this itself; a
    component that calls `ui.root(...)` straight into `className` would leave
    `--gap` and `--duration` unset and the utilities reading them invalid. */
export function slotStyle(cls, extra) {
  const [className, style] = extractVarClasses(cls);
  const out = { className };
  if (style || (extra && extra.style)) out.style = { ...(style || {}), ...((extra && extra.style) || {}) };
  return out;
}

/* A hand-written component spreads what it did not destructure onto its root
   node. The library never turns a declared prop into an attribute: the theme's
   variant keys (color, variant, size, orientation, highlight, required, …) and
   any other declared prop listed in `declared` are dropped; id, data-*, aria-*,
   handlers and everything else pass through as before. */
export function domRest(rest, theme, declared = []) {
  const variants = (theme && theme.variants) || {};
  const out = {};
  for (const k of Object.keys(rest)) {
    if (k in variants || declared.includes(k)) continue;
    out[k] = rest[k];
  }
  return out;
}

/* --- variant resolution -------------------------------------------------- */

/* A variant key's default can live in three places: the theme's own
   defaultVariants, the SFC's defineProps (Separator's `orientation`, Input's
   `type`, Button's `block`), or nowhere. `tvd` folds the defineProps layer in
   so a component resolves the same classes the library does when no prop is
   passed — always prefer it over bare `tv` in a component. */
export function tvd(themeName, theme) {
  const resolve = tv(theme);
  const defaults = propDefaults(themeName);
  return (given = {}) => {
    const merged = { ...defaults };
    for (const [k, v] of Object.entries(given)) if (v !== undefined) merged[k] = v;
    return resolve(merged);
  };
}

/* `tvr` is `tvd` plus the READS table: each variant key is read the way the
   library's own component reads it (see lib/reads.js) before it reaches tv(). */
export function tvr(themeName, theme) {
  const resolve = tv(theme);
  const defaults = propDefaults(themeName);
  const keys = Object.keys(theme.variants || {});
  return (props = {}, computed = {}) => {
    const merged = { ...defaults };
    for (const [k, val] of Object.entries(props)) if (val !== undefined) merged[k] = val;
    const out = { ...merged };
    for (const k of keys) {
      if (!hasRead(themeName, k)) continue;
      const val = readVariant(themeName, k, merged, computed);
      if (val === OMIT) delete out[k];
      else out[k] = val;
    }
    return resolve(out);
  };
}

export function tv(theme) {  const slots = theme.slots || {};
  const slotNames = Object.keys(slots);
  /* tailwind-variants sends a *string* variant/compoundVariant class to the
     `base` slot when the theme has slots (progress's `h-2` belongs on
     data-slot="base", input's `ps-9` on the input itself) — never to `root`. */
  const primary = slotNames.includes('base') ? 'base' : (slotNames[0] || 'base');

  return (given = {}) => {
    const v = { ...(theme.defaultVariants || {}) };
    for (const k of Object.keys(theme.variants || {})) {
      if (given[k] !== undefined && given[k] !== null) v[k] = given[k];
    }
    const acc = {};
    const push = (slot, cls) => { if (!cls) return; (acc[slot] || (acc[slot] = [])).push(...flat(cls)); };

    if (theme.base) push(primary, theme.base);
    for (const [s, c] of Object.entries(slots)) push(s, c);

    for (const [name, opts] of Object.entries(theme.variants || {})) {
      const val = v[name];
      /* tailwind-variants resolves a missing boolean variant through its "false"
         branch — t({}) and t({size: false}) return the same classes. Skipping
         the key instead loses the classes a variant's false branch carries. */
      const chosen = (val === undefined || val === null) ? opts.false : opts[String(val)];
      if (!chosen) continue;
      if (typeof chosen === 'string' || Array.isArray(chosen)) push(primary, chosen);
      else for (const [s, c] of Object.entries(chosen)) push(s, c);
    }

    for (const cv of theme.compoundVariants || []) {
      let ok = true;
      for (const [k, expected] of Object.entries(cv)) {
        if (k === 'class') continue;
        const actual = v[k] === undefined || v[k] === null ? false : v[k];
        const match = Array.isArray(expected)
          ? expected.map(String).includes(String(actual))
          : String(expected) === String(actual);
        if (!match) { ok = false; break; }
      }
      if (!ok) continue;
      const cls = cv.class;
      if (typeof cls === 'string' || Array.isArray(cls)) push(primary, cls);
      else for (const [s, c] of Object.entries(cls || {})) push(s, c);
    }

    const api = {};
    for (const s of (slotNames.length ? slotNames : [primary])) {
      api[s] = (...extra) => twMerge([...(acc[s] || []), ...extra]);
    }
    api.$primary = primary;
    api.$variants = v;
    api.$slot = (s, ...extra) => (api[s] ? api[s](...extra) : twMerge(extra));
    return api;
  };
}
