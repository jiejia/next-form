'use client';

import Link from "next/link";
import clsx from "clsx";

export const links = [
    {name: 'Dashboard', href: '/dashboard'},
    {name: 'Forms', href: '/dashboard/form'},
    {name: 'Setting', href: '/dashboard/setting'},
];


export default function Links({activeName = ''}) {
    return (
        <>
            {
                links.map((link) => {
                    return (
                        <li key={link.name}><Link
                            href={link.href}
                            className={clsx('', {"active": activeName == link.name})}
                        >{link.name}</Link></li>
                    );
                })
            }
        </>
    );
}
