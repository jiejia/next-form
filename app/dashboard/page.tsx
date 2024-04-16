import Image from "next/image";
import Sidenav from "@/app/dashboard/components/sidenav"
import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Dashboard | The Next Form",
};
export default function Home() {

    return (
        <>
            <aside className="col-span-1">
                <Sidenav activeName="Dashboard"/>
            </aside>
            <main className="col-span-4 relative">
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li>Dashboard</li>
                    </ul>
                </div>
                <div>

                </div>
            </main>
        </>
    )
        ;
}
