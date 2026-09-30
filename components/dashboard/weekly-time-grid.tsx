'use client'

// components/dashboard/weekly-time-grid.tsx
// WEEKLY TIME-GRID (Interactive Clinical Timetable) de /dashboard/citas.

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  AGENDA_CLOSE_LABEL,
  AGENDA_LAST_ROW_HOUR,
  AGENDA_LUNCH_LABEL,
  AGENDA_START_HOUR,
  type CitaSemanal,
} from '@/lib/mock/weekly-agenda'
import { formatHourLabel, isSameDay, timeToMinutes, WEEKDAY_SHORT_ES } from '@/lib/dashboard/week-utils'
import { CloseIcon, LocationClinicIcon, NotesIcon, PersonSmallIcon } from './weekly-agenda-icons'
import { PlusIcon } from './dashboard-icons'

type GridRow =
  | { kind: 'hour'; hour: number }
  | { kind: 'lunch' }
  | { kind: 'closing' }

const GRID_ROWS: GridRow[] = [
  { kind: 'hour', hour: 8 },
  { kind: 'hour', hour: 9 },
  { kind: 'hour', hour: 10 },
  { kind: 'hour', hour: 11 },
  { kind: 'hour', hour: 12 },
  { kind: 'lunch' },
  { kind: 'hour', hour: 14 },
  { kind: 'hour', hour: 15 },
  { kind: 'hour', hour: 16 },
  { kind: 'hour', hour: 17 },
  { kind: 'closing' },
]

interface WeeklyTimeGridProps {
  weekDates: Date[]
  appointments: CitaSemanal[]
  isCurrentWeek: boolean
}

