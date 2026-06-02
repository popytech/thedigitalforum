'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import AnimatedCounter from '@/components/features/AnimatedCounter'

const stats = [
  { value: 4, suffix: '', label: 'Éditions par an', sublabel: 'Trimestriel' },
  { value: 300, suffix: '+', label: 'Participants', sublabel: 'Objectif 2026-2027' },
  { value: 0, suffix: '', label: 'Conakry', sublabel: 'Guinée', isText: true, text: 'Conakry' },
  { value: 100, suffix: '%', label: 'Certifiant', sublabel: 'Attestation officielle' },
]

export default function ChiffresCles() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-dark-2 border-y border-green-primary/10">
      <div className="container-site section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-label">Impact & Chiffres</p>
          <h2 className="section-title">
            The Digital Forum <span className="gradient-text">en chiffres</span>
          </h2>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {stat.isText ? (
                <div className="flex flex-col items-center text-center">
                  <div className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1">
                    {stat.text}
                  </div>
                  <div className="font-condensed text-base text-lime uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="font-body text-xs text-gray-500 mt-1">{stat.sublabel}</div>
                </div>
              ) : (
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  sublabel={stat.sublabel}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
