import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { ICONS } from '../../lib/icons.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/file-upload.ts (source/themes.json -> "file-upload").
   Values are literal: no rounding, no cross-component alignment. */
export const fileUploadTheme = {
  "slots": {
    "root": "relative flex flex-col",
    "base": [
      "w-full flex-1 bg-default border border-default flex flex-col gap-2 items-stretch justify-center rounded-lg focus-visible:outline-3",
      "transition-[background] ease-out"
    ],
    "wrapper": "flex flex-col items-center justify-center text-center",
    "icon": "shrink-0",
    "avatar": "shrink-0",
    "label": "font-medium text-default mt-2",
    "description": "text-muted mt-1",
    "actions": "flex flex-wrap gap-1.5 shrink-0 mt-4",
    "files": "",
    "file": "relative",
    "fileLeadingAvatar": "shrink-0",
    "fileWrapper": "flex flex-col min-w-0",
    "fileName": "text-default truncate",
    "fileSize": "text-muted truncate",
    "fileTrailingButton": ""
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "area": {
        "wrapper": "px-4 py-3",
        "base": "p-4"
      },
      "button": {}
    },
    "size": {
      "xs": {
        "base": "text-xs",
        "icon": "size-4",
        "file": "text-xs px-2 py-1 gap-1",
        "fileWrapper": "flex-row gap-1"
      },
      "sm": {
        "base": "text-xs",
        "icon": "size-4",
        "file": "text-xs px-2.5 py-1.5 gap-1.5",
        "fileWrapper": "flex-row gap-1"
      },
      "md": {
        "base": "text-sm",
        "icon": "size-5",
        "file": "text-xs px-2.5 py-1.5 gap-1.5"
      },
      "lg": {
        "base": "text-sm",
        "icon": "size-5",
        "file": "text-sm px-3 py-2 gap-2",
        "fileSize": "text-xs"
      },
      "xl": {
        "base": "text-base",
        "icon": "size-6",
        "file": "text-sm px-3 py-2 gap-2"
      }
    },
    "layout": {
      "list": {
        "root": "gap-2 items-start",
        "files": "flex flex-col w-full gap-2",
        "file": "min-w-0 flex items-center border border-default rounded-md w-full",
        "fileTrailingButton": "ms-auto"
      },
      "grid": {
        "fileWrapper": "hidden",
        "fileLeadingAvatar": "size-full rounded-lg",
        "fileTrailingButton": "absolute -top-1.5 -end-1.5 p-0 rounded-full border-2 border-bg"
      }
    },
    "position": {
      "inside": "",
      "outside": ""
    },
    "dropzone": {
      "true": "border-dashed data-[dragging=true]:bg-elevated/25"
    },
    "interactive": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "multiple": {
      "true": ""
    },
    "disabled": {
      "true": "cursor-not-allowed opacity-75"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "class": "outline-primary/25 focus-visible:outline-3 focus-visible:border-primary"
    },
    {
      "color": "secondary",
      "class": "outline-secondary/25 focus-visible:outline-3 focus-visible:border-secondary"
    },
    {
      "color": "success",
      "class": "outline-success/25 focus-visible:outline-3 focus-visible:border-success"
    },
    {
      "color": "info",
      "class": "outline-info/25 focus-visible:outline-3 focus-visible:border-info"
    },
    {
      "color": "warning",
      "class": "outline-warning/25 focus-visible:outline-3 focus-visible:border-warning"
    },
    {
      "color": "error",
      "class": "outline-error/25 focus-visible:outline-3 focus-visible:border-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "border-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "border-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "border-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "border-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "border-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "border-error"
    },
    {
      "color": "neutral",
      "class": "outline-inverted/25 focus-visible:outline-3 focus-visible:border-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "border-inverted"
    },
    {
      "size": "xs",
      "layout": "list",
      "class": {
        "fileTrailingButton": "-me-1"
      }
    },
    {
      "size": "sm",
      "layout": "list",
      "class": {
        "fileTrailingButton": "-me-1.5"
      }
    },
    {
      "size": "md",
      "layout": "list",
      "class": {
        "fileTrailingButton": "-me-1.5"
      }
    },
    {
      "size": "lg",
      "layout": "list",
      "class": {
        "fileTrailingButton": "-me-2"
      }
    },
    {
      "size": "xl",
      "layout": "list",
      "class": {
        "fileTrailingButton": "-me-2"
      }
    },
    {
      "variant": "button",
      "size": "xs",
      "class": {
        "base": "p-1"
      }
    },
    {
      "variant": "button",
      "size": "sm",
      "class": {
        "base": "p-1.5"
      }
    },
    {
      "variant": "button",
      "size": "md",
      "class": {
        "base": "p-1.5"
      }
    },
    {
      "variant": "button",
      "size": "lg",
      "class": {
        "base": "p-2"
      }
    },
    {
      "variant": "button",
      "size": "xl",
      "class": {
        "base": "p-2"
      }
    },
    {
      "layout": "grid",
      "multiple": true,
      "class": {
        "files": "grid grid-cols-2 md:grid-cols-3 gap-4 w-full",
        "file": "p-0 aspect-square"
      }
    },
    {
      "layout": "grid",
      "multiple": false,
      "class": {
        "file": "absolute inset-0 p-0"
      }
    },
    {
      "interactive": true,
      "disabled": false,
      "class": "hover:bg-elevated/25"
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "area",
    "size": "md"
  }
};

