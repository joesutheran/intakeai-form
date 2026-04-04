import { motion } from 'framer-motion'

export function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center py-16 gap-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center"
      >
        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        >
          <motion.path
            d="M10 20L17 27L30 14"
            stroke="var(--color-accent)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          />
        </motion.svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col gap-3"
      >
        <h2 className="text-2xl font-bold text-text">Plan generation started</h2>
        <p className="text-text-secondary text-base leading-relaxed max-w-sm mx-auto">
          Your personalised nutrition AI Agent is being built. More instructions will follow soon!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Processing
      </motion.div>
    </motion.div>
  )
}
