import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/navigation-menu.ts (source/themes.json -> "navigation-menu").
   Values are literal: no rounding, no cross-component alignment. */
export const navigationMenuTheme = {
  "slots": {
    "root": "relative flex gap-1.5 [&>div]:min-w-0",
    "list": "isolate min-w-0",
    "label": "w-full flex items-center gap-1.5 font-semibold text-xs/5 text-highlighted px-2.5 py-1.5",
    "item": "min-w-0",
    "link": "group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:outline-3",
    "linkLeadingIcon": "shrink-0 size-5",
    "linkLeadingAvatar": "shrink-0",
    "linkLeadingAvatarSize": "2xs",
    "linkLeadingChipSize": "sm",
    "linkTrailing": "group ms-auto inline-flex gap-1.5 items-center",
    "linkTrailingBadge": "shrink-0",
    "linkTrailingBadgeSize": "sm",
    "linkTrailingIcon": "size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200 ease-out motion-reduce:transition-none",
    "linkLabel": "truncate",
    "linkLabelExternalIcon": "inline-block size-3 align-top text-dimmed",
    "childList": "isolate",
    "childLabel": "text-xs text-highlighted",
    "childItem": "",
    "childLink": "group relative size-full flex items-start text-start text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:outline-3",
    "childLinkWrapper": "min-w-0",
    "childLinkIcon": "size-5 shrink-0",
    "childLinkLabel": "truncate",
    "childLinkLabelExternalIcon": "inline-block size-3 align-top text-dimmed",
    "childLinkDescription": "text-muted",
    "separator": "px-2 h-px bg-border",
    "viewportWrapper": "absolute top-full start-0 flex w-full",
    "viewport": "relative overflow-hidden bg-default shadow-lg rounded-md ring ring-default h-(--reka-navigation-menu-viewport-height) w-full transition-[width,height,left,right] duration-200 ease-out motion-reduce:transition-none origin-[top_center] data-[state=open]:animate-[scale-in_100ms_var(--ease-out)] data-[state=closed]:animate-[scale-out_100ms_var(--ease-out)] z-1",
    "content": "",
    "indicator": "absolute left-0 data-[state=visible]:animate-[fade-in_100ms_var(--ease-out)] data-[state=hidden]:animate-[fade-out_100ms_var(--ease-out)] data-[state=hidden]:opacity-0 bottom-0 z-2 w-(--reka-navigation-menu-indicator-size) translate-x-(--reka-navigation-menu-indicator-position) flex h-2.5 items-end justify-center overflow-hidden transition-[translate,width] duration-200 ease-out motion-reduce:transition-none",
    "arrow": "relative top-[50%] size-2.5 rotate-45 border border-default bg-default z-1 rounded-xs"
  },
  "variants": {
    "color": {
      "primary": {
        "link": "before:outline-primary/25",
        "childLink": "before:outline-primary/25"
      },
      "secondary": {
        "link": "before:outline-secondary/25",
        "childLink": "before:outline-secondary/25"
      },
      "success": {
        "link": "before:outline-success/25",
        "childLink": "before:outline-success/25"
      },
      "info": {
        "link": "before:outline-info/25",
        "childLink": "before:outline-info/25"
      },
      "warning": {
        "link": "before:outline-warning/25",
        "childLink": "before:outline-warning/25"
      },
      "error": {
        "link": "before:outline-error/25",
        "childLink": "before:outline-error/25"
      },
      "neutral": {
        "link": "before:outline-inverted/25",
        "childLink": "before:outline-inverted/25"
      }
    },
    "highlightColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "pill": "",
      "link": ""
    },
    "orientation": {
      "horizontal": {
        "root": "items-center justify-between",
        "list": "flex items-center",
        "item": "py-2",
        "link": "px-2.5 py-1.5 before:inset-x-px before:inset-y-0",
        "childList": "grid p-2",
        "childLink": "px-3 py-2 gap-2 before:inset-x-px before:inset-y-0",
        "childLinkLabel": "font-medium",
        "content": "absolute top-0 start-0 w-full max-h-[70vh] overflow-y-auto"
      },
      "vertical": {
        "root": "flex-col",
        "link": "flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0",
        "childLabel": "px-1.5 py-0.5",
        "childLink": "p-1.5 gap-1.5 before:inset-y-px before:inset-x-0"
      }
    },
    "contentOrientation": {
      "horizontal": {
        "viewportWrapper": "justify-center",
        "content": "data-[motion=from-start]:animate-[enter-from-left_200ms_var(--ease-out)] data-[motion=from-end]:animate-[enter-from-right_200ms_var(--ease-out)] data-[motion=to-start]:animate-[exit-to-left_200ms_var(--ease-out)] data-[motion=to-end]:animate-[exit-to-right_200ms_var(--ease-out)]"
      },
      "vertical": {
        "viewport": "sm:w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left) rtl:left-auto rtl:right-[calc(100%-var(--reka-navigation-menu-viewport-left)-var(--reka-navigation-menu-viewport-width))]"
      }
    },
    "active": {
      "true": {
        "childLink": "before:bg-elevated text-highlighted",
        "childLinkIcon": "text-default"
      },
      "false": {
        "link": "text-muted",
        "linkLeadingIcon": "text-dimmed",
        "childLink": [
          "hover:before:bg-elevated/50 text-default hover:text-highlighted",
          "transition-colors before:transition-colors"
        ],
        "childLinkIcon": [
          "text-dimmed group-hover:text-default",
          "transition-colors"
        ]
      }
    },
    "disabled": {
      "true": {
        "link": "cursor-not-allowed opacity-75"
      }
    },
    "highlight": {
      "true": ""
    },
    "level": {
      "true": ""
    },
    "collapsed": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "contentOrientation": "horizontal",
      "class": {
        "childList": "grid-cols-2 gap-2"
      }
    },
    {
      "orientation": "horizontal",
      "contentOrientation": "vertical",
      "class": {
        "childList": "gap-1",
        "content": "w-60"
      }
    },
    {
      "orientation": "vertical",
      "collapsed": false,
      "class": {
        "childList": "ms-5 border-s border-default",
        "childItem": "ps-1.5 -ms-px",
        "content": "data-[state=open]:animate-[collapsible-down_200ms_var(--ease-out)] data-[state=closed]:animate-[collapsible-up_200ms_var(--ease-out)] data-[state=closed]:overflow-hidden"
      }
    },
    {
      "orientation": "vertical",
      "collapsed": true,
      "class": {
        "link": "px-1.5",
        "linkLabel": "hidden",
        "linkTrailing": "hidden",
        "content": "shadow-sm rounded-sm min-h-6 p-1"
      }
    },
    {
      "orientation": "horizontal",
      "highlight": true,
      "class": {
        "link": [
          "after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full",
          "after:transition-colors"
        ]
      }
    },
    {
      "orientation": "vertical",
      "highlight": true,
      "level": true,
      "class": {
        "link": [
          "after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full",
          "after:transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "pill",
      "class": {
        "link": [
          "hover:text-highlighted hover:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-default",
          "transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "pill",
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:text-highlighted",
        "linkLeadingIcon": "group-data-[state=open]:text-default"
      }
    },
    {
      "disabled": false,
      "variant": "pill",
      "highlight": true,
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:before:bg-elevated/50"
      }
    },
    {
      "disabled": false,
      "variant": "pill",
      "highlight": false,
      "active": false,
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:before:bg-elevated/50"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-primary",
        "linkLeadingIcon": "text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-secondary",
        "linkLeadingIcon": "text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-success",
        "linkLeadingIcon": "text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-info",
        "linkLeadingIcon": "text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-warning",
        "linkLeadingIcon": "text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-error",
        "linkLeadingIcon": "text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-highlighted",
        "linkLeadingIcon": "text-highlighted group-data-[state=open]:text-highlighted"
      }
    },
    {
      "variant": "pill",
      "active": true,
      "highlight": false,
      "class": {
        "link": "before:bg-elevated"
      }
    },
    {
      "variant": "pill",
      "active": true,
      "highlight": true,
      "disabled": false,
      "class": {
        "link": [
          "hover:before:bg-elevated/50",
          "before:transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "link",
      "class": {
        "link": [
          "hover:text-highlighted",
          "transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-default",
          "transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "link",
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:text-highlighted",
        "linkLeadingIcon": "group-data-[state=open]:text-default"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-primary",
        "linkLeadingIcon": "text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-secondary",
        "linkLeadingIcon": "text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-success",
        "linkLeadingIcon": "text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-info",
        "linkLeadingIcon": "text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-warning",
        "linkLeadingIcon": "text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-error",
        "linkLeadingIcon": "text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-highlighted",
        "linkLeadingIcon": "text-highlighted group-data-[state=open]:text-highlighted"
      }
    },
    {
      "highlightColor": "primary",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-primary"
      }
    },
    {
      "highlightColor": "secondary",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-secondary"
      }
    },
    {
      "highlightColor": "success",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-success"
      }
    },
    {
      "highlightColor": "info",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-info"
      }
    },
    {
      "highlightColor": "warning",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-warning"
      }
    },
    {
      "highlightColor": "error",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-error"
      }
    },
    {
      "highlightColor": "neutral",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "highlightColor": "primary",
    "variant": "pill"
  }
};

