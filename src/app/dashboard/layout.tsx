import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";

export default function DashboardLayout({children,}: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <Sidebar/>
            <div className="fixed lg:left-[300px] left-0 top-0 right-0 p-4 grid grid-rows-[75px_1fr] h-full">
                <Header/>
                <main className="h-full">
                    {children}
                </main>
            </div>
        </div>
    )
}