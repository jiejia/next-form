import {Field} from "@/types/form";
import {DndDroppable} from "@/components/shared/dnd-droppable";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {DndSortableItem} from "@/components/shared/dnd-sortable-item";
import React from "react";

export default function Fields({fields}: { fields: Field[] }) {
    return (
        <DndDroppable
            id={"fields-" + fields.length}
            className="h-full"
        >
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
                            className="p-2 bg-content2 rounded-lg border-default border-0 relative z-40"
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