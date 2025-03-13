'use client'

import Block from "@/components/shared/block";
import {Button, Tab, Tabs, Switch, Input, RadioGroup, Radio} from "@heroui/react";
import React from "react";
import {Select, SelectItem} from "@heroui/react";

export default function SaveSetting() {
    const languages = [
        {key: "en", label: "English"},
        {key: "zh", label: "中文"},
        {key: "ja", label: "日本語"},
        {key: "ko", label: "한국어"},
    ];

    const themes = [
        {key: "light", label: "Light"},
        {key: "dark", label: "Dark"},
        {key: "system", label: "Follow System"},
    ];

    const layouts = [
        {key: "vertical", label: "Vertical"},
        {key: "horizontal", label: "Horizontal"},
        {key: "inline", label: "Inline"},
    ];

    const submitActions = [
        {key: "message", label: "Show Message"},
        {key: "redirect", label: "Redirect"},
        {key: "reset", label: "Reset Form"},
    ];

    return (
        <div className="h-full grid grid-rows-[1fr_56px] gap-4">
            <Block>
                <Tabs
                    fullWidth
                    size="md"
                    aria-label="Settings"
                    className=""
                >
                    <Tab key="general" title="General" className="!px-0 pb-0">
                        <div className="grid gap-4">
                            <Select
                                size="sm"
                                label="Language"
                                placeholder="Select language"
                            >
                                {languages.map((lang) => (
                                    <SelectItem key={lang.key}>{lang.label}</SelectItem>
                                ))}
                            </Select>

                            <Select
                                size="sm"
                                label="Theme"
                                placeholder="Select theme"
                            >
                                {themes.map((theme) => (
                                    <SelectItem key={theme.key}>{theme.label}</SelectItem>
                                ))}
                            </Select>

                            <Select
                                size="sm"
                                label="Form Layout"
                                placeholder="Select layout"
                            >
                                {layouts.map((layout) => (
                                    <SelectItem key={layout.key}>{layout.label}</SelectItem>
                                ))}
                            </Select>
                        </div>
                    </Tab>

                    <Tab key="submit" title="Submit" className="!px-0 pb-0">
                        <div className="grid gap-4">
                            <Input
                                size="sm"
                                label="Submit Button Text"
                                placeholder="Enter submit button text"
                                defaultValue="Submit"
                            />

                            <Select
                                size="sm"
                                label="After Submit Action"
                                placeholder="Select action"
                            >
                                {submitActions.map((action) => (
                                    <SelectItem key={action.key}>{action.label}</SelectItem>
                                ))}
                            </Select>

                            <Input
                                size="sm"
                                label="Success Message"
                                placeholder="Enter success message"
                                defaultValue="Form submitted successfully!"
                            />
                        </div>
                    </Tab>

                    <Tab key="validation" title="Validation" className="!px-0 pb-0">
                        <div className="grid gap-4">
                            <div className="flex justify-between items-center">
                                <span>Real-time Validation</span>
                                <Switch size="sm" defaultSelected />
                            </div>

                            <RadioGroup
                                label="Error Display Mode"
                                defaultValue="inline"
                                size="sm"
                            >
                                <Radio value="inline">Inline</Radio>
                                <Radio value="tooltip">Tooltip</Radio>
                                <Radio value="message">Message</Radio>
                            </RadioGroup>

                            <div className="flex justify-between items-center">
                                <span>Show Required Mark</span>
                                <Switch size="sm" defaultSelected />
                            </div>
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