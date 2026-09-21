import { TodaySlot } from '@/lib/mock/dashboard'
import { AppointmentRow } from './appointment-row'
import { FreeSlotRow } from './free-slot-row'
import { BlockedSlotRow } from './blocked-slot-row'
import { EmptyState } from './empty-state'

export function AppointmentTimeline({ schedule, currentTimeLabel }: { schedule: TodaySlot[]; currentTimeLabel: string }) {
  if (schedule.length === 0) {
    return (
      <EmptyState
        title="Sin citas por hoy"
        description="Cuando agendes una cita, aparecerá aquí con su horario y estado."
      />
    )
  }

  const firstAppointmentId = schedule.find((slot) => slot.kind === 'appointment')?.id

  return (
    <ul className="agenda-list">
      {schedule.map((slot) => {
        if (slot.kind === 'free') {
          return <FreeSlotRow key={slot.id} slot={slot} />
        }
        if (slot.kind === 'blocked') {
          return <BlockedSlotRow key={slot.id} slot={slot} />
        }

        const isCurrent = slot.id === firstAppointmentId
        const { kind, ...appointment } = slot

        return (
          <div key={slot.id}>
            {isCurrent && (
              <li key={`${slot.id}-now`} className="agenda-now-marker" aria-hidden="true">
                <span className="agenda-now-dot" />
                <span className="agenda-now-line" />
                <span className="agenda-now-label">Hora actual · {currentTimeLabel}</span>
              </li>
            )}
            <AppointmentRow key={slot.id} appointment={appointment} highlight={isCurrent} />
          </div>
        )
      })}
    </ul>
  )
}
