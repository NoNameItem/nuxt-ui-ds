import type { ReactNode } from 'react';

export type LinkActive = boolean;
export type LinkDisabled = boolean;

export interface LinkProps {
  /** themes/link.ts -> variants.active */
  active?: LinkActive;
  /** themes/link.ts -> variants.disabled */
  disabled?: LinkDisabled;

  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<string, string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Link(props: LinkProps): JSX.Element;
