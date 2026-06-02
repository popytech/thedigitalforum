'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react'
import type { GalleryPhoto } from '@/lib/types'
import type { Edition } from '@/lib/types'
import { HASHTAGS } from '@/lib/constants'

interface Props {
  photos: GalleryPhoto[]
  editions: Edition[]
}

export default function GalerieClient({ photos, editions }: Props) {
  const [activeEdition, setActiveEdition] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered =
    activeEdition === 'all'
      ? photos
      : photos.filter((p) => p.edition_id === activeEdition)

  const openLightbox = (idx: number) => setLightboxIndex(idx)
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i - 1 + filtered.length) % filtered.length : null
      ),
    [filtered.length]
  )

  const next = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i + 1) % filtered.length : null
      ),
    [filtered.length]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, closeLightbox, prev, next])

  const photoCountPerEdition = (editionId: string) =>
    photos.filter((p) => p.edition_id === editionId).length

  return (
    <div className="min-h-screen bg-dark-bg py-10 md:py-16">
      <div className="container-site section-padding">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="section-label">Souvenirs du Jour J</p>
          <h1 className="section-title mb-4">
            Galerie <span className="gradient-text">Photos</span>
          </h1>
          <p className="font-body text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Revivez chaque édition de The Digital Forum à travers les photos
            prises le jour de l&apos;événement — speakers, participants, networking.
          </p>
        </div>

        {/* Edition filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8 md:mb-12">
          <button
            onClick={() => setActiveEdition('all')}
            className={`px-4 py-1.5 rounded-full font-condensed text-xs font-semibold tracking-wider uppercase border transition-all ${
              activeEdition === 'all'
                ? 'bg-green-primary border-green-primary text-white'
                : 'border-green-primary/20 text-gray-400 hover:border-green-primary hover:text-white'
            }`}
          >
            Toutes{' '}
            {photos.length > 0 && (
              <span className="ml-1 opacity-60">({photos.length})</span>
            )}
          </button>
          {editions.map((e) => {
            const count = photoCountPerEdition(e.id)
            return (
              <button
                key={e.id}
                onClick={() => setActiveEdition(e.id)}
                className={`px-4 py-1.5 rounded-full font-condensed text-xs font-semibold tracking-wider uppercase border transition-all ${
                  activeEdition === e.id
                    ? 'bg-green-primary border-green-primary text-white'
                    : 'border-green-primary/20 text-gray-400 hover:border-green-primary hover:text-white'
                }`}
              >
                {e.titre}
                {count > 0 && (
                  <span className="ml-1 opacity-60">({count})</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Grid or empty state */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState activeEdition={activeEdition} editions={editions} />
            </motion.div>
          ) : (
            <motion.div
              key={activeEdition}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PhotoGrid photos={filtered} onOpen={openLightbox} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <Lightbox
            photo={filtered[lightboxIndex]}
            total={filtered.length}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Empty state ─────────────────────────────────────────────────────────── */

function EmptyState({
  activeEdition,
  editions,
}: {
  activeEdition: string
  editions: Edition[]
}) {
  const edition = editions.find((e) => e.id === activeEdition)
  const nextEdition =
    editions.find((e) => e.statut === 'published') ?? editions[0]

  const dateStr = nextEdition
    ? new Date(nextEdition.date_evenement).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4">
      <div className="w-20 h-20 rounded-2xl bg-green-primary/10 border border-green-primary/20 flex items-center justify-center mb-6">
        <Camera size={36} className="text-green-primary/40" />
      </div>
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
        {edition
          ? `Aucune photo pour ${edition.titre}`
          : 'Bientôt disponible'}
      </h2>
      <p className="font-body text-gray-400 max-w-md leading-relaxed mb-2 text-sm sm:text-base">
        {edition
          ? `Les photos de ${edition.titre} seront publiées après l'événement.`
          : 'Les photos de chaque édition sont publiées après le jour J.'}
      </p>
      {!edition && dateStr && (
        <p className="font-condensed font-semibold text-lime tracking-wider mb-8">
          Première édition le {dateStr}
        </p>
      )}
      {edition && <div className="mb-8" />}

      <div className="flex flex-wrap gap-2 justify-center">
        {HASHTAGS.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-dark-card border border-green-primary/20 rounded-full text-xs font-condensed text-green-light tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Photo grid (masonry CSS columns) ───────────────────────────────────── */

function PhotoGrid({
  photos,
  onOpen,
}: {
  photos: GalleryPhoto[]
  onOpen: (i: number) => void
}) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4">
      {photos.map((photo, i) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.4) }}
          className="break-inside-avoid mb-3 md:mb-4 cursor-pointer group relative overflow-hidden rounded-xl border border-green-primary/10 hover:border-lime/40 transition-all duration-300"
          onClick={() => onOpen(i)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.url}
            alt={photo.caption ?? `Photo Édition ${photo.edition_id}`}
            className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-dark-bg/0 group-hover:bg-dark-bg/20 transition-colors duration-300 pointer-events-none" />
          {photo.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-bg/90 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="font-body text-xs text-gray-200 line-clamp-2">
                {photo.caption}
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Lightbox ────────────────────────────────────────────────────────────── */

function Lightbox({
  photo,
  total,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photo: GalleryPhoto
  total: number
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        aria-label="Fermer"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-card border border-white/10 flex items-center justify-center text-white hover:bg-dark-2 transition-colors z-10"
        onClick={onClose}
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-dark-card border border-white/10 rounded-full px-4 py-1.5 font-condensed text-xs text-gray-300 tracking-wider z-10 whitespace-nowrap">
        {index + 1} / {total}
      </div>

      {/* Prev */}
      {total > 1 && (
        <button
          aria-label="Photo précédente"
          className="absolute left-2 sm:left-5 w-10 h-10 rounded-full bg-dark-card border border-white/10 flex items-center justify-center text-white hover:bg-dark-2 transition-colors z-10"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Image */}
      <motion.div
        key={photo.id}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.url}
          alt={photo.caption ?? 'Photo'}
          className="max-h-[78vh] max-w-full w-auto object-contain rounded-xl shadow-2xl"
        />
        {photo.caption && (
          <p className="text-center font-body text-sm text-gray-400 mt-3 max-w-lg px-4">
            {photo.caption}
          </p>
        )}
      </motion.div>

      {/* Next */}
      {total > 1 && (
        <button
          aria-label="Photo suivante"
          className="absolute right-2 sm:right-5 w-10 h-10 rounded-full bg-dark-card border border-white/10 flex items-center justify-center text-white hover:bg-dark-2 transition-colors z-10"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
        >
          <ChevronRight size={20} />
        </button>
      )}
    </motion.div>
  )
}
