import Sidebar from "@/modules/common/components/admin/sidebar";
import Header from "@/modules/common/components/admin/header";

export default function DashboardLayout({children, breadcrumbs, menuItemId}: {
    children: React.ReactNode,
    breadcrumbs: React.ReactNode,
    menuItemId: number
}) {

    return (
        <div className="relative">
            <div className="fixed left-0 top-0 right-0 bottom-0 grid lg:grid-cols-[280px_1fr] grid-cols-[1fr] gap-4 p-4">
                <Sidebar menuItemId={menuItemId}/>
                <div className="h-full grid grid-rows-[56px_1fr] gap-4">
                    <Header breadcrumbs={breadcrumbs}/>
                    <main className="h-full">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}