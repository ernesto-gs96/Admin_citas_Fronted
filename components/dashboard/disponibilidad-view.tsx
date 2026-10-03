'use client'

// components/dashboard/disponibilidad-view.tsx
// Orquesta el estado de /dashboard/disponibilidad y compone el layout de 2 columnas.

import { useState } from 'react'
import {
  bloqueosIniciales,
  horarioInicial,
  reglasIniciales,
  type Bloqueo,
  type DiaHorario,
  type Franja,
  type ReglasReserva,
} from '@/lib/mock/disponibilidad'
import { DisponibilidadHeader } from './disponibilidad-header'
import { WeeklyScheduleCard } from './weekly-schedule-card'
import { BlockedDaysCard } from './blocked-days-card'
import { BookingRulesCard } from './booking-rules-card'

export function DisponibilidadView() {
  const [dias, setDias] = useState<DiaHorario[]>(horarioInicial)
  const [bloqueos, setBloqueos] = useState<Bloqueo[]>(bloqueosIniciales)
  const [reglas, setReglas] = useState<ReglasReserva>(reglasIniciales)

  function toggleDia(dayIndex: number) {
    setDias((prev) =>
      prev.map((dia) =>
        dia.dayIndex === dayIndex
          ? { ...dia, activo: !dia.activo, estado: !dia.activo ? 'laborable' : 'cerrado' }
          : dia,
      ),
    )
  }

  function addFranja(dayIndex: number) {
    setDias((prev) =>
      prev.map((dia) => {
        if (dia.dayIndex !== dayIndex) return dia
        const nuevaFranja: Franja = {
          id: `f-${Date.now()}`,
          inicio: '09:00',
          fin: '13:00',
          modalidad: 'presencial',
          label: 'Presencial (Box 2)',
        }
        return { ...dia, franjas: [...dia.franjas, nuevaFranja] }
      }),
    )
  }

  function removeFranja(dayIndex: number, franjaId: string) {
    setDias((prev) =>
      prev.map((dia) => (dia.dayIndex === dayIndex ? { ...dia, franjas: dia.franjas.filter((f) => f.id !== franjaId) } : dia)),
    )
  }

  function updateFranja(dayIndex: number, franjaId: string, patch: Partial<Franja>) {
    setDias((prev) =>
      prev.map((dia) =>
        dia.dayIndex === dayIndex
          ? { ...dia, franjas: dia.franjas.map((f) => (f.id === franjaId ? { ...f, ...patch } : f)) }
          : dia,
      ),
    )
  }

  // Copia las franjas del lunes al resto de días marcados como laborables (lunes a viernes).
  function aplicarATodosLosLaborables() {
    const lunes = dias.find((d) => d.dayIndex === 0)
    if (!lunes) return
    setDias((prev) =>
      prev.map((dia) => {
        if (dia.dayIndex === 0 || dia.dayIndex >= 5 || !dia.activo) return dia
        return {
          ...dia,
          franjas: lunes.franjas.map((f, index) => ({ ...f, id: `${dia.dayIndex}-${index}-${Date.now()}` })),
          descanso: lunes.descanso,
        }
      }),
    )
  }

  function handleAddBloqueo(bloqueo: Omit<Bloqueo, 'id'>) {
    setBloqueos((prev) => [{ ...bloqueo, id: `bloqueo-${Date.now()}` }, ...prev])
  }

  function handleDeleteBloqueo(id: string) {
    setBloqueos((prev) => prev.filter((b) => b.id !== id))
  }

  function handleReglasChange(patch: Partial<ReglasReserva>) {
    setReglas((prev) => ({ ...prev, ...patch }))
  }

  return (
    <div className="disponibilidad-canvas">
      <DisponibilidadHeader />

      <div className="disponibilidad-workspace">
        <div className="disponibilidad-col-left">
          <WeeklyScheduleCard
            dias={dias}
            onToggleDia={toggleDia}
            onAddFranja={addFranja}
            onRemoveFranja={removeFranja}
            onUpdateFranja={updateFranja}
            onAplicarATodos={aplicarATodosLosLaborables}
            onDescartar={() => setDias(horarioInicial)}
            onGuardar={() => {
              /* Punto de integración: enviar `dias` al backend. */
            }}
          />
        </div>

        <div className="disponibilidad-col-right">
          <BlockedDaysCard bloqueos={bloqueos} onAdd={handleAddBloqueo} onDelete={handleDeleteBloqueo} />
          <BookingRulesCard reglas={reglas} onChange={handleReglasChange} />
        </div>
      </div>
    </div>
  )
}
