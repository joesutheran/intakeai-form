import { useFormContext } from 'react-hook-form'
import type { FormData } from '../schema'
import { TextInput } from '../components/TextInput'

export function Step1() {
  const { register, formState: { errors } } = useFormContext<FormData>()

  return (
    <div className="flex flex-col gap-5">
      <TextInput
        label="Referrer email"
        type="email"
        placeholder="studio@example.com"
        error={errors.referrer_email?.message}
        {...register('referrer_email')}
      />
      <TextInput
        label="Client name"
        placeholder="Jane Smith"
        error={errors.client_name?.message}
        {...register('client_name')}
      />
    </div>
  )
}
