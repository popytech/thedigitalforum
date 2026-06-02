'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const piliers = [
  {
    emoji: '🎤',
    titre: 'ÉDUQUER',
    description:
      'Chaque édition aborde un thème concret et actionnable. Les speakers partagent des stratégies éprouvées directement applicables dans votre contexte africain.',
  },
  {
    emoji: '🤝',
    titre: 'CONNECTER',
    description:
      'Des sessions de networking qualifiées entre entrepreneurs, freelances, étudiants et professionnels. Chaque connexion peut changer votre trajectoire.',
  },
  {
    emoji: '🔥',
    titre: 'TRANSFORMER',
    description:
      'Chaque participant repart avec une action concrète à mettre en œuvre immédiatement. Pas de théorie sans pratique — seulement de l\'impact réel.',
  },
]

export default function Piliers() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-dark-2">
      <div className="container-site section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-label">Notre mission</p>
          <h2 className="section-title">
            Pourquoi <span className="gradient-text">The Digital Forum</span> ?
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {piliers.map((pilier, i) => (
            <motion.div
              key={pilier.titre}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-dark-card border border-green-primary/20 rounded-xl p-5 sm:p-8 text-center hover:border-green-primary/50 hover:shadow-green-md transition-all duration-300 group"
            >
              <div className="text-5xl mb-5">{pilier.emoji}</div>
              <div className="h-px w-12 bg-lime mx-auto mb-5" />
              <h3 className="font-display font-bold text-3xl text-white mb-4 group-hover:text-lime transition-colors">
                {pilier.titre}
              </h3>
              <p className="font-body text-gray-400 text-sm leading-relaxed">
                {pilier.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
