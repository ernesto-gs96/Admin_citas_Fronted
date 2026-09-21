import Link from 'next/link'
import { Appointment, minutesBetween } from '@/lib/mock/dashboard'
import { ClockIcon } from './dashboard-icons'

export function NextAppointmentCard({
  next,
  totalToday,
  pending,
  available,
  currentTimeLabel,
}: {
  next: Appointment | null
  totalToday: number
  pending: number
  available: number
  currentTimeLabel: string
}) {
  const minutesUntilNext = next ? minutesBetween(currentTimeLabel, next.time) : null

  return (
    <div className="next-appointment">
      <span className="next-appointment-icon"><ClockIcon /></span>

      <div className="next-appointment-body">
        {next ? (
          <>
            <p className="next-appointment-label">
              {minutesUntilNext !== null && minutesUntilNext > 0
                ? `Próxima cita en ${minutesUntilNext} min`
                : 'Próxima cita'}
            </p>
            <p className="next-appointment-value">
              {next.time} · {next.patientName}
              {next.serviceType ? ` (${next.serviceType})` : ''}
            </p>
          </>
        ) : (
          <p className="next-appointment-label">No tienes más citas por hoy</p>
        )}
      </div>

      <div className="next-appointment-stats">
        <span>
          <b>{totalToday}</b> {totalToday === 1 ? 'cita' : 'citas'}
          <small>Total hoy</small>
        </span>
        <span>
          <b className={pending > 0 ? 'next-appointment-pending' : ''}>{pending}</b> {pending === 1 ? 'pendiente' : 'pendientes'}
          <small>Por confirmar</small>
        </span>
        <span>
          <b>{available}</b> {available === 1 ? 'espacio' : 'espacios'}
          <small>Disponibles</small>
        </span>
      </div>

      <Link href="/dashboard/citas" className="text-link next-appointment-link">
        Ver calendario completo →
      </Link>
    </div>
  )
}
