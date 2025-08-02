import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthenticated } from '@/auth'

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  if (await isAuthenticated()) {
    redirect('/dashboard')
  }

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden flex-col items-center justify-center bg-center bg-cover bg-slate-100 dark:bg-black dark:bg-gradient-to-r dark:from-[#66666] dark:to-[#0F172B] md:flex">
        <h1 className="font-bold">
            <span className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#55D78E] to-[#1EA6BD]">TKS</span>
            <span className="ml-3 text-5xl">Financial</span>
        </h1>
      </div>

      <div className="relative flex flex-col items-center justify-center p-8">
        {children}
      </div>
    </div>
  )
}
