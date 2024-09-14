import Block from "@/components/block";

import Sidebar from "@/components/sidebar";

export default function DashboardLayout({children,}: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <Sidebar/>
            <div className="fixed lg:left-[300px] left-0 top-0 right-0 p-4 grid grid-rows-[75px_1fr] h-full">
                <header>
                    <Block className="">
                        Dashboard
                    </Block>
                </header>
                <main className="h-full">
                    <Block className="h-full">
                        {children}
                    </Block>
                </main>
            </div>
        </div>

    )
}