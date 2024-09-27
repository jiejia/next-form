'use client'

import LoginLayout from '@/app/login/layout';
import Block from '@/components/shared/block';
import {Input, Button} from "@nextui-org/react";
import Image from "next/image";
import {Link} from "@nextui-org/link";

export default function ForgetPassword() {
    return (
        <LoginLayout>
                <Block className="w-full mt-5 px-5 py-5">
                    <h2 className="text-center text-md font-normal">Forget Password</h2>
                    <div className="w-full flex flex-col gap-5 mt-5">
                        <div>
                            <p className="text-xs text-center text-slate-400"> You will receive a link to create a new
                                password via email.</p>
                        </div>
                        <Input
                            type="email"
                            label=""
                            placeholder="Email"
                            labelPlacement="outside"
                            startContent={
                                <Image src="/svgs/email.svg" alt="Email"
                                       className="content-center" width={15}
                                       height={15}/>
                            }
                        />
                        <p className="text-center text-xs"><span>Remember Password?</span> <Link href="/login" className="content-center justify-self-end text-xs">Login</Link></p>
                        <Button color="primary">
                            Send
                        </Button>

                    </div>
                </Block>
        </LoginLayout>
    );
}
