import { NextRequest, NextResponse } from 'next/server'
import { inscriptionFullSchema } from '@/lib/validators'
import { generateQRCode } from '@/lib/utils'
import { createAdminClient } from '@/lib/supabase-server'
import { sendConfirmationEmail, sendAdminInscriptionNotif } from '@/lib/email'
import { sendSMS, buildConfirmationSMS } from '@/lib/sms'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = inscriptionFullSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const qr_code = generateQRCode()
    const edition_id: string = body.edition_id ?? '1'

    // ── 1. Supabase insert ────────────────────────────────────────────────────
    const supabase = createAdminClient()

    const { error: dbError } = await supabase.from('inscriptions').insert({
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
      telephone: data.telephone,
      ville: data.ville,
      statut_pro: data.statut_pro,
      secteur: data.secteur,
      source: data.source,
      attentes: data.attentes,
      question_qa: data.question_qa ?? null,
      edition_id,
      qr_code,
      statut: 'confirmee',
    })

    if (dbError) {
      console.error('[inscription] Supabase error:', dbError)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement', details: dbError.message },
        { status: 500 }
      )
    }

    // Récupérer les infos de l'édition pour l'email / SMS
    const { data: edition } = await supabase
      .from('editions')
      .select('titre, theme, date_event, lieu')
      .eq('id', edition_id)
      .single()

    const editionTitre = edition?.titre ?? 'The Digital Forum — Édition 2026'
    const editionTheme = edition?.theme ?? 'Entrepreneuriat Digital'
    const editionDate = edition?.date_event
      ? new Date(edition.date_event).toLocaleDateString('fr-FR', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        })
      : 'Date à confirmer'
    const editionLieu = edition?.lieu ?? 'Conakry, Guinée'

    // ── 2. Email de confirmation (Resend) ─────────────────────────────────────
    try {
      await sendConfirmationEmail({
        to: data.email,
        prenom: data.prenom,
        nom: data.nom,
        edition: editionTitre,
        theme: editionTheme,
        date: editionDate,
        lieu: editionLieu,
        qrCode: qr_code,
      })
    } catch (emailErr) {
      console.error('[inscription] email error:', emailErr)
    }

    // Notification admin
    try {
      await sendAdminInscriptionNotif({
        prenom: data.prenom, nom: data.nom, email: data.email,
        telephone: data.telephone, ville: data.ville,
        statut_pro: data.statut_pro, edition: editionTitre,
      })
    } catch (e) {
      console.error('[inscription] admin notif error:', e)
    }

    // ── 3. SMS de confirmation (Africa's Talking) ─────────────────────────────
    if (data.telephone && process.env.AT_API_KEY) {
      try {
        const message = buildConfirmationSMS(data.prenom, editionTitre, qr_code)
        await sendSMS({ to: data.telephone, message })
      } catch (smsErr) {
        console.error('[inscription] SMS error:', smsErr)
        // Ne pas bloquer l'inscription si le SMS échoue
      }
    }

    return NextResponse.json({
      success: true,
      qr_code,
      edition: editionTitre,
      date: editionDate,
    }, { status: 201 })
  } catch (err) {
    console.error('[inscription] Unexpected error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
