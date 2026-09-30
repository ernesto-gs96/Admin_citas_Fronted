// lib/dashboard/week-utils.ts
// Utilidades de fecha para la Agenda Semanal (/dashboard/citas).
// Sin dependencias externas: solo Date nativo.

export const WEEKDAY_SHORT_ES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** Devuelve el lunes (00:00) de la semana a la que pertenece `date`. */
export function getMonday(date: Date) {
  const result = new Date(date)
  const day = result.getDay() // 0 = domingo ... 6 = sábado
  const diff = (day === 0 ? -6 : 1) - day
  result.setDate(result.getDate() + diff)
  result.setHours(0, 0, 0, 0)
  return result
}

/** Devuelve los 7 días (lunes a domingo) de la semana desplazada `offsetWeeks` respecto a hoy. */
export function getWeekDates(offsetWeeks: number, base: Date = new Date()): Date[] {
  const monday = getMonday(base)
  monday.setDate(monday.getDate() + offsetWeeks * 7)
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(monday)
    day.setDate(monday.getDate() + index)
    return day
  })
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/** "21 - 27 Octubre" o "29 Sep - 5 Oct" si cruza de mes. */
export function formatWeekRangeShort(weekDates: Date[]) {
  const start = weekDates[0]
  const end = weekDates[6]
  const startMonth = capitalize(start.toLocaleDateString('es-MX', { month: 'long' }))
  const endMonth = capitalize(end.toLocaleDateString('es-MX', { month: 'long' }))

  if (startMonth === endMonth) {
    return `${start.getDate()} - ${end.getDate()} ${startMonth}`
  }
  return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth}`
}

/** "Semana del 21 al 27 de Octubre, 2024" */
export function formatWeekRangeFull(weekDates: Date[]) {
  const start = weekDates[0]
  const end = weekDates[6]
  const startMonth = capitalize(start.toLocaleDateString('es-MX', { month: 'long' }))
  const endMonth = capitalize(end.toLocaleDateString('es-MX', { month: 'long' }))

  if (startMonth === endMonth) {
    return `Semana del ${start.getDate()} al ${end.getDate()} de ${startMonth}, ${end.getFullYear()}`
  }
  return `Semana del ${start.getDate()} de ${startMonth} al ${end.getDate()} de ${endMonth}, ${end.getFullYear()}`
}

export function formatHourLabel(hour: number) {
  return `${String(hour).padStart(2, '0')}:00`
}

/** Convierte "09:30" a minutos totales (570). */
export function timeToMinutes(time: string) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}
