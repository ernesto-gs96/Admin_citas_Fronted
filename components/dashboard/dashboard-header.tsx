'use client'

import { useState } from 'react'
import { SlidersIcon } from './dashboard-icons'

const RANGE_OPTIONS = ['Hoy', 'Mañana', 'Esta semana'] as const
type Range = (typeof RANGE_OPTIONS)[number]

export function DashboardHeader({
  totalToday,
  nextTime,
}: {
  totalToday: number
  nextTime?: string
}) {
  const [range, setRange] = useState<Range>('Hoy')

  const today = new Date()
  const dayLabel = today.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })
  const capitalizedDay = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1)

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-top">
        <div>
          <p className="section-label">RESUMEN</p>
          <h1>Buenos días</h1>
          <p className="dashboard-subtitle">
            {capitalizedDay} · {totalToday} {totalToday === 1 ? 'cita programada' : 'citas programadas'}
            {nextTime ? ` · Tu primera cita comienza a las ${nextTime}` : ''}
          </p>
        </div>

        <div className="dashboard-header-controls">
          <div className="dashboard-range-tabs" role="tablist" aria-label="Rango de fechas">
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={range === option}
                className={`dashboard-range-tab ${range === option ? 'active' : ''}`}
                onClick={() => setRange(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button type="button" className="dashboard-icon-button" aria-label="Más filtros">
            <SlidersIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
