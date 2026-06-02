'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import EventCard from '@/components/features/EventCard'
import { EDITIONS_DATA } from '@/lib/constants'

export default function EditionsPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const editions = EDITIONS_DATA.slice(0, 3)

  return (
    <section className="py-20 bg-dark-bg">
      <div className="container-site section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="section-label">Calendrier 2026-2027</p>
            <h2 className="section-title">
              Toutes les <span className="gradient-text">éditions</span>
            </h2>
          </div>
          <Link
            href="/editions"
            className="flex items-center gap-2 font-condensed text-sm text-lime tracking-wider uppercase hover:gap-4 transition-all duration-200"
          >
            Voir toutes les éditions <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {editions.map((edition, i) => (
            <motion.div
              key={edition.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <EventCard edition={edition} featured={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
