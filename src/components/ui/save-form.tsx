"use client"

import React from "react";
import Block from '@/components/shared/block';
import {Tabs, Tab} from "@nextui-org/react";
import ControlList from "@/components/ui/control-list";
import {Input,Textarea,Select, SelectItem,Switch, cn} from "@nextui-org/react";

export default function SaveForm() {
    const [selected, setSelected] = React.useState<string | number>("form");


    return (
        <div className="grid  gap-4 grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr_300px] grid-rows-[1fr_56px] h-full">
            <Block className="xl:block hidden">
                <Tabs
                    fullWidth
                    size="md"
                    aria-label="Controls"
                    className=""
                >
                    <Tab key="controls" title="Controls" className="px-0">
                        <ControlList/>
                    </Tab>
                </Tabs>
            </Block>
            <Block>
                <></>

            </Block>
            <Block>
                <Tabs
                    fullWidth
                    size="md"
                    aria-label="Options"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                >
                    <Tab key="controls" title="Controls" className="px-0 xl:hidden block">
                        <ControlList/>
                    </Tab>
                    <Tab key="form" title="Form" className="px-0 grid grid-flow-row gap-3">
                        <Input
                            isRequired
                            type="text"
                            label="Title"
                            placeholder="Enter form title"
                            className="max-w-xs"
                            size="sm"
                        />
                        <Textarea
                            label="Description"
                            placeholder="Enter form description"
                            className="max-w-xs"
                            size="sm"
                        />
                        <Select
                            label="Sequential numbering style"
                            placeholder=""
                            className="max-w-xs"
                            defaultSelectedKeys={["None"]}
                        >
                                <SelectItem key="None">None</SelectItem>
                                <SelectItem key="Arabic numerals">Arabic numerals</SelectItem>

                        </Select>
                        <Switch
                            classNames={{
                                base: cn(
                                    "inline-flex flex-row-reverse w-full max-w-md bg-content2 hover:bg-content2 items-center",
                                    "justify-between cursor-pointer rounded-lg gap-2 px-3 py-1 border-2 border-transparent",
                                    "data-[selected=true]:border-primary",
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
                                <p className="text-medium">Enable</p>
                                <p className="text-tiny text-default-400">
                                    Get access to new features .
                                </p>
                            </div>
                        </Switch>
                    </Tab>
                    <Tab key="property" title="Property" className="px-0">

                    </Tab>
                </Tabs>
            </Block>
            <Block className={"col-span-2 xl:col-span-3"}>
                <div></div>
            </Block>
        </div>
    );
}
