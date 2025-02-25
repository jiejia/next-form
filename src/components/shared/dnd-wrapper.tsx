import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    rectIntersection, // 添加这个导入
} from "@dnd-kit/core";
import {sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {DragEndEvent, DragMoveEvent, DragStartEvent} from "@dnd-kit/core";
import React from "react";

export default function DndWrapper({
                                       handleDragEnd,
                                       handleDragStart,
                                       handleDragMove,
                                    children
                                   }: {
    handleDragEnd: (event: DragEndEvent) => void;
    handleDragStart: (event: DragStartEvent) => void;
    handleDragMove: (event: DragMoveEvent) => void;
    children: React.ReactNode;
}) {

    const sensors = useSensors(
        useSensor(PointerSensor),
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
            ｛children｝
        </DndContext>
    );
}