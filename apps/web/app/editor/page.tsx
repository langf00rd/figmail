"use client";

import React, { useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import Image from "next/image";
import { toast } from "sonner";
import { Draggable } from "../components/draggable";
import { Droppable } from "../components/droppable";
import type { UIElement } from "../../interface";
import Text from "../components/text";

const elements: UIElement[] = [
   {
      id: "1",
      content: <Text>just some random text</Text>,
      position: {
         x: 0,
         y: 0,
      },
   },
   {
      id: "2",
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
   const [disableDrag, setDisableDrag] = useState(false);

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

   function duplicate(element: UIElement): void {
      const newElement: UIElement = {
         id: Date.now().toString(),
         content: element.content,
         position: {
            x: element.position.x + 30,
            y: element.position.y + 30,
         },
      };
      setUIElements([...uiElements, newElement]);
      toast.success("duplicated!");
   }

   function toggleCanDrag(): void {
      setDisableDrag(!disableDrag);
   }

   return (
      <DndContext onDragEnd={handleDragEnd}>
         <Droppable>
            <main>
               {uiElements.map((element) => (
                  <Draggable
                     id={element.id}
                     key={element.id}
                     styles={{
                        left: `${element.position.x}px`,
                        top: `${element.position.y}px`,
                     }}
                  >
                     <button
                        className="p-5 bg-slate-100"
                        onClick={() => {
                           toggleCanDrag();
                           duplicate(element);
                        }}
                        type="button"
                     >
                        duplicate
                     </button>
                     {element.content}
                  </Draggable>
               ))}
            </main>
         </Droppable>
      </DndContext>
   );
}
