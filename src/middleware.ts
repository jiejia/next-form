import { NextRequest, NextResponse } from 'next/server'
import { decrypt, updateSession } from '@/lib/auth'

// 受保护的路由
const protectedRoutes = ['/dashboard']
// 公共路由（已登录用户不应访问）
const publicRoutes = ['/login', '/forget-password']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)

  // 检查用户是否已登录
  const cookie = req.cookies.get('session')?.value
  const session = await decrypt(cookie || '')

  // 如果是受保护的路由且用户未登录，重定向到登录页
  if (isProtectedRoute && !session?.isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 如果是公共路由（如登录页）且用户已登录，重定向到仪表板
  if (isPublicRoute && session?.isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  // 更新会话过期时间
  return await updateSession(req)
}

// 配置中间件运行的路径
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了：
     * 1. /api/routes (API路由)
     * 2. /_next/ (Next.js内部文件)
     * 3. /_static (静态文件)
     * 4. /_vercel (Vercel内部文件)
     * 5. 所有根级文件 (如 /favicon.ico)
     */
    '/((?!api/|_next/|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
} 