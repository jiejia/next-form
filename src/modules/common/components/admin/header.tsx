'use client'

import Block from "@/modules/common/components/shared/block";
import Link from "next/link";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { signOut, useSession } from "next-auth/react";

export default function Header({ breadcrumbs = <></> }: { breadcrumbs: React.ReactNode }) {
    const { data: session } = useSession();

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' });
    };

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
                                src={session?.user?.image || "https://i.pravatar.cc/150?u=default"}
                                size="sm"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">已登录为</p>
                                <p className="font-semibold">{session?.user?.email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings" as={Link} href="/dashboard/setting/profile">
                                设置
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                登出
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </Block>
        </header>
    );
}