import { cn } from '@/lib/utils'

interface DataBarsProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const heights = {
  sm: ['h-4', 'h-6', 'h-9', 'h-12'],
  md: ['h-6', 'h-10', 'h-14', 'h-20'],
  lg: ['h-8', 'h-14', 'h-20', 'h-28'],
}

export default function DataBars({ className, size = 'md' }: DataBarsProps) {
  return (
    <div className={cn('flex items-end gap-1', className)}>
      {heights[size].map((h, i) => (
        <div
          key={i}
          className={cn('w-2 rounded-t-sm bg-lime opacity-80', h)}
          style={{ opacity: 0.4 + i * 0.2 }}
        />
      ))}
    </div>
  )
}
