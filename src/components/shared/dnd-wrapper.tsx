import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    rectIntersection,
    DragEndEvent,
    DragMoveEvent,
    DragStartEvent
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React from "react";

interface DndWrapperProps {
    children: React.ReactNode;
    handleDragEnd: (event: DragEndEvent) => void;
    handleDragStart: (event: DragStartEvent) => void;
    handleDragMove: (event: DragMoveEvent) => void;
}

export default function DndWrapper({
                                       children,
                                       handleDragEnd,
                                       handleDragStart,
                                       handleDragMove
                                   }: DndWrapperProps) {

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 1,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    return (
        <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
        >
            {children}
        </DndContext>
    );
}