'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Sidebar } from '@/components/dashboard/sidebar'
import { TopBar } from '@/components/dashboard/topbar'
import { professionalSpecialty, todayAppointments } from '@/lib/mock/dashboard'

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
      <Sidebar
        userName={session.user.name}
        userEmail={session.user.email}
        specialty={professionalSpecialty}
        appointmentsToday={todayAppointments.length}
      />
      <main className="dashboard-main">
        <TopBar userName={session.user.name || session.user.email} />
        {children}
      </main>
    </div>
  )
}
