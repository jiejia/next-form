'use client'

import Block from '@/modules/common/components/shared/block';
import { Input, Button, Checkbox } from "@heroui/react";
import Image from "next/image";
import { Link } from "@heroui/link";
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/modules/auth/actions/auth-action';
import { useEffect } from 'react';

function SubmitButton() {
    const { pending } = useFormStatus();
    
    return (
        <Button
            type="submit"
            color="primary"
            isLoading={pending}
            disabled={pending}
            className="w-full"
        >
            {pending ? '登录中...' : '登录'}
        </Button>
    );
}

export default function Login() {
    const [state, action] = useFormState(login, undefined);

    useEffect(() => {
        if (state?.message) {
            // 可以在这里添加toast通知
            console.log(state.message);
        }
    }, [state]);

    return (
        <Block className="w-full mt-5 px-5 py-5">
            <div className="h-10 flex items-center justify-center mb-2">
                {state?.message
                    ? <span className="text-red-500 bg-red-50 px-2 py-1 rounded-lg w-full text-center transition-all duration-200">
                        {state.message}
                    </span>
                    : <span className="text-md font-normal w-full text-center transition-all duration-200">
                        Welcome Back
                    </span>
                }
            </div>
            <form action={action} className="w-full flex flex-col gap-5 mt-5">
                <Input
                    type="email"
                    name="email"
                    label=""
                    placeholder="邮箱"
                    labelPlacement="outside"
                    required
                    isInvalid={!!state?.errors?.email}
                    errorMessage={state?.errors?.email?.[0]}
                    startContent={
                        <Image src="/svgs/email.svg" alt="Email"
                            className="content-center" width={15}
                            height={15} />
                    }
                />
                <Input
                    type="password"
                    name="password"
                    label=""
                    placeholder="密码"
                    labelPlacement="outside"
                    required
                    isInvalid={!!state?.errors?.password}
                    errorMessage={state?.errors?.password?.[0]}
                    startContent={
                        <Image src="/svgs/password.svg" alt="Password"
                            className="content-center" width={15}
                            height={15} />
                    }
                />
                <div className="text-xs grid grid-flow-col">
                    <Checkbox defaultSelected size="sm">
                        <span className="text-xs">记住我</span>
                    </Checkbox>
                    <Link href="/forget-password" className="content-center justify-self-end text-xs">
                        忘记密码？
                    </Link>
                </div>
                <SubmitButton />
            </form>
        </Block>
    );
}
