"use client";

import type { ReactNode } from "react";
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Resizable } from "re-resizable";
import { CopyPlus } from "lucide-react";
import type { UIElement } from "../../interface";

export function Draggable(props: {
  id: string;
  styles: object;
  children: ReactNode;
  onDuplicate: (element: UIElement) => void;
  element: UIElement;
}): JSX.Element {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

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
    <Resizable style={{ ...props.styles, ...style }}>
      <DraggableToolBar {...props} />
      <div
        ref={setNodeRef}
        style={{ ...draggableStyle }}
        {...listeners}
        {...attributes}
        id={props.id}
      >
        {props.children}
      </div>
    </Resizable>
  );
}

function DraggableToolBar(props: {
  onDuplicate: (element: UIElement) => void;
  element: UIElement;
}): JSX.Element {
  return (
    <ul className="absolute -top-10 z-10">
      <button
        onClick={() => {
          props.onDuplicate(props.element);
        }}
        type="button"
      >
        <CopyPlus />
      </button>
    </ul>
  );
}
