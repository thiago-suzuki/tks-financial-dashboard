import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_LOGIN_USER: z
      .string(),
    NEXT_PUBLIC_LOGIN_PASSWORD: z
      .string(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_LOGIN_USER: process.env.NEXT_PUBLIC_LOGIN_USER,
    NEXT_PUBLIC_LOGIN_PASSWORD: process.env.NEXT_PUBLIC_LOGIN_PASSWORD
  },
})
