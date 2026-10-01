// components/dashboard/servicios-filter-bar.tsx

import { CATEGORIAS } from '@/lib/mock/servicios'
import { GridViewIcon, ListViewIcon, TuneIcon } from './servicios-icons'
import { SearchIcon } from './dashboard-icons'

export type EstadoFiltroServicio = 'todos' | 'activo_web' | 'presencial' | 'online'
export type VistaServicios = 'list' | 'grid'

interface ServiciosFilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  categoria: string
  onCategoriaChange: (value: string) => void
  estadoFiltro: EstadoFiltroServicio
  onEstadoFiltroChange: (value: EstadoFiltroServicio) => void
  vista: VistaServicios
  onVistaChange: (value: VistaServicios) => void
  visibles: number
  total: number
}

export function ServiciosFilterBar({
  search,
  onSearchChange,
  categoria,
  onCategoriaChange,
  estadoFiltro,
  onEstadoFiltroChange,
  vista,
  onVistaChange,
  visibles,
  total,
}: ServiciosFilterBarProps) {
  return (
    <div className="servicios-filter-bar">
      <div className="servicios-filter-left">
        <label className="servicios-search">
          <SearchIcon />
          <input
            type="search"
            placeholder="Buscar servicio médico…"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Buscar servicio médico"
          />
        </label>

        <div className="servicios-filter-divider" aria-hidden="true" />

        <select className="servicios-select" value={categoria} onChange={(event) => onCategoriaChange(event.target.value)} aria-label="Filtrar por categoría">
          <option value="todas">Todas las categorías</option>
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="servicios-select"
          value={estadoFiltro}
          onChange={(event) => onEstadoFiltroChange(event.target.value as EstadoFiltroServicio)}
          aria-label="Filtrar por estado o modalidad"
        >
          <option value="todos">Activos e inactivos</option>
          <option value="activo_web">Solo activos en web</option>
          <option value="presencial">Solo presenciales</option>
          <option value="online">Solo videoconsulta</option>
        </select>

        <button type="button" className="servicios-filter-more">
          <TuneIcon />
          <span>Más filtros</span>
        </button>
      </div>

      <div className="servicios-filter-right">
        <span className="servicios-filter-count">
          Mostrando {visibles} de {total}
        </span>
        <div className="servicios-view-toggle" role="group" aria-label="Tipo de vista">
          <button type="button" className={vista === 'list' ? 'active' : ''} onClick={() => onVistaChange('list')} title="Vista lista" aria-pressed={vista === 'list'}>
            <ListViewIcon />
          </button>
          <button type="button" className={vista === 'grid' ? 'active' : ''} onClick={() => onVistaChange('grid')} title="Vista cuadrícula" aria-pressed={vista === 'grid'}>
            <GridViewIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
