'use client';
import React from "react";
import DashboardLayout from '@/app/dashboard/dashboard-layout';
import Index from '@/modules/dashboard/components/admin/statistics';

export default function Dashboard() {
    return (
        <DashboardLayout breadcrumbs={<><span>Dashboard</span></>} menuItemId={1}>
            <Index/>
        </DashboardLayout>
    );
}
