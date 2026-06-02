import { NextRequest, NextResponse } from 'next/server'

interface Props {
  params: { code: string }
}

export async function GET(_req: NextRequest, { params }: Props) {
  const { code } = params

  if (!code) {
    return NextResponse.json({ error: 'Code manquant' }, { status: 400 })
  }

  // TODO: Query Supabase for attestation
  // const supabase = createAdminClient()
  // const { data } = await supabase
  //   .from('attestations')
  //   .select('*, inscription:inscriptions(prenom, nom, edition:editions(theme, date_evenement))')
  //   .eq('code_unique', code)
  //   .single()

  // Mock response for development
  return NextResponse.json({
    valid: false,
    message: 'Attestation non trouvée — Supabase non configuré',
  })
}
