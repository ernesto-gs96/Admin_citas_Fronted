import Link from 'next/link'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { NextAppointmentCard } from '@/components/dashboard/next-appointment-card'
import { AppointmentTimeline } from '@/components/dashboard/appointment-timeline'
import { AppointmentListCard } from '@/components/dashboard/appointment-list-card'
import { MiniCalendar } from '@/components/dashboard/mini-calendar'
import { todayAppointments, upcomingAppointments } from '@/lib/mock/dashboard'

export default function DashboardPage() {
  const pendingToday = todayAppointments.filter((appointment) => appointment.status === 'pending').length
  const nextAppointment = todayAppointments[0] ?? null

  return (
    <>
      <DashboardHeader
        totalToday={todayAppointments.length}
        nextTime={nextAppointment?.time}
      />

      <NextAppointmentCard
        next={nextAppointment}
        totalToday={todayAppointments.length}
        pending={pendingToday}
      />

      <div className="dashboard-columns">
        <div className="dashboard-column-main">
          <section className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2>Agenda de hoy</h2>
            </div>
            <AppointmentTimeline appointments={todayAppointments} />
          </section>

          <section className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2>Próximas citas</h2>
              <Link href="/dashboard/citas" className="text-link">Ver toda la agenda →</Link>
            </div>
            <AppointmentListCard appointments={upcomingAppointments} />
          </section>
        </div>

        <div className="dashboard-column-side">
          <MiniCalendar appointmentsToday={todayAppointments.length} />
        </div>
      </div>
    </>
  )
}
