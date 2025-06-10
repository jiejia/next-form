'use client'

import Block from '@/modules/common/components/shared/block';
import Link from "next/link";
import Image from "next/image";
import {Select, SelectItem, Button} from "@heroui/react";
import Copyright from "@/modules/common/components/admin/copyright";
import clsx from "clsx";
import { LayoutDashboard, FileText, Settings, Sun, Moon, Monitor } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar({menuItemId}: { menuItemId: number }) {
    const router = useRouter();

    const menuItems = [
        {
            id: 1,
            name: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard size={15} />
        },
        {
            id: 2,
            name: "Form",
            href: "/dashboard/form",
            icon: <FileText size={15} />
        },
        {
            id: 3,
            name: "Setting",
            href: "/dashboard/setting",
            icon: <Settings size={15} />
        },
    ]

    return (
        <aside className="h-full lg:block hidden">
            <Block className="h-full w-[280px] relative">
                <h1 className="text-xl font-semibold lg:px-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Link href={"/dashboard"}
                          className="grid grid-flow-col grid-cols-[40px_1fr] hover:text-slate-500">
                        <Image src="/svgs/logo.svg" alt="Next Form" className="w-8 h-8" width={40} height={40}/>
                        <span className="content-center indent-1">PlainForm</span>
                    </Link>
                </h1>
                <ul className="grid grid-flow-row text-sm mt-8 gap-2">
                    {
                        menuItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Button
                                        fullWidth
                                        variant={item.id == menuItemId ? "flat" : "light"}
                                        className={clsx("justify-start", {
                                            "bg-primary-50 text-primary": item.id == menuItemId
                                        })}
                                        color={item.id == menuItemId ? "primary" : "default"}
                                        startContent={item.icon}
                                        onPress={() => router.push(item.href)}
                                    >
                                        {item.name}
                                    </Button>
                                </li>
                            );
                        })
                    }
                </ul>
                <div className="absolute bottom-4 left-4 right-4">
                    <hr className="mb-4"/>
                    <Select className="max-w-xs" size={"sm"} selectedKeys={["0"]} defaultSelectedKeys={["0"]}>
                        <SelectItem key="0">
                            <div className="grid grid-flow-col grid-cols-[25px_1fr]">
                                <span className="content-center"><Sun size={15} /></span>
                                <span className="content-center">Light</span>
                            </div>
                        </SelectItem>
                        <SelectItem key="1">
                            <div className="grid grid-flow-col grid-cols-[25px_1fr]">
                                <span className="content-center"><Moon size={15} /></span>
                                <span className="content-center">Dark</span>
                            </div>
                        </SelectItem>
                        <SelectItem key="7">
                            <div className="grid grid-flow-col grid-cols-[25px_1fr]">
                                <span className="content-center"><Monitor size={15} /></span>
                                <span className="content-center">System</span>
                            </div>
                        </SelectItem>
                    </Select>
                    <Copyright/>
                </div>
            </Block>
        </aside>
    )
        ;
}
