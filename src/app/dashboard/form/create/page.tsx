import DashboardLayout from "@/app/dashboard/dashboard-layout";
import React from "react";
import Link from "next/link";
import Index from "@/modules/form/components/admin/save";

export default function Create() {
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/form"}>Form</Link> / <span>Create</span></>} menuItemId={2}>
            <Index />
        </DashboardLayout>
    );
}
