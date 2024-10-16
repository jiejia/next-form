'use client'

import { useBreadcrumb } from '@/contexts/dashboard-context';

export default function Breadcrumb() {
    const { breadcrumbs } = useBreadcrumb();
    return (
        <>{breadcrumbs}</>
    );
}