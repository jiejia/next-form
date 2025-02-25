import {cn, Input, Select, SelectItem, Switch, Textarea} from "@nextui-org/react";
import React from "react";

export default function Form() {
    return (
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
    );
}