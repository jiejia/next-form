import React from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export function SortableItem({
                                 children,
                                 id,
                                 className,
                             }: {
    children: React.ReactNode;
    id: string;
    className?: string;
}) {
    const {attributes, listeners, setNodeRef, transform, transition} =
        useSortable({
            id: id,
        });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li ref={setNodeRef} className={className} style={style} {...attributes} {...listeners}>
            {children}
        </li>
    );
}
