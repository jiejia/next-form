'use client'

import Block from '@/modules/common/components/shared/block';
import {Input, Button, Checkbox} from "@heroui/react";
import Image from "next/image";
import {Link} from "@heroui/link";

export default function Login() {
    return (

            <Block className="w-full mt-5 px-5 py-5">
                <h2 className="text-center text-md font-normal">Welcome Back</h2>
                <div className="w-full flex flex-col gap-5 mt-5">
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
                    <Input
                        type="password"
                        label=""
                        placeholder="Password"
                        labelPlacement="outside"
                        startContent={
                            <Image src="/svgs/password.svg" alt="Password"
                                   className="content-center" width={15}
                                   height={15}/>
                        }
                    />
                    <div className="text-xs grid grid-flow-col">
                        <Checkbox defaultSelected size="sm"><span className="text-xs">Remember</span></Checkbox>
                        <Link href="/forget-password" className="content-center justify-self-end text-xs">Forget Password?</Link>
                    </div>
                    <Button color="primary">
                        Login
                    </Button>

                </div>
            </Block>


    );
}
