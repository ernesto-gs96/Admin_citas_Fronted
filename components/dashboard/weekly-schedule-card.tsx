'use client'

// components/dashboard/weekly-schedule-card.tsx
// COLUMNA IZQUIERDA: Horario Semanal Regular.

import { useMemo } from 'react'
import { timeToMinutes } from '@/lib/dashboard/week-utils'
import type { DiaHorario, Franja, ModalidadFranja } from '@/lib/mock/disponibilidad'
import { ApartmentIcon, CopyIcon } from './servicios-icons'
import { VideoIcon } from './weekly-agenda-icons'
import { PlusIcon } from './dashboard-icons'
import { CheckIcon, DiversityIcon, InfoIcon, MoreVertIcon, RestaurantIcon } from './disponibilidad-icons'

interface WeeklyScheduleCardProps {
  dias: DiaHorario[]
  onToggleDia: (dayIndex: number) => void
  onAddFranja: (dayIndex: number) => void
  onRemoveFranja: (dayIndex: number, franjaId: string) => void
  onUpdateFranja: (dayIndex: number, franjaId: string, patch: Partial<Franja>) => void
  onAplicarATodos: () => void
  onDescartar: () => void
  onGuardar: () => void
}

const ESTADO_LABEL: Record<DiaHorario['estado'], string> = {
  laborable: 'LABORABLE',
  media_jornada: 'MEDIA JORNADA',
  cerrado: 'CERRADO',
}

function ModalidadIcon({ modalidad }: { modalidad: ModalidadFranja }) {
  if (modalidad === 'presencial') return <ApartmentIcon />
  if (modalidad === 'online') return <VideoIcon />
  return <DiversityIcon />
}

function duracionHoras(inicio: string, fin: string) {
  const minutos = timeToMinutes(fin) - timeToMinutes(inicio)
  if (minutos <= 0) return '0h'
  const horas = minutos / 60
  return Number.isInteger(horas) ? `${horas}h` : `${horas.toFixed(1)}h`
}

export function WeeklyScheduleCard({
  dias,
  onToggleDia,
  onAddFranja,
  onRemoveFranja,
  onUpdateFranja,
  onAplicarATodos,
  onDescartar,
  onGuardar,
}: WeeklyScheduleCardProps) {
  const totalHoras = useMemo(() => {
    let minutos = 0
    dias.forEach((dia) => {
      if (!dia.activo) return
      dia.franjas.forEach((f) => {
        minutos += Math.max(timeToMinutes(f.fin) - timeToMinutes(f.inicio), 0)
      })
    })
    return minutos / 60
  }, [dias])

  return (
    <div className="disp-card">
      <div className="disp-card-head">
        <div>
          <h2>Horario Habitual Semanal</h2>
          <p>Establece los días y franjas de consulta activas de tu semana tipo</p>
        </div>
        <button type="button" className="disp-link-btn" onClick={onAplicarATodos}>
          <CopyIcon />
          <span>Aplicar a todos los laborables</span>
        </button>
      </div>

      <div className="disp-notice">
        <span className="disp-notice-text">
          <span className="disp-notice-icon">
            <InfoIcon />
          </span>
          Los pacientes solo verán los huecos dentro de estos rangos. Tu pausa de almuerzo está protegida.
        </span>
        <span className="disp-notice-action">Configurar buffer</span>
      </div>

      <div className="disp-days">
        {dias.map((dia) => (
          <div key={dia.dayIndex} className={`disp-day${!dia.activo ? ' is-inactive' : ''}`}>
            <div className="disp-day-head">
              <div className="disp-day-head-left">
                <label className="disp-switch">
                  <input type="checkbox" checked={dia.activo} onChange={() => onToggleDia(dia.dayIndex)} />
                  <span className="disp-switch-track" />
                </label>
                <span className="disp-day-name">{dia.nombre}</span>
                <span className={`disp-day-badge estado-${dia.estado}`}>{ESTADO_LABEL[dia.estado]}</span>
              </div>

              {dia.activo ? (
                <div className="disp-day-head-actions">
                  <button type="button" className="disp-add-franja" onClick={() => onAddFranja(dia.dayIndex)}>
                    <PlusIcon />
                    <span>Franja</span>
                  </button>
                  <button type="button" className="disp-icon-btn" title="Más opciones">
                    <MoreVertIcon />
                  </button>
                </div>
              ) : (
                <div className="disp-day-head-actions">
                  <span className="disp-day-empty">No hay franjas de consulta programadas</span>
                  <button type="button" className="disp-activate-btn" onClick={() => onToggleDia(dia.dayIndex)}>
                    + Activar día
                  </button>
                </div>
              )}
            </div>

            {dia.activo && (
              <div className="disp-franjas">
                {dia.franjas.map((franja) => (
                  <div key={franja.id} className="disp-franja">
                    <span className={`disp-franja-bar modalidad-${franja.modalidad}`} />
                    <div className="disp-franja-time">
                      <input
                        type="time"
                        value={franja.inicio}
                        onChange={(event) => onUpdateFranja(dia.dayIndex, franja.id, { inicio: event.target.value })}
                      />
                      <span>a</span>
                      <input
                        type="time"
                        value={franja.fin}
                        onChange={(event) => onUpdateFranja(dia.dayIndex, franja.id, { fin: event.target.value })}
                      />
                    </div>
                    <span className="disp-franja-label-text">Modalidad:</span>
                    <div className="disp-franja-modalidad">
                      <select
                        value={franja.modalidad}
                        onChange={(event) => onUpdateFranja(dia.dayIndex, franja.id, { modalidad: event.target.value as ModalidadFranja })}
                      >
                        <option value="presencial">Presencial</option>
                        <option value="online">Online</option>
                        <option value="mixto">Mixto</option>
                      </select>
                      <ModalidadIcon modalidad={franja.modalidad} />
                      <input
                        type="text"
                        className="disp-franja-label-input"
                        value={franja.label}
                        onChange={(event) => onUpdateFranja(dia.dayIndex, franja.id, { label: event.target.value })}
                      />
                    </div>
                    <span className="disp-franja-duration">• {duracionHoras(franja.inicio, franja.fin)}</span>
                    <button type="button" className="disp-franja-remove" title="Eliminar franja" onClick={() => onRemoveFranja(dia.dayIndex, franja.id)}>
                      ×
                    </button>
                  </div>
                ))}

                {dia.descanso && (
                  <div className="disp-descanso">
                    <RestaurantIcon />
                    <span>
                      {dia.descanso.inicio} - {dia.descanso.fin} · {dia.descanso.nota}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="disp-footer">
        <span className="disp-footer-total">
          Total programado: <strong>{totalHoras % 1 === 0 ? totalHoras : totalHoras.toFixed(1)} horas de consulta semanales</strong>
        </span>
        <div className="disp-footer-actions">
          <button type="button" className="servicios-btn servicios-btn-ghost" onClick={onDescartar}>
            Descartar cambios
          </button>
          <button type="button" className="servicios-btn servicios-btn-primary" onClick={onGuardar}>
            <CheckIcon />
            <span>Guardar cambios</span>
          </button>
        </div>
      </div>
    </div>
  )
}