/* DOM extracted from FileUpload.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"DefineFilesTemplate","c":[{"t":"template","if":1,"c":[{"t":"div","s":"files","c":[{"t":"slot","c":[{"t":"div","s":"file","for":1,"c":[{"t":"slot","c":[{"t":"slot","c":[{"t":"UAvatar","s":"fileLeadingAvatar"}]},{"t":"div","s":"fileWrapper","c":[{"t":"span","s":"fileName"},{"t":"span","s":"fileSize"}]},{"t":"slot","c":[{"t":"UButton","s":"fileTrailingButton","if":1}]}]}]}]}]}]}]},{"t":"Primitive","s":"root","c":[{"t":"slot","c":[{"t":"component","s":"base","c":[{"t":"div","s":"wrapper","if":1,"c":[{"t":"slot","c":[{"t":"template","if":1,"c":[{"t":"UIcon","s":"icon","if":1},{"t":"UAvatar","s":"avatar"}]}]},{"t":"template","if":1,"c":[{"t":"div","s":"label","if":1},{"t":"div","s":"description","if":1},{"t":"div","s":"actions","if":1}]}]}]}]}]}];

/* the model as the file list: the component's own wrapper forwards it as
   `files`/`items`, and a single (non-multiple) value is one entry, not none. */
/* FileUpload.vue:94-104, verbatim: no space before the unit, and zero is the
   literal "0B" rather than a formatted 0 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${i === 0 ? value.toString() : value.toFixed(0)}${sizes[i]}`;
}

function fileList(props) {
  const model = props.files !== undefined ? props.files
    : (props.items !== undefined ? props.items
      : (props.modelValue !== undefined ? props.modelValue : props.defaultValue));
  if (model === undefined || model === null || model === false) return [];
  return Array.isArray(model) ? model : [model];
}

const render = createRenderer('file-upload', fileUploadTheme, tree, {
  /* the file rows iterate that same normalised list, so a single value is one row */
  listFor(node, { props }) {
    if (node.s === 'file') return fileList(props);
    return undefined;
  },
  renderIf(slot, { props, variants }) {
    if (slot === 'fileTrailingButton') return props.fileDelete !== false;
    if (/^file/.test(slot || '') || slot === 'files') {
      /* a non-multiple model is a single file OBJECT — which is exactly what an
         inside preview carries — and `.length` on it is undefined, so the whole
         files subtree was dropped and the cell painted as a bare 34px box.
         FileUpload.vue normalises the same way for its list: `multiple ?
         modelValue : [modelValue]`. */
      return fileList(props).length > 0;
    }
    /* FileUpload.vue:235-238 is one v-if/v-else: the UIcon for variant="button",
       the UAvatar for every other variant — exactly one of the two, and neither
       when `icon === false`. The kit drew the icon twice. */
    /* FileUpload.vue:8398 — `position === 'inside' ? !props.preview || (multiple
       ? !modelValue?.length : !modelValue) : true`. With the default
       `position: 'outside'` the branch is the literal `true`, so the wrapper is
       always there; it disappears only for an INSIDE preview that already has a
       file. (My previous gate on label/description/actions was invented and
       emptied the plain dropzone — an empty 34px box with no upload
       affordance.) */
    if (slot === 'wrapper') {
      /* FileUpload.vue:69-72 — `position` is computed, not taken from the prop:
         a grid layout with `multiple` IS an inside preview, which is exactly
         the cell that must not draw the wrapper (its files are shown by the
         preview above, and the extra wrapper added a whole 68px file row). */
      const position = props.position !== undefined ? props.position
        : ((props.layout === 'grid' && props.multiple) ? 'inside' : 'outside');
      if (position !== 'inside') return true;
      if (props.preview === false) return true;
      /* the component's own wrapper normalises the model into `files`/`items`
         before calling the renderer, so `modelValue` is gone from `props` by the
         time this gate runs — reading it made the multiple branch always true */
      return fileList(props).length === 0;
    }
    if (slot === 'icon' || slot === 'avatar') {
      if (props.icon === false) return false;
      const button = (variants && variants.variant ? variants.variant : props.variant) === 'button';
      return slot === 'icon' ? button : !button;
    }
    return undefined;
  },
  /* the else branch is a UAvatar carrying the icon (`:icon="props.icon ??
     appConfig.ui.icons.upload"`), so the avatar has a value to render even when
     the caller passes no icon at all — without it the whole branch fell away and
     the list rows lost the avatar's height */
  slotContent(slot, { props, item, content }) {
    /* the factory's generic field map fills fileSize with its own spaced
       formatter ("0 B") before this hook runs; the library's formatter has no
       space, so the size is always ours */
    if (slot === 'fileSize') {
      const bytes = item && typeof item === 'object' ? Number(item.size) : NaN;
      if (!Number.isFinite(bytes)) return undefined;
      return formatFileSize(bytes);
    }
    if (content !== undefined) return undefined;
    /* FileUpload.vue:235-238 binds the component's own size onto that avatar
       (`:size="size"`), which is the ladder 24/28/32/36/40 — without it every
       size drew the avatar's own default 32 */
    if (slot === 'avatar') return { icon: props.icon || ICONS.upload, size: props.size };
    /* the two text cells of a file row print fields of the FILE, and the size
       goes through the component's own formatter (FileUpload.vue:94-104,
       171-181). Left unfilled, both spans came out 0x0 and collapsed the
       wrapper with them. */
    if (slot === 'fileName') return item && typeof item === 'object' ? item.name : undefined;
    /* every file row carries an avatar — `:src="createObjectUrl(file)"` with the
       file icon as its fallback — and its `size` is the component's, which is
       what holds the row's height (the list rows came out 40-80px short) */
    if (slot === 'fileLeadingAvatar') {
      const src = item && typeof item === 'object' ? (item.src || item.url) : undefined;
      return { ...(src ? { src } : {}), icon: props.fileIcon || ICONS.file, size: props.size };
    }
    /* the delete button is `v-if="props.fileDelete"` (declared `default: true`)
       and carries the close icon as its TRAILING one */
    if (slot === 'fileTrailingButton') {
      return {
        color: 'neutral',
        ...(props.layout === 'grid' ? { variant: 'solid', size: 'xs' } : { variant: 'link', size: props.size }),
        trailingIcon: props.fileDeleteIcon || ICONS.close,
        'aria-label': 'Remove file'
      };
    }
    return undefined;
  }
});

