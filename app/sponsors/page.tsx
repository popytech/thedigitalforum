import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { SPONSOR_PACKS } from '@/lib/constants'
import SponsorForm from '@/components/forms/SponsorForm'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Sponsors & Partenaires',
  description: 'Devenez partenaire de The Digital Forum. 4 packs disponibles : Bronze, Argent, Or et Partenaire Officiel.',
}

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-dark-bg py-16">
      <div className="container-site section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label">Partenariat</p>
          <h1 className="section-title mb-4">
            Devenez <span className="gradient-text">partenaire</span>
          </h1>
          <p className="font-body text-gray-400 max-w-2xl mx-auto">
            Associez votre marque à la première plateforme d&apos;entrepreneuriat digital de Guinée.
            Touchez 80 à 120 entrepreneurs, freelances et créateurs à chaque édition.
          </p>
        </div>

        {/* Packs */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-20">
          {SPONSOR_PACKS.map((pack) => (
            <div
              key={pack.id}
              className={cn(
                'bg-dark-card border rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-green-md',
                pack.featured
                  ? 'border-lime/50 shadow-lime'
                  : 'border-green-primary/20 hover:border-green-primary/40'
              )}
            >
              {pack.featured && (
                <div className="bg-lime text-dark-bg text-center py-1.5 font-condensed text-xs font-bold tracking-wider uppercase">
                  ⭐ Recommandé
                </div>
              )}
              <div className="h-1" style={{ background: pack.couleur }} />
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="font-display text-2xl" style={{ color: pack.couleur }}>
                    {pack.nom}
                  </h3>
                  <div className="font-condensed font-bold text-xl text-white mt-1">
                    {pack.prix}
                  </div>
                  {pack.places_vip > 0 && (
                    <div className="font-body text-xs text-gray-500 mt-0.5">
                      {pack.places_vip} place{pack.places_vip > 1 ? 's' : ''} VIP incluse{pack.places_vip > 1 ? 's' : ''}
                    </div>
                  )}
                </div>

                <ul className="flex flex-col gap-2.5 flex-1">
                  {pack.avantages.map((avantage) => (
                    <li key={avantage} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={14}
                        className="shrink-0 mt-0.5"
                        style={{ color: pack.couleur }}
                      />
                      <span className="font-body text-sm text-gray-300">{avantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">
              Nous <span className="gradient-text">contacter</span>
            </h2>
            <p className="font-body text-gray-400 mt-3">
              Remplissez ce formulaire et nous vous répondrons dans les 24h.
            </p>
          </div>
          <SponsorForm />
        </div>
      </div>
    </div>
  )
}
