'use client'

import Block from "@/components/shared/block";
import {Button, Tab, Tabs} from "@nextui-org/react";
import React from "react";
import {Select, SelectItem} from "@nextui-org/react";

export default function SaveSetting() {
    const animals = [
        {key: "cat", label: "Cat"},
        {key: "dog", label: "Dog"},
        {key: "elephant", label: "Elephant"},
        {key: "lion", label: "Lion"},
        {key: "tiger", label: "Tiger"},
        {key: "giraffe", label: "Giraffe"},
        {key: "dolphin", label: "Dolphin"},
        {key: "penguin", label: "Penguin"},
        {key: "zebra", label: "Zebra"},
        {key: "shark", label: "Shark"},
        {key: "whale", label: "Whale"},
        {key: "otter", label: "Otter"},
        {key: "crocodile", label: "Crocodile"},
    ];

    return (
        <div className="h-full grid grid-rows-[1fr_56px] gap-4">
            <Block>
                <Tabs
                    fullWidth
                    size="md"
                    aria-label="General"
                    className=""
                >
                    <Tab key="general" title="General" className="!px-0 pb-0">
                        <div className="grid grid-flow-col gap-4">
                            <Select
                                size="sm"
                                className="max-w-full"
                                label="Language"
                                placeholder="Select an animal"
                            >
                                {animals.map((animal) => (
                                    <SelectItem key={animal.key}>{animal.label}</SelectItem>
                                ))}
                            </Select>
                        </div>
                    </Tab>
                </Tabs>
            </Block>
            <Block className={"text-center pt-3"}>
                <Button color="primary" size="sm" variant="shadow" radius="sm">Save</Button> &nbsp;
                <Button color="primary" radius="sm" size="sm" variant="flat">Reset</Button>
            </Block>
        </div>
    );
}