/* DOM extracted from NavigationMenu.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"DefineLinkTemplate","c":[{"t":"slot","c":[{"t":"slot","c":[{"t":"UAvatar","s":"linkLeadingAvatar","if":1},{"t":"UChip","s":"linkLeadingChipSize","if":1,"c":[{"t":"UIcon","s":"linkLeadingIcon"}]},{"t":"UIcon","s":"linkLeadingIcon","if":1}]},{"t":"span","s":"linkLabel","if":1,"c":[{"t":"UIcon","s":"linkLabelExternalIcon","if":1}]},{"t":"component","s":"linkTrailing","if":1,"c":[{"t":"slot","c":[{"t":"UBadge","s":"linkTrailingBadge","if":1},{"t":"UIcon","s":"linkTrailingIcon","if":1},{"t":"UIcon","s":"linkTrailingIcon","if":1}]}]}]}]},{"t":"DefineItemTemplate","c":[{"t":"li","c":[{"t":"div","s":"label","if":1},{"t":"ULink","if":1,"c":[{"t":"component","c":[{"t":"UPopover","if":1,"c":[{"t":"ULinkBase","s":"link"},{"t":"template","c":[{"t":"slot","c":[{"t":"ul","s":"childList","c":[{"t":"li","s":"childLabel"},{"t":"li","s":"childItem","for":1,"c":[{"t":"ULink","c":[{"t":"NavigationMenuLink","c":[{"t":"ULinkBase","s":"childLink","c":[{"t":"UIcon","s":"childLinkIcon","if":1},{"t":"span","s":"childLinkLabel","c":[{"t":"UIcon","s":"childLinkLabelExternalIcon","if":1}]}]}]}]}]}]}]}]}]},{"t":"UTooltip","if":1,"c":[{"t":"ULinkBase","s":"link"}]},{"t":"ULinkBase","s":"link"}]},{"t":"NavigationMenuContent","s":"content","if":1,"c":[{"t":"slot","c":[{"t":"ul","s":"childList","c":[{"t":"li","s":"childItem","for":1,"c":[{"t":"ULink","c":[{"t":"NavigationMenuLink","c":[{"t":"ULinkBase","s":"childLink","c":[{"t":"UIcon","s":"childLinkIcon","if":1},{"t":"div","s":"childLinkWrapper","c":[{"t":"p","s":"childLinkLabel","c":[{"t":"UIcon","s":"childLinkLabelExternalIcon","if":1}]},{"t":"p","s":"childLinkDescription","if":1}]}]}]}]}]}]}]}]}]},{"t":"AccordionContent","s":"content","if":1,"c":[{"t":"ul","s":"childList","c":[{"t":"ReuseItemTemplate","s":"childItem","for":1}]}]}]}]},{"t":"NavigationMenuRoot","s":"root","c":[{"t":"template","for":1,"c":[{"t":"ul","s":"list","c":[{"t":"ReuseItemTemplate","s":"item","for":1}]},{"t":"div","s":"separator","if":1}]},{"t":"div","s":"viewportWrapper","if":1,"c":[{"t":"NavigationMenuIndicator","s":"indicator","if":1,"c":[{"t":"div","s":"arrow"}]},{"t":"NavigationMenuViewport","s":"viewport"}]}]}];

/* NavigationMenu.vue:96-98 — an item's value is `get(item, valueKey) ?? "item-" + index`;
   the open ones: horizontal — the one `modelValue`/`defaultValue` names
   (NavigationMenuRoot :300, 314); vertical — those, plus `item.defaultOpen ||
   item.open` (:100-106). */
