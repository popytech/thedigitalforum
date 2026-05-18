import type { Metadata } from 'next'
import EquipeClient from './EquipeClient'

export const metadata: Metadata = {
  title: "L'Équipe — The Digital Forum",
  description:
    "Découvrez les profils qui font de The Digital Forum un événement d'excellence : designers, photographes, community managers et bien plus.",
}

export default function EquipePage() {
  return <EquipeClient />
}
