import React from "react";
import {useDroppable} from '@dnd-kit/core';

export function Droppable({children, id, className, ...props}: { children: React.ReactNode, id: string, className:string }) {
    const {isOver, setNodeRef} = useDroppable({
        id,
    });

    return (
        <div {...props} ref={setNodeRef} className={`relative ${isOver ? 'bg-gray-100' : ''}`  + className}>
            {children}
        </div>
    );
}