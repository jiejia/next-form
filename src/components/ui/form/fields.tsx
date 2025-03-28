import { Field } from "@/types/form";
import { DndDroppable } from "@/components/shared/dnd-droppable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndSortableItem } from "@/components/shared/dnd-sortable-item";
import React from "react";
import clsx from "clsx";

export default function Fields({
  fields,
  setFields,
  setCurrentField,
  setSelected,
}: {
  fields: Field[];
  setFields: (fields: Field[]) => void;
  setCurrentField: (field: Field) => void;
  setSelected: (selected: string) => void;
}) {
  const handleFieldClick = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {


    const updatedFields = fields.map((field: Field, key:number) => {
      if (key == index) {
        return { ...field, active: true };
      } else {
        return { ...field, active: false };
      }
    });

    fields.forEach((item: Field, key:number) => {
      if (key == index) setCurrentField(item);
    });

    setFields(updatedFields);
    setSelected("property");
  };

  return (
    <DndDroppable id={"fields-" + fields.length} className="h-full">
      <SortableContext
        items={fields.map((_, index) => index)}
        strategy={verticalListSortingStrategy}
      >
        <ul
          id="fields"
          className="grid grid-cols-1 gap-2 text-left indent-1 text-xs content-start h-full"
        >
          {fields.map((item, index) => (
            <DndSortableItem
              key={index}
              id={"field-" + index}
              className={clsx(
                "p-2 bg-content2 rounded-lg border-default border-0 relative z-40",
                {
                  "outline -outline-offset-2 outline-2 outline-primary":
                    item.active,
                }
              )}
              onClick={(e) => handleFieldClick(e, index)}
            >
              <span className="text-sm">
                {index + 1}.{item.title}
              </span>
              <span className="absolute right-4 bottom-2 text-default-400">
                {item.controlType}
              </span>
            </DndSortableItem>
          ))}
        </ul>
      </SortableContext>
    </DndDroppable>
  );
}
