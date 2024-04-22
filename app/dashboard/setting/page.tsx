import type {Metadata} from "next";
import Sidenav from "@/app/dashboard/components/sidenav";
export const metadata: Metadata = {
    title: "Form | The Next Form",
};
export default function Setting() {
    return (
        <>
            <Sidenav activeName="Setting"/>
            <main className="col-span-5 lg:col-span-4 relative">
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li>Setting</li>
                    </ul>
                </div>
                <div>
                    <div role="tablist" className="tabs tabs-boxed max-w-3xl">
                        <input type="radio" name="form_tab" role="tab" className="tab" aria-label="General"
                               defaultChecked={true}/>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300  p-6">
                            <label className="form-control w-full max-w-3xl">
                                <div className="label">
                                    <span className="label-text">Site Name</span>
                                </div>
                                <input type="text" placeholder="Site Name"
                                       className="input input-bordered w-full input-sm"/>
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Theme</span>
                                </div>
                                <select className="select select-bordered select-sm" defaultValue={0}>
                                    <option disabled value={0}>Pick one</option>
                                    <option>Star Wars</option>
                                    <option>Harry Potter</option>
                                    <option>Lord of the Rings</option>
                                    <option>Planet of the Apes</option>
                                    <option>Star Trek</option>
                                </select>
                            </label>
                            <label className="form-control w-full max-w-3xl">
                                <div className="label">
                                    <span className="label-text">Description</span>
                                </div>
                                <textarea className="textarea textarea-bordered textarea-sm h-24"
                                          placeholder="Bio"></textarea>
                            </label>

                        </div>
                    </div>
                    <div className="mt-4 w-full max-w-3xl border-t border-gray-300 border-dotted pt-4 text-center">
                        <div className="">
                            <button className="btn btn-primary btn-sm mr-2">Save</button>
                            <button className="btn btn-sm">Reset</button>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
        ;
}
