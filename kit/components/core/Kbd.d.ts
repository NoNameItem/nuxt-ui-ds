import type { ReactNode } from 'react';

export type KbdColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type KbdVariant = "solid" | "outline" | "soft" | "subtle";
export type KbdSize = "sm" | "md" | "lg";

export interface KbdProps {
  /** themes/kbd.ts -> variants.color */
  color?: KbdColor;
  /** themes/kbd.ts -> variants.variant */
  variant?: KbdVariant;
  /** themes/kbd.ts -> variants.size */
  size?: KbdSize;

  /** shortcut key; aliases are mapped to glyphs (meta -> ⌘) */
  value?: string;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<string, string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Kbd(props: KbdProps): JSX.Element;
