import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export default function Card({ children, className, hover, glow }: CardProps) {
  return (
    <div
      className={cn(
        'bg-dark-card border border-green-primary/20 rounded-xl overflow-hidden',
        hover &&
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-green-md hover:border-green-primary/40',
        glow && 'shadow-green-sm',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-6 pb-0', className)}>{children}</div>
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-6', className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 pb-6 pt-0 flex items-center gap-3', className)}>
      {children}
    </div>
  )
}
