import Link from 'next/link'
import { MockPatient } from '@/lib/mock/appointment-form'
import { MailIcon } from '@/components/auth/auth-icons'
import { HistoryIcon, PhoneIcon, ShieldCheckIcon } from '@/components/dashboard/dashboard-icons'

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function PatientStep({ patient }: { patient: MockPatient }) {
  return (
    <section className="form-section">
      <div className="form-section-header">
        <div className="form-section-title">
          <span className="form-step-number">1</span>
          <h2>Información del Paciente</h2>
        </div>
        {/* TODO: conectar a un buscador/alta real de pacientes cuando exista ese modelo */}
        <Link href="/dashboard/pacientes" className="text-link form-section-action">+ Registrar nuevo paciente</Link>
      </div>

      <div className="patient-card">
        <div className="patient-card-main">
          <span className="patient-avatar" aria-hidden="true">{initials(patient.name)}</span>
          <div>
            <div className="patient-card-name-row">
              <span className="patient-name">{patient.name}</span>
              <span className="patient-id">ID #{patient.code}</span>
              <span className="patient-badge">Historial activo</span>
            </div>
            <div className="patient-meta">
              <span><PhoneIcon /> {patient.phone}</span>
              <span><MailIcon /> {patient.email}</span>
              <span><HistoryIcon /> Última consulta: {patient.lastVisit}</span>
            </div>
          </div>
        </div>
        <div className="patient-card-actions">
          <Link href="/dashboard/pacientes" className="patient-action-primary">Ver ficha clínica</Link>
          {/* TODO: abrir selector de paciente real */}
          <button type="button" className="patient-action-secondary">Cambiar</button>
        </div>
      </div>

      <div className="patient-footer">
        {patient.allergy && (
          <span>Alergias registradas: <strong className="patient-allergy">{patient.allergy}</strong>{patient.bloodType ? ` · Grupo: ${patient.bloodType}` : ''}</span>
        )}
        <span className="patient-consent"><ShieldCheckIcon /> Consentimiento firmado</span>
      </div>
    </section>
  )
}
