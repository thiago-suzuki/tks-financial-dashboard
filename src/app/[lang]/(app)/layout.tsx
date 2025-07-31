import { isAuthenticated } from "@/auth"
import { Layout } from "@/components"
import { redirect } from "next/navigation"

export default async function TKSFinancialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/')
  }

  return (
    <Layout>
      {children}
    </Layout>
  )
}