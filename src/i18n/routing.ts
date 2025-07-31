import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'pt-br', 'es']

export const defaultLocale = 'pt-br'

export const routing = defineRouting({
  locales,
  defaultLocale
})

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
