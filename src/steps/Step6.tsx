import { useFormContext, Controller } from 'react-hook-form'
import type { FormData } from '../schema'

function SummaryRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-border last:border-0">
      <span className="text-text-muted text-sm shrink-0">{label}</span>
      <span className="text-text text-sm font-medium text-right ml-4">{value || '—'}</span>
    </div>
  )
}

function SummarySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{title}</h3>
      <div className="bg-card rounded-xl px-4 py-1 border border-border">{children}</div>
    </div>
  )
}

const varietyLabels: Record<string, string> = {
  full_variety: 'Maximum variety',
  weekly_meal_prep: 'Batch cook',
}

export function Step6() {
  const { watch, control, formState: { errors, isSubmitted } } = useFormContext<FormData>()
  const data = watch()

  return (
    <div className="flex flex-col gap-5">
      <SummarySection title="Client">
        <SummaryRow label="Referrer" value={data.referrer_email} />
        <SummaryRow label="Name" value={data.client_name} />
      </SummarySection>

      <SummarySection title="Body metrics">
        <SummaryRow label="Sex" value={data.biological_sex} />
        <SummaryRow label="Age" value={data.age} />
        <SummaryRow label="Weight" value={data.weight_kg ? `${data.weight_kg} kg` : undefined} />
        <SummaryRow label="Height" value={data.height_cm ? `${data.height_cm} cm` : undefined} />
      </SummarySection>

      <SummarySection title="Goals & activity">
        <SummaryRow label="Goal" value={data.training_goal} />
        <SummaryRow label="Activity" value={data.job_activity_level} />
        <SummaryRow label="Training" value={data.training_sessions_per_week} />
      </SummarySection>

      <SummarySection title="Diet">
        <SummaryRow label="Preference" value={data.dietary_preference} />
        <SummaryRow
          label="Restrictions"
          value={data.dietary_restrictions?.length ? data.dietary_restrictions.join(', ') : 'None'}
        />
        <SummaryRow label="Avoid" value={data.foods_to_avoid || 'None'} />
      </SummarySection>

      <SummarySection title="Plan settings">
        <SummaryRow label="Snacks/day" value={data.meals_per_day} />
        <SummaryRow label="Duration" value={data.plan_duration_weeks ? `${data.plan_duration_weeks} weeks` : undefined} />
        <SummaryRow label="Variety" value={data.variety_tier ? varietyLabels[data.variety_tier] : undefined} />
      </SummarySection>

      <div className="mt-2">
        <Controller
          name="disclaimer_acknowledged"
          control={control}
          render={({ field }) => (
            <button
              type="button"
              onClick={() => field.onChange(!field.value)}
              className={`
                flex items-start gap-3 p-4 rounded-xl border cursor-pointer
                transition-all duration-200 text-left w-full
                ${field.value
                  ? 'bg-accent/5 border-accent/30'
                  : isSubmitted && errors.disclaimer_acknowledged
                    ? 'bg-error-bg border-error'
                    : 'bg-card border-border hover:border-text-muted'
                }
              `}
            >
              <div
                className={`
                  w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                  transition-all duration-200
                  ${field.value ? 'bg-accent border-accent' : isSubmitted && errors.disclaimer_acknowledged ? 'border-error' : 'border-text-muted'}
                `}
              >
                {field.value && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 4" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-text-secondary leading-relaxed">
                This nutrition plan is for informational purposes only and does not constitute medical
                or dietary advice. Results may vary. Consult a qualified health professional before
                making significant changes to your diet, particularly if you have a medical condition,
                are pregnant, or are taking medication.
              </span>
            </button>
          )}
        />
        {isSubmitted && errors.disclaimer_acknowledged && (
          <p className="text-xs text-error mt-2">{errors.disclaimer_acknowledged.message}</p>
        )}
      </div>
    </div>
  )
}
