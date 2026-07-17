import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    if (token) {
        if (
            request.nextUrl.pathname === '/login' ||
            request.nextUrl.pathname === '/register'
        ) {
            return NextResponse.redirect(new URL('/', request.url))
        } else {
            return NextResponse.next();
        }
    } else {
        if (
            request.nextUrl.pathname === '/cart' ||
            request.nextUrl.pathname === '/profile' ||
            request.nextUrl.pathname === '/allorders' ||
            request.nextUrl.pathname === '/wishlist' ||
            request.nextUrl.pathname === '/checkout' 
        ) {
            return NextResponse.redirect(new URL('/login', request.url))
        } else {
            return NextResponse.next();
        }
    }
}
export const config = {
    matcher: ['/cart', '/login', '/register', '/profile', '/allorders', '/wishlist', '/checkout' ]
}
