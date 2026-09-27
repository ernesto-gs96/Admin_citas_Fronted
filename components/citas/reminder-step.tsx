import { AlarmIcon, CalendarIcon, ChatIcon } from '@/components/dashboard/dashboard-icons'

export interface ReminderState {
  whatsappNow: boolean
  reminder24h: boolean
  calendarInvite: boolean
}

export function ReminderStep({
  value,
  onChange,
  patientPhone,
  patientEmail,
}: {
  value: ReminderState
  onChange: (next: ReminderState) => void
  patientPhone: string
  patientEmail: string
}) {
  return (
    <section className="form-section">
      <div className="form-section-header">
        <div className="form-section-title">
          <span className="form-step-number">4</span>
          <h2>Comunicaciones y Recordatorios</h2>
        </div>
      </div>

      <div className="reminder-list">
        <label className="reminder-row">
          <div className="reminder-row-main">
            <ChatIcon />
            <div>
              <span className="reminder-title">Enviar confirmación inmediata por WhatsApp</span>
              <span className="reminder-subtitle">Mensaje con enlace y detalles al {patientPhone}</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={value.whatsappNow}
            onChange={(event) => onChange({ ...value, whatsappNow: event.target.checked })}
          />
        </label>

        <label className="reminder-row">
          <div className="reminder-row-main">
            <AlarmIcon />
            <div>
              <span className="reminder-title">Recordatorio 24 horas antes</span>
              <span className="reminder-subtitle">Reduce el ausentismo permitiendo confirmar asistencia</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={value.reminder24h}
            onChange={(event) => onChange({ ...value, reminder24h: event.target.checked })}
          />
        </label>

        <label className="reminder-row">
          <div className="reminder-row-main">
            <CalendarIcon />
            <div>
              <span className="reminder-title">Invitación a Google Calendar / iCal</span>
              <span className="reminder-subtitle">Añade la cita al calendario del paciente ({patientEmail})</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={value.calendarInvite}
            onChange={(event) => onChange({ ...value, calendarInvite: event.target.checked })}
          />
        </label>
      </div>
    </section>
  )
}
