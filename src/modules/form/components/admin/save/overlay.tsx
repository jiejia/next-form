import {DragOverlay} from "@dnd-kit/core";
import {Item} from "@/modules/common/components/shared/item";
import Image from "next/image";
import React from "react";
import {Control, DraggableItem, Field} from "@/modules/form/types/form";
import clsx from "clsx";


export default function Overlay({activeItem, fields, controls}: {activeItem: DraggableItem, fields: Field[], controls: Control[]}) {
    return (
        <DragOverlay>
            {activeItem &&
                (activeItem.area === "control"
                    ? controls[activeItem.id] && (
                    <Item
                        className="p-2 bg-content3 rounded-lg border-default border-0 grid grid-cols-[20px_1fr] z-40 text-xs">
                        <Image
                            src={controls[activeItem.id].icon}
                            alt="Next Form"
                            className="w-4 h-4"
                            width={20}
                            height={20}
                        />
                        <span>{controls[activeItem.id].type}</span>
                    </Item>
                )
                    : fields[activeItem.id] && (
                    <Item className={clsx('p-2 bg-content3 rounded-lg border-default border-0 relative z-40 text-xs', {"outline -outline-offset-2 outline-2 outline-primary": fields[activeItem.id].active})}>
                    <span className="text-sm">
                      {fields[activeItem.id].title}
                    </span>
                        <span className="absolute right-4 bottom-2 text-default-400">
                      {fields[activeItem.id].controlType}
                    </span>
                    </Item>
                ))}
        </DragOverlay>
    )
}