// components/dashboard/servicios-header.tsx

import { AddCircleIcon, CategoryIcon, DownloadIcon } from './servicios-icons'

interface ServiciosHeaderProps {
  totalServicios: number
  onNuevoServicio: () => void
}

export function ServiciosHeader({ totalServicios, onNuevoServicio }: ServiciosHeaderProps) {
  return (
    <div className="servicios-head">
      <div>
        <div className="servicios-head-title-row">
          <h1>Servicios y Prestaciones Médicas</h1>
          <span className="servicios-head-badge">{totalServicios} en catálogo</span>
        </div>
        <p className="servicios-head-desc">
          Configura tus prestaciones, honorarios, duración de consulta y visibilidad en tu página pública de reservas
          para pacientes.
        </p>
      </div>

      <div className="servicios-head-actions">
        <button type="button" className="servicios-btn">
          <CategoryIcon />
          <span>Categorías y Especialidades</span>
        </button>
        <button type="button" className="servicios-btn">
          <DownloadIcon />
          <span>Exportar catálogo</span>
        </button>
        <button type="button" className="servicios-btn servicios-btn-primary" onClick={onNuevoServicio}>
          <AddCircleIcon />
          <span>Añadir nuevo servicio</span>
        </button>
      </div>
    </div>
  )
}
