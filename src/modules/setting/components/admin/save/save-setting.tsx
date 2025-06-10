'use client'

import Block from '@/modules/common/components/shared/block';
import {Button, Tab, Tabs, Switch, Input, RadioGroup, Radio} from "@heroui/react";
import React from "react";
import {Select, SelectItem} from "@heroui/react";

export default function SaveSetting() {

    return (
        <div className="h-full grid grid-rows-[1fr_56px] gap-4">
            <Block>
                &nbsp;
            </Block>
            <Block className={"text-center pt-3"}>
                <Button color="primary" size="sm" variant="shadow" radius="sm">Save</Button> &nbsp;
                <Button color="primary" radius="sm" size="sm" variant="flat">Reset</Button>
            </Block>
        </div>
    );
}