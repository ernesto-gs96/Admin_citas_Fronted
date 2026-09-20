'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from './dashboard-icons'

const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

// MOCK: días del mes con al menos una cita — reemplazar con datos reales de la agenda.
const DAYS_WITH_APPOINTMENTS = new Set([1, 3, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 20, 21, 22, 23, 27, 28, 29, 30])

interface Cell {
  day: number
  inMonth: boolean
}

function buildMonthGrid(year: number, month: number): Cell[] {
  const firstDay = new Date(year, month, 1)
  const startOffset = (firstDay.getDay() + 6) % 7 // Monday-first index
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells: Cell[] = []
  for (let i = startOffset - 1; i >= 0; i--) cells.push({ day: daysInPrevMonth - i, inMonth: false })
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, inMonth: true })

  const remainder = cells.length % 7
  const trailing = remainder === 0 ? 0 : 7 - remainder
  for (let d = 1; d <= trailing; d++) cells.push({ day: d, inMonth: false })

  return cells
}

export function MiniCalendar({ appointmentsToday }: { appointmentsToday: number }) {
  const today = useMemo(() => new Date(), [])
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const cells = useMemo(() => buildMonthGrid(cursor.year, cursor.month), [cursor])
  const isCurrentMonth = cursor.year === today.getFullYear() && cursor.month === today.getMonth()

  function goTo(delta: number) {
    setCursor((prev) => {
      const date = new Date(prev.year, prev.month + delta, 1)
      return { year: date.getFullYear(), month: date.getMonth() }
    })
  }

  return (
    <div className="mini-calendar">
      <div className="mini-calendar-header">
        <h2>{MONTH_NAMES[cursor.month]} {cursor.year}</h2>
        <div className="mini-calendar-nav">
          <button type="button" onClick={() => goTo(-1)} aria-label="Mes anterior">
            <ChevronLeftIcon />
          </button>
          <button type="button" onClick={() => goTo(1)} aria-label="Mes siguiente">
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className="mini-calendar-weekdays" aria-hidden="true">
        {WEEKDAYS.map((day) => <span key={day}>{day}</span>)}
      </div>

      <div className="mini-calendar-grid">
        {cells.map((cell, index) => {
          const isToday = isCurrentMonth && cell.inMonth && cell.day === today.getDate()
          const hasAppointments = cell.inMonth && DAYS_WITH_APPOINTMENTS.has(cell.day)
          return (
            <span
              key={index}
              className={`mini-calendar-day ${!cell.inMonth ? 'mini-calendar-day-muted' : ''} ${isToday ? 'mini-calendar-day-today' : ''}`}
            >
              {cell.day}
              {hasAppointments && !isToday && <i className="mini-calendar-dot" aria-hidden="true" />}
            </span>
          )
        })}
      </div>

      <div className="mini-calendar-footer">
        <span>{appointmentsToday} {appointmentsToday === 1 ? 'cita hoy' : 'citas hoy'}</span>
        <Link href="/dashboard/citas" className="text-link">Ver agenda completa</Link>
      </div>
    </div>
  )
}
