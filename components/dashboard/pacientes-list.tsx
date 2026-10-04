'use client'

// components/dashboard/pacientes-list.tsx

import type { Paciente } from '@/lib/mock/pacientes'
import { ChevronLeftIcon, ChevronRightIcon } from './weekly-agenda-icons'

interface PacientesListProps {
  pacientes: Paciente[]
  selectedId: string | null
  onSelect: (id: string) => void
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  rangoLabel: string
  total: number
}

function paginaDeBotones(page: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, page, page - 1, page + 1])
  return Array.from(pages)
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b)
}

export function PacientesList({ pacientes, selectedId, onSelect, page, totalPages, onPageChange, rangoLabel, total }: PacientesListProps) {
  const botones = paginaDeBotones(page, totalPages)

  return (
    <div className="pacientes-list-col">
      <div className="pacientes-table-head">
        <span>Paciente</span>
        <span>Próxima Cita</span>
        <span>Condición</span>
      </div>

      <div className="pacientes-rows">
        {pacientes.length === 0 && <div className="pacientes-empty">Ningún paciente coincide con los filtros aplicados.</div>}
        {pacientes.map((paciente) => {
          const isSelected = paciente.id === selectedId
          return (
            <div
              key={paciente.id}
              className={`pacientes-row${isSelected ? ' is-selected' : ''}`}
              onClick={() => onSelect(paciente.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter') onSelect(paciente.id)
              }}
            >
              <div className="pacientes-row-main">
                <span className={`pacientes-avatar tint-${paciente.tintAvatar}`}>{paciente.iniciales}</span>
                <span className="pacientes-row-name">{paciente.nombre}</span>
                <span className="pacientes-row-id">#{paciente.expediente}</span>
              </div>
              <div className="pacientes-row-cita">
                {paciente.proximaCita ? (
                  <span className="pacientes-cita-badge">
                    <span className="pacientes-cita-dot" />
                    {paciente.proximaCita.label}
                  </span>
                ) : (
                  <span className="pacientes-cita-empty">Sin cita previa</span>
                )}
              </div>
              <div className="pacientes-row-condicion">
                <span className={`pacientes-condicion-badge tint-${paciente.condicionTint}`}>{paciente.condicion}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="pacientes-pagination">
        <span>
          Mostrando <strong>{rangoLabel}</strong> de <strong>{total}</strong> expedientes
        </span>
        <div className="pacientes-pagination-controls">
          <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Página anterior">
            <ChevronLeftIcon />
          </button>
          {botones.map((p, index) => (
            <span key={p} style={{ display: 'contents' }}>
              {index > 0 && p - botones[index - 1] > 1 && <span className="pacientes-pagination-ellipsis">…</span>}
              <button type="button" className={p === page ? 'active' : ''} onClick={() => onPageChange(p)}>
                {p}
              </button>
            </span>
          ))}
          <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} aria-label="Página siguiente">
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
