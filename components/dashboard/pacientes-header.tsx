// components/dashboard/pacientes-header.tsx

import Link from 'next/link'
import { ChevronRightIcon } from './weekly-agenda-icons'
import { DownloadIcon, PersonAddIcon } from './servicios-icons'

interface PacientesHeaderProps {
  onExportar: () => void
  onNuevoPaciente: () => void
}

export function PacientesHeader({ onExportar, onNuevoPaciente }: PacientesHeaderProps) {
  return (
    <div className="pacientes-head">
      <div>
        <nav className="pacientes-breadcrumb" aria-label="Ruta de navegación">
          <Link href="/dashboard">Inicio</Link>
          <ChevronRightIcon />
          <Link href="/dashboard/pacientes">Pacientes</Link>
          <ChevronRightIcon />
          <span>Directorio de Pacientes</span>
        </nav>
        <h1>Directorio y Gestión de Pacientes</h1>
        <p>Consulta expedientes clínicos, historial de consultas, citas activas y contacto directo con tus pacientes.</p>
      </div>

      <div className="pacientes-head-actions">
        <button type="button" className="servicios-btn" onClick={onExportar}>
          <DownloadIcon />
          <span>Exportar listado (CSV/Excel)</span>
        </button>
        <button type="button" className="servicios-btn servicios-btn-primary" onClick={onNuevoPaciente}>
          <PersonAddIcon />
          <span>Registrar nuevo paciente</span>
        </button>
      </div>
    </div>
  )
}
