import type {Metadata} from "next";
import Link from "next/link";
import Sidenav from "@/app/dashboard/components/sidenav";
export const metadata: Metadata = {
    title: "Create Form | The Next Form",
};
export default function Create() {
    return (
        <>
            <aside className="col-span-1">
                <Sidenav activeName="Forms"/>
            </aside>
            <main className="col-span-4 relative">
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
                        <li>Create</li>
                    </ul>
                </div>
                <div>
                    <label className="form-control w-full  max-w-3xl">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input type="text" placeholder="Name" className="input input-bordered w-full max-w-3xl"/>
                    </label>
                    <label className="form-control w-full max-w-3xl">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                    </label>
                    <div className="form-control w-full max-w-3xl">
                        <label className="label cursor-pointer">
                            <span className="label-text">Is it closed</span>
                            <input type="checkbox" className="toggle"/>
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-3xl">
                        <button className="btn btn-primary">Create</button>
                        <button className="btn">Reset</button>
                    </div>
                </div>
            </main>
        </>
    )
        ;
}
