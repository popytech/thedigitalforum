import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Web Crypto API — compatible Edge Runtime (pas Node.js crypto)
async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.ADMIN_SECRET ?? 'tdf-secret-key-2026'
    const decoded = JSON.parse(atob(token))
    const { payload, sig } = decoded as { payload: string; sig: string }

    const sigBytes = new Uint8Array(
      (sig.match(/.{1,2}/g) ?? []).map((b: string) => parseInt(b, 16))
    )
    const payloadBytes = new TextEncoder().encode(payload)
    const secretBytes = new TextEncoder().encode(secret)

    const key = await crypto.subtle.importKey(
      'raw', secretBytes,
      { name: 'HMAC', hash: 'SHA-256' },
      false, ['verify']
    )

    return await crypto.subtle.verify('HMAC', key, sigBytes, payloadBytes)
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    // Page de login toujours accessible
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    const token = request.cookies.get('admin_token')?.value
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
