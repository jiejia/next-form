import React from 'react';
import {useDroppable} from '@dnd-kit/core';

interface DroppableProps {
    id: string;
    children: React.ReactNode;
}

export default function Droppable({id, children}: DroppableProps) {
    const {setNodeRef, isOver} = useDroppable({
        id: id
    });

    return (
        <div ref={setNodeRef} style={{ position: 'relative', height: '100%' }}>
            {children}
        </div>
    );
}