import { Appointment } from '@/lib/mock/dashboard'
import { StatusBadge } from './status-badge'

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
      <StatusBadge status={status} />
    </li>
  )
}
