import { motion } from 'framer-motion'

interface ButtonGroupProps {
  label: string
  options: { value: string; label: string }[]
  value: string | undefined
  onChange: (value: string) => void
  error?: string
}

export function ButtonGroup({ label, options, value, onChange, error }: ButtonGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-text-secondary">{label}</label>
      <div className="flex gap-2">
        {options.map((opt) => {
          const isActive = value === opt.value
          return (
            <motion.button
              key={opt.value}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(opt.value)}
              className={`
                flex-1 py-3.5 rounded-xl text-sm font-semibold cursor-pointer
                transition-all duration-200 border text-center
                ${isActive
                  ? 'bg-accent text-bg border-accent'
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
