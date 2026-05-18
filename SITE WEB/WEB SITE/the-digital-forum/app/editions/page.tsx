'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import EventCard from '@/components/features/EventCard'
import { EDITIONS_DATA } from '@/lib/constants'
import type { EditionStatut } from '@/lib/types'

type Filter = 'all' | EditionStatut

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'published', label: 'À venir' },
  { value: 'terminee', label: 'Terminées' },
]

export default function EditionsPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered =
    filter === 'all'
      ? EDITIONS_DATA
      : EDITIONS_DATA.filter((e) => e.statut === filter || (filter === 'published' && e.statut === 'draft'))

  return (
    <div className="min-h-screen bg-dark-bg py-16">
      <div className="container-site section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label">Calendrier 2026-2027</p>
          <h1 className="section-title mb-4">
            Toutes les <span className="gradient-text">éditions</span>
          </h1>
          <p className="font-body text-gray-400 max-w-xl mx-auto">
            4 éditions par an, chacune dédiée à un thème concret de l&apos;entrepreneuriat digital
            en Guinée. Rejoignez-nous à chaque rendez-vous trimestriel.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-full font-condensed text-sm font-semibold tracking-wider uppercase transition-all duration-200 border ${
                filter === f.value
                  ? 'bg-green-primary border-green-primary text-white'
                  : 'bg-transparent border-green-primary/30 text-gray-400 hover:border-green-primary hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((edition, i) => (
            <motion.div
              key={edition.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <EventCard edition={edition} featured={edition.numero === 1} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
