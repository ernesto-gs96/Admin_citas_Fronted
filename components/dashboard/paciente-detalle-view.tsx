'use client'

// components/dashboard/paciente-detalle-view.tsx

import Link from 'next/link'
import type { Paciente } from '@/lib/mock/pacientes'
import type { CitaHistorialItem } from '@/lib/mock/paciente-historial'
import { PacientePerfilCard } from './paciente-perfil-card'
import { PacienteHistorialTabs } from './paciente-historial-tabs'
import { ArrowBackIcon } from './paciente-detalle-icons'
import { CalendarAddIcon } from './disponibilidad-icons'

interface PacienteDetalleViewProps {
  paciente: Paciente
  citas: CitaHistorialItem[]
}

export function PacienteDetalleView({ paciente, citas }: PacienteDetalleViewProps) {
  function handleVerDetalles(citaId: string) {
    // Punto de integración: abrir el detalle completo de la cita.
    console.info('Ver detalles de la cita', citaId)
  }

  function handleIniciarConsulta(citaId: string) {
    // Punto de integración: navegar al flujo de consulta en curso.
    console.info('Iniciar consulta', citaId)
  }

  return (
    <div className="paciente-detalle-canvas">
      <Link href="/dashboard/pacientes" className="paciente-detalle-back">
        <ArrowBackIcon />
        <span>Volver a Pacientes</span>
      </Link>

      <div className="paciente-detalle-head">
        <div className="paciente-detalle-head-title">
          <h1>{paciente.nombre}</h1>
          <span className={`paciente-detalle-estado estado-${paciente.estado}`}>
            <span />
            {paciente.estado === 'activa' ? 'Activa' : 'Inactiva'}
          </span>
        </div>
        <Link href={`/dashboard/citas/nueva?paciente=${paciente.id}`} className="paciente-detalle-agendar">
          <CalendarAddIcon />
          <span>+ Agendar Cita</span>
        </Link>
      </div>

      <div className="paciente-detalle-grid">
        <div className="paciente-detalle-col-left">
          <PacientePerfilCard paciente={paciente} />
        </div>
        <div className="paciente-detalle-col-right">
          <PacienteHistorialTabs citas={citas} onVerDetalles={handleVerDetalles} onIniciarConsulta={handleIniciarConsulta} />
        </div>
      </div>
    </div>
  )
}
