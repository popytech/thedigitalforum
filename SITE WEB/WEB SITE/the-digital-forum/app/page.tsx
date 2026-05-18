import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import ChiffresCles from '@/components/sections/ChiffresCles'
import ProchaineEdition from '@/components/sections/ProchaineEdition'
import Piliers from '@/components/sections/Piliers'
import NewsletterSection from '@/components/sections/NewsletterSection'
import EditionsPreview from '@/components/sections/EditionsPreview'
import SponsorsSection from '@/components/sections/SponsorsSection'
import EquipeTeaser from '@/components/sections/EquipeTeaser'

export const metadata: Metadata = {
  title: 'The Digital Forum — Entrepreneuriat Digital en Guinée',
  description:
    'La première série d\'événements trimestriels dédiés à l\'entrepreneuriat digital en Guinée. Speakers · Networking · Certification · Impact réel.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ChiffresCles />
      <ProchaineEdition />
      <Piliers />
      <EditionsPreview />
      <EquipeTeaser />
      <SponsorsSection />
      <NewsletterSection />
    </>
  )
}
