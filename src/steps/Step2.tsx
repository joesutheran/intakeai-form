import { useFormContext, Controller } from 'react-hook-form'
import type { FormData } from '../schema'
import { TextInput } from '../components/TextInput'
import { ButtonGroup } from '../components/ButtonGroup'

export function Step2() {
  const { register, control, formState: { errors } } = useFormContext<FormData>()

  return (
    <div className="flex flex-col gap-5">
      <Controller
        name="biological_sex"
        control={control}
        render={({ field }) => (
          <ButtonGroup
            label="Biological sex"
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
            ]}
            value={field.value}
            onChange={field.onChange}
            error={errors.biological_sex?.message}
          />
        )}
      />
      <TextInput
        label="Age"
        type="number"
        placeholder="28"
        error={errors.age?.message}
        {...register('age')}
      />
      <div className="grid grid-cols-2 gap-3">
        <TextInput
          label="Weight (kg)"
          type="number"
          step="0.1"
          placeholder="65.0"
          error={errors.weight_kg?.message}
          {...register('weight_kg')}
        />
        <TextInput
          label="Height (cm)"
          type="number"
          placeholder="165"
          error={errors.height_cm?.message}
          {...register('height_cm')}
        />
      </div>
    </div>
  )
}
