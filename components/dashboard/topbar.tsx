import Link from 'next/link'
import { BellIcon, PlusIcon, SearchIcon, SettingsIcon, ShareIcon } from './dashboard-icons'

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function TopBar({ userName, hasNotifications = true }: { userName: string; hasNotifications?: boolean }) {
  return (
    <div className="dashboard-topbar">
      <label className="dashboard-search">
        <SearchIcon />
        <input type="search" placeholder="Buscar paciente o cita…" aria-label="Buscar paciente o cita" />
      </label>

      

      <div className="dashboard-topbar-actions">
        <Link href="/dashboard/citas" className="light-button dashboard-topbar-cta">
          <ShareIcon />
          <span>Compartir enlace cita</span>
        </Link>

        <Link href="/dashboard/citas" className="submit-button dashboard-topbar-cta">
          <PlusIcon />
          <span>Nueva cita</span>
        </Link>

        <button type="button" className="dashboard-icon-button" aria-label="Notificaciones">
          <BellIcon />
          {hasNotifications && <span className="dashboard-icon-dot" aria-hidden="true" />}
        </button>

        <button type="button" className="dashboard-icon-button" aria-label="Configuración">
          <SettingsIcon />
        </button>
      </div>
    </div>
  )
}
