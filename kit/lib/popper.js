/* reka's PopperContent placement (floating-ui offset -> flip -> shift), shared by
   DropdownMenu, Tooltip and Popover. `side` top|right|bottom|left, `align`
   start|center|end (reka default "center"), `sideOffset`, `alignOffset`; the
   boundary is the window minus `collisionPadding`. Flip swaps to the opposite
   side when the preferred one overflows and the opposite overflows less; shift
   clamps the cross axis inside the boundary. The reported align is the
   requested one (shift does not change floating-ui's placement). */
const OPPOSITE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
export const roundByDPR = (v) => { const d = (typeof window !== 'undefined' && window.devicePixelRatio) || 1; return Math.round(v * d) / d; };

/** A plain options object — not a React element, string, array or null. */
export function isPlainObject(v) {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  if (v.$$typeof) return false;
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
}

export function placeFloating(t, w, h, opts) {
  const { side: preferSide = 'bottom', align = 'center', sideOffset = 0, alignOffset = 0, collisionPadding = 0 } = opts;
  const vw = document.documentElement.clientWidth, vh = window.innerHeight;
  const cp = collisionPadding;
  const mainFor = (s) => (s === 'bottom' ? t.bottom + sideOffset : s === 'top' ? t.top - sideOffset - h : s === 'right' ? t.right + sideOffset : t.left - sideOffset - w);
  const overflow = (s) => {
    const m = mainFor(s);
    if (s === 'bottom') return m + h - (vh - cp);
    if (s === 'top') return cp - m;
    if (s === 'right') return m + w - (vw - cp);
    return cp - m;
  };
  let side = OPPOSITE[preferSide] ? preferSide : 'bottom';
  const over = overflow(side);
  if (over > 0) {
    const opp = OPPOSITE[side];
    const overOpp = overflow(opp);
    if (overOpp <= 0 || overOpp < over) side = opp;
  }
  const vertical = side === 'top' || side === 'bottom';
  let x, y;
  if (vertical) {
    y = mainFor(side);
    x = align === 'start' ? t.left + alignOffset : align === 'end' ? t.right - w - alignOffset : t.left + t.width / 2 - w / 2;
    x = Math.max(cp, Math.min(x, vw - cp - w));
  } else {
    x = mainFor(side);
    y = align === 'start' ? t.top + alignOffset : align === 'end' ? t.bottom - h - alignOffset : t.top + t.height / 2 - h / 2;
    y = Math.max(cp, Math.min(y, vh - cp - h));
  }
  return { x: roundByDPR(x), y: roundByDPR(y), rawX: x, rawY: y, side, align: align === 'start' || align === 'end' ? align : 'center' };
}

/* @floating-ui/core arrow middleware: centred on the content, shifted by half
   the overhang on each side, clamped inside the content. Returns the cross-axis
   offset of the arrow (left for top/bottom, top for left/right). */
export function arrowOffset(t, p, w, h, el, arrowW) {
  if (!arrowW || !el) return null;
  if (p.side === 'top' || p.side === 'bottom') {
    const cw = el.clientWidth;
    const startDiff = p.rawX - t.left;
    const endDiff = t.left + t.width - p.rawX - w;
    return Math.max(0, Math.min(cw - arrowW, cw / 2 - arrowW / 2 + (endDiff / 2 - startDiff / 2)));
  }
  const ch = el.clientHeight;
  const startDiff = p.rawY - t.top;
  const endDiff = t.top + t.height - p.rawY - h;
  return Math.max(0, Math.min(ch - arrowW, ch / 2 - arrowW / 2 + (endDiff / 2 - startDiff / 2)));
}

/* reka's PopperArrow wrapper span: pinned to the content edge facing the
   trigger, rotated to point at it. */
export function arrowSpanStyle(side, offset) {
  const base = OPPOSITE[side] || 'top';
  const vertical = side === 'top' || side === 'bottom';
  const style = { position: 'absolute', [vertical ? 'left' : 'top']: offset + 'px', [base]: '0px' };
  style.transformOrigin = { top: '', right: '0 0', bottom: 'center 0', left: '100% 0' }[side];
  style.transform = { top: 'translateY(100%)', right: 'translateY(50%) rotate(90deg) translateX(-50%)', bottom: 'rotate(180deg)', left: 'translateY(50%) rotate(-90deg) translateX(50%)' }[side];
  return style;
}

/* the kit's props → the three components' `content` options, with the library's
   defu defaults (side "bottom", sideOffset 8, collisionPadding 8, align center) */
export function contentOptions(props, content) {
  const cp = isPlainObject(content) ? content : {};
  return {
    side: cp.side || 'bottom',
    align: cp.align || 'center',
    sideOffset: cp.sideOffset ?? props.sideOffset ?? 8,
    alignOffset: cp.alignOffset ?? props.alignOffset ?? 0,
    collisionPadding: cp.collisionPadding ?? props.collisionPadding ?? 8
  };
}
