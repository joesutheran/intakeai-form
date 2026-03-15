import { useFormContext, Controller } from 'react-hook-form'
import type { FormData } from '../schema'
import { PillSelect } from '../components/PillSelect'
import { CheckboxGroup } from '../components/CheckboxGroup'
import { TextArea } from '../components/TextArea'

export function Step4() {
  const { register, control, formState: { errors } } = useFormContext<FormData>()

  return (
    <div className="flex flex-col gap-6">
      <Controller
        name="dietary_preference"
        control={control}
        render={({ field }) => (
          <PillSelect
            label="Dietary preference"
            options={[
              { value: 'Balanced', label: 'Balanced' },
              { value: 'Vegetarian', label: 'Vegetarian' },
              { value: 'Vegan', label: 'Vegan' },
              { value: 'LCHF', label: 'LCHF' },
            ]}
            value={field.value}
            onChange={field.onChange}
            error={errors.dietary_preference?.message}
          />
        )}
      />
      <Controller
        name="dietary_restrictions"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            label="Dietary restrictions"
            options={['Dairy-free', 'Gluten-free']}
            value={field.value ?? []}
            onChange={field.onChange}
          />
        )}
      />
      <TextArea
        label="Foods to avoid"
        placeholder="e.g. Mushrooms, shellfish"
        error={errors.foods_to_avoid?.message}
        {...register('foods_to_avoid')}
      />
    </div>
  )
}
