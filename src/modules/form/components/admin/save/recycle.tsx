import {DndDroppable} from "@/modules/common/components/shared/dnd-droppable";
import Image from "next/image";
import React from "react";


export default function Recycle() {
    return (
        <DndDroppable
            id="recycle"
            className="mr-2 bg-red-50 rounded-lg flex justify-center items-center"
        >
            <Image
                src="/svgs/recycle.svg"
                alt="recycle"
                className="text-red-400"
                width={15}
                height={15}
            />
        </DndDroppable>
    );
}