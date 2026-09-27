import { ArrowRightIcon, ClockIcon, ShieldCheckIcon } from '@/components/dashboard/dashboard-icons'
import { DayOption, MockPatient, NeighboringSlot, ServiceOption, TimeSlotOption } from '@/lib/mock/appointment-form'

export function AppointmentSummary({
  day,
  slot,
  service,
  patient,
  specialistName,
  modalityLabel,
  onConfirm,
  neighboringSlots,
}: {
  day: DayOption
  slot: TimeSlotOption | undefined
  service: ServiceOption
  patient: MockPatient
  specialistName: string
  modalityLabel: string
  onConfirm: () => void
  neighboringSlots: NeighboringSlot[]
}) {
  return (
    <div className="summary-card">
      <div className="summary-card-header">
        <span><ClockIcon /> Resumen de la cita</span>
        <span className="summary-status">En preparación</span>
      </div>

      <div className="summary-body">
        <div className="summary-datetime">
          <span className="form-label">Fecha y horario programado</span>
          <p className="summary-date">{day.label} {day.dateLabel} · {day.weekday}</p>
          {slot && <p className="summary-time">{slot.label} · {service.durationMinutes} min</p>}
        </div>

        <dl className="summary-rows">
          <div>
            <dt>Paciente</dt>
            <dd>{patient.name}</dd>
          </div>
          <div>
            <dt>Especialista</dt>
            <dd>{specialistName}</dd>
          </div>
          <div>
            <dt>Servicio</dt>
            <dd>{service.name}</dd>
          </div>
          <div>
            <dt>Modalidad</dt>
            <dd>{modalityLabel}</dd>
          </div>
          <div className="summary-row-total">
            <dt>Total a facturar</dt>
            <dd>{service.price.toFixed(2)} €</dd>
          </div>
        </dl>

        <div className="summary-alert">
          <ShieldCheckIcon />
          <span><strong>Sin conflictos de agenda:</strong> este horario está libre según tu disponibilidad.</span>
        </div>

        {/* TODO: conectar a la lógica real de creación de citas — hoy no hay backend que la persista */}
        <button type="button" className="summary-confirm" onClick={onConfirm}>
          <span>Confirmar y agendar cita</span>
          <ArrowRightIcon />
        </button>
        <p className="summary-footnote">Se notificará al paciente según los recordatorios activados.</p>
      </div>

      <div className="summary-timeline">
        <div className="summary-timeline-header">
          <span>Agenda del día ({day.dateLabel})</span>
          <span className="table-muted">{neighboringSlots.length} citas cercanas</span>
        </div>
        <div className="summary-timeline-list">
          {neighboringSlots.map((item) => (
            <div key={item.time} className={`summary-timeline-row summary-timeline-${item.variant}`}>
              <div>
                <span className="summary-timeline-time">{item.time}</span>
                <span className="summary-timeline-name">{item.label}</span>
              </div>
              <span className="summary-timeline-tag">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
