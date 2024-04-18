import Image from "next/image";
import type {Metadata} from "next";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Login | The Next Form",
};
export default function ForgetPassword() {

    return (
        <div className="container max-w-lg mx-auto">
            <div
                className=" px-4 py-4 shadow-xl rounded-box border-gray-300 border mt-36 grid grid-cols-2 gap-2">
                <h2 className="text-center col-span-2 text-lg font-bold	mb-2">Forget Password</h2>
                <label className="input input-bordered flex items-center gap-2 col-span-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="w-4 h-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                    </svg>
                    <input type="text" className="grow" placeholder="Email"/>
                </label>
                <button className="btn btn-block btn-primary col-span-2 mb-2">Send</button>
                <p className="text-center col-span-2 text-sm"><Link href="/login">Login</Link></p>
            </div>
        </div>
    )
        ;
}
