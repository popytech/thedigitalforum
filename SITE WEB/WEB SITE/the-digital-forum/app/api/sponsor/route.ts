import { NextRequest, NextResponse } from 'next/server'
import { sponsorContactSchema } from '@/lib/validators'
import { createAdminClient } from '@/lib/supabase-server'
import { sendSponsorEmails } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = sponsorContactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
    }

    const data = parsed.data

    const supabase = createAdminClient()
    await supabase.from('contacts').insert({
      nom: `${data.nom} (${data.entreprise})`,
      email: process.env.GMAIL_USER ?? '',
      telephone: data.telephone,
      objet: `Sponsoring — Pack ${data.pack}`,
      message: data.message,
    })

    try {
      await sendSponsorEmails(data)
    } catch (e) {
      console.error('[sponsor] email error:', e)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (e) {
    console.error('[sponsor]', e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
