import { NextRequest, NextResponse } from 'next/server'
import { newsletterSchema } from '@/lib/validators'
import { createAdminClient } from '@/lib/supabase-server'
import { sendNewsletterConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = newsletterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const data = parsed.data
    const supabase = createAdminClient()

    const { error } = await supabase.from('newsletter').insert({
      email: data.email,
      whatsapp: data.whatsapp ?? null,
    })

    if (error && error.code !== '23505') {
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }

    try {
      await sendNewsletterConfirmation(data.email)
    } catch (e) {
      console.error('[newsletter] email error:', e)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (e) {
    console.error('[newsletter]', e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
