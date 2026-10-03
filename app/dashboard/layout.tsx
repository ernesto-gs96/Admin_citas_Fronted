import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth-server'
import { Sidebar } from '@/components/dashboard/sidebar'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="dashboard-shell">
      <Sidebar userName={session.user.name} userEmail={session.user.email} />
      <main className="dashboard-main">{children}</main>
    </div>
  )
}
