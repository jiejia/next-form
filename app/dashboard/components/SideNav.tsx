'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';


const links = [
    {name: 'Dashboard', href: '/dashboard'},
    {name: 'Forms', href: '/dashboard/form'},
    {name: 'Setting', href: '/dashboard/setting'},
];

export default function SideNav() {
    const pathname = usePathname();
    return (
        <>
            <ul className="menu bg-base-200 rounded-box">
                {links.map((link) => {
                    return (
                    <li key={link.name}><Link
                        href={link.href}
                        className={clsx('', {"active": pathname === link.href})}
                    >{link.name}</Link></li>
                    );
                })}
            </ul>
        </>
    );
}