const asList = (v) => (v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]);
function itemValue(props, item, index) {
  const v = item && typeof item === 'object' ? item[props.valueKey || 'value'] : undefined;
  return v !== undefined && v !== null ? v : 'item-' + index;
}
const hasKids = (item) => !!(item && item.children && item.children.length);
const isHorizontal = (props) => (props.orientation || 'horizontal') === 'horizontal';
function isOpen(props, item, index) {
  if (!item || typeof item !== 'object') return false;
  const model = asList(props.modelValue !== undefined ? props.modelValue : props.defaultValue);
  const byModel = index !== undefined && model.includes(itemValue(props, item, index));
  if (isHorizontal(props)) return byModel && hasKids(item);
  return byModel || !!item.defaultOpen || !!item.open;
}
function openTopItem(props) {
  if (!isHorizontal(props)) return null;
  const groups = Array.isArray((props.items || [])[0]) ? props.items : [props.items || []];
  for (const g of groups) for (let i = 0; i < g.length; i++) if (isOpen(props, g[i], i)) return { item: g[i], index: i };
  return null;
}
const sameItem = (props, a, b, ia, ib) => a === b || (!!a && !!b && ia === ib && itemValue(props, a, ia) === itemValue(props, b, ib) && a.label === b.label);

/* NavigationMenu.vue builds each link from a DefineLinkTemplate (its Reuse node is
   missing from the extracted DOM, so it is inlined into the link slot), renders the
   label slot only for `type: 'label'` items, and wraps the link in UPopover /
   UTooltip only when the item asks for it. */
