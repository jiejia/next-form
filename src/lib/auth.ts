import { SignJWT, jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

const key = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

export interface SessionData {
  userId: number
  username: string
  email: string
  nickname?: string
  isLoggedIn: boolean
  [key: string]: any // 添加索引签名以符合JWTPayload
}

// 加密会话数据
export async function encrypt(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // 7天过期
    .sign(key)
}

// 解密会话数据
export async function decrypt(input: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    })
    return payload as unknown as SessionData // 通过unknown进行类型转换
  } catch (error) {
    console.error('Failed to verify session:', error)
    return null
  }
}

// 获取当前会话
export async function getSession(): Promise<SessionData | null> {
  const session = cookies().get('session')?.value
  if (!session) return null
  return await decrypt(session)
}

// 更新会话
export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  if (!session) return

  // 刷新会话过期时间
  const parsed = await decrypt(session)
  if (parsed) {
    const newSession = await encrypt(parsed)
    const response = NextResponse.next()
    response.cookies.set({
      name: 'session',
      value: newSession,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7天
      path: '/',
    })
    return response
  }
}

// 创建会话
export async function createSession(userData: { userId: number; username: string; email: string; nickname?: string }) {
  const sessionData: SessionData = {
    ...userData,
    isLoggedIn: true
  }
  const session = await encrypt(sessionData)
  
  cookies().set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7天
    path: '/',
  })
}

// 删除会话
export async function deleteSession() {
  cookies().set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  })
}

// 密码工具函数
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
} 