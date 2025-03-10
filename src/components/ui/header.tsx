'use client'

import Block from "@/components/shared/block";
import Link from "next/link";
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";

export default function Header({breadcrumbs = <></>}: { breadcrumbs: React.ReactNode }) {

    return (
        <header>
            <Block className="grid grid-cols-8 !py-3">
                <div className="col-span-6 content-center">
                    {breadcrumbs}
                </div>
                <div className="col-span-2 content-center justify-self-end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                className="transition-transform"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                size="sm"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                            </DropdownItem>
                            <DropdownItem key="settings" as={Link} href="/dashboard/setting/profile">
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger">
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </Block>
        </header>
    )
        ;
}
