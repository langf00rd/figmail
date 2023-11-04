"use client";

import React, { useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { Draggable } from "../components/draggable";
import { Droppable } from "../components/droppable";
import type { UIElement } from "../../interface";
import Table from "../components/table";
import { MAIN_STYLE, UI_ELEMENTS } from "../lib/constants";
import { generate } from "../lib/generate";

export default function Page(): JSX.Element {
  const [uiElements, setUIElements] = useState(UI_ELEMENTS);

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

  return (
    <div className="w-screen h-screen">
      <div className="w-[600px] mx-auto gap-10">
        <ul className="flex items-center space-x-5">
          <li>
            <button
              className="flex space-x-2 items-center justify-center"
              onClick={() => {
                void (async () => {
                  await generate();
                })();
              }}
              type="button"
            >
              <Copy size={17} />
              <p>copy html</p>
            </button>
          </li>
        </ul>
        <div className="border">
          <DndContext onDragEnd={handleDragEnd}>
            <Droppable>
              <Main onDuplicate={duplicate} uiElements={uiElements} />
            </Droppable>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

function Main(props: {
  uiElements: UIElement[];
  onDuplicate: (element: UIElement) => void;
}): JSX.Element {
  return (
    <Table id="main">
      <main style={{ ...MAIN_STYLE }}>
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
