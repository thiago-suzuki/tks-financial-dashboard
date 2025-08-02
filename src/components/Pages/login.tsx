"use client"

import { Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { SignInForm } from '@/components'
import { Button } from '@/components/ui'

export function Login() {
  const t = useTranslations("Pages.Login")
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex w-full max-w-[448px] flex-col ">
      <div className="mt-16 mb-20 flex flex-col gap-3">
        <div className='flex justify-between'>
          <h1 className="font-bold text-4xl">TKS Financial</h1>
          <Button 
            variant="ghost"
            className="btn-ghost size-10"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun size={20} className="dark:hidden" />
            <Moon size={20} className="hidden dark:block" />
          </Button>
        </div>
        <span className="font-bold">
          {t('welcome-message')}
        </span>
      </div>

      <SignInForm />

      <footer className="mt-16 flex flex-row items-center justify-center gap-4 max-md:mt-12">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#55D78E] to-[#1EA6BD]">
          TKS
        </h1>
        <span className="dark:text-gray-400">© {new Date().getFullYear()} Thiago Suzuki</span>
      </footer>
    </div>
  )
}
