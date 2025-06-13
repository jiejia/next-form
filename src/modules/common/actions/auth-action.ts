'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createSession, deleteSession } from '@/lib/auth'
import { authenticateUser } from '@/modules/common/services/user-service'

// 登录表单验证模式
const LoginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(1, '密码不能为空'),
})

export type LoginState = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string
}

export async function login(prevState: LoginState | undefined, formData: FormData): Promise<LoginState> {
  // 验证表单数据
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '请填写所有必填字段',
    }
  }

  const { email, password } = validatedFields.data

  try {
    // 认证用户
    const user = await authenticateUser({ email, password })
    
    if (!user) {
      return {
        message: '邮箱或密码错误',
      }
    }

    // 创建会话
    await createSession({
      userId: user.id,
      username: user.username,
      email: user.email,
      nickname: user.nickname,
    })

  } catch (error) {
    console.error('Login error:', error)
    return {
      message: '登录失败，请稍后重试',
    }
  }

  // 登录成功，重定向到仪表板
  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
} 