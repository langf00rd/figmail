"use client";

import * as ReactDomServer from "react-dom/server";
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

const mainStyle = {
   height: "800px",
   width: "800px",
   margin: "auto",
   border: "2px solid #e0e0e0",
   overflow: "hidden",
   gap: "80px",
   display: "grid",
};

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

   function render(): void {
      const doctype =
         '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
      const markup = ReactDomServer.renderToStaticMarkup(componentToRender);
      const document = `${doctype}${markup}`;
      toast.success(document.length);
   }

   const componentToRender = <Main onDuplicate={duplicate} uiElements={uiElements} />;

   return (
      <>
         <button onClick={render} type="button">
            render
         </button>
         <DndContext onDragEnd={handleDragEnd}>
            <Droppable>{componentToRender}</Droppable>
         </DndContext>
      </>
   );
}

function Main(props: {
   uiElements: UIElement[];
   onDuplicate: (element: UIElement) => void;
}): JSX.Element {
   return (
      <main style={{ ...mainStyle }}>
         {props.uiElements.map((element) => (
            <Draggable
               element={element}
               id={element.id}
               key={element.id}
               onDuplicate={props.onDuplicate}
               styles={{
                  left: `${element.position.x}px`,
                  top: `${element.position.y}px`,
               }}
            >
               {element.content}
            </Draggable>
         ))}
      </main>
   );
}
