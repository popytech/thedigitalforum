'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface SponsorLogo {
  nom: string
  initiales: string
  site?: string
  tier: 'or' | 'argent' | 'bronze'
}

const tierConfig = {
  or: { label: 'Partenaires Or', color: '#FFD700', border: 'border-yellow-500/30', bg: 'bg-yellow-500/5' },
  argent: { label: 'Partenaires Argent', color: '#C0C0C0', border: 'border-gray-400/30', bg: 'bg-gray-400/5' },
  bronze: { label: 'Partenaires Bronze', color: '#CD7F32', border: 'border-amber-700/30', bg: 'bg-amber-700/5' },
}

// Sponsors placeholder — à remplacer avec les vrais logos
const sponsors: SponsorLogo[] = [
  { nom: 'Votre entreprise ici', initiales: 'OR', tier: 'or' },
  { nom: 'Votre entreprise ici', initiales: 'OR', tier: 'or' },
  { nom: 'Partenaire Argent', initiales: 'AG', tier: 'argent' },
  { nom: 'Partenaire Argent', initiales: 'AG', tier: 'argent' },
  { nom: 'Partenaire Argent', initiales: 'AG', tier: 'argent' },
  { nom: 'Partenaire Bronze', initiales: 'BR', tier: 'bronze' },
  { nom: 'Partenaire Bronze', initiales: 'BR', tier: 'bronze' },
  { nom: 'Partenaire Bronze', initiales: 'BR', tier: 'bronze' },
  { nom: 'Partenaire Bronze', initiales: 'BR', tier: 'bronze' },
]

const sponsorsByTier = {
  or: sponsors.filter((s) => s.tier === 'or'),
  argent: sponsors.filter((s) => s.tier === 'argent'),
  bronze: sponsors.filter((s) => s.tier === 'bronze'),
}

function LogoPlaceholder({ sponsor }: { sponsor: SponsorLogo }) {
  const cfg = tierConfig[sponsor.tier]
  return (
    <a
      href={sponsor.site ?? '#'}
      target={sponsor.site ? '_blank' : undefined}
      rel="noopener noreferrer"
      title={sponsor.nom}
      className={`flex items-center justify-center rounded-xl border ${cfg.border} ${cfg.bg} transition-all duration-300 hover:scale-105 hover:brightness-110 cursor-pointer`}
    >
      <span
        className="font-display text-2xl tracking-wider select-none"
        style={{ color: cfg.color }}
      >
        {sponsor.initiales}
      </span>
    </a>
  )
}

export default function SponsorsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const hasRealSponsors = false // passer à true quand des vrais sponsors sont ajoutés

  return (
    <section ref={ref} className="py-20 bg-dark-card border-y border-green-primary/10">
      <div className="container-site section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-label">Ils nous font confiance</p>
          <h2 className="section-title">
            Nos <span className="gradient-text">partenaires</span>
          </h2>
          <p className="font-body text-gray-400 mt-3 max-w-xl mx-auto">
            Rejoignez les entreprises qui soutiennent l&apos;entrepreneuriat digital en Guinée.
          </p>
        </motion.div>

        {hasRealSponsors ? (
          /* Grille des vrais logos — visible quand sponsors confirmés */
          <div className="space-y-10">
            {(['or', 'argent', 'bronze'] as const).map((tier, ti) =>
              sponsorsByTier[tier].length > 0 ? (
                <motion.div
                  key={tier}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: ti * 0.15 }}
                >
                  <p
                    className="font-condensed text-xs tracking-[0.2em] uppercase text-center mb-5"
                    style={{ color: tierConfig[tier].color }}
                  >
                    {tierConfig[tier].label}
                  </p>
                  <div
                    className={`grid gap-4 justify-items-center ${
                      tier === 'or'
                        ? 'grid-cols-2 md:grid-cols-2 max-w-sm mx-auto'
                        : tier === 'argent'
                        ? 'grid-cols-3 max-w-xl mx-auto'
                        : 'grid-cols-2 sm:grid-cols-4'
                    }`}
                  >
                    {sponsorsByTier[tier].map((sponsor, i) => (
                      <div
                        key={i}
                        className={`w-full ${
                          tier === 'or' ? 'h-24' : tier === 'argent' ? 'h-20' : 'h-16'
                        }`}
                      >
                        <LogoPlaceholder sponsor={sponsor} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : null
            )}
          </div>
        ) : (
          /* Placeholder "Devenez partenaire" — affiché avant l'Édition 01 */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            {/* Slots visuels par tier */}
            <div className="space-y-8 mb-12">
              {(['or', 'argent', 'bronze'] as const).map((tier, ti) => {
                const cfg = tierConfig[tier]
                const count = tier === 'or' ? 2 : tier === 'argent' ? 3 : 4
                return (
                  <motion.div
                    key={tier}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + ti * 0.12 }}
                  >
                    <p
                      className="font-condensed text-xs tracking-[0.2em] uppercase text-center mb-4"
                      style={{ color: cfg.color }}
                    >
                      {cfg.label}
                    </p>
                    <div
                      className={`grid gap-3 justify-items-center ${
                        tier === 'or'
                          ? 'grid-cols-2 max-w-xs mx-auto'
                          : tier === 'argent'
                          ? 'grid-cols-3 max-w-lg mx-auto'
                          : 'grid-cols-4'
                      }`}
                    >
                      {Array.from({ length: count }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-full flex items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300 hover:opacity-80 ${
                            tier === 'or' ? 'h-20' : tier === 'argent' ? 'h-16' : 'h-14'
                          }`}
                          style={{ borderColor: `${cfg.color}40` }}
                        >
                          <span
                            className="font-condensed text-xs tracking-wider opacity-50"
                            style={{ color: cfg.color }}
                          >
                            Votre logo
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <div className="text-center">
              <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-dark-2 border border-green-primary/20 rounded-2xl">
                <p className="font-condensed text-white font-semibold text-lg uppercase tracking-wider">
                  Votre marque ici dès l&apos;Édition 01
                </p>
                <p className="font-body text-sm text-gray-400 max-w-sm">
                  Associez votre entreprise à la première plateforme d&apos;entrepreneuriat digital de Guinée.
                  Packs à partir de <strong className="text-white">500 000 GNF</strong>.
                </p>
                <Link
                  href="/sponsors"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-primary border-2 border-green-primary text-white font-condensed font-semibold text-sm tracking-wider uppercase rounded-lg transition-all duration-200 hover:bg-green-mid hover:shadow-green-md active:scale-95"
                >
                  Devenir partenaire <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
