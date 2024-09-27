import Image from "next/image";
import Copyright from "@/components/copyright";


export default function LoginLayout({children,}: { children: React.ReactNode }) {
    return (
        <div className="p-4">
            <div className="mt-20 mx-auto max-w-96">
                <h1 className="text-center hover:text-slate-500">
                    <Image src="/svgs/logo.svg" alt="Next Form" className="w-8 h-8 inline" width={40} height={40}/>
                    <span className="text-xl font-semibold pl-1">NextForm</span>
                </h1>
                {children}
                <Copyright/>
            </div>
        </div>
    );
}
