import type { ReactNode } from 'react';

export type ListboxSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ListboxColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type ListboxVirtualize = boolean;
export type ListboxDisabled = boolean;
export type ListboxHighlight = boolean;

export interface ListboxProps {
  /** themes/listbox.ts -> variants.size */
  size?: ListboxSize;
  /** themes/listbox.ts -> variants.color */
  color?: ListboxColor;
  /** themes/listbox.ts -> variants.virtualize */
  virtualize?: ListboxVirtualize;
  /** themes/listbox.ts -> variants.disabled */
  disabled?: ListboxDisabled;
  /** themes/listbox.ts -> variants.highlight */
  highlight?: ListboxHighlight;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="input" */
  "input"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="group" */
  "group"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** content for data-slot="separator" */
  "separator"?: ReactNode;
  /** content for data-slot="empty" */
  "empty"?: ReactNode;
  /** content for data-slot="loading" */
  "loading"?: ReactNode;
  /** content for data-slot="loadingIcon" */
  "loadingIcon"?: ReactNode;
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
  /** content for data-slot="itemWrapper" */
  "itemWrapper"?: ReactNode;
  /** content for data-slot="itemLabel" */
  "itemLabel"?: ReactNode;
  /** content for data-slot="itemDescription" */
  "itemDescription"?: ReactNode;
  /** content for data-slot="itemTrailing" */
  "itemTrailing"?: ReactNode;
  /** content for data-slot="itemTrailingIcon" */
  "itemTrailingIcon"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "input" | "content" | "group" | "label" | "separator" | "empty" | "loading" | "loadingIcon" | "item" | "itemLeadingIcon" | "itemLeadingAvatar" | "itemLeadingAvatarSize" | "itemLeadingChip" | "itemLeadingChipSize" | "itemWrapper" | "itemLabel" | "itemDescription" | "itemTrailing" | "itemTrailingIcon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function Listbox(props: ListboxProps): JSX.Element;
