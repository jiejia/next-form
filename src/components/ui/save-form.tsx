"use client";

import React, {useState} from "react";
import Block from "@/components/shared/block";
import {Tabs, Tab, Button} from "@nextui-org/react";
import {
    Input,
    Textarea,
    Select,
    SelectItem,
    Switch,
    cn,
} from "@nextui-org/react";
import Scroll from "@/components/shared/scroll";
import Image from "next/image";
import {SortableItem} from "@/components/shared/sortable-item";
import {Droppable} from "@/components/shared/droppable";
import {Item} from "@/components/shared/item";
import {
    DndContext,
    DragOverlay,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent, DragEndEvent, DragMoveEvent
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const initialControlItems = [
    {icon: "/svgs/input_text.svg", type: "Input Text"},
    {icon: "/svgs/textarea.svg", type: "Textarea"},
    {icon: "/svgs/select.svg", type: "Select"},
    {icon: "/svgs/checkbox.svg", type: "Checkbox"},
    {icon: "/svgs/radio.svg", type: "Radio"},
    {icon: "/svgs/date.svg", type: "Date"},
];

const initialElementItems = [
    {title: "请输入标题", type: "Textarea"},
    {title: "请输入标题", type: "Textarea"},

];

interface DraggableItem {
    id: number;
    area: string;
}

interface ControlItem {
    icon: string;
    type: string;
}

interface ElementItem {
    title: string;
    type: string;
}


export default function SaveForm() {
    const [selected, setSelected] = React.useState<string | number>("form");

    const [activeItem, setActiveItem] = useState<DraggableItem | null>(null);
    const [overItem, setOverItem] = useState<DraggableItem | null>(null);


    const [controlItems, setControlItems] = useState<ControlItem[]>(initialControlItems);
    const [elementItems, setElementItems] = useState<ElementItem[]>(initialElementItems);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // get draggable item
    const getDraggableItem = (currentId: string): DraggableItem => {
        let area = null;
        if (currentId.toString().includes('element')) {
            area = 'element';
        } else if (currentId.toString().includes('control')) {
            area = 'control';
        } else {
            area = 'recycle';
        }

        let id = currentId.split("-").pop();

        if (!id) {
            id = '0';
        }

        return {
            id: parseInt(id),
            area: area,
        };
    }

    function handleDragStart(event: DragStartEvent) {
        // get active item
        const {active} = event;

        const currentActiveItem = getDraggableItem(active.id.toString());
        setActiveItem(currentActiveItem);
    }

    function handleDragEnd(event: DragEndEvent) {

        const {active, over} = event;

        const currentActiveItem = getDraggableItem(active.id.toString());
        setActiveItem(currentActiveItem);


        if (over) {
            const currentOverItem = getDraggableItem(over.id.toString());
            setOverItem(currentOverItem);
            console.log(currentActiveItem, currentOverItem)

            // drag control to element
            if (currentActiveItem.area == 'control' && currentOverItem.area == 'element') {
                const newElementItems = [...elementItems];
                newElementItems.splice(currentOverItem.id, 0, {
                    title: "请输入标题",
                    type: controlItems[currentActiveItem.id].type,
                });
                setElementItems(newElementItems);
            }

            // drag element to element
            if (currentActiveItem.area == 'element' && currentOverItem.area == 'element') {
                const newElementItems = [...elementItems];
                const [removed] = newElementItems.splice(currentActiveItem.id, 1);
                newElementItems.splice(currentOverItem.id, 0, removed);
                setElementItems(newElementItems);
            }

            // drag element to recycle(remove element)
            if (currentActiveItem.area == 'element' && currentOverItem.area == 'recycle') {
                const newElementItems = [...elementItems];
                newElementItems.splice(currentActiveItem.id, 1);
                setElementItems(newElementItems);
            }
        }

    }

    function handleDragMove(event: DragMoveEvent) {

    }

    return (
        <div
            className="grid  gap-4 grid-cols-[1fr] sm:grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr_300px] grid-rows-[1fr_1fr_56px] sm:grid-rows-[1fr_56px] h-full">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
            >
                <Block className="xl:grid hidden xl:grid-rows-[40px_1fr]">
                    <Tabs fullWidth size="md" aria-label="Controls" className="">
                        <Tab key="controls" title="Controls" className="!px-0 pb-0">
                            <Scroll>
                                <ul
                                    id="controls"
                                    className="grid grid-cols-2 gap-2 text-left indent-1 text-xs content-start"
                                >
                                    <SortableContext
                                        items={controlItems.map((_, index) => index)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {controlItems.map((item, index) => (
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
                                    </SortableContext>
                                </ul>
                            </Scroll>
                        </Tab>
                    </Tabs>
                </Block>
                <Block className="pr-2">
                    <div className="grid grid-rows-[1fr_50px] gap-2 h-full">
                        <Scroll>
                            <ul
                                id="elements"
                                className="grid grid-cols-1 gap-2 text-left indent-1 text-xs content-start"
                            >
                                <SortableContext
                                    items={elementItems.map((_, index) => index)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {elementItems.map((item, index) => (
                                        <SortableItem
                                            key={index}
                                            id={"element-" + index}
                                            className="p-2 bg-content2 rounded-lg border-default border-0 relative z-40"
                                        >
                                            <span className="text-sm">{index + 1}.{item.title}</span>
                                            <span className="absolute right-4 bottom-2 text-default-400">{item.type}</span>
                                        </SortableItem>
                                    ))}
                                </SortableContext>
                            </ul>
                        </Scroll>
                        <Droppable id="recycle" className="mr-2 bg-red-50 rounded-lg flex justify-center items-center">
                                <Image src="/svgs/recycle.svg"
                                       alt="recycle" className="text-red-400"
                                       width={15} height={15}/>
                        </Droppable>

                    </div>

                </Block>
                <Block className="grid grid-rows-[40px_1fr]">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Options"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                        className=""
                    >
                        <Tab
                            key="controls"
                            title="Controls"
                            className="px-0 xl:hidden block pb-0"
                        >
                            <Scroll>
                                <ul
                                    id="controls"
                                    className="grid grid-cols-2 gap-2 text-left indent-1 text-xs content-start"
                                >
                                    <SortableContext
                                        items={controlItems.map((_, index) => index)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {controlItems.map((item, index) => (
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
                                    </SortableContext>
                                </ul>
                            </Scroll>
                        </Tab>
                        <Tab key="form" title="Form" className="px-0 pb-0">
                            <Scroll>
                                <div className="grid grid-flow-row gap-3 content-start">
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Title"
                                        placeholder=" "
                                        className="max-w-full"
                                        size="sm"
                                    />
                                    <Textarea
                                        label="Description"
                                        placeholder=" "
                                        className="max-w-full"
                                        size="sm"
                                    />
                                    <Select
                                        label="Sequential numbering style"
                                        placeholder=""
                                        className="max-w-full"
                                        defaultSelectedKeys={["None"]}
                                    >
                                        <SelectItem key="None">None</SelectItem>
                                        <SelectItem key="Arabic numerals">
                                            Arabic numerals
                                        </SelectItem>
                                    </Select>
                                    <Switch
                                        classNames={{
                                            base: cn(
                                                "inline-flex flex-row-reverse w-full max-w-md bg-content2 hover:bg-content2 items-center",
                                                "justify-between cursor-pointer rounded-lg gap-2 px-3 py-3 border-2 border-transparent",
                                                "data-[selected=true]:border-primary max-w-full"
                                            ),
                                            wrapper: "p-0 h-4 overflow-visible",
                                            thumb: cn(
                                                "w-6 h-6 border-2 shadow-lg",
                                                "group-data-[hover=true]:border-primary",
                                                //selected
                                                "group-data-[selected=true]:ml-6",
                                                // pressed
                                                "group-data-[pressed=true]:w-7",
                                                "group-data-[selected]:group-data-[pressed]:ml-4"
                                            ),
                                        }}
                                        size="md"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <p className="text-tiny text-default-600">Required</p>
                                        </div>
                                    </Switch>
                                </div>
                            </Scroll>
                        </Tab>
                        <Tab key="property" title="Property" className="px-0 pb-0">
                            <Scroll>
                                <div className="grid grid-flow-row gap-3 content-start">
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Title"
                                        placeholder=" "
                                        className="max-w-full"
                                        size="sm"
                                    />
                                    <Input
                                        type="text"
                                        label="Description"
                                        placeholder=" "
                                        className="max-w-full"
                                        size="sm"
                                    />
                                    <Input
                                        type="text"
                                        label="Regrex"
                                        placeholder=" "
                                        className="max-w-full"
                                        size="sm"
                                    />
                                    <Switch
                                        classNames={{
                                            base: cn(
                                                "inline-flex flex-row-reverse w-full max-w-md bg-content2 hover:bg-content2 items-center",
                                                "justify-between cursor-pointer rounded-lg gap-2 px-3 py-3 border-2 border-transparent",
                                                "data-[selected=true]:border-primary max-w-full"
                                            ),
                                            wrapper: "p-0 h-4 overflow-visible",
                                            thumb: cn(
                                                "w-6 h-6 border-2 shadow-lg",
                                                "group-data-[hover=true]:border-primary",
                                                //selected
                                                "group-data-[selected=true]:ml-6",
                                                // pressed
                                                "group-data-[pressed=true]:w-7",
                                                "group-data-[selected]:group-data-[pressed]:ml-4"
                                            ),
                                        }}
                                        size="md"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <p className="text-tiny text-default-600">Required</p>
                                        </div>
                                    </Switch>
                                </div>
                            </Scroll>
                        </Tab>
                    </Tabs>
                </Block>
                <Block
                    className={"col-span-1 sm:col-span-2 xl:col-span-3 text-center pt-3"}
                >
                    <Button color="primary" size="sm" variant="shadow" radius="sm">
                        Create
                    </Button>{" "}
                    <Button color="primary" radius="sm" size="sm" variant="flat">
                        Reset
                    </Button>
                </Block>
                <DragOverlay>
                    {activeItem ? (
                        activeItem.area == 'control' ? (
                            controlItems[activeItem.id] ? (
                                <Item
                                    className="p-2 bg-content3 rounded-lg border-default border-0 grid grid-cols-[20px_1fr] z-40 text-xs"
                                >
                                <Image
                                    src={
                                        controlItems[activeItem.id].icon
                                    }
                                    alt="Next Form"
                                    className="w-4 h-4"
                                    width={20}
                                    height={20}
                                />
                                <span>
                                  {
                                      controlItems[activeItem.id].type
                                  }
                                </span>
                            </Item> ) : null
                        ) : (
                            elementItems[activeItem.id] ? (
                                <Item
                                    className="p-2 bg-content3 rounded-lg border-default border-0 relative z-40 text-xs"
                                >
                                <span className="text-sm">
                                  {
                                      elementItems[activeItem.id].title
                                  }
                                </span>
                                <span className="absolute right-4 bottom-2 text-default-400">
                                  {
                                      elementItems[activeItem.id].type
                                  }
                                </span>
                            </Item>
                        ) : null )       
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
