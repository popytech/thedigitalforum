import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CountdownTime, EditionStatut } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  })
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export function calculateCountdown(targetDate: Date): CountdownTime {
  const now = new Date().getTime()
  const target = targetDate.getTime()
  const diff = Math.max(0, target - now)

  const jours = Math.floor(diff / (1000 * 60 * 60 * 24))
  const heures = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const secondes = Math.floor((diff % (1000 * 60)) / 1000)

  return { jours, heures, minutes, secondes }
}

export function getStatutLabel(statut: EditionStatut): string {
  const labels: Record<EditionStatut, string> = {
    draft: 'À venir',
    published: 'À venir',
    terminee: 'Terminée',
  }
  return labels[statut]
}

export function getStatutColor(statut: EditionStatut): string {
  const colors: Record<EditionStatut, string> = {
    draft: 'bg-dark-2 text-gray-400 border-gray-600',
    published: 'bg-green-primary/20 text-lime border-green-primary',
    terminee: 'bg-dark-card text-gray-500 border-gray-700',
  }
  return colors[statut]
}

export function generateQRCode(): string {
  return crypto.randomUUID()
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function getEditionNumber(numero: number): string {
  return String(numero).padStart(2, '0')
}
