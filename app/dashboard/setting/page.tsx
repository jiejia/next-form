import type {Metadata} from "next";
export const metadata: Metadata = {
    title: "Form | The Next Form",
};
export default function Setting() {
    return (
        <>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>Setting</li>
                </ul>
            </div>
            <div>
                <label className="form-control w-full max-w-3xl">
                    <div className="label">
                        <span className="label-text">Site Name</span>
                    </div>
                    <input type="text" placeholder="Site Name"
                           className="input input-bordered w-full input-md max-w-3xl"/>
                </label>
                <label className="form-control w-full max-w-3xl">
                    <div className="label">
                        <span className="label-text">Theme</span>
                    </div>
                    <select className="select select-bordered">
                        <option disabled selected>Pick one</option>
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
                    <textarea className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </label>
                <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-3xl">
                    <button className="btn btn-primary">Save</button>
                    <button className="btn">Reset</button>

                </div>
            </div>
        </>
    )
        ;
}
