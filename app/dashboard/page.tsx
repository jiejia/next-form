import Image from "next/image";
import SideNav from "@/app/dashboard/components/SideNav"
import type {Metadata} from "next";
export const metadata: Metadata = {
    title: "Dashboard | The Next Form",
};
export default function Home() {
    return (
        <>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>Dashboard</li>
                </ul>
            </div>
            <div>

            </div>
        </>
    )
        ;
}
