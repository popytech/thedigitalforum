import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validators'
import { createAdminClient } from '@/lib/supabase-server'
import { sendContactEmails } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
    }

    const data = parsed.data

    const supabase = createAdminClient()
    await supabase.from('contacts').insert({
      nom: data.nom, email: data.email, telephone: data.telephone,
      objet: data.objet, message: data.message,
    })

    try {
      await sendContactEmails(data)
    } catch (e) {
      console.error('[contact] email error:', e)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (e) {
    console.error('[contact]', e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
