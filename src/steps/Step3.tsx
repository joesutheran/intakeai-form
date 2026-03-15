import { useFormContext, Controller } from 'react-hook-form'
import type { FormData } from '../schema'
import { PillSelect } from '../components/PillSelect'

export function Step3() {
  const { control, formState: { errors } } = useFormContext<FormData>()

  return (
    <div className="flex flex-col gap-6">
      <Controller
        name="training_goal"
        control={control}
        render={({ field }) => (
          <PillSelect
            label="Training goal"
            options={[
              { value: 'Fat loss', label: 'Fat loss' },
              { value: 'Muscle gain', label: 'Muscle gain' },
              { value: 'Maintenance', label: 'Maintenance' },
            ]}
            value={field.value}
            onChange={field.onChange}
            error={errors.training_goal?.message}
          />
        )}
      />
      <Controller
        name="job_activity_level"
        control={control}
        render={({ field }) => (
          <PillSelect
            label="Job activity level"
            options={[
              { value: 'Sedentary', label: 'Sedentary' },
              { value: 'Lightly active', label: 'Lightly active' },
              { value: 'Moderately active', label: 'Moderately active' },
              { value: 'Very active', label: 'Very active' },
            ]}
            value={field.value}
            onChange={field.onChange}
            error={errors.job_activity_level?.message}
          />
        )}
      />
      <Controller
        name="training_sessions_per_week"
        control={control}
        render={({ field }) => (
          <PillSelect
            label="Training sessions per week"
            options={[
              { value: '1-2 days', label: '1-2 days' },
              { value: '3-4 days', label: '3-4 days' },
              { value: '5-6 days', label: '5-6 days' },
              { value: 'Daily', label: 'Daily' },
            ]}
            value={field.value}
            onChange={field.onChange}
            error={errors.training_sessions_per_week?.message}
          />
        )}
      />
    </div>
  )
}
