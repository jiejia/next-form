'use client';
import React from "react";
import DashboardLayout from '@/app/dashboard/dashboard-layout';
import DashboardUI from '@/modules/dashboard/components/statistics/dashboard';

export default function Dashboard() {
    return (
        <DashboardLayout breadcrumbs={<><span>Dashboard</span></>} menuItemId={1}>
            <DashboardUI/>
        </DashboardLayout>
    );
}
