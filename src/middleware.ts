import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'

import { locales, routing } from '@/i18n/routing'
import { Cookies } from '@/utils/constants'

const intlMiddleware = createMiddleware(routing)

const publicPages = ['/']


export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  const response = intlMiddleware(req)

  if(!isPublicPage) {
    const token = req.cookies.get(Cookies.Token)?.value

    if(!token) {
      NextResponse.redirect(
        new URL('/', req.nextUrl)
      )
    }
  }

  return response
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next|_vercel|.*\\..*).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
