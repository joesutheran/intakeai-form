import { useFormContext, Controller } from 'react-hook-form'
import type { FormData } from '../schema'
import { ButtonGroup } from '../components/ButtonGroup'
import { PillSelect } from '../components/PillSelect'

export function Step5() {
  const { control, formState: { errors } } = useFormContext<FormData>()

  return (
    <div className="flex flex-col gap-6">
      <Controller
        name="meals_per_day"
        control={control}
        render={({ field }) => (
          <ButtonGroup
            label="Meals per day"
            options={[
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              { value: '5', label: '5' },
            ]}
            value={field.value?.toString()}
            onChange={(v) => field.onChange(Number(v))}
            error={errors.meals_per_day?.message}
          />
        )}
      />
      <Controller
        name="plan_duration_weeks"
        control={control}
        render={({ field }) => (
          <ButtonGroup
            label="Plan duration"
            options={[
              { value: '4', label: '4 weeks' },
              { value: '6', label: '6 weeks' },
              { value: '8', label: '8 weeks' },
              { value: '12', label: '12 weeks' },
            ]}
            value={field.value?.toString()}
            onChange={(v) => field.onChange(Number(v))}
            error={errors.plan_duration_weeks?.message}
          />
        )}
      />
      <Controller
        name="variety_tier"
        control={control}
        render={({ field }) => (
          <PillSelect
            label="Meal variety"
            columns={2}
            options={[
              { value: 'full_variety', label: 'Maximum variety — different meals every day' },
              { value: 'weekly_meal_prep', label: 'Batch cook — prep once on Sunday, eat all week' },
            ]}
            value={field.value}
            onChange={field.onChange}
            error={errors.variety_tier?.message}
          />
        )}
      />
    </div>
  )
}
