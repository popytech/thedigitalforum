import { cn } from '@/lib/utils'
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-condensed font-semibold text-gray-300 uppercase tracking-wider">
          {label}
          {props.required && <span className="text-lime ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'bg-dark-2 border rounded-lg px-4 py-3 text-white font-body text-sm',
          'placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all duration-200',
          error
            ? 'border-red-500 focus:ring-red-500/30'
            : 'border-green-primary/30 focus:border-green-primary focus:ring-green-primary/20',
          className
        )}
        {...props}
      />
      {error && <span className="text-red-400 text-xs font-body">{error}</span>}
      {hint && !error && <span className="text-gray-500 text-xs font-body">{hint}</span>}
    </div>
  )
)
Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-condensed font-semibold text-gray-300 uppercase tracking-wider">
          {label}
          {props.required && <span className="text-lime ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(
          'bg-dark-2 border rounded-lg px-4 py-3 text-white font-body text-sm resize-none',
          'placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all duration-200',
          error
            ? 'border-red-500 focus:ring-red-500/30'
            : 'border-green-primary/30 focus:border-green-primary focus:ring-green-primary/20',
          className
        )}
        rows={4}
        {...props}
      />
      {error && <span className="text-red-400 text-xs font-body">{error}</span>}
    </div>
  )
)
Textarea.displayName = 'Textarea'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-condensed font-semibold text-gray-300 uppercase tracking-wider">
          {label}
          {props.required && <span className="text-lime ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'bg-dark-2 border rounded-lg px-4 py-3 text-white font-body text-sm',
          'focus:outline-none focus:ring-2 transition-all duration-200 appearance-none cursor-pointer',
          error
            ? 'border-red-500 focus:ring-red-500/30'
            : 'border-green-primary/30 focus:border-green-primary focus:ring-green-primary/20',
          className
        )}
        {...props}
      >
        <option value="">Sélectionner...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-400 text-xs font-body">{error}</span>}
    </div>
  )
)
Select.displayName = 'Select'
