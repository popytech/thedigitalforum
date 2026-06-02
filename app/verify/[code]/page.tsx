import type { Metadata } from 'next'
import { CheckCircle, XCircle, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vérification Attestation',
  description: 'Vérifiez l\'authenticité d\'une attestation The Digital Forum.',
}

interface Props {
  params: { code: string }
}

export default async function VerifyPage({ params }: Props) {
  const { code } = params

  interface VerifyData {
    inscription?: { prenom?: string; nom?: string; edition?: { theme?: string } }
    emise_le?: string
  }
  let result: { valid: boolean; data?: VerifyData; message?: string } = { valid: false }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/verify/${code}`, { cache: 'no-store' })
    result = await res.json()
  } catch {
    result = { valid: false, message: 'Erreur de vérification' }
  }

  return (
    <div className="min-h-screen bg-dark-bg py-16 flex items-center justify-center">
      <div className="container-site section-padding max-w-lg">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Search size={20} className="text-lime" />
            <p className="section-label">Vérification attestation</p>
          </div>
          <h1 className="section-title">
            Authenticité <span className="gradient-text">attestation</span>
          </h1>
        </div>

        <div className="bg-dark-card border border-green-primary/20 rounded-2xl overflow-hidden">
          <div className={`h-1.5 ${result.valid ? 'bg-lime-gradient' : 'bg-red-600'}`} />
          <div className="p-10 text-center">
            {result.valid ? (
              <>
                <CheckCircle size={56} className="text-lime mx-auto mb-5" />
                <h2 className="font-display text-4xl text-white mb-2">VALIDE ✅</h2>
                <p className="font-body text-gray-400 mb-8">Cette attestation est authentique.</p>

                {result.data && (
                  <div className="bg-dark-2 rounded-xl p-5 text-left flex flex-col gap-3">
                    <div>
                      <span className="font-condensed text-xs text-gray-500 tracking-wider uppercase">
                        Participant
                      </span>
                      <p className="font-condensed font-bold text-white text-lg">
                        {result.data.inscription?.prenom} {result.data.inscription?.nom}
                      </p>
                    </div>
                    <div>
                      <span className="font-condensed text-xs text-gray-500 tracking-wider uppercase">
                        Édition
                      </span>
                      <p className="font-body text-gray-300 text-sm">
                        {result.data.inscription?.edition?.theme}
                      </p>
                    </div>
                    <div>
                      <span className="font-condensed text-xs text-gray-500 tracking-wider uppercase">
                        Date
                      </span>
                      <p className="font-body text-gray-300 text-sm">
                        {result.data.emise_le
                          ? new Date(result.data.emise_le).toLocaleDateString('fr-FR')
                          : '—'}
                      </p>
                    </div>
                    <div>
                      <span className="font-condensed text-xs text-gray-500 tracking-wider uppercase">
                        Code unique
                      </span>
                      <p className="font-mono text-xs text-lime">{code}</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <XCircle size={56} className="text-red-500 mx-auto mb-5" />
                <h2 className="font-display text-4xl text-white mb-2">INVALIDE ❌</h2>
                <p className="font-body text-gray-400 mb-2">
                  Aucune attestation trouvée pour ce code.
                </p>
                <p className="font-mono text-xs text-gray-600 bg-dark-2 px-4 py-2 rounded-lg inline-block">
                  {code}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
