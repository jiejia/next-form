"use client"

import Header from "@/components/ui/header";
import {DashboardProvider} from "@/contexts/dashboard-context";
import Sidebar from "@/components/ui/sidebar";

export default function Main({children,}: { children: React.ReactNode }) {
    return (
        <>
            <DashboardProvider>
                <Sidebar/>
                <div className="fixed lg:left-[300px] left-0 top-0 right-0 p-4 grid grid-rows-[75px_1fr] h-full">
                    <Header/>
                    <main className="h-full">
                        {children}
                    </main>
                </div>
            </DashboardProvider>
        </>
    )
}