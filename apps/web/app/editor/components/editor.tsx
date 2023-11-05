"use client";

import React, { useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { toast } from "sonner";
import { UI_ELEMENTS } from "../../lib/constants";
import type { UIElement } from "../../../interface";
import { Droppable } from "../../components/droppable";
import Main from "./main";
import EditorControls from "./editor-controls";

export default function Editor(): JSX.Element {
   const [uiElements, setUIElements] = useState<UIElement[]>([]);

   function handleDragEnd(e: DragEndEvent): void {
      const element = uiElements.find((x) => x.id === e.active.id);

      if (!element) return;
      element.position.x += e.delta.x;
      element.position.y += e.delta.y;

      const _elements = uiElements.map((x) => {
         if (x.id === element.id) return element;
         return x;
      });

      setUIElements(_elements);
   }

   function duplicate(element: UIElement, x = 30, y = 30): void {
      const newElement: UIElement = {
         ...element,
         id: Date.now().toString(),
         content: element.content,
         position: {
            x: element.position.x + x,
            y: element.position.y + y,
         },
      };
      setUIElements([...uiElements, newElement]);
      toast.success("duplicated!");
   }

   function remove(element: UIElement): void {
      setUIElements(uiElements.filter((a) => a.id !== element.id));
   }

   return (
      <div className="w-screen h-screen mt-10">
         <div className="w-[600px] mx-auto grid gap-3">
            <ul className="border p-2 px-3 flex space-x-5 w-max">
               {UI_ELEMENTS.map((e) => (
                  <li key={e.id}>
                     <button
                        onClick={() => {
                           duplicate(e, 0, 0);
                        }}
                        type="button"
                     >
                        {e.icon}
                     </button>
                  </li>
               ))}
            </ul>
            <EditorControls />
            <div className="border">
               <DndContext onDragEnd={handleDragEnd}>
                  <Droppable>
                     <Main
                        onDuplicate={duplicate}
                        onRemove={remove}
                        uiElements={uiElements}
                     />
                  </Droppable>
               </DndContext>
            </div>
         </div>
      </div>
   );
}
