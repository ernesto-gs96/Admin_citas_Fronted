import { UpcomingAppointment } from '@/lib/mock/dashboard'
import { StatusBadge } from './status-badge'
import { EmptyState } from './empty-state'
import { MoreIcon } from './dashboard-icons'

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
    <div className="upcoming-table-wrap">
      <table className="upcoming-table">
        <thead>
          <tr>
            <th scope="col">Paciente</th>
            <th scope="col">Fecha y hora</th>
            <th scope="col">Servicio</th>
            <th scope="col">Estado</th>
            <th scope="col">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>
                <div className="upcoming-table-patient">
                  <span className="upcoming-avatar" aria-hidden="true">{initials(appointment.patientName)}</span>
                  <div className="upcoming-info">
                    <p className="upcoming-name">{appointment.patientName}</p>
                    <p className="upcoming-meta">{appointment.patientContact}</p>
                  </div>
                </div>
              </td>
              <td>{appointment.dateLabel}</td>
              <td>{appointment.serviceType}</td>
              <td>
                <StatusBadge status={appointment.status} />
              </td>
              <td>
                <button type="button" className="upcoming-table-more" aria-label={`Más acciones para ${appointment.patientName}`}>
                  <MoreIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
