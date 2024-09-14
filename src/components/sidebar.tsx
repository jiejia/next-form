'use client'


import Block from "@/components/block";
import Link from "next/link";
import Image from "next/image";
import {Select, SelectItem} from "@nextui-org/react";

export default function Sidebar() {
    return (
        <aside className="h-full lg:block hidden fixed left-0 top-0 p-4">
            <Block className="h-full w-[280px] relative">
                <h1 className="text-xl font-semibold lg:px-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Link href={"/dashboard"}
                          className="grid grid-flow-col grid-cols-[40px_1fr] hover:text-slate-500">
                        <Image src="/svgs/logo.svg" alt="Next Form" className="w-8 h-8" width={40} height={40}/>
                        <span className="content-center indent-1">SimpleForm</span>
                    </Link>
                </h1>
                <ul className="grid grid-flow-row text-sm mt-8 gap-[2px]">
                    <li>
                        <Link href={"/dashboard"}
                              className="grid grid-flow-col grid-cols-[25px_1fr] px-4 py-2 hover:bg-slate-100 rounded-lg bg-slate-100">
                                <span className="content-center"><Image src="/svgs/dashboard.svg" alt="Next Form"
                                                                        className="content-center" width={15}
                                                                        height={15}/></span>
                            <span className="content-center">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/dashboard/forms"}
                              className="grid grid-flow-col grid-cols-[25px_1fr] px-4 py-2 hover:bg-slate-100 rounded-lg">
                                <span className="content-center"><Image src="/svgs/forms.svg" alt="Next Form"
                                                                        className="content-center" width={15}
                                                                        height={15}/></span>
                            <span className="content-center">Forms</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/dashboard/settings"}
                              className="grid grid-flow-col grid-cols-[25px_1fr] px-4 py-2 hover:bg-slate-100 rounded-lg">
                            <span className="content-center"><Image src="/svgs/setting.svg" alt="Next Form" width={15}
                                                                    height={15}/></span>
                            <span className="content-center">Settings</span>
                        </Link>
                    </li>
                </ul>
                <div className="absolute bottom-4 left-4 right-4">
                    <hr className="mb-4"/>
                    <Select className="max-w-xs" size={"sm"} selectedKeys={[0]} defaultSelectedKeys={[0]}>
                        <SelectItem key={0} value={0}>
                            <div className="grid grid-flow-col grid-cols-[25px_1fr]">
                                <span className="content-center"><Image src="/svgs/light-mode.svg" alt="Next Form"
                                                                        width={15} height={15}/></span>
                                <span className="content-center">Light</span>
                            </div>
                        </SelectItem>
                        <SelectItem key={1} value={1}>
                            <div className="grid grid-flow-col grid-cols-[25px_1fr]">
                                <span className="content-center"><Image src="/svgs/dark-mode.svg" alt="Next Form"
                                                                        width={15} height={15}/></span>
                                <span className="content-center">Dark</span>
                            </div>
                        </SelectItem>
                        <SelectItem key={2} value={2}>
                            <div className="grid grid-flow-col grid-cols-[25px_1fr]">
                                <span className="content-center"><svg width="15" height="15"
                                                                      xmlns="http://www.w3.org/2000/svg">
  <circle cx="7.5" cy="7.5" r="7.5" className="fill-green-300"/>
</svg></span>
                                <span className="content-center">Green</span>
                            </div>
                        </SelectItem>
{/*                        <SelectItem key={3} value={3}>*/}
{/*                            <div className="grid grid-flow-col grid-cols-[25px_1fr]">*/}
{/*                                <span className="content-center"><svg width="15" height="15"*/}
{/*                                                                      xmlns="http://www.w3.org/2000/svg">*/}
{/*  <circle cx="7.5" cy="7.5" r="7.5" className="fill-lime-300"/>*/}
{/*</svg></span>*/}
{/*                                <span className="content-center">Lime</span>*/}
{/*                            </div>*/}
{/*                        </SelectItem>*/}
                        <SelectItem key={4} value={4}>
                            <div className="grid grid-flow-col grid-cols-[25px_1fr]">
                                <span className="content-center"><svg width="15" height="15"
                                                                      xmlns="http://www.w3.org/2000/svg">
  <circle cx="7.5" cy="7.5" r="7.5" className="fill-sky-300"/>
</svg></span>
                                <span className="content-center">Sky</span>
                            </div>
                        </SelectItem>
                        <SelectItem key={5} value={5}>
                            <div className="grid grid-flow-col grid-cols-[25px_1fr]">
                                <span className="content-center"><svg width="15" height="15"
                                                                      xmlns="http://www.w3.org/2000/svg">
  <circle cx="7.5" cy="7.5" r="7.5" className="fill-pink-300"/>
</svg></span>
                                <span className="content-center">Pink</span>
                            </div>
                        </SelectItem>
                        <SelectItem key={6} value={6}>
                            <div className="grid grid-flow-col grid-cols-[25px_1fr]">
                                <span className="content-center"><svg width="15" height="15"
                                                                      xmlns="http://www.w3.org/2000/svg">
  <circle cx="7.5" cy="7.5" r="7.5" className="fill-yellow-300"/>
</svg></span>
                                <span className="content-center">Yellow</span>
                            </div>
                        </SelectItem>
                        <SelectItem key={7} value={7}>
                            <div className="grid grid-flow-col grid-cols-[25px_1fr]">
                                <span className="content-center"><Image src="/svgs/following_system_mode.svg" alt="Next Form"
                                                                        width={15} height={15}/></span>
                                <span className="content-center">Following System</span>
                            </div>
                        </SelectItem>
                    </Select>
                    <p className="text-xs text-center mt-4 text-slate-400">© 2024 Powered By NextForm <Link
                        href={"https://github.com/jiejia/next-form"}><Image src="/svgs/github.svg" alt="Next Form"
                                                                            width={20} height={20} className="inline"/></Link>
                    </p>
                </div>
            </Block>
        </aside>
    )
        ;
}
