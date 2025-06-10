'use client'

import Block from '@/modules/common/components/shared/block';
import {Button} from "@heroui/react";
import React, { useState } from "react";
import Menu from './menu';

export default function Appearance() {

    const [selectedTheme, setSelectedTheme] = useState("blue");

    const themeColors = [
        {key: "blue", label: "蓝色", color: "#3b82f6"},
        {key: "green", label: "绿色", color: "#10b981"},
        {key: "purple", label: "紫色", color: "#8b5cf6"},
        {key: "red", label: "红色", color: "#ef4444"},
        {key: "orange", label: "橙色", color: "#f97316"},
        {key: "pink", label: "粉色", color: "#ec4899"},
        {key: "indigo", label: "靛蓝", color: "#6366f1"},
        {key: "teal", label: "青色", color: "#14b8a6"},
    ];

    return (
        <div className="h-full grid grid-rows-[1fr] gap-4">
            <div className="h-full grid grid-cols-[75px_1fr] sm:grid-cols-[250px_1fr] gap-4">
                <Menu activeItem="appearance" />
                <Block className="h-full grid grid-rows-[1fr_36px] gap-4">
                    <ul className="h-full grid gap-2 content-start">
                        <li className="border-b border-gray-200 pb-2 border-dotted">
                            <div className="grid grid-cols-[1fr_1fr] gap-2">
                                <div className="grid content-center">
                                    <label className="text-sm text-gray-600">主题</label>
                                </div>
                                <div className="grid content-center justify-end">
                                    <div className="w-64 flex items-center justify-end space-x-2">
                                        {themeColors.map((theme) => (
                                            <div
                                                key={theme.key}
                                                className="relative cursor-pointer rounded-full transition-all hover:scale-110" 
                                                onClick={() => setSelectedTheme(theme.key)}
                                                title={theme.label}
                                            >
                                                <div
                                                    className="w-6 h-6 rounded-full"
                                                    style={{ backgroundColor: theme.color }}
                                                />
                                                {selectedTheme === theme.key && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className={"text-center content-center"}>
                        <Button color="primary" size="sm" variant="shadow" radius="sm">保存设置</Button> &nbsp;
                        <Button color="primary" radius="sm" size="sm" variant="flat">重置</Button>
                    </div>
                </Block>
            </div>
        </div>
    );
}