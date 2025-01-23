"use client"

import React from "react";
import Block from '@/components/shared/block';
import {Tabs, Tab, Button} from "@nextui-org/react";
import ControlList from "@/components/ui/control-list";
import {Input,Textarea,Select, SelectItem,Switch, cn} from "@nextui-org/react";
import Scroll from "@/components/shared/scroll";
import {DndContext} from '@dnd-kit/core';
import Image from "next/image";


export default function SaveForm() {
    const [selected, setSelected] = React.useState<string | number>("form");
    return (
        <div className="grid  gap-4 grid-cols-[1fr] sm:grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr_300px] grid-rows-[1fr_1fr_56px] sm:grid-rows-[1fr_56px] h-full">
            <DndContext>
                <Block className="xl:grid hidden xl:grid-rows-[40px_1fr]">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Controls"
                        className=""
                    >
                        <Tab key="controls" title="Controls" className="!px-0 pb-0">
                            <Scroll>
                                <ul className="grid grid-cols-2 gap-2 text-left indent-1 text-xs content-start">
                                    <li className="p-2 bg-content2 rounded-lg border-default border-0 grid grid-cols-[20px_1fr]">
                                        <Image src="/svgs/input_text.svg" alt="Next Form" className="w-4 h-4" width={20}
                                               height={20}/>
                                        <span>Input Text</span>
                                    </li>
                                    <li className="p-2 bg-content2 rounded-lg border-default border-0 grid grid-cols-[20px_1fr]">
                                        <Image src="/svgs/textarea.svg" alt="Next Form" className="w-4 h-4" width={20}
                                               height={20}/>
                                        <span>Textarea</span>
                                    </li>
                                    <li className="p-2 bg-content2 rounded-lg border-default border-0 grid grid-cols-[20px_1fr]">
                                        <Image src="/svgs/select.svg" alt="Next Form" className="w-4 h-4" width={20}
                                               height={20}/>
                                        <span>Select</span>
                                    </li>
                                    <li className="p-2 bg-content2 rounded-lg border-default border-0 grid grid-cols-[20px_1fr]">
                                        <Image src="/svgs/checkbox.svg" alt="Next Form" className="w-4 h-4" width={20}
                                               height={20}/>
                                        <span>Checkbox</span>
                                    </li>
                                    <li className="p-2 bg-content2 rounded-lg border-default border-0 grid grid-cols-[20px_1fr]">
                                        <Image src="/svgs/radio.svg" alt="Next Form" className="w-4 h-4" width={20}
                                               height={20}/>
                                        <span>Radio</span>
                                    </li>
                                    <li className="p-2 bg-content2 rounded-lg border-default border-0 grid grid-cols-[20px_1fr]">
                                        <Image src="/svgs/date.svg" alt="Next Form" className="w-4 h-4" width={20}
                                               height={20}/>
                                        <span>Date</span>
                                    </li>

                                </ul>
                            </Scroll>
                        </Tab>
                    </Tabs>
                </Block>
                <Block className="pr-2">
                    <Scroll>
                        <ul className="grid grid-cols-1 gap-2 text-left indent-1 text-xs content-start">
                            <li className="p-4 bg-content2 rounded-lg border-default border-0 relative">
                                <span className="text-sm">1. 测试</span>
                                <span className="absolute right-4 bottom-2 text-default-400">Textarea</span>
                            </li>
                            <li className="p-4 bg-content2 rounded-lg border-default border-0 relative">
                                <span className="text-sm">1. 测试</span>
                                <span className="absolute right-4 bottom-2 text-default-400">Textarea</span>
                            </li>
                            <li className="p-4 bg-content2 rounded-lg border-default border-0 relative">
                                <span className="text-sm">1. 测试</span>
                                <span className="absolute right-4 bottom-2 text-default-400">Textarea</span>
                            </li>
                            <li className="p-4 bg-content2 rounded-lg border-default border-0 relative">
                                <span className="text-sm">1. 测试</span>
                                <span className="absolute right-4 bottom-2 text-default-400">Textarea</span>
                            </li>
                            <li className="p-4 bg-content2 rounded-lg border-default border-0 relative">
                                <span className="text-sm">1. 测试</span>
                                <span className="absolute right-4 bottom-2 text-default-400">Textarea</span>
                            </li>
                            <li className="p-4 bg-content2 rounded-lg border-default border-0 relative">
                                <span className="text-sm">1. 测试</span>
                                <span className="absolute right-4 bottom-2 text-default-400">Textarea</span>
                            </li>

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
                        <Tab key="controls" title="Controls" className="px-0 xl:hidden block pb-0">
                            <Scroll>
                                <ControlList/>
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
                                        <SelectItem key="Arabic numerals">Arabic numerals</SelectItem>

                                    </Select>
                                    <Switch
                                        classNames={{
                                            base: cn(
                                                "inline-flex flex-row-reverse w-full max-w-md bg-content2 hover:bg-content2 items-center",
                                                "justify-between cursor-pointer rounded-lg gap-2 px-3 py-3 border-2 border-transparent",
                                                "data-[selected=true]:border-primary max-w-full",
                                            ),
                                            wrapper: "p-0 h-4 overflow-visible",
                                            thumb: cn("w-6 h-6 border-2 shadow-lg",
                                                "group-data-[hover=true]:border-primary",
                                                //selected
                                                "group-data-[selected=true]:ml-6",
                                                // pressed
                                                "group-data-[pressed=true]:w-7",
                                                "group-data-[selected]:group-data-[pressed]:ml-4",
                                            ),
                                        }}
                                        size="md"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <p className="text-tiny text-default-600">
                                                Required
                                            </p>
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
                                                "data-[selected=true]:border-primary max-w-full",
                                            ),
                                            wrapper: "p-0 h-4 overflow-visible",
                                            thumb: cn("w-6 h-6 border-2 shadow-lg",
                                                "group-data-[hover=true]:border-primary",
                                                //selected
                                                "group-data-[selected=true]:ml-6",
                                                // pressed
                                                "group-data-[pressed=true]:w-7",
                                                "group-data-[selected]:group-data-[pressed]:ml-4",
                                            ),
                                        }}
                                        size="md"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <p className="text-tiny text-default-600">
                                                Required
                                            </p>
                                        </div>
                                    </Switch>
                                </div>
                            </Scroll>
                        </Tab>
                    </Tabs>
                </Block>
                <Block className={"col-span-1 sm:col-span-2 xl:col-span-3 text-center pt-3"}>
                    <Button color="primary" size="sm" variant="shadow" radius="sm">Create</Button> <Button
                    color="primary" radius="sm" size="sm" variant="flat">Reset</Button>
                </Block>
            </DndContext>

        </div>
    );
}
