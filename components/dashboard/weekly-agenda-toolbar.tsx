'use client'

// components/dashboard/weekly-agenda-toolbar.tsx
// CALENDAR CONTROLS & FILTER SUB-HEADER de /dashboard/citas.

import Link from 'next/link'
import { formatWeekRangeFull, formatWeekRangeShort } from '@/lib/dashboard/week-utils'
import type { EstadoFiltro, ModalidadFiltro } from '@/lib/mock/weekly-agenda'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, FilterIcon, LockClockIcon, VideoIcon } from './weekly-agenda-icons'

interface WeeklyAgendaToolbarProps {
  weekDates: Date[]
  isCurrentWeek: boolean
  totalCitas: number
  onPrevWeek: () => void
  onNextWeek: () => void
  onToday: () => void
  estadoFiltro: EstadoFiltro
  onEstadoFiltroChange: (value: EstadoFiltro) => void
  modalidadFiltro: ModalidadFiltro
  onModalidadFiltroChange: (value: ModalidadFiltro) => void
}

export function WeeklyAgendaToolbar({
  weekDates,
  isCurrentWeek,
  totalCitas,
  onPrevWeek,
  onNextWeek,
  onToday,
  estadoFiltro,
  onEstadoFiltroChange,
  modalidadFiltro,
  onModalidadFiltroChange,
}: WeeklyAgendaToolbarProps) {
  return (
    <div className="weekly-toolbar">
      <div className="weekly-toolbar-dates">
        <div>
          <div className="weekly-toolbar-title-row">
            <h1>Agenda Semanal</h1>
            <span className="weekly-toolbar-badge">{totalCitas} citas</span>
          </div>
          <p className="weekly-toolbar-subtitle">{formatWeekRangeFull(weekDates)}</p>
        </div>

        <div className="weekly-toolbar-divider" aria-hidden="true" />

        <div className="weekly-toolbar-nav">
          <button type="button" className="weekly-today-btn" onClick={onToday} disabled={isCurrentWeek}>
            Hoy
          </button>
          <div className="weekly-pager">
            <button type="button" onClick={onPrevWeek} aria-label="Semana anterior">
              <ChevronLeftIcon />
            </button>
            <button type="button" onClick={onNextWeek} aria-label="Semana siguiente">
              <ChevronRightIcon />
            </button>
          </div>
          <span className="weekly-range-label">
            {formatWeekRangeShort(weekDates)}
          </span>
        </div>
      </div>

      <div className="weekly-toolbar-controls">
        <div className="weekly-view-tabs" role="tablist" aria-label="Vista de la agenda">
          <button type="button" role="tab" aria-disabled="true" title="Vista de día — próximamente">
            Día
          </button>
          <button type="button" role="tab" aria-selected="true" className="active">
            Semana
          </button>
          <button type="button" role="tab" aria-disabled="true" title="Vista de mes — próximamente">
            Mes
          </button>
        </div>

        <div className="weekly-toolbar-divider" aria-hidden="true" />

        <div className="weekly-filters">
          <label className="weekly-filter-select">
            <FilterIcon />
            <select
              value={estadoFiltro}
              onChange={(event) => onEstadoFiltroChange(event.target.value as EstadoFiltro)}
              aria-label="Filtrar citas por estado"
            >
              <option value="todas">Todas las citas</option>
              <option value="confirmada">Confirmadas</option>
              <option value="pendiente">Pendientes</option>
            </select>
            <ChevronDownIcon />
          </label>

          <label className="weekly-filter-select">
            <VideoIcon />
            <select
              value={modalidadFiltro}
              onChange={(event) => onModalidadFiltroChange(event.target.value as ModalidadFiltro)}
              aria-label="Filtrar citas por modalidad"
            >
              <option value="todas">Presencial + Online</option>
              <option value="presencial">Solo presencial</option>
              <option value="online">Solo online</option>
            </select>
          </label>
        </div>

        <Link href="/dashboard/disponibilidad" className="weekly-block-btn">
          <LockClockIcon />
          <span>Bloquear horario</span>
        </Link>
      </div>
    </div>
  )
}
