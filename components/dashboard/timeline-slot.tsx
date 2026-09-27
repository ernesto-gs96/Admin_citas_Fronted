import Link from 'next/link'
import { TimelineSlot } from '@/lib/mock/dashboard'
import { StatusBadge } from './status-badge'
import { ForkKnifeIcon, PlayIcon, PlusIcon, SendIcon, VideoIcon } from './dashboard-icons'

export function TimelineSlotRow({ slot }: { slot: TimelineSlot }) {
  if (slot.kind === 'open') {
    return (
      <li className="timeline-slot timeline-slot-open">
        <span className="timeline-slot-time">{slot.time}</span>
        <div className="timeline-slot-open-body">
          <span>{slot.label}</span>
          <Link href="/dashboard/citas/nueva" className="text-link">
            <PlusIcon /> Agendar
          </Link>
        </div>
      </li>
    )
  }

  if (slot.kind === 'blocked') {
    return (
      <li className="timeline-slot timeline-slot-blocked">
        <span className="timeline-slot-time">{slot.time}</span>
        <span className="timeline-slot-blocked-label">
          <ForkKnifeIcon /> {slot.label}
        </span>
        <span className="timeline-slot-blocked-tag">Bloqueado</span>
      </li>
    )
  }

  const { time, endTime, patientName, serviceType, modality, location, status, action, current } = slot

  return (
    <li className={`timeline-slot timeline-slot-appointment ${current ? 'timeline-slot-current' : ''}`}>
      <div className="timeline-slot-time-col">
        <span className="timeline-slot-time">{time}</span>
        <span className="timeline-slot-time-end">{endTime}</span>
      </div>
      <span className={`timeline-bar ${status === 'pending' ? 'timeline-bar-pending' : ''}`} aria-hidden="true" />
      <div className="timeline-slot-body">
        <div className="timeline-slot-heading">
          <span className="timeline-slot-name">{patientName}</span>
          <span className="timeline-slot-modality">
            · {modality}
            {location ? ` (${location})` : ''}
          </span>
        </div>
        <p className="timeline-slot-service">{serviceType}</p>
      </div>
      <div className="timeline-slot-actions">
        <StatusBadge status={status} />
        {/* TODO: conectar estas acciones a la lógica real de citas cuando exista */}
        {action === 'start' && (
          <Link href="/dashboard/citas" className="timeline-action timeline-action-primary">
            <PlayIcon /> Iniciar consulta
          </Link>
        )}
        {action === 'room' && (
          <Link href="/dashboard/citas" className="timeline-action">
            <VideoIcon /> Abrir sala
          </Link>
        )}
        {action === 'remind' && (
          <button type="button" className="timeline-action">
            <SendIcon /> Avisar por WhatsApp
          </button>
        )}
      </div>
    </li>
  )
}