const topItems = (props) => (Array.isArray((props.items || [])[0]) ? props.items.flat() : (props.items || []));
const sameEntry = (a, b) => a === b || (!!a && !!b && typeof a === 'object' && typeof b === 'object'
  && a.label === b.label && a.description === b.description && a.to === b.to && a.icon === b.icon);
function isNested(props, item) {
  const tops = topItems(props);
  if (tops.some((t) => t === item)) return false;
  const walk = (list) => (list || []).some((c) => sameEntry(c, item) || walk(c && c.children));
  return tops.some((t) => t && walk(t.children));
}
const toList = (v) => (Array.isArray(v) ? v : [v]);
function levelClasses(props, variants, item) {
  const vals = {
    orientation: 'vertical', level: true,
    highlight: !!(props.highlight !== undefined ? props.highlight : variants && variants.highlight),
    highlightColor: props.highlightColor || props.color || navigationMenuTheme.defaultVariants.highlightColor,
    active: !!item.active
  };
  const out = [];
  for (const cv of navigationMenuTheme.compoundVariants) {
    if (cv.level !== true) continue;
    const ok = Object.keys(cv).every((k) => k === 'class' || toList(cv[k]).includes(vals[k]));
    if (ok && cv.class && cv.class.link) out.push(...toList(cv.class.link));
  }
  return out.join(' ');
}

