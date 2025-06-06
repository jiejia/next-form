import DashboardLayout from "@/app/dashboard/dashboard-layout";
import React from "react";
import Link from "next/link";
import Index from "@/modules/form/components/admin/detail";
import {get} from "@/modules/form/actions/form-action"; 
import { notFound } from "next/navigation";     

export default async function Edit({ params }: { params: { id: string } }) {
    const form = await get(parseInt(params.id))

    if (! form) {
        notFound();
    }

    return (
        <DashboardLayout breadcrumbs={<><Link href={"/dashboard"}>Dashboard</Link> / <Link href={"/dashboard/form"}>Form</Link> / <span>Detail - {form.title}</span> </>} menuItemId={2}>
            <Index form={form}/>
        </DashboardLayout>
    )
}