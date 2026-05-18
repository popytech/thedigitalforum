'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CountdownTimer from '@/components/features/CountdownTimer'
import LogoIcon from '@/components/ui/LogoIcon'
import DataBars from '@/components/features/DataBars'

const EDITION_01_DATE = new Date('2026-06-01T11:00:00')

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-dark-bg pt-8 pb-16">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,255,120,0.04) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-green-primary/10"
        />
        <div
          className="absolute bottom-10 -left-20 w-64 h-64 rounded-full border border-green-primary/5"
        />
        <div className="absolute top-20 left-10 opacity-30">
          <DataBars size="lg" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 rotate-180">
          <DataBars size="md" />
        </div>
      </div>

      <div className="container-site section-padding relative z-10 flex flex-col items-center text-center gap-6">
        {/* Logo */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-4">
          <LogoIcon size={72} />
        </motion.div>

        {/* Wordmark */}
        <motion.div {...fadeUp(0.1)}>
          <h1 className="hero-title font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wide leading-none">
            THE DIGITAL FORUM
          </h1>
          <div className="mt-2 flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-[80px] bg-green-primary/40" />
            <span className="font-condensed text-sm text-lime tracking-[0.2em] uppercase">
              by Popy Tech Agency
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-green-primary/40" />
          </div>
        </motion.div>

        {/* Main tagline */}
        <motion.h2
          {...fadeUp(0.2)}
          className="font-condensed font-semibold text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-3xl uppercase tracking-wider leading-snug"
        >
          Le rendez-vous trimestriel du{' '}
          <span className="gradient-text">digital entrepreneurial</span>{' '}
          en Guinée
        </motion.h2>

        {/* Sub */}
        <motion.p {...fadeUp(0.3)} className="font-body text-gray-400 text-base md:text-lg max-w-xl">
          Speakers · Networking · Certification · Impact réel
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            href="/inscription"
            className="px-8 py-3.5 bg-green-primary border-2 border-green-primary text-white font-condensed font-semibold text-base tracking-wider uppercase rounded-lg transition-all duration-200 hover:bg-green-mid hover:border-green-mid hover:shadow-green-md active:scale-95"
          >
            S&apos;inscrire gratuitement
          </Link>
          <Link
            href="/editions/edition-01-juin-2026"
            className="px-8 py-3.5 bg-transparent border-2 border-white/30 text-white font-condensed font-semibold text-base tracking-wider uppercase rounded-lg transition-all duration-200 hover:border-lime hover:text-lime active:scale-95"
          >
            En savoir plus
          </Link>
        </motion.div>

        {/* Countdown */}
        <motion.div {...fadeUp(0.5)} className="mt-8 flex flex-col items-center gap-4">
          <p className="font-condensed text-xs text-gray-500 tracking-[0.2em] uppercase">
            Prochaine édition — Juin 2026
          </p>
          <CountdownTimer targetDate={EDITION_01_DATE} />
        </motion.div>

        {/* Badges */}
        <motion.div
          {...fadeUp(0.6)}
          className="flex flex-wrap items-center justify-center gap-3 mt-4"
        >
          {['Gratuit', 'Certifiant', 'Conakry, Guinée', '80–120 participants'].map((item) => (
            <span
              key={item}
              className="font-condensed text-xs tracking-wider uppercase px-3 py-1.5 rounded-full bg-dark-card border border-green-primary/20 text-gray-400"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
