import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {SortableItem} from "@/components/shared/sortable-item";
import Image from "next/image";
import React from "react";
import {Control} from "@/types/form";


export default function Controls({controls}: { controls: Control[] }) {

    return (
        <SortableContext
            items={controls.map((_, index) => index)}
            strategy={verticalListSortingStrategy}
        >
            <ul
                id="controls"
                className="grid grid-cols-2 gap-2 text-left indent-1 text-xs content-start h-full"
            >
                {controls.map((item, index) => (
                    <SortableItem
                        key={index}
                        id={"control-" + index}
                        className="p-2 bg-content2 rounded-lg border-default border-0 grid grid-cols-[20px_1fr] z-40"
                    >
                        <Image
                            src={item.icon}
                            alt="Next Form"
                            className="w-4 h-4"
                            width={20}
                            height={20}
                        />
                        <span>{item.type}</span>
                    </SortableItem>
                ))}
            </ul>
        </SortableContext>
    );
}