import DashboardLayout from "@/app/dashboard/dashboard-layout";
import Link from "next/link";
import React from "react";

export default function Setting() {

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <span>Setting</span></>} menuItemId={3}>
            <div className="grid grid-flow-col gap-4">

            </div>
        </DashboardLayout>
    );
}