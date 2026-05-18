'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'

export default function Temoignages() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length)

  return (
    <section className="py-20 bg-dark-bg">
      <div className="container-site section-padding">
        <div className="text-center mb-12">
          <p className="section-label">Ce qu&apos;ils disent</p>
          <h2 className="section-title">
            Témoignages <span className="gradient-text">participants</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative bg-dark-card border border-green-primary/20 rounded-2xl p-8 md:p-12">
            <Quote size={40} className="text-green-primary/30 absolute top-6 left-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className="font-body text-gray-200 text-lg md:text-xl leading-relaxed mb-8 italic">
                  &ldquo;{TESTIMONIALS[current].citation}&rdquo;
                </p>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-green-primary/20 border border-green-primary/30 rounded-full flex items-center justify-center mb-2">
                    <span className="font-display text-lg text-lime">
                      {TESTIMONIALS[current].nom.charAt(0)}
                    </span>
                  </div>
                  <span className="font-condensed font-semibold text-white">
                    {TESTIMONIALS[current].nom}
                  </span>
                  <span className="font-body text-xs text-gray-500">
                    {TESTIMONIALS[current].statut}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-dark-2 border border-green-primary/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-green-primary transition-all"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'bg-lime w-5' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-dark-2 border border-green-primary/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-green-primary transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
