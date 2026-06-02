'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
// icônes inline — lucide-react ne les exporte pas dans cette version
const IconLinkedin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)
const IconFacebook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
import type { Speaker } from '@/lib/types'

const roleConfig: Record<Speaker['role'], { label: string; couleur: string }> = {
  host:            { label: 'Host / Animateur',    couleur: '#A8FF78' },
  speaker:         { label: 'Speaker',             couleur: '#2ECC71' },
  moderateur:      { label: 'Modérateur',          couleur: '#78C8FF' },
  invite_special:  { label: 'Invité Spécial',      couleur: '#FFD700' },
}

interface SpeakerCardProps {
  speaker: Speaker
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
  const cfg = roleConfig[speaker.role]
  const initials = `${speaker.prenom[0]}${speaker.nom[0]}`.toUpperCase()
  const hasPhoto = !!speaker.photo_url
  const isConfirmed = speaker.organisation !== 'À confirmer'

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
      <div className="bg-dark-card border border-green-primary/20 rounded-2xl overflow-hidden hover:border-green-primary/50 hover:shadow-green-md transition-all duration-300 group">

        {/* Accent bar */}
        <div className="h-1" style={{ background: cfg.couleur }} />

        {/* Photo zone */}
        <div className="relative aspect-[4/5] overflow-hidden bg-dark-2">
          {hasPhoto ? (
            <>
              <Image
                src={speaker.photo_url!}
                alt={`${speaker.prenom} ${speaker.nom}`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/10 to-transparent" />
            </>
          ) : (
            /* Placeholder */
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-display border-2 border-dashed"
                style={{ borderColor: `${cfg.couleur}50`, color: cfg.couleur, background: `${cfg.couleur}08` }}
              >
                {initials}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-condensed text-xs text-amber-400 tracking-wider uppercase">
                  À confirmer
                </span>
              </div>
            </div>
          )}

          {/* Role badge — top right */}
          <div className="absolute top-3 right-3">
            <span
              className="text-[10px] font-condensed font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border backdrop-blur-md"
              style={{ color: cfg.couleur, borderColor: `${cfg.couleur}40`, background: 'rgba(13,34,24,0.8)' }}
            >
              {cfg.label}
            </span>
          </div>

          {/* Name overlay — bottom of photo (only if has photo) */}
          {hasPhoto && (
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-display font-bold text-xl sm:text-2xl text-white leading-tight drop-shadow-md">
                {speaker.prenom} {speaker.nom}
              </p>
              {speaker.titre && (
                <p className="font-condensed text-xs tracking-wider mt-0.5 drop-shadow-sm" style={{ color: cfg.couleur }}>
                  {speaker.titre}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Info zone */}
        <div className="p-4">
          {/* Name (only if no photo) */}
          {!hasPhoto && (
            <div className="mb-2">
              <p className="font-display font-bold text-xl text-white leading-tight">
                {speaker.prenom} {speaker.nom}
              </p>
              {speaker.titre && (
                <p className="font-condensed text-xs tracking-wider mt-0.5" style={{ color: cfg.couleur }}>
                  {speaker.titre}
                </p>
              )}
            </div>
          )}

          {/* Organisation */}
          {speaker.organisation && isConfirmed && (
            <p className="font-condensed text-xs text-gray-400 tracking-wide mb-2">
              {speaker.organisation}
            </p>
          )}

          {/* Bio */}
          {speaker.bio && (
            <p className="font-body text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
              {speaker.bio}
            </p>
          )}

          {/* Réseaux */}
          {(speaker.linkedin || speaker.facebook) && (
            <div className="flex items-center gap-3 pt-3 border-t border-green-primary/10">
              {speaker.linkedin && (
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn de ${speaker.prenom} ${speaker.nom}`}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <IconLinkedin />
                </a>
              )}
              {speaker.facebook && (
                <a
                  href={speaker.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Facebook de ${speaker.prenom} ${speaker.nom}`}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <IconFacebook />
                </a>
              )}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  )
}
