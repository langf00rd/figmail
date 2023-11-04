import type { ReactNode } from "react";

export interface UIElement {
   id: string;
   content: ReactNode;
   position: { x: number; y: number };
}
