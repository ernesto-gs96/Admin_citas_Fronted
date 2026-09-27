'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BellIcon, PlusIcon, SearchIcon } from './dashboard-icons'

export function DashboardTopHeader({ userName, userEmail }: { userName?: string | null; userEmail: string }) {
  // TODO: conectar a una búsqueda real de pacientes/citas cuando exista esa API.
  const [query, setQuery] = useState('')
  const initial = (userName || userEmail).charAt(0).toUpperCase()

  return (
    <header className="dashboard-topheader">
      <div className="dashboard-search">
        <SearchIcon />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar paciente o cita…"
          aria-label="Buscar paciente o cita"
        />
        <kbd>⌘K</kbd>
      </div>

      <div className="dashboard-topheader-actions">
        <button type="button" className="dashboard-icon-button" aria-label="Notificaciones">
          <BellIcon />
          <span className="dashboard-notification-dot" aria-hidden="true" />
        </button>
        {/* <Link href="/dashboard/citas/nueva" className="dashboard-new-cta">
          <PlusIcon /> 
          Nueva cita
        </Link> */}
        <Link href="/dashboard/configuracion" className="dashboard-avatar" aria-label="Tu cuenta">
          {initial}
        </Link>
      </div>
    </header>
  )
}
