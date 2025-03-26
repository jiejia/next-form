import DashboardLayout from "@/app/dashboard/dashboard-layout";
import React from "react";
import Link from "next/link";
import Index from "@/modules/form/components/admin/save";

export default function Edit({ params }: { params: { id: string } }) {

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/form"}>Form</Link> / <span>Edit</span></>} menuItemId={2}>
            <Index id={params.id}/>
        </DashboardLayout>
    )
}