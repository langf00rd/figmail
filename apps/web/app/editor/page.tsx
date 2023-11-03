"use client";

import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";
import { useState, type ReactNode } from "react";

export default function Page(): JSX.Element {
   const droppableContainers = ["a", "b", "c", "d"];
   const [parent, setParent] = useState<null | number | string>(null);

   function handleDragEnd(event: DragEndEvent): void {
      const { over } = event;
      setParent(over ? over.id : null);
   }

   const droppableElement = (
      <Draggable id="draggable-1">
         <div>
            <p>draggable</p>
         </div>
      </Draggable>
   );

   return (
      <main className="h-screen w-screen space-y-2 max-w-xl mx-auto shadow p-5 main">
         <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? droppableElement : null}
            {droppableContainers.map((droppableID) => (
               <Droppable id={droppableID} key={droppableID}>
                  {parent === droppableID ? droppableElement : "Drop here"}
               </Droppable>
            ))}
         </DndContext>
      </main>
   );
}

function Droppable(props: { id: string; children: ReactNode }): JSX.Element {
   const { isOver, setNodeRef } = useDroppable({ id: props.id });
   return (
      <div
         className="w-max p-5 rounded-md border-[4px] border-dotted transition-colors"
         ref={setNodeRef}
         style={{ background: isOver ? "#4df2f2" : "#f2f2f2" }}
      >
         {props.children}
      </div>
   );
}

function Draggable(props: { id: string; children: ReactNode }): JSX.Element {
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: props.id,
   });

   const style = transform
      ? {
           transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

   return (
      <div
         className="w-max p-5 rounded-md border-[4px] bg-white"
         ref={setNodeRef}
         style={style}
         {...listeners}
         {...attributes}
      >
         {props.children}
      </div>
   );
}
