import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function DndDroppable({
  children,
  id,
  className,
  ...props
}: {
  children: React.ReactNode;
  id: string;
  className: string;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      {...props}
      ref={setNodeRef}
      className={`relative ${isOver ? "" : ""}` + className}
    >
      {children}
    </div>
  );
}
