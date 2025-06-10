'use client'

import Block from '@/modules/common/components/shared/block';
import {Button, Switch, Input, Textarea} from "@heroui/react";
import React from "react";
import {Select, SelectItem} from "@heroui/react";
import Menu from './menu';

export default function Profile() {

    const languages = [
        {key: "zh-CN", label: "简体中文"},
        {key: "en-US", label: "English"},
        {key: "ja-JP", label: "日本語"},
        {key: "ko-KR", label: "한국어"},
    ];

    return (
        <div className="h-full grid grid-rows-[1fr] gap-4">
            <div className="h-full grid grid-cols-[75px_1fr] sm:grid-cols-[250px_1fr] gap-4">
                <Menu activeItem="profile" />
                <Block>
                    <ul className="grid gap-2">
                        <li className="border-b border-gray-200 pb-2 border-dotted">
                            <div className="grid grid-cols-[1fr_1fr] gap-2">
                                <div className="grid content-center"><label htmlFor="avatar" className="text-sm text-gray-600">头像</label></div>
                                <div className="grid content-center justify-end">
                                    <div className="flex items-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                            <img src="/default-avatar.png" alt="头像" className="w-full h-full object-cover" />
                                        </div>
                                        <Button color="primary" size="sm" variant="shadow" radius="sm">上传</Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="border-b border-gray-200 pb-2 border-dotted">
                            <div className="grid grid-cols-[1fr_1fr] gap-2">
                                <div className="grid content-center"><label htmlFor="language" className="text-sm text-gray-600">邮箱</label></div>
                                <div className="grid content-center justify-end">
                                    <div className="flex gap-2 w-64">
                                        <Input className="flex-1" placeholder="邮箱" type="text"  id="email" name="email" size="sm"/>
                                        <Button className="w-15" color="primary" size="sm" variant="shadow" radius="sm">保存</Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="border-b border-gray-200 pb-2 border-dotted">
                            <div className="grid grid-cols-[1fr_1fr] gap-2">
                                <div className="grid content-center"><label htmlFor="maintenance-mode" className="text-sm text-gray-600">密码</label></div>
                                <div className="grid content-center justify-end gap-2">
                                    <Input className="w-64" placeholder="旧密码" type="password"  id="password" name="password" size="sm"/>
                                    <Input className="w-64" placeholder="新密码" type="password"  id="password" name="password" size="sm"/>
                                    <Input className="w-64" placeholder="确认密码" type="password"  id="password" name="password" size="sm"/>
                                    <div className="flex gap-2 justify-end w-64">
                                        <Button color="primary" radius="sm" size="sm" variant="flat">重置</Button>
                                        <Button color="primary" size="sm" variant="shadow" radius="sm">保存</Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </Block>
            </div>
        </div>
    );
}