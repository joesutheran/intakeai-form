import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  formSchema,
  defaultValues,
  stepFields,
  STEP_TITLES,
  TOTAL_STEPS,
} from './schema'
import { ProgressBar } from './components/ProgressBar'
import { SuccessScreen } from './components/SuccessScreen'
import { Step1 } from './steps/Step1'
import { Step2 } from './steps/Step2'
import { Step3 } from './steps/Step3'
import { Step4 } from './steps/Step4'
import { Step5 } from './steps/Step5'
import { Step6 } from './steps/Step6'

const WEBHOOK_URL = 'https://n8n-rbyy.onrender.com/webhook/intake-ai-agents'

const stepComponents = [Step1, Step2, Step3, Step4, Step5, Step6]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
}

export default function App() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const methods = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues,
    mode: 'onTouched',
  })

  const goNext = async () => {
    const fields = stepFields[step]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const valid = await methods.trigger(fields as any)
    if (!valid) return
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setSubmitting(true)
    setSubmitError(null)

    const payload = {
      referrer_email: data.referrer_email,
      client_name: data.client_name,
      biological_sex: data.biological_sex,
      age: Number(data.age),
      weight_kg: Number(data.weight_kg),
      height_cm: Number(data.height_cm),
      training_goal: data.training_goal,
      job_activity_level: data.job_activity_level,
      training_sessions_per_week: data.training_sessions_per_week,
      dietary_preference: data.dietary_preference,
      dietary_restrictions: data.dietary_restrictions ?? [],
      foods_to_avoid: data.foods_to_avoid || '',
      meals_per_day: Number(data.meals_per_day),
      plan_duration_weeks: Number(data.plan_duration_weeks),
      variety_tier: data.variety_tier,
      disclaimer_acknowledged: true,
    }

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        setSubmitError(`Server responded with ${res.status}. Please try again.`)
      }
    } catch {
      setSubmitError('Network error — please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const StepComponent = stepComponents[step]
  const isLastStep = step === TOTAL_STEPS - 1

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 min-h-dvh">
      {/* Background grain effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl font-extrabold tracking-tight">
          <span className="text-accent">Intake</span>
          <span className="text-text">AI</span>
        </h1>
        <p className="mt-2 text-sm text-text-secondary max-w-xs mx-auto leading-snug">
          Smash your body composition goals with a custom AI Agent planning your nutrition.
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-[560px] bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden"
      >
        {submitted ? (
          <div className="p-8">
            <SuccessScreen />
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="px-8 pt-8 pb-0">
              <ProgressBar step={step} />
              <div className="flex items-center justify-between mt-4 mb-6">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={step}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl font-bold text-text"
                  >
                    {STEP_TITLES[step]}
                  </motion.h2>
                </AnimatePresence>
                <span className="text-xs font-mono text-text-muted">
                  {step + 1}/{TOTAL_STEPS}
                </span>
              </div>
            </div>

            {/* Form content */}
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FormProvider {...methods}>
                <div className="px-8 pb-2 overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <StepComponent />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Error message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mx-8 mb-2 px-4 py-3 bg-error-bg border border-error/30 rounded-xl"
                  >
                    <p className="text-sm text-error">{submitError}</p>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="px-8 pb-8 pt-6 flex gap-3">
                  {step > 0 && (
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={goBack}
                      className="px-6 py-3.5 rounded-xl bg-card border border-border text-text-secondary font-medium text-sm cursor-pointer hover:border-text-muted hover:text-text transition-all duration-200"
                    >
                      Back
                    </motion.button>
                  )}
                  {isLastStep ? (
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.01 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                      className={`
                        flex-1 py-3.5 rounded-xl font-semibold text-sm cursor-pointer
                        transition-all duration-200 relative overflow-hidden
                        ${submitting
                          ? 'bg-accent/50 text-bg/50 cursor-not-allowed'
                          : 'bg-accent text-bg hover:shadow-[0_0_24px_var(--color-accent-glow-strong)]'
                        }
                      `}
                      style={
                        !submitting
                          ? {
                              backgroundImage:
                                'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
                              backgroundSize: '200% 100%',
                              animation: 'shimmer 3s ease-in-out infinite',
                            }
                          : undefined
                      }
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Submitting…
                        </span>
                      ) : (
                        'Generate Nutrition Plan'
                      )}
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={goNext}
                      className="flex-1 py-3.5 rounded-xl bg-accent text-bg font-semibold text-sm cursor-pointer transition-all duration-200 hover:shadow-[0_0_24px_var(--color-accent-glow-strong)]"
                    >
                      Continue
                    </motion.button>
                  )}
                </div>
              </FormProvider>
            </form>
          </>
        )}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-xs text-text-muted"
      >
        Powered by{' '}
        <span className="font-semibold text-text-secondary">Growth Medium AI</span>
      </motion.p>
    </div>
  )
}
