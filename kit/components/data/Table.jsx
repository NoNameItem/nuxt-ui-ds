import React from 'react';
import { tvd, slotStyle, domRest } from '../../lib/tv.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/table.ts (source/themes.json -> "table").
   Values are literal: no rounding, no cross-component alignment. */
export const tableTheme = {
  "slots": {
    "root": "relative overflow-auto outline-primary/25 focus-visible:outline-3",
    "base": "min-w-full overflow-clip",
    "caption": "sr-only",
    "thead": "relative",
    "tbody": "isolate [&>tr]:data-[selectable=true]:hover:bg-elevated/50 [&>tr]:data-[selectable=true]:outline-primary/25 [&>tr]:data-[selectable=true]:focus-visible:outline-3 divide-y divide-default",
    "tfoot": "relative",
    "tr": "data-[selected=true]:bg-elevated/50",
    "th": "px-4 py-3.5 text-sm text-highlighted text-start font-semibold [&:has([role=checkbox])]:pe-0",
    "td": "p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0",
    "separator": "absolute z-1 start-0 w-full h-px bg-(--ui-border-accented)",
    "empty": "py-6 text-center text-sm text-muted",
    "loading": "py-6 text-center"
  },
  "variants": {
    "pinned": {
      "true": {
        "th": "sticky bg-default/75 z-1",
        "td": "sticky bg-default/75 z-1"
      }
    },
    "sticky": {
      "true": {
        "thead": "sticky top-0 inset-x-0 bg-default/75 backdrop-blur-sm z-1",
        "tfoot": "sticky bottom-0 inset-x-0 bg-default/75 backdrop-blur-sm z-1"
      },
      "header": {
        "thead": "sticky top-0 inset-x-0 bg-default/75 backdrop-blur-sm z-1"
      },
      "footer": {
        "tfoot": "sticky bottom-0 inset-x-0 bg-default/75 backdrop-blur-sm z-1"
      }
    },
    "loading": {
      "true": {
        "thead": "after:absolute after:z-1 after:h-px motion-reduce:after:inset-x-0 motion-reduce:after:animate-pulse"
      }
    },
    "externalScroll": {
      "true": {
        "root": "overflow-visible"
      }
    },
    "loadingAnimation": {
      "carousel": "",
      "carousel-inverse": "",
      "swing": "",
      "elastic": ""
    },
    "loadingColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    }
  },
  "compoundVariants": [
    {
      "loading": true,
      "loadingColor": "primary",
      "class": {
        "thead": "after:bg-primary"
      }
    },
    {
      "loading": true,
      "loadingColor": "secondary",
      "class": {
        "thead": "after:bg-secondary"
      }
    },
    {
      "loading": true,
      "loadingColor": "success",
      "class": {
        "thead": "after:bg-success"
      }
    },
    {
      "loading": true,
      "loadingColor": "info",
      "class": {
        "thead": "after:bg-info"
      }
    },
    {
      "loading": true,
      "loadingColor": "warning",
      "class": {
        "thead": "after:bg-warning"
      }
    },
    {
      "loading": true,
      "loadingColor": "error",
      "class": {
        "thead": "after:bg-error"
      }
    },
    {
      "loading": true,
      "loadingColor": "neutral",
      "class": {
        "thead": "after:bg-inverted"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "carousel",
      "class": {
        "thead": "motion-safe:after:animate-[carousel_2s_linear_infinite] motion-safe:rtl:after:animate-[carousel-rtl_2s_linear_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "carousel-inverse",
      "class": {
        "thead": "motion-safe:after:animate-[carousel-inverse_2s_linear_infinite] motion-safe:rtl:after:animate-[carousel-inverse-rtl_2s_linear_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "swing",
      "class": {
        "thead": "motion-safe:after:animate-[swing_2s_var(--ease-in-out)_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "elastic",
      "class": {
        "thead": "motion-safe:after:animate-[elastic_2s_var(--ease-in-out)_infinite]"
      }
    }
  ],
  "defaultVariants": {
    "loadingColor": "primary",
    "loadingAnimation": "carousel"
  }
};

/* Table.vue is a wrapper around TanStack Table: the column model, header
   renderers and row cells are all computed at runtime, so nothing of the grid
   survives in the extracted DOM. This is the same markup, static: columns from
   `columns` (or the keys of the first row), one <tr> per row of `data`, and the
   empty / loading rows the SFC renders in their place. Every class comes from
   the table theme's slots. */
const resolve = tvd('table', tableTheme);
const upperFirst = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);

/* TanStack column groups: a column may hold nested `columns`, and only the leaf
   columns get a <td>. Rendering just the top level produced half the cells on a
   table whose columns were grouped in pairs. */
function flattenColumns(cols) {
  const out = [];
  for (const c of cols || []) {
    if (c && Array.isArray(c.columns) && c.columns.length) out.push(...flattenColumns(c.columns));
    else if (c) out.push(c);
  }
  return out;
}

export function Table(props) {  /* Table.vue:71 names the rows `data`, and the docs' examples pass `items` —
     reading only one of them left the body empty and the table showing its
     loading row instead of six rows of cells */
  const { data, items, columns, caption, empty, loading = false, ui: uiProp = {}, class: className, className: classNameAlt, active: _active, selected: _selected, ...rest } = props;
  const rows = data || items || [];
  /* only a real `true` is loading: a documented prop rendered as the string
     "false" is still a string, and every table on the page drew a loading row */
  const isLoading = loading === true || loading === 'true';
  const ui = resolve({ ...props, loading: isLoading });
  const cols = flattenColumns(columns || Object.keys(rows[0] || {}).map((k) => ({ accessorKey: k })))
    .map((c) => ({ key: c.accessorKey ?? c.id, header: typeof c.header === 'string' ? c.header : upperFirst(c.accessorKey ?? c.id), footer: c.footer, footerText: typeof c.footer === 'string' ? c.footer : '' }));
  const hasFooter = cols.some((c) => c.footer !== undefined && c.footer !== null && c.footer !== false);

  return (
    <div {...slotStyle(ui.root(uiProp.root, className || classNameAlt))} data-ds-component="Table" data-slot="root" {...domRest(rest, tableTheme)}>
      <table {...slotStyle(ui.base(uiProp.base))} data-slot="base">
        {caption ? <caption {...slotStyle(ui.caption(uiProp.caption))} data-slot="caption">{caption}</caption> : null}
        {/* the head has no v-if at all in Table.vue — a table with no columns
            still ships its thead and the separator row under it */}
        <thead {...slotStyle(ui.thead(uiProp.thead))} data-slot="thead">
          {cols.length ? (
            <tr {...slotStyle(ui.tr(uiProp.tr))} data-slot="tr">
              {cols.map((c) => <th key={c.key} {...slotStyle(ui.th(uiProp.th))} data-slot="th" scope="col">{c.header}</th>)}
            </tr>
          ) : null}
          <tr {...slotStyle(ui.separator(uiProp.separator))} data-slot="separator"></tr>
        </thead>
        <tbody {...slotStyle(ui.tbody(uiProp.tbody))} data-slot="tbody">
          {rows.length ? rows.map((row, i) => (
            <tr key={i} {...slotStyle(ui.tr(uiProp.tr))} data-slot="tr" data-selected={row.selected ? 'true' : undefined}>
              {cols.map((c) => <td key={c.key} {...slotStyle(ui.td(uiProp.td))} data-slot="td">{row[c.key]}</td>)}
            </tr>
          )) : (
            <tr {...slotStyle(ui.tr(uiProp.tr))} data-slot="tr">
              <td {...slotStyle(ui.empty(uiProp.empty))} data-slot="empty" colSpan={cols.length}>{empty || 'No data'}</td>
            </tr>
          )}
        </tbody>
        {/* the foot opens with its own separator row, and its cells are <th>
            like the header's — they come from TanStack's footer groups */}
        {hasFooter ? (
          <tfoot {...slotStyle(ui.tfoot(uiProp.tfoot))} data-slot="tfoot">
            <tr {...slotStyle(ui.separator(uiProp.separator))} data-slot="separator"></tr>
            <tr {...slotStyle(ui.tr(uiProp.tr))} data-slot="tr">
              {cols.map((c) => <th key={c.key} {...slotStyle(ui.th(uiProp.th))} data-slot="th">{c.footerText}</th>)}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}
