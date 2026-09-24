import React from 'react';
import { tvd, slotStyle } from '../../lib/tv.js';
import { ICONS } from '../../lib/icons.js';
import { Button } from '../core/Button.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/pagination.ts (source/themes.json -> "pagination").
   Values are literal: no rounding, no cross-component alignment. */
export const paginationTheme = {
  "slots": {
    "root": "",
    "list": "flex items-center gap-1",
    "ellipsis": "pointer-events-none",
    "label": "min-w-5 text-center",
    "first": "",
    "prev": "",
    "item": "",
    "next": "",
    "last": ""
  }
};

const resolve = tvd('pagination', paginationTheme);

/* reka-ui 2.10.4 Pagination/utils.js getRange — the page list PaginationRoot
   computes. showEdges picks the branch; it never adds buttons. */
function seq(from, to) { const out = []; for (let i = from; i <= to; i++) out.push(i); return out; }
function pageRange(page, pageCount, siblingCount, showEdges) {
  const left = Math.max(page - siblingCount, 1);
  const right = Math.min(page + siblingCount, pageCount);
  if (showEdges) {
    const total = Math.min(2 * siblingCount + 5, pageCount);
    const n = total - 2;
    const L = left > 3 && Math.abs(pageCount - n) > 2 && Math.abs(left - 1) > 2;
    const R = right < pageCount - 2 && Math.abs(pageCount - n) > 2 && Math.abs(pageCount - right) > 2;
    if (!L && R) return [...seq(1, n), 'ellipsis', pageCount];
    if (L && !R) return [1, 'ellipsis', ...seq(pageCount - n + 1, pageCount)];
    if (L && R) return [1, 'ellipsis', ...seq(left, right), 'ellipsis', pageCount];
    return seq(1, pageCount);
  }
  const n = 2 * siblingCount + 1;
  if (pageCount < n) return seq(1, pageCount);
  if (page <= siblingCount + 1) return seq(1, n);
  if (pageCount - page <= siblingCount) return seq(pageCount - n + 1, pageCount);
  return seq(left, right);
}

export function Pagination(props) {
  const {
    page = 1, total = 0, itemsPerPage = 10, siblingCount = 2, showEdges = false, showControls = true,
    color = 'neutral', variant = 'outline', activeColor = 'primary', activeVariant = 'solid', size,
    ui: uiProp = {}, class: className, className: classNameAlt, ...rest
  } = props;
  const ui = resolve({});
  const pageCount = Math.max(1, Math.ceil(total / itemsPerPage));
  const pages = pageRange(page, pageCount, siblingCount, showEdges);
  const btn = { size, square: true };

  const ctrl = (slot, icon, disabled) => (
    <Button key={slot} {...btn} color={color} variant={variant} icon={icon} disabled={disabled}
      {...slotStyle(ui.$slot(slot, uiProp[slot]))} data-slot={slot} aria-label={slot} />
  );

  return (
    <nav {...slotStyle(ui.root(uiProp.root, className || classNameAlt))} data-ds-component="Pagination" data-slot="root" aria-label="pagination" {...rest}>
      <div {...slotStyle(ui.list(uiProp.list))} data-slot="list">
        {showControls ? ctrl('first', ICONS.chevronDoubleLeft, page <= 1) : null}
        {showControls ? ctrl('prev', ICONS.chevronLeft, page <= 1) : null}
        {pages.map((p, i) => p === 'ellipsis'
          ? <Button key={'e' + i} {...btn} color={color} variant={variant} icon={ICONS.ellipsis}
              {...slotStyle(ui.$slot('ellipsis', uiProp.ellipsis))} data-slot="ellipsis" aria-hidden="true" />
          : <Button key={p} {...btn} color={p === page ? activeColor : color} variant={p === page ? activeVariant : variant}
              label={String(p)} ui={{ label: ui.label(uiProp.label) }} {...slotStyle(ui.$slot('item', uiProp.item))} data-slot="item"
              aria-current={p === page ? 'page' : undefined} />)}
        {showControls ? ctrl('next', ICONS.chevronRight, page >= pageCount) : null}
        {showControls ? ctrl('last', ICONS.chevronDoubleRight, page >= pageCount) : null}
      </div>
    </nav>
  );
}
