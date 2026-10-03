'use client'

// components/dashboard/blocked-days-card.tsx
// COLUMNA DERECHA (bloque 1): Añadir bloqueo + Días Bloqueados Registrados.

import { useState, type FormEvent } from 'react'
import { MOTIVOS_BLOQUEO, motivoAEtiqueta, type Bloqueo } from '@/lib/mock/disponibilidad'
import { CalendarAddIcon, EventBusyIcon, LockIcon, TrashIcon } from './disponibilidad-icons'
import { PencilIcon } from './servicios-icons'

interface BlockedDaysCardProps {
  bloqueos: Bloqueo[]
  onAdd: (bloqueo: Omit<Bloqueo, 'id'>) => void
  onDelete: (id: string) => void
}

function formatDiaMes(iso: string) {
  const date = new Date(`${iso}T00:00:00`)
  return {
    dia: date.toLocaleDateString('es-MX', { day: '2-digit' }),
    mes: date.toLocaleDateString('es-MX', { month: 'short' }).replace('.', ''),
  }
}

export function BlockedDaysCard({ bloqueos, onAdd, onDelete }: BlockedDaysCardProps) {
  const [motivo, setMotivo] = useState(MOTIVOS_BLOQUEO[0])
  const [titulo, setTitulo] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [repiteAnual, setRepiteAnual] = useState(false)
  const [avisarCitas, setAvisarCitas] = useState(true)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!fechaInicio || !fechaFin) return

    const { etiqueta, tint } = motivoAEtiqueta(motivo)
    const inicio = new Date(`${fechaInicio}T00:00:00`)
    const fin = new Date(`${fechaFin}T00:00:00`)
    const dias = Math.max(Math.round((fin.getTime() - inicio.getTime()) / 86_400_000) + 1, 1)
    const resumen = `${inicio.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })} - ${fin.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })} · ${dias} día${dias === 1 ? '' : 's'}`

    onAdd({
      titulo: titulo.trim() || motivo,
      etiqueta,
      etiquetaTint: tint,
      fechaInicio,
      fechaFin,
      resumen,
      nota: avisarCitas ? 'Aviso automático activado para pacientes con citas previas' : undefined,
      notaTint: avisarCitas ? 'amber' : undefined,
    })

    setTitulo('')
    setFechaInicio('')
    setFechaFin('')
    setRepiteAnual(false)
    setAvisarCitas(true)
  }

  return (
    <div className="disp-card disp-card-compact">
      <div className="disp-block-head">
        <span className="disp-block-head-icon">
          <CalendarAddIcon />
        </span>
        <h2>Añadir Bloqueo o Día No Disponible</h2>
      </div>
      <p className="disp-block-desc">Registra rápidamente periodos en los que no atenderás consulta para bloquear citas automáticamente.</p>

      <form className="disp-block-form" onSubmit={handleSubmit}>
        <div className="disp-field-row">
          <div className="disp-field">
            <label htmlFor="bloqueo-motivo">Motivo / Tipo</label>
            <select id="bloqueo-motivo" value={motivo} onChange={(event) => setMotivo(event.target.value)}>
              {MOTIVOS_BLOQUEO.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="disp-field">
            <label htmlFor="bloqueo-titulo">Título del evento</label>
            <input id="bloqueo-titulo" type="text" placeholder="Ej. Taller Pediatría" value={titulo} onChange={(event) => setTitulo(event.target.value)} />
          </div>
        </div>

        <div className="disp-field-row">
          <div className="disp-field">
            <label htmlFor="bloqueo-inicio">Fecha inicio</label>
            <input id="bloqueo-inicio" type="date" value={fechaInicio} onChange={(event) => setFechaInicio(event.target.value)} required />
          </div>
          <div className="disp-field">
            <label htmlFor="bloqueo-fin">Fecha fin</label>
            <input id="bloqueo-fin" type="date" value={fechaFin} onChange={(event) => setFechaFin(event.target.value)} required />
          </div>
        </div>

        <div className="disp-checks">
          <label>
            <input type="checkbox" checked={repiteAnual} onChange={(event) => setRepiteAnual(event.target.checked)} />
            <span>Repetir anualmente en estas fechas</span>
          </label>
          <label>
            <input type="checkbox" checked={avisarCitas} onChange={(event) => setAvisarCitas(event.target.checked)} />
            <span>Avisar automáticamente por WhatsApp/Email si hay citas previas</span>
          </label>
        </div>

        <button type="submit" className="disp-confirm-btn">
          <LockIcon />
          <span>Confirmar y bloquear fechas</span>
        </button>
      </form>

      <div className="disp-blocked-list">
        <div className="disp-blocked-list-head">
          <div className="disp-block-head">
            <span className="disp-block-head-icon is-danger">
              <EventBusyIcon />
            </span>
            <h3>Días Bloqueados Registrados</h3>
          </div>
          <span className="disp-blocked-count">{bloqueos.length} Activos</span>
        </div>

        <div className="disp-blocked-items">
          {bloqueos.length === 0 && <p className="disp-blocked-empty">No tienes bloqueos registrados.</p>}
          {bloqueos.map((bloqueo) => {
            const { dia, mes } = formatDiaMes(bloqueo.fechaInicio)
            return (
              <div key={bloqueo.id} className="disp-blocked-item">
                <div className="disp-blocked-item-main">
                  <div className={`disp-blocked-date tint-${bloqueo.etiquetaTint}`}>
                    <span>{dia}</span>
                    <span>{mes}</span>
                  </div>
                  <div className="disp-blocked-info">
                    <div className="disp-blocked-title-row">
                      <span>{bloqueo.titulo}</span>
                      <span className={`disp-blocked-tag tint-${bloqueo.etiquetaTint}`}>{bloqueo.etiqueta}</span>
                    </div>
                    <span className="disp-blocked-range">{bloqueo.resumen}</span>
                    {bloqueo.nota && <span className={`disp-blocked-note tint-${bloqueo.notaTint ?? 'neutral'}`}>{bloqueo.nota}</span>}
                  </div>
                </div>
                <div className="disp-blocked-actions">
                  <button type="button" title="Editar bloqueo">
                    <PencilIcon />
                  </button>
                  <button type="button" title="Eliminar" onClick={() => onDelete(bloqueo.id)}>
                    <TrashIcon />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
