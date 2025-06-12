import { auth } from "@/app/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // 受保护的路由
  const isProtectedRoute = nextUrl.pathname.startsWith('/dashboard')
  
  // 认证路由
  const isAuthRoute = nextUrl.pathname.startsWith('/login') || 
                     nextUrl.pathname.startsWith('/register')

  // 如果访问受保护路由但未登录，重定向到登录页
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  // 如果已登录但访问认证页面，重定向到dashboard
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|svgs).*)',
  ],
}