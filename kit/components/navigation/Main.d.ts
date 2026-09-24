import type { ReactNode } from 'react';



export interface MainProps {


  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<string, string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Main(props: MainProps): JSX.Element;
