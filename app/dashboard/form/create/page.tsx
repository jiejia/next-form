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
                        <li>
                            Form 1
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1 rounded-lg border-violet-800	border overflow-y-auto p-4">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Text input</span>
                                </div>
                                <input type="text" placeholder="Text input" readOnly disabled={true} tabIndex={-1}
                                       className="input input-bordered input-sm w-full max-w-xs"/>
                            </label>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Textarea</span>
                                </div>
                                <textarea className="textarea textarea-bordered textarea-sm h-24" readOnly
                                          disabled={true} tabIndex={-1}
                                          placeholder="Textarea"></textarea>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Select</span>
                                </div>
                                <select className="select select-bordered select-sm" disabled={true} tabIndex={-1}>
                                    <option>Pick one</option>
                                </select>
                            </label>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Checkbox</span>
                                    <input type="checkbox" defaultChecked readOnly disabled={true}
                                           className="checkbox"/>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Blue pill</span>
                                    <input type="radio" name="radio-10" readOnly disabled={true} className="radio"
                                           checked/>
                                </label>
                            </div>
                        </div>
                        <div className="col-span-2 rounded-lg border-violet-800	border overflow-y-auto p-4">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Text input</span>
                                </div>
                                <input type="text" placeholder="Text input"
                                       className="input input-bordered input-sm w-full max-w-xs"/>
                            </label>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Textarea</span>
                                </div>
                                <textarea className="textarea textarea-bordered textarea-sm h-24"
                                          placeholder="Textarea"></textarea>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Select</span>
                                </div>
                                <select className="select select-bordered select-sm">
                                    <option>Pick one</option>
                                </select>
                            </label>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Checkbox</span>
                                    <input type="checkbox" defaultChecked
                                           className="checkbox"/>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Blue pill</span>
                                    <input type="radio" name="radio-10" className="radio"
                                           checked/>
                                </label>
                            </div>
                        </div>
                        <div className="col-span-1 rounded-lg border-violet-800	border overflow-y-auto p-4">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Title</span>
                                </div>
                                <input type="text" placeholder="Title"
                                       className="input input-bordered input-sm w-full max-w-xs"/>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Placeholder</span>
                                </div>
                                <input type="text" placeholder="Placeholder"
                                       className="input input-bordered input-sm w-full max-w-xs"/>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Width</span>
                                </div>
                                <input type="text" placeholder="Width"
                                       className="input input-bordered input-sm w-full max-w-xs"/>
                            </label>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
        ;
}
