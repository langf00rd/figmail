"use client";

import type { ReactNode } from "react";
import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Resizable } from "re-resizable";
import { CopyPlus } from "lucide-react";
import type { UIElement } from "../../interface";
import { DRAGGABLE_STYLE } from "../lib/constants";

export function Draggable(props: {
  id: string;
  styles: object;
  children: ReactNode;
  onDuplicate: (element: UIElement) => void;
  element: UIElement;
}): JSX.Element {
  const [showToolbar, setShowToolbar] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  function toggleShowToolbar(): void {
    setShowToolbar(!showToolbar);
  }

  return (
    <div onMouseEnter={toggleShowToolbar} onMouseLeave={toggleShowToolbar}>
      <Resizable className="resizable" style={{ ...props.styles, ...style }}>
        {showToolbar ? <DraggableToolBar {...props} /> : null}
        <div
          ref={setNodeRef}
          style={{ ...DRAGGABLE_STYLE }}
          {...listeners}
          {...attributes}
          id={props.id}
        >
          {props.children}
        </div>
      </Resizable>
    </div>
  );
}

function DraggableToolBar(props: {
  onDuplicate: (element: UIElement) => void;
  element: UIElement;
}): JSX.Element {
  return (
    <ul className="absolute z-10">
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
