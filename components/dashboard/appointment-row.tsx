import { Appointment } from '@/lib/mock/dashboard'
import { StatusBadge } from './status-badge'
import { ChatIcon, VideoIcon } from './dashboard-icons'

export function AppointmentRow({ appointment, highlight = false }: { appointment: Appointment; highlight?: boolean }) {
  const { time, endTime, patientName, serviceType, modality, location, status } = appointment

  return (
    <li className={`agenda-row ${highlight ? 'agenda-row-current' : ''}`}>
      <div className="agenda-time">
        <span>{time}</span>
        <span className="agenda-time-end">{endTime}</span>
      </div>
      <div className="agenda-info">
        <p className="agenda-patient">{patientName}</p>
        <p className="agenda-meta">
          {serviceType} · {modality}
          {location ? ` (${location})` : ''}
        </p>
      </div>

      <div className="agenda-row-actions">
        <StatusBadge status={status} />
        {highlight ? (
          <button type="button" className="agenda-action-primary">
            Iniciar consulta
          </button>
        ) : modality === 'Video' ? (
          <button type="button" className="agenda-action-secondary">
            <VideoIcon />
            Abrir sala
          </button>
        ) : status === 'pending' ? (
          <button type="button" className="agenda-action-secondary">
            <ChatIcon />
            Avisar por WhatsApp
          </button>
        ) : null}
      </div>
    </li>
  )
}
