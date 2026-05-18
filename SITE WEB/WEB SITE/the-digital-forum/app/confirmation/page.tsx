'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle, Calendar, MapPin, Download } from 'lucide-react'
import Link from 'next/link'
import QRCodeImage from '@/components/ui/QRCodeImage'
import { WHATSAPP_LINK } from '@/lib/constants'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://thedigitalforum.gn'

function ConfirmationContent() {
  const params = useSearchParams()
  const qr = params.get('qr') || ''
  const nom = params.get('nom') || 'Participant'
  const edition = params.get('edition') || 'Édition 01'
  const date = params.get('date') || 'Juin 2026'

  const checkInUrl = `${APP_URL}/check-in/${qr}`

  return (
    <div className="min-h-screen bg-dark-bg py-16 flex items-center justify-center">
      <div className="container-site section-padding max-w-xl">
        <div className="bg-dark-card border border-green-primary/30 rounded-2xl overflow-hidden text-center">
          <div className="h-1.5 bg-lime-gradient" />
          <div className="p-8 md:p-10">

            {/* Icône succès */}
            <div className="w-20 h-20 bg-green-primary/20 border-2 border-lime/40 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-lime" />
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-2">Inscription confirmée !</h1>
            <p className="font-body text-gray-400 mb-8">
              Bienvenue, <strong className="text-white">{decodeURIComponent(nom)}</strong> !<br />
              <span className="text-lime text-sm">{decodeURIComponent(edition)}</span>
            </p>

            {/* Vrai QR Code */}
            <div className="flex flex-col items-center mb-4">
              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg mb-3 w-fit mx-auto">
                {qr ? (
                  <QRCodeImage value={checkInUrl} size={180} />
                ) : (
                  <div className="w-[180px] h-[180px] bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Chargement…</span>
                  </div>
                )}
              </div>
              <p className="font-mono text-xs text-lime tracking-widest mb-1">
                {qr.slice(0, 8).toUpperCase()}
              </p>
              <p className="font-body text-xs text-gray-500">
                Présentez ce QR code le jour J à l&apos;entrée
              </p>
            </div>

            {/* Infos événement */}
            <div className="bg-dark-2 rounded-xl p-5 text-left mb-6 flex flex-col gap-3">
              <div className="flex items-center gap-2.5 text-sm font-body text-gray-300">
                <Calendar size={15} className="text-lime shrink-0" />
                <span>{decodeURIComponent(date)} · 11h00 – 15h00</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-body text-gray-300">
                <MapPin size={15} className="text-lime shrink-0" />
                <span>Lieu à confirmer · Conakry, Guinée</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <a
                href={checkInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-green-primary border-2 border-green-primary text-white font-condensed font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-green-mid transition-all"
              >
                <Download size={15} /> Voir ma fiche d&apos;accès
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-[#25D366] text-dark-bg font-condensed font-bold text-sm tracking-wider uppercase rounded-xl hover:brightness-110 transition-all"
              >
                Rejoindre la communauté WhatsApp
              </a>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 py-3 border border-green-primary/30 text-gray-300 font-condensed text-sm tracking-wider uppercase rounded-xl hover:border-green-primary hover:text-white transition-all"
              >
                Retour à l&apos;accueil
              </Link>
            </div>

            <p className="mt-6 font-body text-xs text-gray-600">
              Un email de confirmation avec ce QR code vous a été envoyé.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
