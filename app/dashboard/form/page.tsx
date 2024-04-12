import type {Metadata} from "next";
import Link from 'next/link';
export const metadata: Metadata = {
    title: "Form | The Next Form",
};
export default function Form() {
    return (
        <>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>Forms</li>
                </ul>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                            <td>
                                <Link
                                    href="/dashboard/form/edit"
                                    className=""
                                >Edit</Link>
                                 |
                                <Link
                                    href="/dashboard/form/edit"
                                    className=""
                                >Delete</Link>
                            </td>
                        </tr>
                        {/* row 2 */}
                        <tr className="hover">
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                            <td>
                                <Link
                                    href="/dashboard/form/edit"
                                    className=""
                                >Edit</Link>
                                |
                                <Link
                                    href="/dashboard/form/edit"
                                    className=""
                                >Delete</Link>
                            </td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                            <td>
                                <Link
                                    href="/dashboard/form/edit"
                                    className=""
                                >Edit</Link>
                                |
                                <Link
                                    href="/dashboard/form/edit"
                                    className=""
                                >Delete</Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
        ;
}
