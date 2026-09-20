import { AppointmentStatus } from '@/lib/mock/dashboard'

const LABEL: Record<AppointmentStatus, string> = {
  confirmed: 'Confirmada',
  pending: 'Pendiente',
}

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span className={`status-badge status-badge-${status}`}>
      <span className="status-dot" aria-hidden="true" />
      {LABEL[status]}
    </span>
  )
}
