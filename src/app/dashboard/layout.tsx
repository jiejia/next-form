import Main from "@/components/ui/main";

export default function DashboardLayout({children,}: { children: React.ReactNode }) {

    return (
        <div className="relative">
            <Main>
                {children}
            </Main>
        </div>
    )
}