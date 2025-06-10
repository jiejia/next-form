import DashboardLayout from "@/app/dashboard/dashboard-layout";
import Link from "next/link";
import React from "react";
import AppearanceComponent from "@/modules/setting/components/admin/appearance";

export default function Profile() {

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/setting"}>Setting</Link> / <span>Appearance</span></>} menuItemId={3}>
            <AppearanceComponent/>
        </DashboardLayout>
    );
}