'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  label: string
  sublabel?: string
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  label,
  sublabel,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(value)
    }
    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="font-display text-5xl md:text-6xl text-white mb-1">
        {prefix}
        {typeof value === 'number' && !isNaN(value) ? count : value}
        {suffix}
      </div>
      <div className="font-condensed text-base text-lime uppercase tracking-wider">{label}</div>
      {sublabel && (
        <div className="font-body text-xs text-gray-500 mt-1">{sublabel}</div>
      )}
    </div>
  )
}