const makeOptions = (contentInto) => ({
  /* NavigationMenu.vue:84-92 — `active` is not among the root tv() keys; links
     use `active || item.active` (:196, 233, 237), child links their own
     childActive (:214-257) — ULink's, false without a route */
  itemOnlyVariants: ['active'],
  itemVariants: (item) => ({ active: !!(item && typeof item === 'object' && item.active) }),
  inlineDefineInto: { Link: 'link' },
  /* the viewport exists only while an item is open (reka's Presence) */
  openOnlySlots: ['viewport'],
  /* the content's `max-h-[70vh]` stays a viewport unit: as 70% of a viewport
     whose height is read FROM the content it was 0 */
  keepFixed: ['content'],
  /* horizontal content panels are rendered into the positioned viewportWrapper
     that follows the list — and, while an item is open, into the viewport inside
     it (NavigationMenu.vue:338-344 holds the viewport) */
  slotInto: { NavigationMenuContent: contentInto },
  nodeFilter(node, { props, item, index }) {
    const horizontal = isHorizontal(props);
    if (node.t === 'NavigationMenuContent') {
      if (!(horizontal && hasKids(item))) return false;
      /* with an item open, reka mounts that item's content alone */
      const open = props.navOpen;
      return open ? sameItem(props, item, open.item, index, open.index) : true;
    }
    if (node.t === 'UPopover' || node.t === 'UTooltip') return false;
    if (node.t === 'UChip') return !!(item && item.chip);
    /* reka's AccordionContent unmounts while its item is closed */
    if (node.t === 'AccordionContent') return !horizontal && hasKids(item) && !props.collapsed && isOpen(props, item, index);
    return true;
  },
  renderIf(slot, { props, item, variants }) {
    const horizontal = (props.orientation || (variants && variants.orientation) || 'horizontal') === 'horizontal';
    if (slot === 'viewportWrapper') return horizontal;
    if (slot === 'indicator' || slot === 'arrow') return !!props.arrow;
    if (slot === 'label') return !!(item && item.type === 'label');
    if (slot === 'childList' || slot === 'childLabel') return hasKids(item);
    if (slot === 'childLinkDescription') return !!(item && item.description);
    /* :153 — the trailing box holds a badge, the chevron of an item with
       children, or an explicit trailing icon */
    if (slot === 'linkTrailing') return !!(item && (item.badge || item.badge === 0 || hasKids(item) || item.trailingIcon));
    /* :170 the chevron only for an item with children; :171 v-else-if an
       explicit item.trailingIcon */
    if (slot === 'linkTrailingIcon') return !!(item && (hasKids(item) || item.trailingIcon));
    if (slot === 'linkLabelExternalIcon' || slot === 'childLinkLabelExternalIcon') {
      return !!(item && (item.target === '_blank' || /^https?:/.test(item.to || '')));
    }
    return undefined;
  },
  slotContent(slot, { props, item }) {
    if (slot !== 'linkTrailingIcon' || !item) return undefined;
    if (hasKids(item)) return item.trailingIcon || props.trailingIcon || undefined;
    return item.trailingIcon || undefined;
  },
  slotAttrs(slot, props, variants, { item, index }) {
    const horizontal = isHorizontal(props);
    /* reka's NavigationMenuTrigger / AccordionTrigger (items with children) and
       AccordionItem (every vertical item) carry the open state */
    /* NavigationMenu.vue:196 — `ui.link({ …, level: level > 0 })`: a vertical
       menu's nested links resolve the theme's `level: true` compounds (the
       highlight bar on `after:`). The horizontal menu passes `level` globally. */
    const levelCls = slot === 'link' && !horizontal && item && isNested(props, item) ? levelClasses(props, variants, item) : '';
    if (slot === 'link' && item && hasKids(item) && !(props.collapsed && !horizontal)) {
      const open = horizontal ? !!(props.navOpen && sameItem(props, item, props.navOpen.item, index, props.navOpen.index)) : isOpen(props, item, index);
      return { 'data-state': open ? 'open' : 'closed', ...(levelCls ? { addClass: levelCls } : {}) };
    }
    if (levelCls) return { addClass: levelCls };
    if ((slot === 'item' || slot === 'childItem') && !horizontal && !props.collapsed && item && typeof item === 'object' && item.type !== 'label') {
      return { 'data-state': isOpen(props, item, index) ? 'open' : 'closed' };
    }
    if (slot === 'content' && (!horizontal || props.navOpen)) return { 'data-state': 'open' };
    if (slot === 'viewport' && props.navOpen) {
      const v = props.navVars;
      return {
        'data-state': 'open',
        ...(v ? { style: { '--reka-navigation-menu-viewport-height': v.h + 'px', '--reka-navigation-menu-viewport-width': v.w + 'px', '--reka-navigation-menu-viewport-left': v.left + 'px' } } : {})
      };
    }
    return null;
  }
});

