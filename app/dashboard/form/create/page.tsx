import type {Metadata} from "next";
import Link from "next/link";
import Sidenav from "@/app/dashboard/components/sidenav";
import React from 'react';
import dynamic from 'next/dynamic';
import {initialData} from "./initialData";


const FormNoSSR = dynamic(() => import('@/app/dashboard/form/create/components/form'), {
    ssr: false
});

export const metadata: Metadata = {
    title: "Create Form | The Next Form",
};
export default function Create() {
    return (
        <>
            <Sidenav activeName="Forms"/>
            <main className="col-span-5 lg:col-span-4 relative">
                <div id="nav" className="absolute right-0 top-0">
                    {/*<button className="btn btn-outline btn-sm">*/}
                    {/*    <Link*/}
                    {/*        href="/dashboard/form/create"*/}
                    {/*    >Create</Link>*/}
                    {/*</button>*/}
                </div>
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li>
                            <Link
                                href="/dashboard/form"
                            >Forms
                            </Link>
                        </li>
                        <li>
                            Create Form
                        </li>
                    </ul>
                </div>
                <div>
                    <FormNoSSR initialData={initialData}/>
                </div>
            </main>
        </>
    )
        ;
}
