import { motion } from 'framer-motion'

interface PillSelectProps {
  label: string
  options: { value: string; label: string }[]
  value: string | undefined
  onChange: (value: string) => void
  error?: string
  columns?: number
}

export function PillSelect({ label, options, value, onChange, error, columns }: PillSelectProps) {
  const gridClass = columns === 2
    ? 'grid-cols-1 sm:grid-cols-2'
    : options.length === 2
      ? 'grid-cols-2'
      : options.length === 3
        ? 'grid-cols-3'
        : 'grid-cols-2'

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-text-secondary">{label}</label>
      <div className={`grid ${gridClass} gap-2`}>
        {options.map((opt) => {
          const isActive = value === opt.value
          return (
            <motion.button
              key={opt.value}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(opt.value)}
              className={`
                relative px-4 py-3 rounded-xl text-sm font-medium cursor-pointer
                transition-all duration-200 border text-center
                ${isActive
                  ? 'bg-accent/10 border-accent text-accent shadow-[0_0_16px_var(--color-accent-glow)]'
                  : 'bg-card border-border text-text-secondary hover:border-text-muted hover:text-text'
                }
              `}
            >
              {opt.label}
            </motion.button>
          )
        })}
      </div>
      {error && <p className="text-xs text-error mt-0.5">{error}</p>}
    </div>
  )
}
