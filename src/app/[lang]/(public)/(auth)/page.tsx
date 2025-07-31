import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'

import { SignInForm } from '@/components'

export const metadata: Metadata = {
  title: 'Login',
}

export default function LoginPage() {
  const t = useTranslations("Pages.Login")

  return (
    <div className="flex w-full max-w-[448px] flex-col ">
      <div className="mt-16 mb-20 flex flex-col gap-3">
        <h1 className="font-bold text-4xl">TKS Financial</h1>
        <span className="font-bold">
          {t('welcome-message')}
        </span>
      </div>

      <SignInForm />

      <footer className="mt-16 flex flex-row items-center justify-center gap-4 max-md:mt-12">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#55D78E] to-[#1EA6BD]">
          TKS
        </h1>
        <span className="text-gray-400">© {new Date().getFullYear()} Thiago Suzuki</span>
      </footer>
    </div>
  )
}
