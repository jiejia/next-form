'use client'
import Sidenav from "@/app/dashboard/components/sidenav";
import React from "react";
import Link from "next/link";


export default function Create() {
    const [selected, setSelected] = React.useState<string | number>("login");

    return (
        <>
            <aside className="col-span-1">
                <Sidenav activeName="Forms"/>
            </aside>
            <main className="col-span-5 lg:col-span-4 relative">
                <div id="nav" className="absolute right-0 top-0">
                    {/*<button className="btn btn-outline btn-sm">*/}
                    {/*    <Link*/}
                    {/*        href="/dashboard/form/create"*/}
                    {/*    >Create</Link>*/}
                    {/*</button>*/}
                </div>
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li>
                            <Link
                                href="/dashboard/form"
                            >Forms
                            </Link>
                        </li>
                        <li>Create</li>
                    </ul>
                </div>
                <div>

                </div>
            </main>
        </>
    )
        ;
}
