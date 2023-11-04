"use client";
import type { PropsWithChildren } from "react";
import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props: PropsWithChildren): JSX.Element {
   const { setNodeRef } = useDroppable({
      id: "droppable",
   });

   return <div ref={setNodeRef}>{props.children}</div>;
}
