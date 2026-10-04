'use client'

// components/dashboard/nuevo-paciente-modal.tsx

import { useEffect, useState, type FormEvent } from 'react'
import type { GeneroPaciente } from '@/lib/mock/pacientes'
import { PersonAddIcon } from './servicios-icons'
import { CloseIcon } from './weekly-agenda-icons'
import { InfoIcon } from './disponibilidad-icons'
import { FemaleIcon, MailIcon, MaleIcon, MoreHorizIcon, PhoneIcon } from './pacientes-icons'

export interface NuevoPacienteData {
  nombre: string
  genero: GeneroPaciente
  fechaNacimiento: string
  telefono: string
  email: string
}

interface NuevoPacienteModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: NuevoPacienteData) => void
}

const GENEROS: { value: GeneroPaciente; label: string; Icon: typeof FemaleIcon }[] = [
  { value: 'femenino', label: 'Femenino', Icon: FemaleIcon },
  { value: 'masculino', label: 'Masculino', Icon: MaleIcon },
  { value: 'otro', label: 'Otro', Icon: MoreHorizIcon },
]

export function NuevoPacienteModal({ open, onClose, onSubmit }: NuevoPacienteModalProps) {
  const [nombre, setNombre] = useState('')
  const [genero, setGenero] = useState<GeneroPaciente>('femenino')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Cierra con Escape y resetea el formulario cada vez que se abre.
  useEffect(() => {
    if (!open) return
    setNombre('')
    setGenero('femenino')
    setFechaNacimiento('')
    setTelefono('')
    setEmail('')
    setError(null)

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!nombre.trim()) {
      setError('El nombre completo es obligatorio.')
      return
    }
    if (!telefono.trim() && !email.trim()) {
      setError('Se requiere al menos un método de contacto.')
      return
    }
    onSubmit({ nombre: nombre.trim(), genero, fechaNacimiento, telefono: telefono.trim(), email: email.trim() })
  }

  return (
    <div className="pacientes-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-nuevo-paciente-title" onMouseDown={onClose}>
      <div className="pacientes-modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="pacientes-modal-head">
          <div>
            <h2 id="modal-nuevo-paciente-title">Nuevo Paciente</h2>
            <p>Ingresa los datos esenciales para abrir el expediente clínico.</p>
          </div>
          <button type="button" className="pacientes-modal-close" aria-label="Cerrar modal" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <form className="pacientes-modal-form" onSubmit={handleSubmit}>
          <div className="pacientes-field">
            <label htmlFor="patient-name">Nombre completo *</label>
            <input id="patient-name" type="text" placeholder="Ej. María Elena Delgado Gómez" value={nombre} onChange={(event) => setNombre(event.target.value)} required />
          </div>

          <div className="pacientes-field">
            <label>Género</label>
            <div className="pacientes-gender-grid">
              {GENEROS.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  className={`pacientes-gender-chip${genero === value ? ' is-active' : ''}`}
                  onClick={() => setGenero(value)}
                >
                  <Icon />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pacientes-field">
            <label htmlFor="patient-birthdate">Fecha de nacimiento</label>
            <input id="patient-birthdate" type="date" value={fechaNacimiento} onChange={(event) => setFechaNacimiento(event.target.value)} max={new Date().toISOString().slice(0, 10)} />
          </div>

          <div className="pacientes-field-row">
            <div className="pacientes-field">
              <label htmlFor="patient-phone">Celular / Teléfono</label>
              <div className="pacientes-input-icon">
                <PhoneIcon />
                <input id="patient-phone" type="tel" placeholder="+34 600 000 000" value={telefono} onChange={(event) => setTelefono(event.target.value)} />
              </div>
            </div>
            <div className="pacientes-field">
              <label htmlFor="patient-email">Correo electrónico</label>
              <div className="pacientes-input-icon">
                <MailIcon />
                <input id="patient-email" type="email" placeholder="paciente@email.com" value={email} onChange={(event) => setEmail(event.target.value)} />
              </div>
            </div>
          </div>

          <p className={`pacientes-modal-hint${error ? ' is-error' : ''}`}>
            <InfoIcon />
            {error ?? 'Se requiere al menos un método de contacto.'}
          </p>

          <div className="pacientes-modal-footer">
            <button type="button" className="servicios-btn servicios-btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="servicios-btn servicios-btn-primary">
              <PersonAddIcon />
              <span>Registrar paciente</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
