import { UpcomingAppointment } from '@/lib/mock/dashboard'
import { StatusBadge } from './status-badge'
import { EmptyState } from './empty-state'

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function AppointmentListCard({ appointments }: { appointments: UpcomingAppointment[] }) {
  if (appointments.length === 0) {
    return (
      <EmptyState
        title="Sin próximas citas"
        description="Las citas que agendes esta semana aparecerán aquí."
      />
    )
  }

  return (
    <ul className="upcoming-list">
      {appointments.map((appointment) => (
        <li key={appointment.id} className="upcoming-row">
          <div className="upcoming-avatar" aria-hidden="true">{initials(appointment.patientName)}</div>
          <div className="upcoming-info">
            <p className="upcoming-name">{appointment.patientName}</p>
            <p className="upcoming-meta">{appointment.dateLabel} · {appointment.serviceType}</p>
          </div>
          <StatusBadge status={appointment.status} />
        </li>
      ))}
    </ul>
  )
}
