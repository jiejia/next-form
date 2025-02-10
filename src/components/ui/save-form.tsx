"use client";

import React, { useState } from "react";
import Block from "@/components/shared/block";
import { Tabs, Tab, Button } from "@nextui-org/react";
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
import { SortableItem } from "@/components/shared/sortable-item";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const initialControlItems = [
  { id: 1, icon: "/svgs/input_text.svg", type: "Input Text" },
  { id: 2, icon: "/svgs/textarea.svg", type: "Textarea" },
  { id: 3, icon: "/svgs/select.svg", type: "Select" },
  { id: 4, icon: "/svgs/checkbox.svg", type: "Checkbox" },
  { id: 5, icon: "/svgs/radio.svg", type: "Radio" },
  { id: 6, icon: "/svgs/date.svg", type: "Date" },
];

const initialElementItems = [
  { id: 1, title: "1. 测试", type: "Textarea" },
  { id: 2, title: "1. 测试", type: "Textarea" },
  { id: 3, title: "1. 测试", type: "Textarea" },
  { id: 4, title: "1. 测试", type: "Textarea" },
  { id: 5, title: "1. 测试", type: "Textarea" },
  { id: 6, title: "1. 测试", type: "Textarea" },
];

export default function SaveForm() {
  const [selected, setSelected] = React.useState<string | number>("form");

  const [activeId, setActiveId] = useState<string | null>(null);

  const [controlItems, setControlItems] = useState(initialControlItems);
  const [elementItems, setElementItems] = useState(initialElementItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // dragging logic
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setControlItems((controlItems) => {
        const oldIndex = controlItems.indexOf(active.id);
        const newIndex = controlItems.indexOf(over.id);

        return arrayMove(controlItems, oldIndex, newIndex);
      });
    }

    setActiveId(active.id);
  }

  return (
    <div className="grid  gap-4 grid-cols-[1fr] sm:grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr_300px] grid-rows-[1fr_1fr_56px] sm:grid-rows-[1fr_56px] h-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
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
                    items={controlItems}
                    strategy={verticalListSortingStrategy}
                  >
                    {controlItems.map((item) => (
                      <SortableItem
                        key={item.id}
                        id={"control_" + item.id}
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
          <Scroll>
            <ul
              id="elements"
              className="grid grid-cols-1 gap-2 text-left indent-1 text-xs content-start"
            >
              <SortableContext
                items={elementItems}
                strategy={verticalListSortingStrategy}
              >
                {elementItems.map((item) => (
                  <SortableItem
                    key={item.id}
                    id={"element_" + item.id}
                    className="p-4 bg-content2 rounded-lg border-default border-0 relative z-40"
                  >
                    <span className="text-sm">{item.title}</span>
                    <span className="absolute right-4 bottom-2 text-default-400">
                      {item.type}
                    </span>
                  </SortableItem>
                ))}
              </SortableContext>
            </ul>
          </Scroll>
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
                  {controlItems.map((item, index) => (
                    <li
                      key={index}
                      className="p-2 bg-content2 rounded-lg border-default border-0 grid grid-cols-[20px_1fr]"
                    >
                      <Image
                        src={item.icon}
                        alt="Next Form"
                        className="w-4 h-4"
                        width={20}
                        height={20}
                      />
                      <span>{item.type}</span>
                    </li>
                  ))}
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
          {activeId ? (
            activeId.includes("control") ? (
              <SortableItem
                key={activeId}
                id={activeId}
                className="p-2 bg-content2 rounded-lg border-default border-0 grid grid-cols-[20px_1fr] z-40"
              >
                <Image
                  src={
                    controlItems.find(
                      (item) => item.id === activeId.replace("control_", "")
                    )?.icon
                  }
                  alt="Next Form"
                  className="w-4 h-4"
                  width={20}
                  height={20}
                />
                <span>
                  {
                    controlItems.find(
                      (item) => item.id === activeId.replace("control_", "")
                    )?.type
                  }
                </span>
              </SortableItem>
            ) : (
              <SortableItem
                key={activeId}
                id={activeId}
                className="p-4 bg-content2 rounded-lg border-default border-0 relative z-40"
              >
                <span className="text-sm">
                  {
                    controlItems.find(
                      (item) => item.id === activeId.replace("element_", "")
                    )?.title
                  }
                </span>
                <span className="absolute right-4 bottom-2 text-default-400">
                  {
                    controlItems.find(
                      (item) => item.id === activeId.replace("element_", "")
                    )?.type
                  }
                </span>
              </SortableItem>
            )
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
