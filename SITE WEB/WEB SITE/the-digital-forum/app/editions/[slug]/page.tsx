import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Calendar, MapPin, Users, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { EDITIONS_DATA } from '@/lib/constants'
import { formatDate, getEditionNumber, getStatutLabel, getStatutColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return EDITIONS_DATA.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const edition = EDITIONS_DATA.find((e) => e.slug === params.slug)
  if (!edition) return {}
  return {
    title: `${edition.titre} — ${edition.theme}`,
    description: edition.sous_theme,
  }
}

const programmeEdition01 = [
  { heure: '10h30', titre: 'Accueil & enregistrement', type: 'logistique' },
  { heure: '11h00', titre: 'Mot d\'ouverture — Popy Traoré', type: 'opening' },
  { heure: '11h15', titre: 'Conférence principale : Gagner de l\'argent avec le digital', type: 'conference' },
  { heure: '12h00', titre: 'Panel de speakers', type: 'panel' },
  { heure: '13h00', titre: 'Networking déjeuner', type: 'networking' },
  { heure: '14h00', titre: 'Atelier pratique : Identifier ses sources de revenus digitaux', type: 'atelier' },
  { heure: '14h45', titre: 'Q&A avec les speakers', type: 'qa' },
  { heure: '15h00', titre: 'Clôture & remise des attestations', type: 'closing' },
]

const typeColors: Record<string, string> = {
  logistique: 'text-gray-500',
  opening: 'text-blue-400',
  conference: 'text-lime',
  panel: 'text-green-light',
  networking: 'text-amber-400',
  atelier: 'text-purple-400',
  qa: 'text-cyan-400',
  closing: 'text-lime',
}

export default function EditionDetailPage({ params }: Props) {
  const edition = EDITIONS_DATA.find((e) => e.slug === params.slug)
  if (!edition) notFound()

  const programme = edition.numero === 1 ? programmeEdition01 : []

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero */}
      <div className="bg-dark-2 border-b border-green-primary/20 py-16">
        <div className="container-site section-padding">
          <Link
            href="/editions"
            className="inline-flex items-center gap-2 font-condensed text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Toutes les éditions
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-green-primary/20 border border-lime/30 rounded-xl flex items-center justify-center">
                  <span className="font-display text-2xl text-lime">
                    {getEditionNumber(edition.numero)}
                  </span>
                </div>
                <span
                  className={cn(
                    'px-3 py-1 text-xs font-condensed font-semibold tracking-wider uppercase rounded-full border',
                    getStatutColor(edition.statut)
                  )}
                >
                  {getStatutLabel(edition.statut)}
                </span>
              </div>

              <h1 className="font-display font-black text-4xl md:text-6xl text-white mb-3 leading-tight">
                {edition.theme}
              </h1>
              {edition.sous_theme && (
                <p className="font-body text-gray-400 text-lg mb-6">{edition.sous_theme}</p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm font-body text-gray-300">
                  <Calendar size={15} className="text-lime" />
                  {formatDate(edition.date_evenement)}
                </div>
                <div className="flex items-center gap-2 text-sm font-body text-gray-300">
                  <Clock size={15} className="text-lime" />
                  11h00 – 15h00
                </div>
                {edition.lieu && (
                  <div className="flex items-center gap-2 text-sm font-body text-gray-300">
                    <MapPin size={15} className="text-lime" />
                    {edition.lieu}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm font-body text-gray-300">
                  <Users size={15} className="text-lime" />
                  {edition.capacite} participants max · {edition.gratuit ? 'Gratuit' : `${edition.prix_standard?.toLocaleString()} GNF`}
                </div>
              </div>
            </div>

            {edition.statut !== 'terminee' && (
              <div className="shrink-0">
                <Link
                  href="/inscription"
                  className="px-8 py-4 bg-green-primary border-2 border-green-primary text-white font-condensed font-bold text-base tracking-wider uppercase rounded-xl transition-all duration-200 hover:bg-green-mid hover:shadow-green-md active:scale-95 block text-center"
                >
                  S&apos;inscrire gratuitement
                </Link>
                <p className="text-xs text-gray-500 text-center mt-2 font-body">
                  Gratuit · Certifiant · Places limitées
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Programme */}
      <div className="py-16">
        <div className="container-site section-padding">
          <h2 className="section-title mb-10">Programme</h2>

          {programme.length > 0 ? (
            <div className="max-w-2xl relative">
              <div className="absolute left-[72px] top-0 bottom-0 w-px bg-green-primary/20" />
              {programme.map((item, i) => (
                <div key={i} className="flex gap-6 mb-6 relative">
                  <div className="w-16 shrink-0 text-right">
                    <span className="font-condensed text-sm text-gray-500 font-semibold">
                      {item.heure}
                    </span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-green-primary border-2 border-dark-bg mt-1 shrink-0 relative z-10" />
                  <div className="flex-1 pb-2">
                    <span
                      className={cn(
                        'font-condensed font-semibold text-base',
                        typeColors[item.type] || 'text-white'
                      )}
                    >
                      {item.titre}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-dark-card border border-green-primary/20 rounded-xl p-8 text-center max-w-md">
              <p className="font-body text-gray-400">
                Le programme de cette édition sera annoncé prochainement.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
