import { cn } from '@/lib/utils'
import type { SpeakerRole } from '@/lib/types'

type BadgeVariant = 'speaker' | 'host' | 'moderateur' | 'invite_special' | 'avenir' | 'terminee' | 'custom'

interface BadgeProps {
  variant?: BadgeVariant
  role?: SpeakerRole
  children?: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  speaker: 'bg-green-primary/20 text-lime border border-green-primary/50',
  host: 'bg-blue-900/30 text-blue-300 border border-blue-800/50',
  moderateur: 'bg-purple-900/30 text-purple-300 border border-purple-800/50',
  invite_special: 'bg-amber-900/30 text-amber-300 border border-amber-800/50',
  avenir: 'bg-green-primary/20 text-lime border border-green-primary/50',
  terminee: 'bg-dark-card text-gray-400 border border-gray-700',
  custom: '',
}

const roleLabels: Record<SpeakerRole, string> = {
  speaker: 'Speaker',
  host: 'Host',
  moderateur: 'Modérateur',
  invite_special: 'Invité Spécial',
}

export default function Badge({ variant, role, children, className }: BadgeProps) {
  const resolvedVariant: BadgeVariant = role ? (role as BadgeVariant) : (variant || 'custom')
  const label = role ? roleLabels[role] : children

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-condensed font-semibold tracking-wider uppercase',
        variantStyles[resolvedVariant],
        className
      )}
    >
      {label}
    </span>
  )
}
