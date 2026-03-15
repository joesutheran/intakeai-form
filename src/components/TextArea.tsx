import { forwardRef, type TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...props }, ref) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-text-secondary">{label}</label>
      <textarea
        ref={ref}
        rows={3}
        className={`
          w-full px-4 py-3.5 rounded-xl bg-card border text-text placeholder:text-text-muted
          transition-all duration-200 resize-none
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
