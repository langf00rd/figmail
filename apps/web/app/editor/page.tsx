"use client";

import React, { useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "../components/draggable";
import { Droppable } from "../components/droppable";
import type { UIElement } from "../../interface";

const elements: UIElement[] = [
   {
      id: "1",
      content: <p contentEditable>title</p>,
      position: {
         x: 0,
         y: 0,
      },
   },
   {
      id: "2",
      content: <p contentEditable>body</p>,
      position: {
         x: 0,
         y: 0,
      },
   },
];

export default function Page(): JSX.Element {
   const [uiElements, setUIElements] = useState(elements);

   function handleDragEnd(e: DragEndEvent): void {
      const element = uiElements.find((x) => x.id === e.active.id);
      if (!element) return;
      element.position.x += e.delta.x;
      element.position.y += e.delta.y;
      const _elements = elements.map((x) => {
         if (x.id === element.id) return element;
         return x;
      });
      setUIElements(_elements);
   }

   return (
      <DndContext onDragEnd={handleDragEnd}>
         <Droppable>
            <main>
               <div className="content">
                  {uiElements.map((element) => (
                     <Draggable
                        id={element.id}
                        key={element.id}
                        styles={{
                           left: `${element.position.x}px`,
                           top: `${element.position.y}px`,
                        }}
                     >
                        {element.content}
                     </Draggable>
                  ))}
               </div>
            </main>
         </Droppable>
      </DndContext>
   );
}
