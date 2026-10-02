import Link from 'next/link'
import { CalendarIcon, SettingsIcon, UsersIcon } from '@/components/dashboard/dashboard-icons'

const FEATURES = [
  {
    icon: CalendarIcon,
    title: 'Agenda clara',
    description: 'Visualiza tu día completo y evita encimar citas sin darte cuenta.',
  },
  {
    icon: UsersIcon,
    title: 'Pacientes al día',
    description: 'Guarda el historial de contacto de cada paciente en un solo lugar.',
  },
  {
    icon: SettingsIcon,
    title: 'A tu manera',
    description: 'Configura horarios, duración de consultas y recordatorios como trabajas tú.',
  },
]

export default function LandingPage() {
  return (
    <main className="landing">
      <section className="landing-hero">
        <p className="section-label">ADMINISTRACIÓN DE CITAS</p>
        <h1>Toda tu agenda, en un solo lugar.</h1>
        <p className="landing-hero-copy">
          Agenda Clara ayuda a médicos y profesionales independientes a organizar sus citas,
          dar seguimiento a sus pacientes y llegar a cada consulta con orden, sin hojas
          sueltas ni mensajes cruzados.
        </p>
        <div className="landing-cta-group">
          <Link href="/register" className="submit-button landing-cta">
            <span>Crear mi cuenta</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/login" className="text-link">Ya tengo una cuenta</Link>
        </div>
      </section>

      <section className="landing-features" aria-label="Características">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div className="feature-card" key={title}>
            <span className="feature-icon"><Icon /></span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        ))}
      </section>

      <footer className="landing-footer">
        <span>© {new Date().getFullYear()} Agenda Clara</span>
        <span className="security-note"><span aria-hidden="true">⌁</span> Tus datos viajan protegidos y seguros.</span>
      </footer>
    </main>
  )
}
