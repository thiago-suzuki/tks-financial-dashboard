import type { Metadata } from 'next'
import { Login } from '@/components/Pages'

export const metadata: Metadata = {
  title: 'Login | TKS Financial'
}

export default function LoginPage() {
  return <Login />
}
