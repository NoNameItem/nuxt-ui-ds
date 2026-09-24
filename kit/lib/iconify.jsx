/* Icons, drawn the way Nuxt UI draws them.

   The library names icons with Iconify collection syntax turned into a class
   (`i-lucide-check`) and resolves it through @iconify/tailwind4, which emits a
   `<span>` whose glyph is a CSS **mask** over `currentColor`. Rendering the
   `<iconify-icon>` web component instead looked equivalent — same artwork, same
   box — but rasterises differently: the element paints an inline SVG, the
   library paints a masked rectangle, and the two disagree on every antialiased
   edge. Eight pages went to a pixel-exact zero once the kit switched.

   The kit ships a fixed utility set with no `i-lucide-*` rules in it, so the
   mask has to be built here. The artwork still comes from Iconify: the web
   component is used once per icon name, off-screen, purely to obtain the SVG,
   which is then cached and reused as a mask. Pages load it as before:

   <script src="https://cdn.jsdelivr.net/npm/iconify-icon@3/dist/iconify-icon.min.js"></script> */
import React from 'react';

/** `i-lucide-chevron-down` -> `lucide:chevron-down` */
export function iconifyName(name) {
  if (!name) return null;
  if (name.includes(':')) return name;
  const m = /^i-([a-z0-9]+)-(.+)$/.exec(name);
  return m ? `${m[1]}:${m[2]}` : name;
}

/* Collection names are hyphenated too — `i-simple-icons-github` is
   `simple-icons:github`, not `simple:icons-github` — and nothing in the class
   says where the collection ends. So every split is a candidate, longest
   collection first, and the one the icon set actually resolves wins. */
export function iconCandidates(name) {
  if (!name) return [];
  if (name.includes(':')) return [name];
  const m = /^i-(.+)$/.exec(name);
  if (!m) return [name];
  const parts = m[1].split('-');
  const out = [];
  for (let i = parts.length - 1; i >= 1; i--) {
    out.push(parts.slice(0, i).join('-') + ':' + parts.slice(i).join('-'));
  }
  return out;
}

/* The `1em` fallback box lives in CSS, not here: the element this replaced was
   `1em` square intrinsically, so an icon with no `size-*` class still had a
   box. An inline width cannot be overridden by a utility class, and guessing
   which classes size an icon misses `sm:size-4` and `size-[18px]` — so
   `tokens/utilities-extra.css` carries a zero-specificity
   `:where([data-icon]) { width: 1em; height: 1em }`, which every real class
   outranks. */

/* one entry per icon name: the finished `mask-image` value, or a promise for it */
const masks = new Map();
/* which candidate id actually carried the artwork — reported as `data-icon` so
   a miss says which id was tried */
const resolved = new Map();
const pending = new Map();
let loader = null;

function loaderHost() {
  if (loader) return loader;
  loader = document.createElement('div');
  /* off-screen rather than `display: none`: a hidden custom element still
     upgrades, but keeping it laid out avoids any lazy-render path */
  loader.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none';
  document.body.appendChild(loader);
  return loader;
}

/* the mask the library emits: a 24-unit sprite, stroked black — the colour in a
   mask is irrelevant, `background-color: currentColor` does the painting */
function svgToMask(svg) {
  const el = svg.cloneNode(true);
  const box = el.getAttribute('viewBox') || '0 0 24 24';
  const side = box.split(/\s+/)[2] || '24';
  el.setAttribute('width', side);
  el.setAttribute('height', side);
  const markup = new XMLSerializer().serializeToString(el);
  return 'url("data:image/svg+xml,' + encodeURIComponent(markup).replace(/'/g, '%27').replace(/"/g, '%22') + '")';
}

function loadMask(icon, candidates) {
  if (masks.has(icon)) return Promise.resolve(masks.get(icon));
  if (pending.has(icon)) return pending.get(icon);
  const ids = candidates && candidates.length ? candidates : [icon];
  const promise = new Promise((resolve) => {
    if (typeof document === 'undefined' || !document.body) return resolve(null);
    /* every candidate is probed at once and the first that resolves artwork
       wins: a wrong collection simply never loads, so trying them in sequence
       would cost a timeout apiece */
    let answered = false;
    const probes = [];
    const cleanup = () => probes.forEach((p) => p.remove());
    const settleWith = (mask, winner) => {
      if (answered) return;
      answered = true;
      cleanup();
      if (mask) { masks.set(icon, mask); resolved.set(icon, winner); }
      resolve(mask);
    };
    ids.forEach((id) => probeOne(id, probes, settleWith));
    setTimeout(() => settleWith(null), 10000);
  }).then((mask) => { pending.delete(icon); return mask; });
  pending.set(icon, promise);
  return promise;
}

function probeOne(id, probes, settleWith) {
  const probe = document.createElement('iconify-icon');
  probe.setAttribute('icon', id);
  loaderHost().appendChild(probe);
  probes.push(probe);
  let settled = false;
  /* the component fills its shadow root asynchronously, and it may already be
     filled by the time we look — so: check now, on its own `load` event, and on
     any shadow mutation. A frame loop alone missed the fill and left every icon
     maskless. */
  const look = () => {
    if (settled) return true;
    const svg = probe.shadowRoot && probe.shadowRoot.querySelector('svg');
    if (!svg) return false;
    settled = true;
    if (observer) observer.disconnect();
    clearInterval(poll);
    settleWith(svgToMask(svg), id);
    return true;
  };
  let observer = null;
  probe.addEventListener('load', look);
  const poll = setInterval(() => { if (settled || look()) clearInterval(poll); }, 32);
  if (!look() && typeof MutationObserver !== 'undefined' && probe.shadowRoot) {
    observer = new MutationObserver(look);
    observer.observe(probe.shadowRoot, { childList: true, subtree: true });
  }
}

/* The mask lands in the element's STYLE OBJECT, through state: assigned by a
   ref callback it depended on that one node surviving, and any later render
   dropped it — every icon then showed its `currentColor` background as a solid
   block. Rendered from state, the value is part of the markup and survives. */
function IconSpan({ icon, candidates, className, slot }) {
  const [mask, setMask] = React.useState(() => masks.get(icon) || null);
  React.useEffect(() => {
    let live = true;
    if (masks.has(icon)) { setMask(masks.get(icon)); return () => { live = false; }; }
    loadMask(icon, candidates).then((m) => { if (live && m) setMask(m); });
    return () => { live = false; };
  }, [icon]);
  return React.createElement('span', {
    'data-slot': slot, 'data-icon': resolved.get(icon) || icon, className, 'aria-hidden': 'true',
    /* No `display` and no `flex-shrink` here: an inline style outranks every
       class, and the theme already says what the icon is — `auth-form`'s
       leading icon is `inline-block` (so `text-align: center` reaches it and
       the line keeps its height), `alert`'s is `block`. Both arrived as
       `block` and the auth header's icon jumped to the left edge. */
    style: {
      /* the paint is the mask's: with no mask the box stays transparent, so a
         miss is an absent glyph rather than a filled rectangle */
      ...(mask ? {
        backgroundColor: 'currentColor',
        maskImage: mask,
        WebkitMaskImage: mask,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: '0% 0%',
        WebkitMaskPosition: '0% 0%'
      } : null)
    }
  });
}

export function renderIcon(name, className, key, slot = 'icon') {
  const icon = iconifyName(name);
  if (!icon) return null;
  return React.createElement(IconSpan, { key, icon, candidates: iconCandidates(name), className, slot });
}
