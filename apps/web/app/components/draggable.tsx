"use client";

import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Resizable } from "re-resizable";
import { CopyPlus } from "lucide-react";
import { toast } from "sonner";
import type { UIElement } from "../../interface";
import { DRAGGABLE_STYLE } from "../lib/constants";

export function Draggable(props: {
  id: string;
  styles: object;
  children: ReactNode;
  onDuplicate: (element: UIElement) => void;
  element: UIElement;
}): JSX.Element | null {
  const [showToolbar, setShowToolbar] = useState(false);
  const [currentElement, setCurrentElement] = useState<EventTarget | null>(
    null,
  );
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  function toggleShowToolbar(target: EventTarget): void {
    setShowToolbar(!showToolbar);
    setCurrentElement(target);
  }

  if (!props.children) return null;

  return (
    <Resizable className="resizable" style={{ ...props.styles, ...style }}>
      <div
        onMouseEnter={(e) => {
          toggleShowToolbar(e.target);
        }}
        onMouseLeave={(e) => {
          toggleShowToolbar(e.target);
        }}
      >
        {showToolbar ? (
          <DraggableToolBar {...props} currentElement={currentElement} />
        ) : null}
        <div
          ref={setNodeRef}
          style={{ ...DRAGGABLE_STYLE }}
          {...listeners}
          {...attributes}
          id={props.id}
        >
          {props.children}
        </div>
      </div>
    </Resizable>
  );
}

function DraggableToolBar(props: {
  onDuplicate: (element: UIElement) => void;
  currentElement: EventTarget | null;
  element: UIElement;
}): JSX.Element {
  const [styles, setStyles] = useState<React.CSSProperties | undefined>({});

  const selectedElement = props.currentElement as Element;
  const selectedElementTarget: HTMLElement | undefined = selectedElement
    .childNodes[0] as HTMLElement;

  useEffect(() => {
    try {
      selectedElementTarget.style.backgroundColor =
        styles?.backgroundColor as string;
      selectedElementTarget.style.color = styles?.color as string;
    } catch (error: unknown) {
      toast.error(String(error));
    }
  }, [selectedElementTarget, styles]);

  return (
    <ul className="absolute z-10">
      <li>
        <button
          onClick={() => {
            props.onDuplicate(props.element);
          }}
          type="button"
        >
          <CopyPlus />
        </button>
      </li>
      {props.element.customizeableStyles?.includes("BG") ? (
        <li>
          <p>background</p>
          <input
            onChange={(e) => {
              setStyles({ ...styles, backgroundColor: e.target.value });
            }}
            type="color"
          />
        </li>
      ) : null}
      {props.element.customizeableStyles?.includes("COLOR") ? (
        <li>
          <p>color</p>
          <input
            onChange={(e) => {
              setStyles({ ...styles, color: e.target.value });
            }}
            type="color"
          />
        </li>
      ) : null}
    </ul>
  );
}
