import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase-server'
import GalerieClient from './GalerieClient'
import { EDITIONS_DATA } from '@/lib/constants'
import type { GalleryPhoto } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Galerie Photos',
  description: 'Revivez chaque édition de The Digital Forum à travers les photos du jour J.',
}

export const dynamic = 'force-dynamic'

export default async function GaleriePage() {
  const supabase = createAdminClient()

  let photos: GalleryPhoto[] = []
  try {
    const { data } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false })
    photos = data ?? []
  } catch {
    photos = []
  }

  return <GalerieClient photos={photos} editions={EDITIONS_DATA} />
}
