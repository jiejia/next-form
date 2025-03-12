import React, { HTMLAttributes } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DndSortableItemProps extends HTMLAttributes<HTMLLIElement> {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function DndSortableItem({
  children,
  id,
  className,
  ...props // 使用剩余参数接收其他所有属性
}: DndSortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      className={className}
      style={style}
      {...attributes}
      {...listeners}
      {...props} // 展开所有其他属性
    >
      {children}
    </li>
  );
}
