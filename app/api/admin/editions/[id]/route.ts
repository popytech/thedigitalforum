import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { capacite } = await req.json()
  const cap = parseInt(capacite, 10)

  if (isNaN(cap) || cap < 1 || cap > 1000) {
    return NextResponse.json({ error: 'Capacité invalide (1–1000)' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('editions')
    .update({ capacite: cap })
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
