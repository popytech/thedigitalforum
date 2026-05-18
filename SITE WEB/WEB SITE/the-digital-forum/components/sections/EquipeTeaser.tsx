'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface MembreTeaser {
  prenom?: string
  nom?: string
  role: string
  couleur: string
  photo?: string
  emoji?: string
  statut: 'pourvu' | 'recherche'
}

const membres: MembreTeaser[] = [
  {
    prenom: 'Sekou', nom: 'Cissé',
    role: 'Designer / Créatif', couleur: '#A8FF78',
    photo: '/images/equipe/sekou-cisse.jpeg', statut: 'pourvu',
  },
  {
    prenom: 'Cece', nom: 'Roger',
    role: 'Graphiste', couleur: '#78C8FF',
    photo: '/images/equipe/cece-roger.png', statut: 'pourvu',
  },
  {
    prenom: 'Abdoulaye', nom: 'Camara',
    role: 'Photographe / Vidéaste', couleur: '#2ECC71',
    photo: '/images/equipe/abdoulaye-camara.jpeg', statut: 'pourvu',
  },
  {
    prenom: 'Moussa', nom: 'Kéïta',
    role: 'Photographe', couleur: '#27AE60',
    photo: '/images/equipe/moussa-keita.jpeg', statut: 'pourvu',
  },
  {
    prenom: 'Alhasanne', nom: 'Touré',
    role: 'Community Manager', couleur: '#FFD700',
    photo: '/images/equipe/alhasanne-toure.jpg', statut: 'pourvu',
  },
  {
    prenom: 'Souleymane', nom: 'Condé',
    role: 'Commercial / Partenariats', couleur: '#FF9F43',
    photo: '/images/equipe/souleymane-conde.jpeg', statut: 'pourvu',
  },
  {
    prenom: 'Lamarana', nom: 'Keita',
    role: 'Modératrice / Présentatrice', couleur: '#E879F9',
    photo: '/images/equipe/lamarana-keita.jpeg', statut: 'pourvu',
  },
  {
    prenom: 'Fanta', nom: 'Camara',
    role: 'Ambassadrice', couleur: '#FF6B6B',
    photo: '/images/equipe/fanta-camara.jpeg', statut: 'pourvu',
  },
  {
    prenom: 'Gnalen', nom: 'Touré',
    role: 'Créatrice de Contenu / Communicante', couleur: '#FB923C',
    photo: '/images/equipe/gnalen-toure.jpeg', statut: 'pourvu',
  },
  {
    role: 'Coordinateur Logistique', couleur: '#4ECDC4',
    emoji: '⚙️', statut: 'recherche',
  },
]

export default function EquipeTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 bg-dark-bg">
      <div className="container-site section-padding">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="section-label">Derrière l&apos;événement</p>
            <h2 className="section-title">
              Notre <span className="gradient-text">équipe</span>
            </h2>
          </div>
          <Link
            href="/equipe"
            className="flex items-center gap-2 font-condensed text-sm text-lime tracking-wider uppercase hover:gap-4 transition-all duration-200 shrink-0"
          >
            Voir tous les profils <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Grille photos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
          {membres.map((m, i) => (
            <motion.div
              key={m.role}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href="/equipe"
                className="flex flex-col items-center text-center gap-2 group"
              >
                {/* Photo ou placeholder */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-green-primary/20 group-hover:border-green-primary/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-green-sm">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={`${m.prenom} ${m.nom}`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center gap-1"
                      style={{ background: `${m.couleur}08` }}
                    >
                      <span className="text-3xl">{m.emoji}</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span className="font-condensed text-[10px] text-amber-400 tracking-wider uppercase">
                          Recrute
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Gradient + nom au survol */}
                  {m.photo && (
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                      <p className="font-condensed text-xs text-white font-semibold leading-tight">
                        {m.prenom} {m.nom}
                      </p>
                    </div>
                  )}
                </div>

                {/* Rôle */}
                <span
                  className="font-condensed text-[10px] font-semibold tracking-wide leading-tight uppercase text-gray-400 group-hover:text-white transition-colors line-clamp-2"
                >
                  {m.role}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center"
        >
          <Link
            href="/equipe"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-green-primary border-2 border-green-primary text-white font-condensed font-bold text-sm tracking-wider uppercase rounded-xl transition-all duration-200 hover:bg-green-mid hover:shadow-green-md active:scale-95"
          >
            Voir l&apos;équipe complète <ArrowRight size={15} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
