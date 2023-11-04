"use client";

import * as ReactDomServer from "react-dom/server";
import React, { useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { toast } from "sonner";
// import pretty from "pretty";
import { Draggable } from "../components/draggable";
import { Droppable } from "../components/droppable";
import type { UIElement } from "../../interface";
import Text from "../components/text";
import Body from "../components/body";
import Html from "../components/html";
import Table from "../components/table";
import { Img } from "../components/img";
import Section from "../components/section";
import Head from "../components/head";
import Hr from "../components/hr";

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
      content: <Hr />,
      position: {
         x: 0,
         y: 0,
      },
   },
   {
      id: "3",
      content: (
         <Section>
            <Img
               alt="image"
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vercel_logo_black.svg/1024px-Vercel_logo_black.svg.png"
            />
         </Section>
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

      const main = document.getElementById("main");
      if (!main) return;

      const reactElement = (
         <Html>
            <Head />
            <Body>
               <div dangerouslySetInnerHTML={{ __html: main.innerHTML }} />
            </Body>
         </Html>
      );

      const markup = ReactDomServer.renderToStaticMarkup(reactElement);
      const doc = `${doctype}${markup}`;

      toast.success(doc.length);
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
      <Table id="main">
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
      </Table>
   );
}
