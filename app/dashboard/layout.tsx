import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth-server'
import { Sidebar } from '@/components/dashboard/sidebar'
import { TopBar } from '@/components/dashboard/topbar'
import { professionalSpecialty, todayAppointments } from '@/lib/mock/dashboard'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession()

  if (!session?.user) {
    redirect('/login')
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
