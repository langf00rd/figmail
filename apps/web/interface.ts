import type { ReactNode } from "react";

export interface UIElement {
   id: string;
   content: ReactNode;
   position: { x: number; y: number };
   icon: JSX.Element;
   customizeableStyles?: ("COLOR" | "BG" | "TEXT-ALIGN" | "FONT-SIZE")[];
}

export interface GenerateMarkupProps {
   /** copy html to clipboard after generating markup */
   copyHTML?: boolean;
}
