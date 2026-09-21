import Link from 'next/link'
import { FreeSlot } from '@/lib/mock/dashboard'
import { PlusIcon } from './dashboard-icons'

export function FreeSlotRow({ slot }: { slot: FreeSlot }) {
  return (
    <li className="agenda-row agenda-row-free">
      <div className="agenda-time">
        <span>{slot.time}</span>
        <span className="agenda-time-end">{slot.endTime}</span>
      </div>
      <div className="agenda-info">
        <p className="agenda-meta">{slot.label}</p>
      </div>
      <Link href="/dashboard/citas" className="text-link agenda-free-cta">
        <PlusIcon />
        Agendar
      </Link>
    </li>
  )
}
