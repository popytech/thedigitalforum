'use client'

import { useState } from 'react'
import { useForm, type FieldValues, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import { Input, Select, Textarea } from '@/components/ui/Input'
import {
  inscriptionStep1Schema,
  inscriptionStep2Schema,
  inscriptionStep3Schema,
  type InscriptionStep1,
  type InscriptionStep2,
  type InscriptionStep3,
} from '@/lib/validators'
import { z } from 'zod'

type StepData = InscriptionStep1 & Partial<InscriptionStep2> & Partial<InscriptionStep3>
type FormFieldErrors = FieldErrors<FieldValues>

const TOTAL_STEPS = 3

const statutOptions = [
  { value: 'Étudiant', label: 'Étudiant(e)' },
  { value: 'Entrepreneur', label: 'Entrepreneur(e)' },
  { value: 'Freelance', label: 'Freelance' },
  { value: 'Salarié', label: 'Salarié(e)' },
  { value: 'Créateur', label: 'Créateur / Créatrice de contenu' },
  { value: 'Autre', label: 'Autre' },
]

const sourceOptions = [
  { value: 'Facebook', label: 'Facebook' },
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Bouche-à-oreille', label: 'Bouche-à-oreille' },
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Autre', label: 'Autre' },
]

const stepSchemas: z.ZodTypeAny[] = [inscriptionStep1Schema, inscriptionStep2Schema, inscriptionStep3Schema]
const stepTitles = ['Identité', 'Profil', 'Attentes']

function fieldError(errors: FormFieldErrors, name: string): string | undefined {
  return (errors[name]?.message as string | undefined)
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        {stepTitles.map((title, i) => (
          <div key={title} className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-condensed font-bold text-sm transition-all duration-300 ${
                i < step
                  ? 'bg-lime text-dark-bg'
                  : i === step
                  ? 'bg-green-primary text-white'
                  : 'bg-dark-2 text-gray-500 border border-green-primary/20'
              }`}
            >
              {i < step ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span
              className={`font-condensed text-xs tracking-wider uppercase ${
                i === step ? 'text-lime' : 'text-gray-500'
              }`}
            >
              {title}
            </span>
          </div>
        ))}
      </div>
      <div className="h-1 bg-dark-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-lime-gradient rounded-full transition-all duration-500"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default function InscriptionForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<StepData>>({})
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(stepSchemas[step] as z.ZodType<FieldValues, any, any>),
    defaultValues: formData,
  })

  const onStepSubmit = async (data: FieldValues) => {
    const merged = { ...formData, ...data }
    setFormData(merged)
    setApiError(null)

    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...merged, edition_id: '1' }),
      })
      const result = await res.json()
      if (res.ok) {
        const params = new URLSearchParams({
          qr: result.qr_code,
          nom: `${merged.prenom} ${merged.nom}`,
          edition: result.edition ?? 'The Digital Forum — Édition 01',
          date: result.date ?? 'Juin 2026',
        })
        router.push(`/confirmation?${params.toString()}`)
      } else {
        setApiError(result.error ?? 'Une erreur est survenue. Veuillez réessayer.')
        setLoading(false)
      }
    } catch {
      setApiError('Connexion impossible. Vérifiez votre connexion internet et réessayez.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-dark-card border border-green-primary/20 rounded-2xl p-5 sm:p-8">
      <ProgressBar step={step} />

      <AnimatePresence mode="wait">
        <motion.form
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit(onStepSubmit)}
          className="flex flex-col gap-5"
        >
          {step === 0 && (
            <>
              <h2 className="font-display text-2xl text-white mb-1">Votre identité</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Prénom"
                  placeholder="Votre prénom"
                  required
                  error={fieldError(errors, 'prenom')}
                  {...register('prenom')}
                />
                <Input
                  label="Nom"
                  placeholder="Votre nom de famille"
                  required
                  error={fieldError(errors, 'nom')}
                  {...register('nom')}
                />
              </div>
              <Input
                label="Numéro de téléphone"
                type="tel"
                placeholder="+224 6XX XXX XXX"
                required
                error={fieldError(errors, 'telephone')}
                {...register('telephone')}
              />
              <Input
                label="Email"
                type="email"
                placeholder="vous@example.com"
                required
                error={fieldError(errors, 'email')}
                {...register('email')}
              />
              <Input
                label="Ville / Quartier"
                placeholder="Ex: Conakry, Ratoma"
                required
                error={fieldError(errors, 'ville')}
                {...register('ville')}
              />
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="font-display text-2xl text-white mb-1">Votre profil</h2>
              <Select
                label="Votre statut"
                required
                options={statutOptions}
                error={fieldError(errors, 'statut_pro')}
                {...register('statut_pro')}
              />
              <Input
                label="Secteur d'activité"
                placeholder="Ex: Marketing, Informatique, Commerce..."
                required
                error={fieldError(errors, 'secteur')}
                {...register('secteur')}
              />
              <Select
                label="Comment avez-vous connu l'événement ?"
                required
                options={sourceOptions}
                error={fieldError(errors, 'source')}
                {...register('source')}
              />
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-2xl text-white mb-1">Vos attentes</h2>
              <Textarea
                label="Qu'espérez-vous retirer de cette édition ?"
                placeholder="Décrivez vos objectifs et attentes pour cette édition..."
                required
                error={fieldError(errors, 'attentes')}
                {...register('attentes')}
                rows={5}
              />
              <Textarea
                label="Question pour le Q&A (optionnel)"
                placeholder="Une question que vous souhaitez poser aux speakers..."
                {...register('question_qa')}
                rows={3}
              />
            </>
          )}

          {/* Erreur API */}
          {apiError && (
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <span className="text-red-400 text-lg leading-none mt-0.5">⚠</span>
              <p className="font-body text-sm text-red-300 leading-relaxed">{apiError}</p>
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 px-5 py-2.5 border border-green-primary/30 text-gray-300 font-condensed text-sm font-semibold tracking-wider uppercase rounded-lg hover:border-green-primary hover:text-white transition-all"
              >
                <ArrowLeft size={14} /> Retour
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-7 py-2.5 bg-green-primary border-2 border-green-primary text-white font-condensed font-semibold text-sm tracking-wider uppercase rounded-lg transition-all hover:bg-green-mid active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : null}
              {step < TOTAL_STEPS - 1 ? (
                <>
                  Suivant <ArrowRight size={14} />
                </>
              ) : loading ? (
                'Inscription...'
              ) : (
                <>
                  Confirmer l&apos;inscription <CheckCircle size={14} />
                </>
              )}
            </button>
          </div>
        </motion.form>
      </AnimatePresence>
    </div>
  )
}
