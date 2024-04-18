import type {Metadata} from "next";
import Link from "next/link";
import Sidenav from "@/app/dashboard/components/sidenav";
import React from 'react';
import Form from "@/app/dashboard/form/create/components/form";

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
                    <Form />
                    <div className="mt-4 w-full border-t border-gray-300 border-dotted pt-4 text-center">
                        <div className="">
                            <button className="btn btn-primary btn-sm mr-2">Submit</button>
                            <button className="btn btn-sm">Reset</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
        ;
}
