"use client";

import type { ReactNode } from "react";
import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Resizable } from "re-resizable";

export function Draggable(props: {
   id: string;
   styles: object;
   children: ReactNode;
}): JSX.Element {
   const [disableDrag, setDisableDrag] = useState(false);
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: props.id,
      disabled: disableDrag,
   });

   function toggleCanDrag(): void {
      setDisableDrag(!disableDrag);
   }

   const draggableStyle = {
      backgroundColor: "#fff",
      border: "2px solid #f1f1f1",
      height: "100%",
      width: "100%",
      padding: "10px",
   };

   const style = transform
      ? {
           transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

   return (
      <Resizable style={{ ...props.styles, ...style, position: "absolute" }}>
         <button
            className={`p-5 ${!disableDrag && "border border-slate-400"}`}
            onClick={toggleCanDrag}
            type="button"
         >
            <div
               ref={setNodeRef}
               style={{ ...draggableStyle }}
               {...listeners}
               {...attributes}
               id={props.id}
            >
               {props.children}
            </div>
         </button>
      </Resizable>
   );
}
