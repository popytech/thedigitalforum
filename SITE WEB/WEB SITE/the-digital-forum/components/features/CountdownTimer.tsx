'use client'

import { useState, useEffect } from 'react'
import { calculateCountdown } from '@/lib/utils'

interface CountdownTimerProps {
  targetDate: Date
  className?: string
}

export default function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [time, setTime] = useState<ReturnType<typeof calculateCountdown> | null>(null)

  useEffect(() => {
    setTime(calculateCountdown(targetDate))
    const interval = setInterval(() => {
      setTime(calculateCountdown(targetDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const units = [
    { label: 'Jours',    value: time?.jours    ?? 0 },
    { label: 'Heures',   value: time?.heures   ?? 0 },
    { label: 'Minutes',  value: time?.minutes  ?? 0 },
    { label: 'Secondes', value: time?.secondes ?? 0 },
  ]

  return (
    <div className={`flex items-center gap-1.5 sm:gap-3 md:gap-4 ${className ?? ''}`}>
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-1.5 sm:gap-3 md:gap-4">
          <div className="flex flex-col items-center">
            <div className="bg-dark-card border border-green-primary/30 rounded-lg w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center">
              <span className="font-display text-2xl sm:text-3xl md:text-4xl text-white tabular-nums">
                {time ? String(unit.value).padStart(2, '0') : '--'}
              </span>
            </div>
            <span className="font-condensed text-[10px] sm:text-xs text-gray-400 tracking-wider uppercase mt-1.5">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="font-display text-lg sm:text-2xl text-lime pb-5 select-none">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
