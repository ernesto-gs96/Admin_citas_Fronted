// components/dashboard/disponibilidad-header.tsx

import Link from 'next/link'
import { ChevronRightIcon } from './weekly-agenda-icons'

export function DisponibilidadHeader() {
  return (
    <div className="disponibilidad-header">
      <nav className="disponibilidad-breadcrumb" aria-label="Ruta de navegación">
        <Link href="/dashboard">Inicio</Link>
        <ChevronRightIcon />
        <Link href="/dashboard/disponibilidad">Disponibilidad</Link>
        <ChevronRightIcon />
        <span>Horarios y Calendario Laboral</span>
      </nav>
      <h1>Disponibilidad y Horarios de Atención</h1>
      <p>Configura tus franjas de consulta habituales, descansos entre pacientes y bloqueos por vacaciones o congresos.</p>
    </div>
  )
}
