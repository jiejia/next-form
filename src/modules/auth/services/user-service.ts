import { PrismaClient } from '@prisma/client'
import { verifyPassword } from '../../../lib/auth'

const prisma = new PrismaClient()

export interface LoginCredentials {
  email: string
  password: string
}

export interface UserInfo {
  id: number
  username: string
  email: string
  nickname?: string
  avatar?: string
}

export async function authenticateUser(credentials: LoginCredentials): Promise<UserInfo | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: credentials.email,
        deletedAt: null // 确保用户未被删除
      }
    })

    if (!user || !user.password) {
      return null
    }

    const isPasswordValid = await verifyPassword(credentials.password, user.password)
    if (!isPasswordValid) {
      return null
    }

    // 更新最后登录时间
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginedAt: new Date() }
    })

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      nickname: user.nickname || undefined,
      avatar: user.avatar || undefined
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

export async function getUserById(id: number): Promise<UserInfo | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      nickname: user.nickname || undefined,
      avatar: user.avatar || undefined
    }
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
} 