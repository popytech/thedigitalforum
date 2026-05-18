'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Send, MessageCircle } from 'lucide-react'
import { WHATSAPP_LINK } from '@/lib/constants'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section ref={ref} className="py-20 bg-dark-2">
      <div className="container-site section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="section-label">Rejoins la communauté</p>
          <h2 className="section-title mb-4">
            Reste <span className="gradient-text">connecté</span>
          </h2>
          <p className="font-body text-gray-400 mb-10">
            Rejoins 500+ membres sur notre communauté WhatsApp et reçois en avant-première
            les annonces, rappels et ressources exclusives.
          </p>

          {/* WhatsApp CTA */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-dark-bg font-condensed font-bold text-base tracking-wider uppercase rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95 shadow-lg mb-10"
          >
            <MessageCircle size={20} />
            Rejoindre la communauté WhatsApp
          </a>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-green-primary/20" />
            <span className="font-condensed text-xs text-gray-600 tracking-wider uppercase">
              ou recevoir nos actualités par email
            </span>
            <div className="h-px flex-1 bg-green-primary/20" />
          </div>

          {/* Email form */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center"
            >
              <div className="text-4xl mb-3">✅</div>
              <p className="font-condensed font-semibold text-lg text-lime">
                Inscription confirmée !
              </p>
              <p className="font-body text-sm text-gray-400 mt-1">
                Tu recevras nos prochaines annonces par email.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                required
                className="flex-1 bg-dark-card border border-green-primary/30 rounded-lg px-4 py-3 text-white font-body text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 transition-all"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-primary border-2 border-green-primary text-white font-condensed font-semibold text-sm tracking-wider uppercase rounded-lg transition-all duration-200 hover:bg-green-mid active:scale-95"
              >
                <Send size={14} />
                S&apos;abonner
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