const renderClosed = createRenderer('navigation-menu', navigationMenuTheme, tree, makeOptions('viewportWrapper'));
const renderOpen = createRenderer('navigation-menu', navigationMenuTheme, tree, makeOptions('viewport'));

export function NavigationMenu(props) {
  const navOpen = openTopItem(props);
  const id = React.useMemo(() => 'nav-' + Math.random().toString(36).slice(2, 9), []);
  const [vars, setVars] = React.useState(null);
  /* reka sizes the viewport from the open content: --reka-navigation-menu-viewport-height/width */
  React.useLayoutEffect(() => {
    if (!navOpen) return undefined;
    let live = true, frame = 0, started = 0;
    const measure = () => {
      const root = document.querySelector('[data-nav-instance="' + id + '"]');
      const vp = root && root.querySelector('[data-slot="viewport"]');
      const content = vp && vp.querySelector('[data-slot="content"]');
      if (!content) return;
      /* NavigationMenuViewport.js:43-130 — integer offset sizes, and the left
         edge centred on the active trigger, kept 10px inside the window */
      const w = content.offsetWidth, h = content.offsetHeight;
      const trig = root.querySelector('[data-slot="link"][data-state="open"]');
      let left = 0;
      if (trig) {
        const rootRect = root.getBoundingClientRect(), rect = trig.getBoundingClientRect();
        const bodyWidth = document.body.clientWidth;
        left = rect.left - rootRect.left - w / 2 + rect.width / 2;
        if (left + rootRect.left < 10) left = 10 - rootRect.left;
        if (left + rootRect.left + w > bodyWidth - 10) left -= left + rootRect.left + w - (bodyWidth - 10);
        left = Math.round(left);
      }
      const next = { h, w, left };
      setVars((p) => (p && Math.abs(p.h - next.h) < 0.01 && Math.abs(p.w - next.w) < 0.01 && Math.abs(p.left - next.left) < 0.01 ? p : next));
    };
    const sample = (now) => {
      if (!live) return;
      if (!started) started = now || 0;
      measure();
      if (!now || now - started < 1000) frame = requestAnimationFrame(sample);
    };
    sample(0);
    return () => { live = false; if (frame) cancelAnimationFrame(frame); };
  });
  const horizontal = isHorizontal(props);
  const extra = horizontal ? { level: true } : {};
  if (navOpen) return renderOpen({ ...props, ...extra, 'data-nav-instance': id, open: true, navOpen, navVars: vars });
  return renderClosed({ ...props, ...extra });
}
