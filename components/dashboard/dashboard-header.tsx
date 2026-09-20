export function DashboardHeader({ name }: { name?: string | null }) {
  const today = new Date()
  const dayLabel = today.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })
  const capitalizedDay = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1)

  return (
    <div className="dashboard-header">
      <p className="section-label">RESUMEN</p>
      <h1>{name ? `Hola, ${name.split(' ')[0]}` : 'Hola'}</h1>
      <p className="dashboard-subtitle">{capitalizedDay}</p>
    </div>
  )
}
