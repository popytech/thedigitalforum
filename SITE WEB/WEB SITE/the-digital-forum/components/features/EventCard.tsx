'use client'

import Link from 'next/link'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { formatDate, getEditionNumber, getStatutLabel, getStatutColor } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Edition } from '@/lib/types'

interface EventCardProps {
  edition: Edition
  featured?: boolean
}

export default function EventCard({ edition, featured }: EventCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/editions/${edition.slug}`}>
        <Card
          className={cn(
            'group h-full transition-all duration-300 hover:border-green-primary/50 hover:shadow-green-md cursor-pointer',
            featured && 'border-green-primary/50 shadow-green-sm'
          )}
        >
          {/* Top bar */}
          <div className="h-1 w-full bg-lime-gradient" />

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-primary/20 border border-green-primary/30 rounded-lg flex items-center justify-center">
                  <span className="font-display text-xl text-lime">
                    {getEditionNumber(edition.numero)}
                  </span>
                </div>
                <div>
                  <div className="font-condensed text-xs text-gray-500 tracking-wider uppercase">
                    Édition
                  </div>
                  <div className="font-condensed font-semibold text-white">
                    #{getEditionNumber(edition.numero)}
                  </div>
                </div>
              </div>
              <span
                className={cn(
                  'text-xs font-condensed font-semibold tracking-wider uppercase px-3 py-1 rounded-full border',
                  getStatutColor(edition.statut)
                )}
              >
                {getStatutLabel(edition.statut)}
              </span>
            </div>

            {/* Theme */}
            <h3 className="font-condensed font-semibold text-lg text-white mb-1 line-clamp-2 group-hover:text-lime transition-colors">
              {edition.theme}
            </h3>
            {edition.sous_theme && (
              <p className="font-body text-xs text-gray-500 mb-4 line-clamp-1">
                {edition.sous_theme}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-col gap-2 mb-5">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-body">
                <Calendar size={13} className="text-green-primary shrink-0" />
                <span>{formatDate(edition.date_evenement)}</span>
              </div>
              {edition.lieu && (
                <div className="flex items-center gap-2 text-xs text-gray-400 font-body">
                  <MapPin size={13} className="text-green-primary shrink-0" />
                  <span>{edition.lieu}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-400 font-body">
                <Users size={13} className="text-green-primary shrink-0" />
                <span>{edition.capacite} participants max · {edition.gratuit ? 'Gratuit' : `${edition.prix_standard?.toLocaleString()} GNF`}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-1.5 text-xs font-condensed font-semibold text-lime tracking-wider uppercase group-hover:gap-3 transition-all">
              {edition.statut === 'terminee' ? 'Voir le résumé' : 'S\'inscrire'}
              <ArrowRight size={13} />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
