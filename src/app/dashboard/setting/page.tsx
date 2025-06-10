import DashboardLayout from "@/app/dashboard/dashboard-layout";
import Link from "next/link";
import React from "react";
import GeneralComponent from "@/modules/setting/components/admin/general";

export default function Setting() {

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <span>Setting</span></>} menuItemId={3}>
            <GeneralComponent/>
        </DashboardLayout>
    );
}