'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Sidebar } from '@/components/dashboard/sidebar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace('/login')
    }
  }, [isPending, session, router])

  if (isPending) {
    return <main className="signed-in-shell"><p>Cargando…</p></main>
  }

  if (!session?.user) {
    return null
  }

  return (
    <div className="dashboard-shell">
      <Sidebar userName={session.user.name} userEmail={session.user.email} />
      <main className="dashboard-main">{children}</main>
    </div>
  )
}
