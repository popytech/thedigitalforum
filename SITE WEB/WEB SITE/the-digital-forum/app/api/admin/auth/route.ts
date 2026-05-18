import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

function createToken(secret: string): string {
  const payload = JSON.stringify({ ts: Date.now() })
  // HMAC-SHA256 en hex — même format que ce que le middleware vérifie
  const sig = createHmac('sha256', secret).update(payload).digest('hex')
  return btoa(JSON.stringify({ payload, sig }))
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
    }

    const secret = process.env.ADMIN_SECRET ?? 'tdf-secret-key-2026'
    const token = createToken(secret)

    const res = NextResponse.json({ success: true })
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.delete('admin_token')
  return res
}
