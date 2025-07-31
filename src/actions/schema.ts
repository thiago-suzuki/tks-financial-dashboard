import { z } from 'zod'

export const authenticateSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(3, { message: 'Password must be at least 3 characters long' }),
})

export type AuthenticateFormValues = z.infer<typeof authenticateSchema>