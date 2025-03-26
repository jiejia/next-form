import DashboardLayout from "@/app/dashboard/dashboard-layout";
import React from "react";
import Link from "next/link";
import Index from "@/modules/form/components/admin/list";


export default function Form() {
    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <span>Form</span></>} menuItemId={2}>
            <Index/>
        </DashboardLayout>
    );
}