/* FileUpload.vue:8232-8242 — variant, layout and position are all computed:
   a grid layout with `multiple` is an inside preview whatever the prop says,
   and the button variant is always outside */
function filesPosition(props) {
  const variant = props.multiple ? 'area' : props.variant;
  const layout = props.variant === 'button' && !props.multiple ? 'grid' : (props.layout ?? 'grid');
  if (layout === 'grid' && props.multiple) return 'inside';
  if (variant === 'button') return 'outside';
  return props.position ?? 'outside';
}

/* FileUpload.vue:231,260 — `<ReuseFilesTemplate v-if="position === 'inside'" />`
   is the FIRST child of `base`; outside, it follows `base`. The renderer
   always places the files after `base`, so for inside they are moved in. */
function placeFilesInside(el) {
  if (!React.isValidElement(el)) return el;
  let files = null;
  const strip = (node) => {
    if (Array.isArray(node)) return node.map(strip);
    if (!React.isValidElement(node)) return node;
    if (node.props['data-slot'] === 'files') { if (!files) files = node; return null; }
    if (node.props['data-slot'] === 'base') return node;
    const ch = node.props.children;
    if (ch === undefined || ch === null) return node;
    const next = strip(ch);
    return React.cloneElement(node, undefined, ...(Array.isArray(next) ? next : [next]));
  };
  const stripped = strip(el);
  if (!files) return el;
  let placed = false;
  const put = (node) => {
    if (Array.isArray(node)) return node.map(put);
    if (!React.isValidElement(node) || placed) return node;
    if (node.props['data-slot'] === 'base') {
      placed = true;
      const ch = node.props.children;
      const kids = ch === undefined || ch === null ? [] : (Array.isArray(ch) ? ch : [ch]);
      return React.cloneElement(node, undefined, React.cloneElement(files, { key: 'files' }), ...kids);
    }
    const ch = node.props.children;
    if (ch === undefined || ch === null) return node;
    const next = put(ch);
    return React.cloneElement(node, undefined, ...(Array.isArray(next) ? next : [next]));
  };
  const out = put(stripped);
  return placed ? out : el;
}

export function FileUpload(props) {
  const { multiple, accept, disabled, name, id, files, modelValue, defaultValue, items, ...rest } = props;
  /* the file rows iterate the model: whichever way the caller names it, the
     renderer's item list is `items` */
  const list = files || modelValue || defaultValue || items;
  let el = render({ ...rest, multiple, accept, disabled, files: list, items: list });
  if (filesPosition(props) === 'inside') el = placeFilesInside(el);
  /* FileUpload.vue:141 keeps a hidden <input type="file"> INSIDE the dropzone —
     the library counts it as the root's second child, so it is appended to the
     rendered root rather than placed beside it */
  const input = (
    <input key="file" type="file" name={name} id={id} accept={accept} multiple={multiple} disabled={disabled}
      tabIndex={-1} aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />
  );
  return React.isValidElement(el)
    ? React.cloneElement(el, null, ...React.Children.toArray(el.props.children), input)
    : <>{el}{input}</>;
}
