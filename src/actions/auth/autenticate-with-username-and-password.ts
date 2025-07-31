'use server'

import { randomUUID } from 'crypto'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { authenticateSchema } from '@/actions/schema'
import { env } from '@/env'
import { routing } from '@/i18n/routing'
import { actionClient } from '@/lib/safe-action'
import { Cookies } from '@/utils/constants'

// função auxiliar
function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/')
  const maybeLocale = segments[1]
  return routing.locales.includes(maybeLocale) ? maybeLocale : routing.defaultLocale
}

export const authenticateWithUsernameAndPasswordAction = actionClient
  .schema(authenticateSchema)
  .action(async ({ parsedInput: { username, password } }) => {

    if (username !== env.NEXT_PUBLIC_LOGIN_USER || password !== env.NEXT_PUBLIC_LOGIN_PASSWORD) {
      return { invalidCredentials: true }
    }

    const cookieStore = await cookies()

    cookieStore.set(Cookies.Token, randomUUID(), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
    })

    const headersList = await headers()
    const referer = headersList.get('referer') || '/'
    const locale = getLocaleFromPath(new URL(referer).pathname)

    redirect(`/${locale}/dashboard`)
})
