// components/dashboard/paciente-ficha.tsx

import Link from 'next/link'
import type { Paciente } from '@/lib/mock/pacientes'
import { AddCircleIcon, PencilIcon } from './servicios-icons'
import { ArrowForwardIcon } from './disponibilidad-icons'
import { ChatIcon, EventIcon, MailIcon, PhoneIcon } from './pacientes-icons'

interface PacienteFichaProps {
  paciente: Paciente | null
}

export function PacienteFicha({ paciente }: PacienteFichaProps) {
  if (!paciente) {
    return (
      <div className="paciente-ficha paciente-ficha-empty">
        <p>Selecciona un paciente de la lista para ver su ficha rápida.</p>
      </div>
    )
  }

  const telHref = `tel:${paciente.telefono.replace(/\s+/g, '')}`
  const waHref = `https://wa.me/${paciente.telefono.replace(/[^\d]/g, '')}`
  const mailHref = `mailto:${paciente.email}`

  return (
    <div className="paciente-ficha">
      <div className="paciente-ficha-head">
        <div className="paciente-ficha-identity">
          <span className={`paciente-ficha-avatar tint-${paciente.tintAvatar}`}>{paciente.iniciales}</span>
          <div>
            <h3>{paciente.nombre}</h3>
            <p>
              #{paciente.expediente} · {paciente.edad} años
            </p>
          </div>
        </div>
        <span className={`paciente-ficha-estado estado-${paciente.estado}`}>
          <span />
          {paciente.estado === 'activa' ? 'Activa' : 'Inactiva'}
        </span>
      </div>

      <Link href={`/dashboard/citas/nueva?paciente=${paciente.id}`} className="paciente-ficha-cta">
        <AddCircleIcon />
        <span>Agendar cita</span>
      </Link>

      <div className="paciente-ficha-contact">
        <p>
          <PhoneIcon />
          {paciente.telefono}
        </p>
        <p>
          <MailIcon />
          {paciente.email}
        </p>
      </div>

      <div className="paciente-ficha-quick-actions">
        <a href={waHref} target="_blank" rel="noreferrer">
          <ChatIcon />
          <span>WhatsApp</span>
        </a>
        <a href={telHref}>
          <PhoneIcon />
          <span>Llamar</span>
        </a>
        <a href={mailHref}>
          <MailIcon />
          <span>Email</span>
        </a>
      </div>

      <div className="paciente-ficha-visits">
        <span className="paciente-ficha-visits-label">Resumen de visitas</span>

        {paciente.proximaCita && (
          <div className="paciente-ficha-visit is-next">
            <div className="paciente-ficha-visit-row">
              <span className="paciente-ficha-visit-tag">
                <EventIcon />
                Próxima cita
              </span>
              <span className="paciente-ficha-modalidad">{paciente.proximaCita.modalidad}</span>
            </div>
            <p className="paciente-ficha-visit-date">{paciente.proximaCita.fechaLabel}</p>
            <p className="paciente-ficha-visit-note">{paciente.proximaCita.motivo}</p>
          </div>
        )}

        {paciente.ultimaVisita && (
          <div className="paciente-ficha-visit">
            <div className="paciente-ficha-visit-row">
              <span className="paciente-ficha-visit-label">Última visita</span>
              <span className="paciente-ficha-visit-label">{paciente.ultimaVisita.fecha}</span>
            </div>
            <p className="paciente-ficha-visit-note is-dark">{paciente.ultimaVisita.nota}</p>
          </div>
        )}
      </div>

      <div className="paciente-ficha-footer">
        <Link href={`/dashboard/pacientes/${paciente.id}`} className="paciente-ficha-expediente">
          <span>Ver expediente completo</span>
          <ArrowForwardIcon />
        </Link>
        <Link href={`/dashboard/pacientes/${paciente.id}/editar`} className="paciente-ficha-edit">
          <PencilIcon />
          <span>Editar información</span>
        </Link>
      </div>
    </div>
  )
}
