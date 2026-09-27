import { DayOption, TimeSlotOption } from '@/lib/mock/appointment-form'
import { CalendarIcon, RoomIcon } from '@/components/dashboard/dashboard-icons'

export function ScheduleStep({
  days,
  selectedDayId,
  onSelectDay,
  slots,
  selectedSlotId,
  onSelectSlot,
  specialistName,
}: {
  days: DayOption[]
  selectedDayId: string
  onSelectDay: (id: string) => void
  slots: TimeSlotOption[]
  selectedSlotId: string
  onSelectSlot: (id: string) => void
  specialistName: string
}) {
  return (
    <section className="form-section">
      <div className="form-section-header">
        <div className="form-section-title">
          <span className="form-step-number">3</span>
          <h2>Fecha, Franja Horaria y Consultorio</h2>
        </div>
        <span className="form-section-hint form-section-hint-positive">
          <span className="form-hint-dot" /> Horario laboral disponible
        </span>
      </div>

      <div className="form-field">
        <span className="form-label">Seleccionar día</span>
        <div className="day-picker" role="group" aria-label="Día de la cita">
          {days.map((day) => {
            const active = day.id === selectedDayId
            return (
              <button
                key={day.id}
                type="button"
                className={`day-pill ${active ? 'active' : ''}`}
                onClick={() => onSelectDay(day.id)}
                aria-pressed={active}
              >
                <span>{day.label} {day.dateLabel}</span>
                <span className="day-pill-weekday">{day.weekday}</span>
              </button>
            )
          })}
          <button type="button" className="day-pill day-pill-more">
            <CalendarIcon />
            <span>Otra fecha…</span>
          </button>
        </div>
      </div>

      <div className="form-field">
        <span className="form-label">Horarios disponibles</span>
        <div className="slot-grid" role="group" aria-label="Hora de la cita">
          {slots.map((slot) => {
            const active = slot.id === selectedSlotId
            return (
              <button
                key={slot.id}
                type="button"
                className={`slot-pill ${active ? 'active' : ''}`}
                onClick={() => onSelectSlot(slot.id)}
                aria-pressed={active}
              >
                {slot.label}
                <span className="slot-pill-tag">Libre</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="room-banner">
        <span><RoomIcon /> Ubicación: <strong>Consultorio asignado según disponibilidad</strong></span>
        <span className="table-muted">Especialista: {specialistName}</span>
      </div>
    </section>
  )
}
