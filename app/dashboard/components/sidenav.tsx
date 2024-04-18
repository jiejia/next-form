'use client';

import {usePathname} from 'next/navigation';
import links from '@/app/dashboard/components/links';
import Links from "@/app/dashboard/components/links";


export default function Sidenav({activeName = 'Dashboard'}) {
    const pathname = usePathname();
    return (
        <aside className="col-span-1 lg:block hidden">
            <ul className="menu bg-base-200 rounded-box">
                <Links activeName={activeName}/>
            </ul>
        </aside>
    );
}

