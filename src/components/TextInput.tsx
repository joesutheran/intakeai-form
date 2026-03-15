import { forwardRef, type InputHTMLAttributes } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, ...props }, ref) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-text-secondary">{label}</label>
      <input
        ref={ref}
        className={`
          w-full px-4 py-3.5 rounded-xl bg-card border text-text placeholder:text-text-muted
          transition-all duration-200
          ${error
            ? 'border-error focus:border-error focus:shadow-[0_0_0_3px_var(--color-error-bg)]'
            : 'border-border focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)]'
          }
        `}
        {...props}
      />
      {error && <p className="text-xs text-error mt-0.5">{error}</p>}
    </div>
  ),
)
