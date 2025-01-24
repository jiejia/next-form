import React from 'react';
import {useDraggable} from '@dnd-kit/core';

interface DraggableProps {
    id: string;
    data?: any;
    children: React.ReactNode;
}

export default function Draggable({id, data, children}: DraggableProps) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
        data: data
    });
    
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}