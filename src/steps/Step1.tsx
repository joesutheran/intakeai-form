import { useFormContext } from 'react-hook-form'
import type { FormData } from '../schema'
import { TextInput } from '../components/TextInput'

export function Step1() {
  const { register, formState: { errors } } = useFormContext<FormData>()

  return (
    <div className="flex flex-col gap-5">
      <TextInput
        label="Referring Gym / Studio Email"
        type="email"
        placeholder="studio@example.com"
        error={errors.referrer_email?.message}
        {...register('referrer_email')}
      />
      <TextInput
        label="Client Name"
        placeholder="Jane Smith"
        error={errors.client_name?.message}
        {...register('client_name')}
      />
      <TextInput
        label="Client Email"
        type="email"
        placeholder="client@example.com"
        error={errors.client_email?.message}
        {...register('client_email')}
      />
    </div>
  )
}
