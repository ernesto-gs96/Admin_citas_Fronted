export function DashboardHeader({
  totalToday,
  nextTime,
}: {
  totalToday: number
  nextTime?: string
}) {
  const today = new Date()
  const dayLabel = today.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })
  const capitalizedDay = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1)

  return (
    <div className="dashboard-header">
      <p className="section-label">RESUMEN</p>
      <h1>Buenos días</h1>
      <p className="dashboard-subtitle">
        {capitalizedDay} · {totalToday} {totalToday === 1 ? 'cita programada' : 'citas programadas'}
        {nextTime ? ` · La siguiente comienza a las ${nextTime}` : ''}
      </p>
    </div>
  )
}
