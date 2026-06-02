'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { type ReactNode, type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'outline' | 'ghost' | 'lime'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  children: ReactNode
  className?: string
  loading?: boolean
  external?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-green-primary text-white border-2 border-green-primary hover:bg-green-mid hover:border-green-mid',
  outline:
    'bg-transparent text-white border-2 border-white/40 hover:border-lime hover:text-lime',
  ghost:
    'bg-transparent text-green-light border-2 border-transparent hover:border-green-primary/50',
  lime:
    'bg-lime text-dark-bg border-2 border-lime hover:bg-green-light hover:border-green-light',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-10 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  loading,
  external,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2',
    'font-condensed font-semibold tracking-wider uppercase rounded-lg',
    'transition-all duration-200',
    variantClasses[variant],
    sizeClasses[size],
    loading && 'opacity-70 cursor-not-allowed',
    className
  )

  const content = loading ? (
    <>
      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      Chargement...
    </>
  ) : (
    children
  )

  if (href) {
    return (
      <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
        <Link
          href={href}
          className={classes}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {content}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div whileTap={{ scale: loading ? 1 : 0.97 }} className="inline-block">
      <button className={classes} {...props} disabled={loading}>
        {content}
      </button>
    </motion.div>
  )
}
