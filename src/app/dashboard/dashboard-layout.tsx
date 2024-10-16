import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import RootLayout  from "@/app/layout";

export default function DashboardLayout({children, breadcrumbs, currentPageId}: { children: React.ReactNode, breadcrumbs: React.ReactNode, currentPageId: number }) {

    return (
        <RootLayout>
            <div className="relative">
                <Sidebar currentPageId={currentPageId}/>
                <div className="fixed lg:left-[300px] left-0 top-0 right-0 p-4 grid grid-rows-[75px_1fr] h-full">
                    <Header breadcrumbs={breadcrumbs}/>
                    <main className="h-full">
                        {children}
                    </main>
                </div>
            </div>
        </RootLayout>
    )
}