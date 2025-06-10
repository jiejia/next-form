'use client'

import Block from '@/modules/common/components/shared/block';
import {Button, Switch, Input, Textarea} from "@heroui/react";
import React from "react";
import {Select, SelectItem} from "@heroui/react";
import Menu from './menu';

export default function General() {

    const languages = [
        {key: "zh-CN", label: "简体中文"},
        {key: "en-US", label: "English"},
        {key: "ja-JP", label: "日本語"},
        {key: "ko-KR", label: "한국어"},
    ];

    return (
        <div className="h-full grid grid-rows-[1fr] gap-4">
            <div className="h-full grid grid-cols-[75px_1fr] sm:grid-cols-[250px_1fr] gap-4">
                <Menu activeItem="general" />
                <Block className="h-full grid grid-rows-[1fr_36px] gap-4">
                    <ul className="h-full grid gap-2 content-start">
                        <li className="border-b border-gray-200 pb-2 border-dotted">
                            <div className="grid grid-cols-[1fr_1fr] gap-2">
                                <div className="grid content-center"><label htmlFor="site-name" className="text-sm text-gray-600">站点名称</label></div>
                                <div className="grid content-center justify-end"><Input className="w-64" placeholder="站点名称" type="text"  id="site-name" name="site-name" size="sm"/></div>
                            </div>
                        </li>
                        <li className="border-b border-gray-200 pb-2 border-dotted">
                            <div className="grid grid-cols-[1fr_1fr] gap-2">
                                <div className="grid content-center"><label htmlFor="site-description" className="text-sm text-gray-600">站点描述</label></div>
                                <div className="grid content-center justify-end">
                                    <Textarea 
                                        className="w-64" 
                                        placeholder="请输入站点描述" 
                                        id="site-description" 
                                        name="site-description" 
                                        size="sm"
                                        minRows={3}
                                        maxRows={5}
                                    />
                                </div>
                            </div>
                        </li>
                        <li className="border-b border-gray-200 pb-2 border-dotted">
                            <div className="grid grid-cols-[1fr_1fr] gap-2">
                                <div className="grid content-center"><label htmlFor="language" className="text-sm text-gray-600">语言</label></div>
                                <div className="grid content-center justify-end">
                                    <Select 
                                        className="w-64" 
                                        placeholder="请选择语言" 
                                        id="language" 
                                        name="language" 
                                        size="sm"
                                        defaultSelectedKeys={["zh-CN"]}
                                    >
                                        {languages.map((language) => (
                                            <SelectItem key={language.key}>
                                                {language.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </li>
                        <li className="border-b border-gray-200 pb-2 border-dotted">
                            <div className="grid grid-cols-[1fr_1fr] gap-2">
                                <div className="grid content-center"><label htmlFor="maintenance-mode" className="text-sm text-gray-600">维护模式</label></div>
                                <div className="grid content-center justify-end">
                                    <Switch 
                                        id="maintenance-mode" 
                                        name="maintenance-mode"
                                        size="sm"
                                        defaultSelected={false}
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className={"text-center content-center"}>
                        <Button color="primary" size="sm" variant="shadow" radius="sm">Save</Button> &nbsp;
                        <Button color="primary" radius="sm" size="sm" variant="flat">Reset</Button>
                    </div>
                </Block>
            </div>
        </div>
    );
}