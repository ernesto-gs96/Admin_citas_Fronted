import { Appointment } from '@/lib/mock/dashboard'
import { AppointmentRow } from './appointment-row'
import { EmptyState } from './empty-state'

export function AppointmentTimeline({ appointments }: { appointments: Appointment[] }) {
  if (appointments.length === 0) {
    return (
      <EmptyState
        title="Sin citas por hoy"
        description="Cuando agendes una cita, aparecerá aquí con su horario y estado."
      />
    )
  }

  return (
    <ul className="agenda-list">
      {appointments.map((appointment, index) => (
        <AppointmentRow key={appointment.id} appointment={appointment} highlight={index === 0} />
      ))}
    </ul>
  )
}
