import DashboardLayout from "@/app/dashboard/dashboard-layout";

export default function Setting() {

    return (
        <DashboardLayout breadcrumbs={<><span>Dashboard</span> / <span>Setting</span></>} currentPageId={3}>
            <div className="grid grid-flow-col gap-4">

            </div>
        </DashboardLayout>
    );
}
