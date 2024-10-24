"use client"

import React from "react";
import Block from '@/components/shared/block';
import {Tabs, Tab} from "@nextui-org/react";
import Image from "next/image";

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
                                <Image src="/svgs/textarea.svg" alt="Next Form" className="w-4 h-4" width={20}
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

                    </Tab>
                    <Tab key="form" title="Form" className="px-0">

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
