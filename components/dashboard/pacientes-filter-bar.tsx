// components/dashboard/pacientes-filter-bar.tsx

import { ESTADOS_PACIENTE, ETIQUETAS_PACIENTE, ORDENES_PACIENTE } from '@/lib/mock/pacientes'
import { SearchIcon } from './dashboard-icons'
import { SortIcon } from './pacientes-icons'
import { CheckCircleIcon } from './servicios-icons'

interface PacientesFilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  estado: string
  onEstadoChange: (value: string) => void
  etiqueta: string
  onEtiquetaChange: (value: string) => void
  orden: string
  onOrdenChange: (value: string) => void
  total: number
}

export function PacientesFilterBar({
  search,
  onSearchChange,
  estado,
  onEstadoChange,
  etiqueta,
  onEtiquetaChange,
  orden,
  onOrdenChange,
  total,
}: PacientesFilterBarProps) {
  return (
    <div className="pacientes-toolbar">
      <div className="pacientes-toolbar-left">
        <label className="pacientes-search">
          <SearchIcon />
          <input
            type="search"
            placeholder="Buscar por nombre, DNI o móvil…"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Buscar paciente"
          />
        </label>

        <label className="pacientes-select">
          <span>Estado:</span>
          <select value={estado} onChange={(event) => onEstadoChange(event.target.value)}>
            {ESTADOS_PACIENTE.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <CheckCircleIcon />
        </label>

        <label className="pacientes-select">
          <span>Etiqueta:</span>
          <select value={etiqueta} onChange={(event) => onEtiquetaChange(event.target.value)}>
            {ETIQUETAS_PACIENTE.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <CheckCircleIcon />
        </label>

        <label className="pacientes-select">
          <span>Orden:</span>
          <select value={orden} onChange={(event) => onOrdenChange(event.target.value)}>
            {ORDENES_PACIENTE.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <SortIcon />
        </label>
      </div>

      <div className="pacientes-toolbar-count">
        <span className="pacientes-toolbar-dot" />
        <span>
          Mostrando <strong>{total}</strong> pacientes registrados
        </span>
      </div>
    </div>
  )
}
