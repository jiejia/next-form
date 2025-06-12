'use client'

import Block from '@/modules/common/components/shared/block';
import { Input, Button, Checkbox } from "@heroui/react";
import Image from "next/image";
import { Link } from "@heroui/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const showError = (msg: string) => {
        setError(msg)
        setTimeout(() => {
            setError('')
        }, 3000)
    }

    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                console.log(result)
                showError('邮箱或密码错误')
            } else {
                router.push('/dashboard')
            }
        } catch (error) {
            showError('登录失败，请重试')
        } finally {
            setIsLoading(false)
        }
    }

    const handleOAuthLogin = async (provider: 'google' | 'github') => {
        await signIn(provider, { callbackUrl: '/dashboard' })
    }
    return (

        <Block className="w-full mt-5 px-5 py-5">
            <div className="h-10 flex items-center justify-center mb-2">
                {error
                    ? <span className="text-red-500 bg-red-50 px-2 py-1 rounded-lg w-full text-center transition-all duration-200">{error}</span>
                    : <span className="text-md font-normal w-full text-center transition-all duration-200">Welcome Back</span>}
            </div>
            <div className="w-full flex flex-col gap-5 mt-5">
                <form onSubmit={handleCredentialsLogin} className="w-full flex flex-col gap-5">
                    <Input
                        type="email"
                        label=""
                        placeholder="邮箱"
                        labelPlacement="outside"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        startContent={
                            <Image src="/svgs/email.svg" alt="Email"
                                className="content-center" width={15}
                                height={15} />
                        }
                    />
                    <Input
                        type="password"
                        label=""
                        placeholder="密码"
                        labelPlacement="outside"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
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
                    <Button
                        type="submit"
                        color="primary"
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        {isLoading ? '登录中...' : '登录'}
                    </Button>
                </form>
            </div>
        </Block>


    );
}
