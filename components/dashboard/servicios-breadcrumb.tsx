// components/dashboard/servicios-breadcrumb.tsx
// SUBHEADER & BREADCRUMBS de /dashboard/servicios.

import Link from 'next/link'
import { ChevronRightIcon } from './weekly-agenda-icons'
import { VerifiedIcon } from './servicios-icons'

export function ServiciosBreadcrumb() {
  const now = new Date()
  const horaActualizacion = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="servicios-breadcrumb-bar">
      <nav className="servicios-breadcrumb" aria-label="Ruta de navegación">
        <Link href="/dashboard">Inicio</Link>
        <ChevronRightIcon />
        <Link href="/dashboard/servicios">Servicios</Link>
        <ChevronRightIcon />
        <span className="servicios-breadcrumb-current">Catálogo de Prestaciones Médicas</span>
      </nav>

      <div className="servicios-breadcrumb-meta">
        <span>Última actualización: Hoy, {horaActualizacion}</span>
        <span className="servicios-breadcrumb-divider" aria-hidden="true" />
        <span className="servicios-badge-verified">
          <VerifiedIcon />
          Catálogo Homologado SNS
        </span>
      </div>
    </div>
  )
}
