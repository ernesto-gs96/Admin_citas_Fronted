'use client'

// components/dashboard/weekly-agenda-view.tsx
// Contenedor de la Agenda Semanal: mantiene el estado de semana/filtros
// y compone el sub-header (WeeklyAgendaToolbar) con el grid (WeeklyTimeGrid).

import { useMemo, useState } from 'react'
import { getWeekDates } from '@/lib/dashboard/week-utils'
import { weeklyAppointments, type EstadoFiltro, type ModalidadFiltro } from '@/lib/mock/weekly-agenda'
import { WeeklyAgendaToolbar } from './weekly-agenda-toolbar'
import { WeeklyTimeGrid } from './weekly-time-grid'

export function WeeklyAgendaView() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [estadoFiltro, setEstadoFiltro] = useState<EstadoFiltro>('todas')
  const [modalidadFiltro, setModalidadFiltro] = useState<ModalidadFiltro>('todas')

  const isCurrentWeek = weekOffset === 0
  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset])

  // Los datos de ejemplo representan la semana actual. Al navegar a otra
  // semana se muestra el grid vacío hasta conectar la fuente real de citas.
  const appointmentsThisWeek = useMemo(() => {
    if (!isCurrentWeek) return []
    return weeklyAppointments.filter((cita) => {
      const matchesEstado = estadoFiltro === 'todas' || cita.status === estadoFiltro
      const matchesModalidad = modalidadFiltro === 'todas' || cita.modality === modalidadFiltro
      return matchesEstado && matchesModalidad
    })
  }, [isCurrentWeek, estadoFiltro, modalidadFiltro])

  return (
    <div className="weekly-agenda">
      <WeeklyAgendaToolbar
        weekDates={weekDates}
        isCurrentWeek={isCurrentWeek}
        totalCitas={appointmentsThisWeek.length}
        onPrevWeek={() => setWeekOffset((value) => value - 1)}
        onNextWeek={() => setWeekOffset((value) => value + 1)}
        onToday={() => setWeekOffset(0)}
        estadoFiltro={estadoFiltro}
        onEstadoFiltroChange={setEstadoFiltro}
        modalidadFiltro={modalidadFiltro}
        onModalidadFiltroChange={setModalidadFiltro}
      />
      <WeeklyTimeGrid weekDates={weekDates} appointments={appointmentsThisWeek} isCurrentWeek={isCurrentWeek} />
    </div>
  )
}
