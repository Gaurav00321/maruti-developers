import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

async function verifySession(token: string) {
  try {
    const [b64Data, signature] = token.split('.')
    if (!b64Data || !signature) return false

    const sessionData = atob(b64Data)
    const [username, expiry] = sessionData.split(':')
    
    if (Date.now() > parseInt(expiry)) return false

    const authSecret = process.env.AUTH_SECRET || 'fallback_secret_32_chars_long_minimum'
    const encoder = new TextEncoder()
    const keyData = encoder.encode(authSecret)
    const key = await crypto.subtle.importKey(
      'raw', 
      keyData, 
      { name: 'HMAC', hash: 'SHA-256' }, 
      false, 
      ['verify']
    )

    const signatureBytes = new Uint8Array(
      signature.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    )

    return await crypto.subtle.verify(
      'HMAC', 
      key, 
      signatureBytes, 
      encoder.encode(sessionData)
    )
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes (except /admin/login)
  if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
    return NextResponse.next()
  }

  const sessionToken = request.cookies.get('admin_session')?.value
  const isValid = sessionToken ? await verifySession(sessionToken) : false

  if (!isValid) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
