'use client'

import Link from "next/link";
import { useDashboard } from '@/contexts/dashboard-context';
import React, {useEffect} from "react";

export default function Form() {
    const { setDashboardData } = useDashboard();

    useEffect(() => {
        setDashboardData({
            id: 2,
            breadcrumbs: <><Link href="/dashboard">Dashboard</Link> / <span>Form</span></>
        });
    });

    return (
        <div className="grid grid-flow-col gap-4">

        </div>
    );
}
