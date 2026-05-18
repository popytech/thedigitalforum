import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'

export async function GET(_req: NextRequest, { params }: { params: { code: string } }) {
  const { code } = params
  if (!code) return NextResponse.json({ error: 'Code manquant' }, { status: 400 })

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('inscriptions')
    .select(`
      id, prenom, nom, email, telephone, ville, statut_pro,
      statut, created_at, qr_code,
      editions ( titre, theme, date_event, lieu )
    `)
    .eq('qr_code', code)
    .single()

  if (error || !data) {
    return NextResponse.json({ valid: false, message: 'Inscription non trouvée' }, { status: 404 })
  }

  return NextResponse.json({ valid: true, data })
}

export async function PATCH(_req: NextRequest, { params }: { params: { code: string } }) {
  const { code } = params
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('inscriptions')
    .update({ statut: 'presente' })
    .eq('qr_code', code)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
