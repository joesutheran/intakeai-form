import { motion } from 'framer-motion'
import { TOTAL_STEPS } from '../schema'

export function ProgressBar({ step }: { step: number }) {
  const pct = ((step + 1) / TOTAL_STEPS) * 100

  return (
    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-accent rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ boxShadow: '0 0 12px var(--color-accent-glow-strong)' }}
      />
    </div>
  )
}
