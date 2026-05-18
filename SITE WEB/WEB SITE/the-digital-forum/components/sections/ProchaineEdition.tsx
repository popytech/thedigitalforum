'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Users, Mic, ArrowRight } from 'lucide-react'
import { EDITIONS_DATA, SPEAKERS_DATA } from '@/lib/constants'
import { formatDate } from '@/lib/utils'

const nextEdition = EDITIONS_DATA[0]

const confirmedSpeakers = SPEAKERS_DATA.filter(s => s.photo_url)

export default function ProchaineEdition() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-dark-bg">
      <div className="container-site section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-label">Ne manquez pas</p>
          <h2 className="section-title">
            Prochaine <span className="gradient-text">édition</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-dark-card border border-green-primary/30 rounded-2xl overflow-hidden shadow-green-md">
            {/* Top accent bar */}
            <div className="h-1.5 bg-lime-gradient" />

            <div className="p-5 sm:p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Left: edition badge + info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-green-primary/20 border border-lime/30 rounded-xl flex items-center justify-center">
                      <span className="font-display text-2xl text-lime">01</span>
                    </div>
                    <div>
                      <div className="font-condensed text-xs text-gray-500 tracking-wider uppercase">
                        Édition
                      </div>
                      <div className="font-condensed font-bold text-xl text-white">
                        Juin 2026
                      </div>
                    </div>
                    <span className="ml-auto px-3 py-1 bg-green-primary/20 border border-lime/30 text-lime text-xs font-condensed font-semibold tracking-wider uppercase rounded-full">
                      À venir
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-2 leading-tight">
                    {nextEdition.theme}
                  </h3>
                  <p className="font-body text-gray-400 text-sm mb-6">
                    {nextEdition.sous_theme}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    <div className="flex items-center gap-2.5 text-sm font-body text-gray-300">
                      <Calendar size={15} className="text-lime shrink-0" />
                      <span>{formatDate(nextEdition.date_evenement)} · 11h–15h</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm font-body text-gray-300">
                      <MapPin size={15} className="text-lime shrink-0" />
                      <span>{nextEdition.lieu}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm font-body text-gray-300">
                      <Users size={15} className="text-lime shrink-0" />
                      <span>{nextEdition.capacite} participants max</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm font-body text-gray-300">
                      <Mic size={15} className="text-lime shrink-0" />
                      <span>Gratuit · Certifiant</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/inscription"
                      className="flex-1 text-center px-6 py-3 bg-green-primary border-2 border-green-primary text-white font-condensed font-semibold text-sm tracking-wider uppercase rounded-lg transition-all duration-200 hover:bg-green-mid hover:shadow-green-md active:scale-95"
                    >
                      S&apos;inscrire gratuitement
                    </Link>
                    <Link
                      href={`/editions/${nextEdition.slug}`}
                      className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-green-primary/30 text-gray-300 font-condensed font-semibold text-sm tracking-wider uppercase rounded-lg transition-all duration-200 hover:border-lime hover:text-lime"
                    >
                      Programme <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Right: speakers preview */}
                <div className="md:w-56 shrink-0">
                  <p className="font-condensed text-xs text-gray-500 tracking-wider uppercase mb-4">
                    Speakers confirméss
                  </p>
                  <div className="flex flex-col gap-3">
                    {confirmedSpeakers.map((s) => (
                      <div key={s.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-green-primary/30 shrink-0">
                          <Image
                            src={s.photo_url!}
                            alt={`${s.prenom} ${s.nom}`}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-condensed text-sm text-white font-semibold">
                            {s.prenom} {s.nom}
                          </div>
                          <div className="font-body text-xs text-gray-500">{s.titre}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-gray-600 font-body italic">
                    Speakers en cours de confirmation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
