'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { CheckCircle, XCircle, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react'
import LogoIcon from '@/components/ui/LogoIcon'

interface Inscription {
  id: string
  prenom: string
  nom: string
  email: string
  telephone: string
  ville: string
  statut_pro: string
  statut: string
  created_at: string
  qr_code: string
  editions?: { titre: string; theme: string; date_event: string; lieu: string } | null
}

export default function CheckInPage() {
  const { code } = useParams<{ code: string }>()
  const [data, setData] = useState<Inscription | null>(null)
  const [valid, setValid] = useState<boolean | null>(null)
  const [marking, setMarking] = useState(false)
  const [marked, setMarked] = useState(false)

  useEffect(() => {
    fetch(`/api/check-in/${code}`)
      .then((r) => r.json())
      .then((res) => {
        setValid(res.valid)
        if (res.valid) setData(res.data)
      })
      .catch(() => setValid(false))
  }, [code])

  async function markPresent() {
    setMarking(true)
    const res = await fetch(`/api/check-in/${code}`, { method: 'PATCH' })
    if (res.ok) {
      setMarked(true)
      if (data) setData({ ...data, statut: 'presente' })
    }
    setMarking(false)
  }

  const edition = Array.isArray(data?.editions) ? data?.editions[0] : data?.editions

  if (valid === null) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-lime border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg py-10 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <LogoIcon size={36} />
          <div className="text-center">
            <div className="font-display text-xl text-white tracking-wider">THE DIGITAL FORUM</div>
            <div className="font-condensed text-xs text-lime tracking-widest uppercase">Check-in</div>
          </div>
        </div>

        {!valid ? (
          <div className="bg-dark-card border border-red-500/30 rounded-2xl overflow-hidden text-center p-10">
            <div className="h-1 bg-red-600 mb-8 -mt-10 mx-[-2.5rem]" />
            <XCircle size={56} className="text-red-500 mx-auto mb-4" />
            <h2 className="font-display text-3xl text-white mb-2">QR Code Invalide</h2>
            <p className="font-body text-gray-400 text-sm">Aucune inscription trouvée pour ce code.</p>
            <p className="font-mono text-xs text-gray-600 mt-4 bg-dark-2 px-3 py-2 rounded-lg inline-block">
              {code}
            </p>
          </div>
        ) : (
          <div className="bg-dark-card border border-green-primary/30 rounded-2xl overflow-hidden">
            <div className="h-1.5 bg-lime-gradient" />

            {/* Statut badge */}
            <div className="px-6 pt-6 pb-2 flex items-center justify-between">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-condensed tracking-wider uppercase ${
                data?.statut === 'presente'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-green-primary/20 text-lime border border-green-primary/30'
              }`}>
                <CheckCircle size={11} />
                {data?.statut === 'presente' ? 'Déjà présent(e)' : 'Confirmé(e)'}
              </span>
              <span className="font-mono text-xs text-gray-600">{code.slice(0, 8).toUpperCase()}</span>
            </div>

            {/* Nom */}
            <div className="px-6 py-4 border-b border-green-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-green-primary/20 border border-lime/30 rounded-xl flex items-center justify-center shrink-0">
                  <span className="font-display text-2xl text-lime">
                    {data?.prenom[0]}{data?.nom[0]}
                  </span>
                </div>
                <div>
                  <div className="font-display text-2xl text-white">{data?.prenom} {data?.nom}</div>
                  <div className="font-condensed text-xs text-gray-500 uppercase tracking-wider">{data?.statut_pro}</div>
                </div>
              </div>
            </div>

            {/* Détails */}
            <div className="px-6 py-4 flex flex-col gap-3">
              {[
                { icon: Mail, label: data?.email },
                { icon: Phone, label: data?.telephone },
                { icon: MapPin, label: data?.ville },
                { icon: Briefcase, label: data?.statut_pro },
                { icon: Calendar, label: edition
                  ? `${edition.titre} · ${edition.date_event
                      ? new Date(edition.date_event).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                      : 'Date à confirmer'}`
                  : '—' },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <Icon size={14} className="text-lime shrink-0" />
                  <span className="font-body text-gray-300">{label}</span>
                </div>
              ))}

              {edition?.theme && (
                <div className="mt-2 p-3 bg-green-primary/10 border border-green-primary/20 rounded-lg">
                  <p className="font-condensed text-xs text-gray-500 uppercase tracking-wider mb-1">Thème</p>
                  <p className="font-body text-sm text-lime">&ldquo;{edition.theme}&rdquo;</p>
                </div>
              )}
            </div>

            {/* Action check-in */}
            <div className="px-6 pb-6">
              {data?.statut === 'presente' || marked ? (
                <div className="flex items-center justify-center gap-2 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 font-condensed text-sm tracking-wider uppercase rounded-xl">
                  <CheckCircle size={16} /> Présence enregistrée
                </div>
              ) : (
                <button
                  type="button"
                  onClick={markPresent}
                  disabled={marking}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-lime text-dark-bg font-condensed font-bold text-sm tracking-wider uppercase rounded-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-70"
                >
                  {marking
                    ? <span className="w-4 h-4 border-2 border-dark-bg/30 border-t-dark-bg rounded-full animate-spin" />
                    : <CheckCircle size={16} />
                  }
                  {marking ? 'Enregistrement…' : 'Marquer comme présent(e)'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
