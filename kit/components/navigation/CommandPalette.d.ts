import type { ReactNode } from 'react';

export type CommandPaletteVirtualize = boolean;
export type CommandPaletteSize = "xs" | "sm" | "md" | "lg" | "xl";
export type CommandPaletteActive = boolean;
export type CommandPaletteLoading = boolean;

export interface CommandPaletteProps {
  /** themes/command-palette.ts -> variants.virtualize */
  virtualize?: CommandPaletteVirtualize;
  /** themes/command-palette.ts -> variants.size */
  size?: CommandPaletteSize;
  /** themes/command-palette.ts -> variants.active */
  active?: CommandPaletteActive;
  /** themes/command-palette.ts -> variants.loading */
  loading?: CommandPaletteLoading;
  /** search field placeholder — CommandPalette.vue:106 falls back to the
   *  current history frame's, then this, then the localized default */
  placeholder?: string;
  /** navigation stack; the last frame's `placeholder` wins — CommandPalette.vue:106 */
  history?: Array<{ placeholder?: string; [key: string]: any }>;
  /** grouped rows: `{ id, label, items }` — CommandPalette.vue iterates these */
  groups?: Array<Record<string, any>>;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="input" */
  "input"?: ReactNode;
  /** content for data-slot="close" */
  "close"?: ReactNode;
  /** content for data-slot="back" */
  "back"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** content for data-slot="viewport" */
  "viewport"?: ReactNode;
  /** content for data-slot="group" */
  "group"?: ReactNode;
  /** content for data-slot="empty" */
  "empty"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="itemLeadingIcon" */
  "itemLeadingIcon"?: ReactNode;
  /** content for data-slot="itemLeadingAvatar" */
  "itemLeadingAvatar"?: ReactNode;
  /** content for data-slot="itemLeadingAvatarSize" */
  "itemLeadingAvatarSize"?: ReactNode;
  /** content for data-slot="itemLeadingChip" */
  "itemLeadingChip"?: ReactNode;
  /** content for data-slot="itemLeadingChipSize" */
  "itemLeadingChipSize"?: ReactNode;
  /** content for data-slot="itemTrailing" */
  "itemTrailing"?: ReactNode;
  /** content for data-slot="itemTrailingIcon" */
  "itemTrailingIcon"?: ReactNode;
  /** content for data-slot="itemTrailingHighlightedIcon" */
  "itemTrailingHighlightedIcon"?: ReactNode;
  /** content for data-slot="itemTrailingKbds" */
  "itemTrailingKbds"?: ReactNode;
  /** content for data-slot="itemTrailingKbdsSize" */
  "itemTrailingKbdsSize"?: ReactNode;
  /** content for data-slot="itemWrapper" */
  "itemWrapper"?: ReactNode;
  /** content for data-slot="itemLabel" */
  "itemLabel"?: ReactNode;
  /** content for data-slot="itemLabelBase" */
  "itemLabelBase"?: ReactNode;
  /** content for data-slot="itemLabelPrefix" */
  "itemLabelPrefix"?: ReactNode;
  /** content for data-slot="itemLabelSuffix" */
  "itemLabelSuffix"?: ReactNode;
  /** content for data-slot="itemDescription" */
  "itemDescription"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "input" | "close" | "back" | "content" | "footer" | "viewport" | "group" | "empty" | "label" | "item" | "itemLeadingIcon" | "itemLeadingAvatar" | "itemLeadingAvatarSize" | "itemLeadingChip" | "itemLeadingChipSize" | "itemTrailing" | "itemTrailingIcon" | "itemTrailingHighlightedIcon" | "itemTrailingKbds" | "itemTrailingKbdsSize" | "itemWrapper" | "itemLabel" | "itemLabelBase" | "itemLabelPrefix" | "itemLabelSuffix" | "itemDescription", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function CommandPalette(props: CommandPaletteProps): JSX.Element;
