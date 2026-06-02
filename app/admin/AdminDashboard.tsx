'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users, CheckCircle, Calendar, TrendingUp, Search, Download,
  RefreshCw, Trash2, Edit2, X, Save, ChevronDown, ChevronUp,
  MessageSquare, LogOut, Settings,
} from 'lucide-react'

interface Inscription {
  id: string
  prenom: string
  nom: string
  email: string
  telephone: string
  ville: string
  statut_pro: string
  secteur?: string
  source?: string
  attentes?: string
  question_qa?: string
  statut: string
  created_at: string
  edition_id?: string
  editions?: { titre: string } | null
}

interface Edition {
  id: string
  titre: string
  statut: string
  date_event: string | null
  capacite: number
}

interface Stats {
  totalInscrits: number
  totalConfirmes: number
  derniers: Inscription[]
  editions: Edition[]
  countByEdition: Record<string, number>
  errors?: string[]
}

const statutColors: Record<string, string> = {
  confirmee: 'bg-green-primary/20 text-lime border border-green-primary/30',
  presente:  'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  annulee:   'bg-red-500/20 text-red-400 border border-red-500/30',
}

// ── Modal Voir/Modifier ───────────────────────────────────────────────────────
function ModalInscrit({
  inscrit,
  onClose,
  onSave,
  onDelete,
}: {
  inscrit: Inscription
  onClose: () => void
  onSave: (id: string, data: Partial<Inscription>) => Promise<void>
  onDelete: (id: string) => Promise<void>
}) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [form, setForm] = useState({ ...inscrit })

  async function handleSave() {
    setSaving(true)
    await onSave(inscrit.id, {
      prenom: form.prenom, nom: form.nom, email: form.email,
      telephone: form.telephone, ville: form.ville,
      statut_pro: form.statut_pro, statut: form.statut,
      attentes: form.attentes, question_qa: form.question_qa,
    })
    setSaving(false)
    setEditing(false)
  }

  async function handleDelete() {
    setDeleting(true)
    await onDelete(inscrit.id)
    onClose()
  }

  const field = (label: string, key: keyof Inscription, type: 'input' | 'textarea' | 'select' = 'input') => (
    <div>
      <label className="block font-condensed text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</label>
      {!editing ? (
        <p className="font-body text-sm text-gray-200">{form[key] as string || '—'}</p>
      ) : type === 'textarea' ? (
        <textarea
          aria-label={label}
          value={form[key] as string || ''}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 bg-dark-2 border border-green-primary/20 rounded-lg text-sm text-white font-body focus:outline-none focus:border-green-primary/50 resize-none"
        />
      ) : type === 'select' && key === 'statut' ? (
        <select
          aria-label={label}
          value={form.statut}
          onChange={e => setForm(f => ({ ...f, statut: e.target.value }))}
          className="w-full px-3 py-2 bg-dark-2 border border-green-primary/20 rounded-lg text-sm text-white font-body focus:outline-none focus:border-green-primary/50"
        >
          <option value="confirmee">Confirmée</option>
          <option value="presente">Présente</option>
          <option value="annulee">Annulée</option>
        </select>
      ) : (
        <input
          aria-label={label}
          value={form[key] as string || ''}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          className="w-full px-3 py-2 bg-dark-2 border border-green-primary/20 rounded-lg text-sm text-white font-body focus:outline-none focus:border-green-primary/50"
        />
      )}
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/90 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-dark-card border border-green-primary/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="h-1 bg-lime-gradient rounded-t-2xl" />
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-display font-black text-2xl text-white">{inscrit.prenom} {inscrit.nom}</h2>
              <p className="font-body text-sm text-gray-400">{inscrit.email}</p>
              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-condensed font-semibold mt-1 ${statutColors[inscrit.statut] ?? 'text-gray-400'}`}>
                {inscrit.statut}
              </span>
            </div>
            <button type="button" onClick={onClose} aria-label="Fermer" className="p-2 rounded-lg hover:bg-dark-2 text-gray-400 hover:text-white transition-colors">
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Grille infos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {field('Prénom', 'prenom')}
            {field('Nom', 'nom')}
            {field('Email', 'email')}
            {field('Téléphone', 'telephone')}
            {field('Ville', 'ville')}
            {field('Statut pro', 'statut_pro')}
            {field('Secteur', 'secteur')}
            {field('Source', 'source')}
            {editing && field('Statut inscription', 'statut', 'select')}
          </div>

          {/* Attentes */}
          <div className="mb-4 p-4 bg-dark-2 rounded-xl border border-green-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={14} className="text-lime" />
              <span className="font-condensed text-xs text-lime uppercase tracking-wider">Attentes & Objectifs</span>
            </div>
            {!editing ? (
              <p className="font-body text-sm text-gray-300 leading-relaxed">{inscrit.attentes || '—'}</p>
            ) : (
              <textarea
                aria-label="Attentes et objectifs"
                value={form.attentes || ''}
                onChange={e => setForm(f => ({ ...f, attentes: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 bg-dark-bg border border-green-primary/20 rounded-lg text-sm text-white font-body focus:outline-none focus:border-green-primary/50 resize-none"
              />
            )}
          </div>

          {/* Question Q&A */}
          {(inscrit.question_qa || editing) && (
            <div className="mb-6 p-4 bg-dark-2 rounded-xl border border-green-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={14} className="text-yellow-400" />
                <span className="font-condensed text-xs text-yellow-400 uppercase tracking-wider">Question pour le Q&A</span>
              </div>
              {!editing ? (
                <p className="font-body text-sm text-gray-300 leading-relaxed">{inscrit.question_qa || '—'}</p>
              ) : (
                <textarea
                  aria-label="Question pour le Q&A"
                  value={form.question_qa || ''}
                  onChange={e => setForm(f => ({ ...f, question_qa: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-dark-bg border border-green-primary/20 rounded-lg text-sm text-white font-body focus:outline-none focus:border-green-primary/50 resize-none"
                />
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {!editing ? (
              <button type="button" onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-primary/20 border border-green-primary/30 text-lime font-condensed text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-green-primary/30 transition-all">
                <Edit2 size={14} /> Modifier
              </button>
            ) : (
              <>
                <button type="button" onClick={handleSave} disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-green-primary border border-green-primary text-white font-condensed text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-green-mid transition-all disabled:opacity-50">
                  {saving ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={14} />}
                  Enregistrer
                </button>
                <button type="button" onClick={() => { setEditing(false); setForm({ ...inscrit }) }}
                  className="flex items-center gap-2 px-4 py-2 border border-green-primary/20 text-gray-400 font-condensed text-sm tracking-wider uppercase rounded-lg hover:text-white transition-all">
                  <X size={14} /> Annuler
                </button>
              </>
            )}

            {!confirmDelete ? (
              <button type="button" onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 font-condensed text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-red-500/10 transition-all ml-auto">
                <Trash2 size={14} /> Supprimer
              </button>
            ) : (
              <div className="flex items-center gap-2 ml-auto">
                <span className="font-body text-xs text-red-400">Confirmer la suppression ?</span>
                <button type="button" onClick={handleDelete} disabled={deleting}
                  className="px-3 py-1.5 bg-red-500 text-white font-condensed text-xs font-semibold tracking-wider uppercase rounded-lg hover:bg-red-600 transition-all disabled:opacity-50">
                  {deleting ? '...' : 'Oui, supprimer'}
                </button>
                <button type="button" onClick={() => setConfirmDelete(false)}
                  className="px-3 py-1.5 border border-gray-600 text-gray-400 font-condensed text-xs tracking-wider uppercase rounded-lg hover:text-white transition-all">
                  Non
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Modal Capacité Édition ────────────────────────────────────────────────────
function CapaciteEditor({ edition, onSave }: { edition: Edition; onSave: (id: string, cap: number) => Promise<void> }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(String(edition.capacite))
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    await onSave(edition.id, parseInt(value, 10))
    setSaving(false)
    setEditing(false)
  }

  if (!editing) {
    return (
      <button type="button" onClick={() => setEditing(true)}
        className="flex items-center gap-1 font-condensed text-xs text-lime hover:text-white transition-colors group">
        {edition.capacite}
        <Settings size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <input
        type="number" min={1} max={1000}
        aria-label="Nouvelle capacité"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-16 px-2 py-0.5 bg-dark-bg border border-green-primary/40 rounded text-xs text-white font-body focus:outline-none"
      />
      <button type="button" onClick={handleSave} disabled={saving} aria-label="Enregistrer la capacité"
        className="p-1 text-lime hover:text-white transition-colors">
        <Save size={12} aria-hidden="true" />
      </button>
      <button type="button" onClick={() => setEditing(false)} aria-label="Annuler"
        className="p-1 text-gray-500 hover:text-white transition-colors">
        <X size={12} aria-hidden="true" />
      </button>
    </div>
  )
}

// ── Dashboard Principal ───────────────────────────────────────────────────────
type Toast = { id: number; msg: string; type: 'success' | 'error' }

export default function AdminDashboard({ stats: initialStats }: { stats: Stats }) {
  const [stats, setStats] = useState(initialStats)
  const [search, setSearch] = useState('')
  const [filterEdition, setFilterEdition] = useState('all')
  const [filterStatut, setFilterStatut] = useState('all')
  const [refreshing, setRefreshing] = useState(false)
  const [selectedInscrit, setSelectedInscrit] = useState<Inscription | null>(null)
  const [expandedMessages, setExpandedMessages] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const router = useRouter()

  function toast(msg: string, type: 'success' | 'error' = 'success') {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000)
  }

  function handleRefresh() {
    setRefreshing(true)
    router.refresh()
    setTimeout(() => setRefreshing(false), 1200)
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  async function handleDeleteInscrit(id: string) {
    const res = await fetch(`/api/admin/inscriptions/${id}`, { method: 'DELETE' })
    if (res.ok) {
      const inscrit = stats.derniers.find(i => i.id === id)
      setStats(s => ({
        ...s,
        totalInscrits: s.totalInscrits - 1,
        totalConfirmes: s.totalConfirmes - (inscrit?.statut === 'confirmee' ? 1 : 0),
        derniers: s.derniers.filter(i => i.id !== id),
      }))
      toast('Candidat supprimé avec succès')
    } else {
      const data = await res.json().catch(() => ({}))
      toast(`Erreur suppression : ${data.error ?? res.status}`, 'error')
    }
  }

  async function handleSaveInscrit(id: string, data: Partial<Inscription>) {
    const res = await fetch(`/api/admin/inscriptions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      setStats(s => ({
        ...s,
        derniers: s.derniers.map(i => i.id === id ? { ...i, ...data } : i),
      }))
      setSelectedInscrit(prev => prev ? { ...prev, ...data } : null)
      toast('Modifications enregistrées')
    } else {
      const err = await res.json().catch(() => ({}))
      toast(`Erreur modification : ${err.error ?? res.status}`, 'error')
    }
  }

  async function handleSaveCapacite(editionId: string, capacite: number) {
    const res = await fetch(`/api/admin/editions/${editionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ capacite }),
    })
    if (res.ok) {
      setStats(s => ({
        ...s,
        editions: s.editions.map(e => e.id === editionId ? { ...e, capacite } : e),
      }))
      toast('Capacité mise à jour')
    } else {
      const err = await res.json().catch(() => ({}))
      toast(`Erreur capacité : ${err.error ?? res.status}`, 'error')
    }
  }

  const filtered = stats.derniers.filter(i => {
    const q = search.toLowerCase()
    const matchSearch = !q || [i.prenom, i.nom, i.email, i.ville, i.telephone].some(v => v?.toLowerCase().includes(q))
    const edTitre = i.editions?.titre ?? ''
    const matchEdition = filterEdition === 'all' || edTitre.includes(filterEdition)
    const matchStatut = filterStatut === 'all' || i.statut === filterStatut
    return matchSearch && matchEdition && matchStatut
  })

  // Inscrits avec messages/questions
  const avecMessages = stats.derniers.filter(i => i.attentes || i.question_qa)

  function exportCSV() {
    const headers = ['Prénom', 'Nom', 'Email', 'Téléphone', 'Ville', 'Statut Pro', 'Secteur', 'Source', 'Édition', 'Statut', 'Attentes', 'Question Q&A', 'Date']
    const rows = filtered.map(i => [
      i.prenom, i.nom, i.email, i.telephone, i.ville, i.statut_pro,
      i.secteur ?? '', i.source ?? '', i.editions?.titre ?? '',
      i.statut, i.attentes ?? '', i.question_qa ?? '',
      new Date(i.created_at).toLocaleDateString('fr-FR'),
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inscriptions-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const tauxRemplissage = stats.editions[0]
    ? Math.round(((stats.countByEdition[stats.editions[0].id] ?? 0) / stats.editions[0].capacite) * 100)
    : 0

  return (
    <div className="min-h-screen bg-dark-bg py-10">
      <div className="container-site section-padding">

        {/* Erreurs */}
        {stats.errors && stats.errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="font-condensed text-sm text-red-400 font-semibold uppercase tracking-wider mb-2">⚠ Erreurs Supabase</p>
            {stats.errors.map((err, i) => <p key={i} className="font-mono text-xs text-red-300">{err}</p>)}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="section-label">Back-office</p>
            <h1 className="font-display font-black text-4xl text-white">Dashboard Admin</h1>
            <p className="font-body text-xs text-gray-600 mt-1">
              Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={handleRefresh} disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2.5 border border-green-primary/40 text-gray-300 font-condensed text-sm tracking-wider uppercase rounded-xl hover:border-lime hover:text-lime transition-all disabled:opacity-50">
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Chargement…' : 'Rafraîchir'}
            </button>
            <button type="button" onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-primary border border-green-primary text-white font-condensed text-sm tracking-wider uppercase rounded-xl hover:bg-green-mid transition-all">
              <Download size={14} /> CSV
            </button>
            <button type="button" onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 border border-red-500/30 text-red-400 font-condensed text-sm tracking-wider uppercase rounded-xl hover:bg-red-500/10 transition-all">
              <LogOut size={14} /> Déconnexion
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total inscrits',    value: stats.totalInscrits,  icon: Users,        cls: 'text-lime' },
            { label: 'Confirmés',         value: stats.totalConfirmes, icon: CheckCircle,  cls: 'text-green-400' },
            { label: 'Éditions actives',  value: stats.editions.filter(e => e.statut === 'published').length, icon: Calendar, cls: 'text-teal-400' },
            { label: 'Taux #01',          value: `${tauxRemplissage}%`, icon: TrendingUp,  cls: 'text-yellow-400' },
          ].map(({ label, value, icon: Icon, cls }) => (
            <div key={label} className="bg-dark-card border border-green-primary/20 rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-condensed text-[10px] text-gray-400 uppercase tracking-wider">{label}</span>
                <Icon size={16} className={cls} />
              </div>
              <div className={`font-display font-bold text-3xl lg:text-4xl ${cls}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* Éditions avec capacité éditable */}
        <div className="bg-dark-card border border-green-primary/20 rounded-xl p-6 mb-8">
          <h2 className="font-display font-bold text-xl text-white mb-5">Inscrits par édition</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stats.editions.map(e => {
              const count = stats.countByEdition[e.id] ?? 0
              const pct = Math.round((count / e.capacite) * 100)
              return (
                <div key={e.id} className="bg-dark-2 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-condensed text-sm text-white">{e.titre}</span>
                    <div className="flex items-center gap-1 font-condensed text-xs text-lime">
                      <span>{count}/</span>
                      <CapaciteEditor edition={e} onSave={handleSaveCapacite} />
                    </div>
                  </div>
                  <div className="h-1.5 bg-dark-bg rounded-full overflow-hidden">
                    <div className="h-full bg-lime rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                  <p className="mt-1 text-right text-xs text-gray-500">{pct}%</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Messages & Questions */}
        <div className="bg-dark-card border border-green-primary/20 rounded-xl mb-8 overflow-hidden">
          <button
            type="button"
            onClick={() => setExpandedMessages(!expandedMessages)}
            className="w-full flex items-center justify-between p-5 hover:bg-green-primary/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MessageSquare size={18} className="text-lime" />
              <h2 className="font-display font-bold text-xl text-white">Messages & Questions Q&A</h2>
              <span className="px-2.5 py-0.5 bg-lime/10 border border-lime/30 text-lime text-xs font-condensed font-bold rounded-full">
                {avecMessages.length}
              </span>
            </div>
            {expandedMessages ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
          </button>

          {expandedMessages && (
            <div className="border-t border-green-primary/10 p-5 flex flex-col gap-4">
              {avecMessages.length === 0 && (
                <p className="text-center py-6 font-body text-sm text-gray-600">Aucun message pour l&apos;instant</p>
              )}
              {avecMessages.map(i => (
                <div key={i.id} className="bg-dark-2 rounded-xl p-4 border border-green-primary/10">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-condensed font-semibold text-white text-sm">{i.prenom} {i.nom}</span>
                      <span className="ml-2 font-body text-xs text-gray-500">{i.email}</span>
                    </div>
                    <button type="button" onClick={() => setSelectedInscrit(i)}
                      className="font-condensed text-xs text-lime hover:text-white transition-colors uppercase tracking-wider">
                      Voir profil →
                    </button>
                  </div>
                  {i.attentes && (
                    <div className="mb-2">
                      <p className="font-condensed text-[10px] text-gray-500 uppercase tracking-wider mb-1">Attentes</p>
                      <p className="font-body text-sm text-gray-300 leading-relaxed">{i.attentes}</p>
                    </div>
                  )}
                  {i.question_qa && (
                    <div className="mt-3 pt-3 border-t border-green-primary/10">
                      <p className="font-condensed text-[10px] text-yellow-400 uppercase tracking-wider mb-1">❓ Question Q&A</p>
                      <p className="font-body text-sm text-yellow-200 leading-relaxed">{i.question_qa}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tableau des inscrits */}
        <div className="bg-dark-card border border-green-primary/20 rounded-xl overflow-hidden">
          {/* Filtres */}
          <div className="p-5 border-b border-green-primary/10 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text" placeholder="Rechercher nom, email, ville…"
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-dark-2 border border-green-primary/20 rounded-lg text-sm font-body text-white placeholder-gray-600 focus:outline-none focus:border-green-primary/50"
              />
            </div>
            <select aria-label="Filtrer par édition" value={filterEdition} onChange={e => setFilterEdition(e.target.value)}
              className="px-4 py-2 bg-dark-2 border border-green-primary/20 rounded-lg text-sm font-body text-white focus:outline-none focus:border-green-primary/50">
              <option value="all">Toutes éditions</option>
              {stats.editions.map(e => <option key={e.id} value={e.titre}>{e.titre}</option>)}
            </select>
            <select aria-label="Filtrer par statut" value={filterStatut} onChange={e => setFilterStatut(e.target.value)}
              className="px-4 py-2 bg-dark-2 border border-green-primary/20 rounded-lg text-sm font-body text-white focus:outline-none focus:border-green-primary/50">
              <option value="all">Tous statuts</option>
              <option value="confirmee">Confirmée</option>
              <option value="presente">Présente</option>
              <option value="annulee">Annulée</option>
            </select>
            <span className="flex items-center font-condensed text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
              {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Table desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-green-primary/10">
                  {['Nom', 'Email', 'Téléphone', 'Ville', 'Statut Pro', 'Édition', 'Date', 'Statut', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-condensed text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="text-center py-12 text-gray-600">Aucun inscrit trouvé</td></tr>
                )}
                {filtered.map((i, idx) => (
                  <tr key={i.id}
                    className={`border-b border-green-primary/5 hover:bg-green-primary/5 transition-colors cursor-pointer ${idx % 2 ? 'bg-dark-2/20' : ''}`}
                    onClick={() => setSelectedInscrit(i)}
                  >
                    <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{i.prenom} {i.nom}</td>
                    <td className="px-4 py-3 text-gray-400 max-w-[160px] truncate">{i.email}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{i.telephone}</td>
                    <td className="px-4 py-3 text-gray-400">{i.ville}</td>
                    <td className="px-4 py-3 text-gray-400">{i.statut_pro}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">{i.editions?.titre ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">{new Date(i.created_at).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-condensed tracking-wide ${statutColors[i.statut] ?? 'text-gray-400'}`}>
                        {i.statut}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <button type="button" onClick={() => setSelectedInscrit(i)}
                          className="p-1.5 rounded-lg bg-green-primary/10 text-lime hover:bg-green-primary/20 transition-colors" title="Modifier">
                          <Edit2 size={13} />
                        </button>
                        <button type="button" onClick={() => { if (confirm(`Supprimer ${i.prenom} ${i.nom} ?`)) handleDeleteInscrit(i.id) }}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors" title="Supprimer">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards mobile */}
          <div className="md:hidden flex flex-col gap-3 p-4">
            {filtered.length === 0 && <p className="text-center py-8 text-gray-600 font-body">Aucun inscrit trouvé</p>}
            {filtered.map(i => (
              <div key={i.id} className="bg-dark-2 rounded-xl p-4 cursor-pointer hover:border-green-primary/30 border border-transparent transition-colors"
                onClick={() => setSelectedInscrit(i)}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-condensed font-semibold text-white">{i.prenom} {i.nom}</span>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-condensed ${statutColors[i.statut] ?? 'text-gray-400'}`}>{i.statut}</span>
                </div>
                <p className="text-xs text-gray-400 truncate mb-1">{i.email}</p>
                <p className="text-xs text-gray-500">{i.telephone} · {i.ville}</p>
                <p className="text-xs text-gray-600 mt-1">{i.editions?.titre ?? '—'} · {new Date(i.created_at).toLocaleDateString('fr-FR')}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal inscrit */}
      {selectedInscrit && (
        <ModalInscrit
          inscrit={selectedInscrit}
          onClose={() => setSelectedInscrit(null)}
          onSave={handleSaveInscrit}
          onDelete={handleDeleteInscrit}
        />
      )}

      {/* Toasts */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg font-condensed text-sm font-semibold tracking-wide animate-in slide-in-from-right-4 duration-300 ${
              t.type === 'success'
                ? 'bg-green-primary border border-lime/30 text-white'
                : 'bg-red-600 border border-red-400/30 text-white'
            }`}
          >
            <span>{t.type === 'success' ? '✓' : '✗'}</span>
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  )
}
