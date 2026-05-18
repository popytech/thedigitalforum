'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, CheckCircle } from 'lucide-react'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { sponsorContactSchema, type SponsorContactSchema } from '@/lib/validators'
import { SPONSOR_PACKS } from '@/lib/constants'

export default function SponsorForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SponsorContactSchema>({
    resolver: zodResolver(sponsorContactSchema),
  })

  const onSubmit = async (data: SponsorContactSchema) => {
    setLoading(true)
    try {
      const res = await fetch('/api/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-dark-card border border-green-primary/30 rounded-xl p-12 text-center">
        <CheckCircle size={48} className="text-lime mx-auto mb-4" />
        <h3 className="font-display text-3xl text-white mb-2">Message envoyé !</h3>
        <p className="font-body text-gray-400">
          Nous vous contacterons dans les 24h pour discuter de votre partenariat.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-dark-card border border-green-primary/20 rounded-xl p-8 flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Nom complet"
          placeholder="Votre nom"
          required
          error={errors.nom?.message}
          {...register('nom')}
        />
        <Input
          label="Entreprise"
          placeholder="Nom de votre entreprise"
          required
          error={errors.entreprise?.message}
          {...register('entreprise')}
        />
      </div>

      <Select
        label="Pack souhaité"
        required
        options={SPONSOR_PACKS.map((p) => ({ value: p.id, label: `${p.nom} — ${p.prix}` }))}
        error={errors.pack?.message}
        {...register('pack')}
      />

      <Input
        label="Téléphone"
        placeholder="+224 6XX XXX XXX"
        type="tel"
        required
        error={errors.telephone?.message}
        {...register('telephone')}
      />

      <Textarea
        label="Votre message"
        placeholder="Décrivez votre projet de partenariat..."
        required
        error={errors.message?.message}
        {...register('message')}
      />

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 px-8 py-3.5 bg-green-primary border-2 border-green-primary text-white font-condensed font-semibold text-base tracking-wider uppercase rounded-lg transition-all duration-200 hover:bg-green-mid active:scale-95 disabled:opacity-70"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {loading ? 'Envoi...' : 'Envoyer la demande'}
      </button>
    </form>
  )
}
