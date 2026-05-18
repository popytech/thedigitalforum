import type { Metadata } from 'next'
import SpeakerCard from '@/components/features/SpeakerCard'
import type { Speaker } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Speakers & Intervenants',
  description: 'Découvrez les intervenants confirmés de The Digital Forum — Édition 01, Juin 2026.',
}

const speakers: Speaker[] = [
  {
    id: '1',
    prenom: 'Popy',
    nom: 'Traoré',
    titre: 'CEO & Fondateur · Popy Tech Agency',
    organisation: 'Popy Tech Agency',
    bio: 'Entrepreneur digital, consultant et formateur. Fondateur de WatShop Africa et DigitalPro Academy. 500+ vendeurs accompagnés dans 12 pays africains.',
    photo_url: '/images/speakers/popy-traore.jpg',
    role: 'host',
    facebook: 'https://www.facebook.com/misterpopyofficiel/',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    prenom: 'Coach Fodé',
    nom: 'Le Stratège',
    titre: 'Auteur & Conférencier International',
    organisation: 'Expert en vente & croissance business',
    bio: 'Conférencier international, auteur et expert reconnu en stratégie de vente et croissance business en Afrique.',
    photo_url: '/images/speakers/coach-fode.jpeg',
    role: 'speaker',
    facebook: 'https://www.facebook.com/profile.php?id=100064344091210',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    prenom: 'Thierno',
    nom: 'MD',
    titre: 'Fondateur · Guinée Dev',
    organisation: 'Web Entrepreneur & Créateur de contenu',
    bio: 'Fondateur de Guinée Dev, web entrepreneur et créateur de contenu éducatif digital. Figure montante du digital éducatif en Guinée.',
    photo_url: '/images/speakers/thierno-md.jpg',
    role: 'speaker',
    facebook: 'https://www.facebook.com/thiernomd224',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    prenom: 'Mory',
    nom: 'Konaté',
    titre: 'Fondateur · Billet Facile',
    organisation: 'Billet Facile',
    bio: 'Fondateur de Billet Facile, entrepreneur digital et pionnier de la billetterie en ligne en Guinée.',
    photo_url: '/images/speakers/mory-konate.jpeg',
    role: 'speaker',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    prenom: 'Lamarana',
    nom: 'Keita',
    titre: 'Modératrice & Présentatrice',
    organisation: 'The Digital Forum',
    bio: 'Modératrice et présentatrice confirmée de The Digital Forum. Elle anime les sessions avec aisance et assure la fluidité du programme tout au long de l\'événement.',
    photo_url: '/images/equipe/lamarana-keita.jpeg',
    role: 'moderateur',
    created_at: new Date().toISOString(),
  },
]

export default function SpeakersPage() {
  const confirmes = speakers.filter((s) => s.photo_url)
  const enAttente = speakers.filter((s) => !s.photo_url)

  return (
    <div className="min-h-screen bg-dark-bg py-16">
      <div className="container-site section-padding">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label">Édition 01 · Juin 2026</p>
          <h1 className="section-title mb-4">
            Nos <span className="gradient-text">speakers</span>
          </h1>
          <p className="font-body text-gray-400 max-w-xl mx-auto">
            Des experts triés sur le volet, avec des conseils concrets et actionnables
            pour votre parcours digital en Afrique.
          </p>
        </div>

        {/* Speakers confirmés */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {confirmes.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>

        {/* Séparateur "en attente" */}
        {enAttente.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-green-primary/20" />
              <div className="flex items-center gap-2 px-4 py-1.5 bg-dark-card border border-amber-400/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-condensed text-xs text-amber-400 tracking-wider uppercase">
                  Annonces à venir
                </span>
              </div>
              <div className="flex-1 h-px bg-green-primary/20" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enAttente.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}
