import type { Metadata } from 'next'
import InscriptionForm from '@/components/forms/InscriptionForm'

export const metadata: Metadata = {
  title: 'Inscription — Édition 01',
  description: 'Inscrivez-vous gratuitement à la première édition de The Digital Forum. Certifiant · Gratuit · 80–120 participants.',
}

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-dark-bg py-16">
      <div className="container-site section-padding">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label">Édition 01 · Juin 2026</p>
            <h1 className="section-title mb-3">
              S&apos;inscrire <span className="gradient-text">gratuitement</span>
            </h1>
            <p className="font-body text-gray-400">
              Thème : <strong className="text-white">Gagner de l&apos;argent avec le digital</strong>
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              {['Gratuit', 'Certifiant', 'Conakry, Guinée'].map((item) => (
                <span
                  key={item}
                  className="font-condensed text-xs tracking-wider uppercase px-3 py-1 rounded-full bg-dark-card border border-green-primary/20 text-gray-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <InscriptionForm />
        </div>
      </div>
    </div>
  )
}
