// components/dashboard/paciente-perfil-card.tsx

import Link from 'next/link'
import { formatFechaLarga, GENERO_LABEL, type Paciente } from '@/lib/mock/pacientes'
import { PencilIcon } from './servicios-icons'
import { PersonSmallIcon } from './weekly-agenda-icons'
import { ChatIcon, MailIcon, PhoneIcon } from './pacientes-icons'
import { CakeIcon, CalendarTodayIcon, HomePinIcon } from './paciente-detalle-icons'

interface PacientePerfilCardProps {
  paciente: Paciente
}

export function PacientePerfilCard({ paciente }: PacientePerfilCardProps) {
  const waHref = `https://wa.me/${paciente.telefono.replace(/[^\d]/g, '')}`

  return (
    <div className="paciente-detalle-card">
      <div className="paciente-detalle-identity">
        <span className={`paciente-detalle-avatar tint-${paciente.tintAvatar}`}>{paciente.iniciales}</span>
        <h2>{paciente.nombre}</h2>
        <p>
          #{paciente.expediente}
          {paciente.categoria ? (
            <>
              {' · '}
              <span>{paciente.categoria}</span>
            </>
          ) : null}
        </p>
      </div>

      <div className="paciente-detalle-info">
        {paciente.genero && (
          <div className="paciente-detalle-info-row">
            <span>
              <PersonSmallIcon />
              Género
            </span>
            <strong>{GENERO_LABEL[paciente.genero]}</strong>
          </div>
        )}

        {paciente.fechaNacimiento && (
          <div className="paciente-detalle-info-row">
            <span>
              <CakeIcon />
              Nacimiento
            </span>
            <strong>
              {formatFechaLarga(paciente.fechaNacimiento)} ({paciente.edad} años)
            </strong>
          </div>
        )}

        <div className="paciente-detalle-info-row">
          <span>
            <PhoneIcon />
            Celular
          </span>
          <span className="paciente-detalle-info-value-group">
            <strong>{paciente.telefono}</strong>
            <a href={waHref} target="_blank" rel="noreferrer" className="paciente-detalle-whatsapp" title="WhatsApp">
              <ChatIcon />
            </a>
          </span>
        </div>

        <div className="paciente-detalle-info-row">
          <span>
            <MailIcon />
            Email
          </span>
          <strong className="paciente-detalle-truncate" title={paciente.email}>
            {paciente.email}
          </strong>
        </div>

        {paciente.direccion && (
          <div className="paciente-detalle-info-row is-align-start">
            <span>
              <HomePinIcon />
              Dirección
            </span>
            <strong className="paciente-detalle-right">{paciente.direccion}</strong>
          </div>
        )}

        {paciente.fechaAlta && (
          <div className="paciente-detalle-info-row">
            <span>
              <CalendarTodayIcon />
              Fecha de alta
            </span>
            <strong>{formatFechaLarga(paciente.fechaAlta)}</strong>
          </div>
        )}
      </div>

      <Link href={`/dashboard/pacientes/${paciente.id}/editar`} className="paciente-detalle-edit-btn">
        <PencilIcon />
        <span>Editar información</span>
      </Link>
    </div>
  )
}
