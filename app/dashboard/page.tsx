export default function DashboardPage() {
  return (
    <>
      <div className="dashboard-header">
        <div>
          <p className="section-label">RESUMEN</p>
          <h1>Hoy, martes 16</h1>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Citas hoy</span>
          <span className="stat-value">6</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Próxima cita</span>
          <span className="stat-value">10:30</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Confirmadas</span>
          <span className="stat-value">4 / 6</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pacientes activos</span>
          <span className="stat-value">128</span>
        </div>
      </div>

      <div className="dashboard-panel">
        <div className="dashboard-panel-header">
          <h2>Citas de hoy</h2>
        </div>
        <ul className="appointment-list">
          <li className="appointment-row">
            <time>09:00</time>
            <span className="appointment-name">Ana Martínez</span>
            <span className="appointment-tag">Consulta inicial</span>
            <span className="appointment-status confirmed">Confirmada</span>
          </li>
          <li className="appointment-row">
            <time>10:30</time>
            <span className="appointment-name">Luis Herrera</span>
            <span className="appointment-tag">Seguimiento</span>
            <span className="appointment-status confirmed">Confirmada</span>
          </li>
          <li className="appointment-row">
            <time>11:15</time>
            <span className="appointment-name">Carla Ibáñez</span>
            <span className="appointment-tag">Consulta general</span>
            <span className="appointment-status pending">Pendiente</span>
          </li>
          <li className="appointment-row">
            <time>16:00</time>
            <span className="appointment-name">Jorge Peña</span>
            <span className="appointment-tag">Seguimiento</span>
            <span className="appointment-status pending">Pendiente</span>
          </li>
        </ul>
      </div>
    </>
  )
}
