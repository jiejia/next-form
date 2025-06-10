import DashboardLayout from "@/app/dashboard/dashboard-layout";
import Link from "next/link";
import React from "react";
import ProfileComponent from "@/modules/setting/components/admin/profile";

export default function Profile() {

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/setting"}>Setting</Link> / <span>Profile</span></>} menuItemId={3}>
            <ProfileComponent/>
        </DashboardLayout>
    );
}