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
      <div className="hidden flex-col items-center justify-center bg-center bg-cover bg-gradient-to-r from-[#66666] to-[#5a018d] md:flex">
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
