import type { ReactNode } from "react";

export interface UIElement {
  id: string;
  content: ReactNode;
  position: { x: number; y: number };
}

export interface GenerateMarkupProps {
  /** copy html to clipboard after generating markup */
  copyHTML?: boolean;
}
