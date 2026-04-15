import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    const adminUser = process.env.ADMIN_USER
    const adminPass = process.env.ADMIN_PASS
    const authSecret = process.env.AUTH_SECRET || 'fallback_secret_32_chars_long_minimum'

    if (username === adminUser && password === adminPass) {
      // Create a simple session token
      const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
      const sessionData = `${username}:${expiry}`
      
      // Basic signature (HMAC-like) using Web Crypto API for Edge compatibility
      const encoder = new TextEncoder()
      const keyData = encoder.encode(authSecret)
      const key = await crypto.subtle.importKey(
        'raw', 
        keyData, 
        { name: 'HMAC', hash: 'SHA-256' }, 
        false, 
        ['sign']
      )
      const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(sessionData))
      const signatureHex = Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')

      const token = `${btoa(sessionData)}.${signatureHex}`

      const response = NextResponse.json({ success: true })
      
      // Set HttpOnly cookie
      response.cookies.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
      })

      return response
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
