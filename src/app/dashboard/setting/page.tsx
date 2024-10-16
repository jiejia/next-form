'use client'

import {useDashboard} from "@/contexts/dashboard-context";
import React, {useEffect} from "react";
import Link from "next/link";

export default function Setting() {
    const { setDashboardData } = useDashboard();

    useEffect(() => {
        setDashboardData({
            id: 3,
            breadcrumbs: <><Link href="/dashboard">Dashboard</Link> / <span>Setting</span></>
        });
    });

    return (
        <div className="grid grid-flow-col gap-4">

        </div>
    );
}
