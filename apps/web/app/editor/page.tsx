"use client";

import React, { useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import Image from "next/image";
import { Draggable } from "../components/draggable";
import { Droppable } from "../components/droppable";
import type { UIElement } from "../../interface";

const elements: UIElement[] = [
   {
      id: "1",
      content: <p contentEditable>paragraph</p>,
      position: {
         x: 0,
         y: 0,
      },
   },
   {
      id: "2",
      content: <h1 contentEditable>heading</h1>,
      position: {
         x: 0,
         y: 0,
      },
   },
   {
      id: "3",
      content: (
         <div className="ui-img">
            <Image alt="" fill src="/demo.png" />
         </div>
      ),
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
      const _elements = uiElements.map((x) => {
         if (x.id === element.id) return element;
         return x;
      });
      const newElement: UIElement = {
         id: Date.now().toString(),
         content: element.content,
         position: {
            x: 0,
            y: element.position.y,
         },
      };
      setUIElements([..._elements, newElement]);
   }

   return (
      <DndContext onDragEnd={handleDragEnd}>
         <Droppable>
            <ul>
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
            </ul>
            <main>
               <div className="content" />
            </main>
         </Droppable>
      </DndContext>
   );
}
