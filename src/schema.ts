import { z } from 'zod'

export const formSchema = z.object({
  referrer_email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  client_name: z.string().min(1, 'Client name is required'),

  biological_sex: z.enum(['Male', 'Female'], {
    required_error: 'Please select biological sex',
  }),
  age: z.coerce
    .number({ required_error: 'Age is required', invalid_type_error: 'Age must be a number' })
    .int('Age must be a whole number')
    .min(16, 'Must be at least 16')
    .max(80, 'Must be 80 or under'),
  weight_kg: z.coerce
    .number({ required_error: 'Weight is required', invalid_type_error: 'Weight must be a number' })
    .min(40, 'Must be at least 40 kg')
    .max(200, 'Must be 200 kg or under'),
  height_cm: z.coerce
    .number({ required_error: 'Height is required', invalid_type_error: 'Height must be a number' })
    .int('Height must be a whole number')
    .min(130, 'Must be at least 130 cm')
    .max(220, 'Must be 220 cm or under'),

  training_goal: z.enum(['Fat loss', 'Muscle gain', 'Maintenance'], {
    required_error: 'Please select a training goal',
  }),
  job_activity_level: z.enum(
    ['Sedentary', 'Lightly active', 'Moderately active', 'Very active'],
    { required_error: 'Please select activity level' },
  ),
  training_sessions_per_week: z.enum(
    ['1-2 days', '3-4 days', '5-6 days', 'Daily'],
    { required_error: 'Please select training frequency' },
  ),

  dietary_preference: z.enum(['Balanced', 'Vegetarian', 'Vegan', 'LCHF'], {
    required_error: 'Please select a dietary preference',
  }),
  dietary_restrictions: z.array(z.enum(['Dairy-free', 'Gluten-free'])).default([]),
  foods_to_avoid: z.string().default(''),

  meals_per_day: z.coerce.number().int().min(3).max(5),
  plan_duration_weeks: z.coerce.number().int(),
  variety_tier: z.enum(['full_variety', 'weekly_meal_prep'], {
    required_error: 'Please select a variety option',
  }),

  disclaimer_acknowledged: z.literal(true, {
    errorMap: () => ({ message: 'You must acknowledge the disclaimer' }),
  }),
})

export type FormData = z.infer<typeof formSchema>

export const defaultValues = {
  referrer_email: '',
  client_name: '',
  biological_sex: undefined,
  age: '' as unknown as number,
  weight_kg: '' as unknown as number,
  height_cm: '' as unknown as number,
  training_goal: undefined,
  job_activity_level: undefined,
  training_sessions_per_week: undefined,
  dietary_preference: undefined,
  dietary_restrictions: [] as string[],
  foods_to_avoid: '',
  meals_per_day: 3,
  plan_duration_weeks: 4,
  variety_tier: undefined,
  disclaimer_acknowledged: undefined as unknown as true,
}

export const stepFields: (keyof FormData)[][] = [
  ['referrer_email', 'client_name'],
  ['biological_sex', 'age', 'weight_kg', 'height_cm'],
  ['training_goal', 'job_activity_level', 'training_sessions_per_week'],
  ['dietary_preference', 'dietary_restrictions', 'foods_to_avoid'],
  ['meals_per_day', 'plan_duration_weeks', 'variety_tier'],
  ['disclaimer_acknowledged'],
]

export const STEP_TITLES = [
  'Who is this for?',
  'Body metrics',
  'Goals & activity',
  'Diet & preferences',
  'Plan settings',
  'Review & submit',
]

export const TOTAL_STEPS = 6
