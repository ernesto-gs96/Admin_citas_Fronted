import { Appointment } from '@/lib/mock/dashboard'
import { ClockIcon } from './dashboard-icons'

export function NextAppointmentCard({
  next,
  totalToday,
  pending,
}: {
  next: Appointment | null
  totalToday: number
  pending: number
}) {
  return (
    <div className="next-appointment">
      <span className="next-appointment-icon"><ClockIcon /></span>

      <div className="next-appointment-body">
        {next ? (
          <>
            <p className="next-appointment-label">Próxima cita</p>
            <p className="next-appointment-value">
              {next.time} · {next.patientName}
            </p>
          </>
        ) : (
          <p className="next-appointment-label">No tienes más citas por hoy</p>
        )}
      </div>

      <div className="next-appointment-status">
        <span>{totalToday} {totalToday === 1 ? 'cita hoy' : 'citas hoy'}</span>
        {pending > 0 && (
          <span className="next-appointment-pending">
            {pending} {pending === 1 ? 'por confirmar' : 'por confirmar'}
          </span>
        )}
      </div>
    </div>
  )
}
