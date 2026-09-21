import { BlockedSlot } from '@/lib/mock/dashboard'
import { UtensilsIcon } from './dashboard-icons'

export function BlockedSlotRow({ slot }: { slot: BlockedSlot }) {
  return (
    <li className="agenda-row agenda-row-blocked">
      <div className="agenda-time">
        <span>{slot.time}</span>
        <span className="agenda-time-end">{slot.endTime}</span>
      </div>
      <div className="agenda-info agenda-info-blocked">
        <UtensilsIcon />
        <p className="agenda-meta">{slot.label}</p>
      </div>
      <span className="agenda-blocked-label">Bloqueado</span>
    </li>
  )
}
