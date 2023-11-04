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
        <EditorControls />
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
