import DashboardLayout from "@/app/dashboard/dashboard-layout";
import React from "react";

export default function Form() {
    return (
        <DashboardLayout breadcrumbs={<><span>Dashboard</span> / <span>Form</span></>} currentPageId={2}>
            <div className="grid grid-flow-col gap-4">

            </div>
        </DashboardLayout>
    );
}
