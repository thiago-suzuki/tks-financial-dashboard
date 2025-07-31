"use server";

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Cookies } from '@/utils/constants'

export async function isAuthenticated() {
  const cookieStore = await cookies()

  return !!cookieStore.get(Cookies.Token)?.value
}

export async function signOut() {
  const cookieStore = await cookies()

  cookieStore.delete(Cookies.Token)

  redirect('/')
}