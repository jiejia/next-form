import Link from "next/link";
import Image from "next/image";

export default function Copyright() {
    return (
        <p className="text-xs text-center mt-4 text-slate-400">© 2024 Powered By NextForm <Link
            href={"https://github.com/jiejia/next-form"}><Image src="/svgs/github.svg" alt="Next Form"
                                                                width={20} height={20} className="inline"/></Link>
        </p>
    )
}