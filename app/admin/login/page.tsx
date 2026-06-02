'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LogoIcon from '@/components/ui/LogoIcon'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error ?? 'Mot de passe incorrect')
      }
    } catch {
      setError('Erreur de connexion. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <LogoIcon size={56} />
          <div className="text-center">
            <h1 className="font-display font-black text-3xl text-white tracking-wide">
              THE DIGITAL FORUM
            </h1>
            <p className="font-condensed text-xs text-lime tracking-[0.2em] uppercase mt-1">
              Back-office Admin
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-dark-card border border-green-primary/30 rounded-2xl overflow-hidden">
          <div className="h-1 bg-lime-gradient" />
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-primary/20 border border-lime/30 rounded-xl flex items-center justify-center">
                <Lock size={18} className="text-lime" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-white">Accès sécurisé</h2>
                <p className="font-body text-xs text-gray-500">Réservé à l&apos;équipe organisatrice</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 bg-dark-2 border border-green-primary/20 rounded-xl text-white font-body text-sm placeholder-gray-600 focus:outline-none focus:border-green-primary/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <span className="text-red-400 text-sm">⚠</span>
                  <p className="font-body text-sm text-red-300">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full py-3 bg-green-primary border-2 border-green-primary text-white font-condensed font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-green-mid transition-all disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connexion...
                  </span>
                ) : 'Se connecter'}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center font-body text-xs text-gray-600 mt-6">
          The Digital Forum © {new Date().getFullYear()} · Popy Tech Agency
        </p>
      </div>
    </div>
  )
}