export function WeeklyTimeGrid({ weekDates, appointments, isCurrentWeek }: WeeklyTimeGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [now, setNow] = useState<Date | null>(null)

  // Evita desajustes de hidratación: la hora real solo se calcula en el cliente.
  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(interval)
  }, [])

  const todayIndex = useMemo(() => {
    if (!isCurrentWeek || !now) return -1
    return weekDates.findIndex((date) => isSameDay(date, now))
  }, [isCurrentWeek, now, weekDates])

  const appointmentsByDay = useMemo(() => {
    const map = new Map<number, CitaSemanal[]>()
    appointments.forEach((cita) => {
      const list = map.get(cita.dayIndex) ?? []
      list.push(cita)
      map.set(cita.dayIndex, list)
    })
    return map
  }, [appointments])

  const selectedCita = appointments.find((cita) => cita.id === selectedId) ?? null

  const nowMinutes = now ? now.getHours() * 60 + now.getMinutes() : -1
  const showNowLine =
    todayIndex >= 0 &&
    nowMinutes >= AGENDA_START_HOUR * 60 &&
    nowMinutes < (AGENDA_LAST_ROW_HOUR + 1) * 60

  return (
    <div className="weekly-grid-wrap">
      <div className="weekly-grid">
        {/* Cabecera de días, sticky */}
        <div className="weekly-grid-header">
          <div className="weekly-grid-corner">
            <span>GMT-6</span>
            <span>08 - 18h</span>
          </div>
          {weekDates.map((date, dayIndex) => {
            const isToday = dayIndex === todayIndex
            const isWeekend = dayIndex >= 5
            const count = appointmentsByDay.get(dayIndex)?.length ?? 0
            return (
              <div
                key={dayIndex}
                className={`weekly-day-header${isToday ? ' is-today' : ''}${isWeekend ? ' is-weekend' : ''}`}
              >
                <span className="weekly-day-name">{WEEKDAY_SHORT_ES[dayIndex]}</span>
                {isToday ? (
                  <span className="weekly-day-badge">{date.getDate()}</span>
                ) : (
                  <span className="weekly-day-number">{date.getDate()}</span>
                )}
                <span className="weekly-day-count">
                  {count === 0 ? (isWeekend && dayIndex === 6 ? 'Libre' : 'Sin citas') : `${count} cita${count === 1 ? '' : 's'}${isToday ? ' hoy' : ''}`}
                </span>
              </div>
            )
          })}
        </div>

        {/* Cuerpo del grid */}
        <div className="weekly-grid-body">
          {GRID_ROWS.map((row, rowIndex) => {
            if (row.kind === 'lunch') {
              return (
                <div className="weekly-row-banner" key={`lunch-${rowIndex}`}>
                  <span className="weekly-row-banner-icon" aria-hidden="true">
                    🍽️
                  </span>
                  {AGENDA_LUNCH_LABEL}
                </div>
              )
            }
            if (row.kind === 'closing') {
              return (
                <div className="weekly-row-closing" key={`closing-${rowIndex}`}>
                  <div className="weekly-time-label">18:00</div>
                  <div className="weekly-row-closing-banner">{AGENDA_CLOSE_LABEL}</div>
                </div>
              )
            }

            const hour = row.hour

            return (
              <div className="weekly-row" key={hour}>
                <div className="weekly-time-label">{formatHourLabel(hour)}</div>
                {weekDates.map((_, dayIndex) => {
                  const isToday = dayIndex === todayIndex
                  const isWeekend = dayIndex >= 5
                  const citasEnHora = (appointmentsByDay.get(dayIndex) ?? []).filter((cita) => {
                    const startHour = Math.floor(timeToMinutes(cita.startTime) / 60)
                    return startHour === hour
                  })

                  return (
                    <div
                      key={dayIndex}
                      className={`weekly-cell${isToday ? ' is-today' : ''}${isWeekend ? ' is-weekend' : ''}`}
                    >
                      {citasEnHora.length === 0 && !isWeekend && (
                        <Link
                          href={`/dashboard/citas/nueva?dia=${dayIndex}&hora=${formatHourLabel(hour)}`}
                          className="weekly-cell-add"
                          aria-label={`Añadir cita a las ${formatHourLabel(hour)}`}
                        >
                          <PlusIcon />
                        </Link>
                      )}

                      {citasEnHora.map((cita) => {
                        const startMinutes = timeToMinutes(cita.startTime)
                        const endMinutes = timeToMinutes(cita.endTime)
                        const topPct = ((startMinutes - hour * 60) / 60) * 100
                        const rawHeightPct = ((endMinutes - startMinutes) / 60) * 100
                        // Se limita para que la tarjeta nunca sobrepase el borde inferior de
                        // su celda (evitaría que la fila siguiente la tape visualmente).
                        const heightPct = Math.max(Math.min(rawHeightPct, 100 - topPct), 30)
                        const isConfirmed = cita.status === 'confirmada'

                        return (
                          <button
                            type="button"
                            key={cita.id}
                            className={`weekly-appt${isConfirmed ? ' is-confirmed' : ''}`}
                            style={{ top: `${topPct}%`, height: `${heightPct}%` }}
                            onClick={() => setSelectedId(cita.id)}
                          >
                            <div className="weekly-appt-top">
                              <span className="weekly-appt-time">
                                {cita.startTime} - {cita.endTime}
                              </span>
                              {cita.status && (
                                <span className={`weekly-appt-status weekly-appt-status-${cita.status}`}>
                                  {cita.status === 'confirmada' ? 'Confirmada' : 'Pendiente'}
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="weekly-appt-name">{cita.patientName}</p>
                              <p className="weekly-appt-reason">{cita.reason}</p>
                            </div>
                          </button>
                        )
                      })}

                      {isToday && showNowLine && nowMinutes >= hour * 60 && nowMinutes < (hour + 1) * 60 && (
                        <div
                          className="weekly-now-line"
                          style={{ top: `${((nowMinutes - hour * 60) / 60) * 100}%` }}
                        >
                          <span className="weekly-now-dot" />
                          <span className="weekly-now-label">
                            {now?.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick-view: detalle de la cita seleccionada */}
      {selectedCita && (
        <aside className="weekly-quickview" role="dialog" aria-label={`Detalle de cita con ${selectedCita.patientName}`}>
          <div className="weekly-quickview-header">
            <div className="weekly-quickview-identity">
              <span className="weekly-quickview-avatar">
                {selectedCita.patientName
                  .split(' ')
                  .slice(0, 2)
                  .map((part) => part[0]?.toUpperCase())
                  .join('')}
              </span>
              <div>
                <div className="weekly-quickview-name-row">
                  <h4>{selectedCita.patientName}</h4>
                  {selectedCita.status && (
                    <span className={`weekly-appt-status weekly-appt-status-${selectedCita.status}`}>
                      {selectedCita.status === 'confirmada' ? 'Confirmada' : 'Pendiente'}
                    </span>
                  )}
                </div>
                <p className="weekly-quickview-id">ID Paciente #{selectedCita.patientId}</p>
              </div>
            </div>
            <button type="button" className="weekly-quickview-close" onClick={() => setSelectedId(null)} aria-label="Cerrar detalle">
              <CloseIcon />
            </button>
          </div>

          <div className="weekly-quickview-grid">
            <div className="weekly-quickview-cell">
              <span>Horario</span>
              <strong>
                {selectedCita.startTime} - {selectedCita.endTime}
              </strong>
            </div>
            <div className="weekly-quickview-cell">
              <span>Modalidad</span>
              <strong className="weekly-quickview-modality">
                {selectedCita.modality === 'presencial' ? <LocationClinicIcon /> : <PersonSmallIcon />}
                {selectedCita.modality === 'presencial' ? 'Presencial' : 'Consulta online'}
              </strong>
            </div>
            <div className="weekly-quickview-cell weekly-quickview-cell-wide">
              <span>Motivo</span>
              <strong>{selectedCita.reason}</strong>
            </div>
          </div>

          <div className="weekly-quickview-actions">
            <Link href={`/dashboard/pacientes/${selectedCita.patientId}`} className="light-button weekly-quickview-btn">
              <NotesIcon />
              <span>Historial</span>
            </Link>
            <Link href={`/dashboard/citas/${selectedCita.id}/consulta`} className="submit-button weekly-quickview-btn">
              Iniciar Consulta
            </Link>
          </div>
        </aside>
      )}
    </div>
  )
}
