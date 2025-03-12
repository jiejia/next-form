import DashboardLayout from "@/app/dashboard/dashboard-layout";
import Link from "next/link";
import React from "react";
import SaveSetting from "@/modules/setting/components/admin/save/save-setting";

export default function Setting() {

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <span>Setting</span></>} menuItemId={3}>
            <SaveSetting/>
        </DashboardLayout>
    );
}