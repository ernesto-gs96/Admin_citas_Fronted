// lib/mock/paciente-historial.ts
// Historial de citas por paciente para /dashboard/pacientes/[id].

export type EstadoCitaHistorial = 'confirmada' | 'completada' | 'pendiente' | 'cancelada'

export interface CitaHistorialItem {
  id: string
  estado: EstadoCitaHistorial
  modalidad: string // 'Presencial · Box 2', 'Teleconsulta'
  fechaLabel: string // 'Hoy, 24 Oct 2024 · 09:30 AM'
  titulo: string
  descripcion: string
  medico: string
  esProxima?: boolean
}

export const ESTADO_HISTORIAL_LABEL: Record<EstadoCitaHistorial, string> = {
  confirmada: 'Confirmada / En espera',
  completada: 'Completada',
  pendiente: 'Pendiente',
  cancelada: 'Cancelada',
}

const historialCitasPorPaciente: Record<string, CitaHistorialItem[]> = {
  p1: [
    {
      id: 'h1',
      estado: 'confirmada',
      modalidad: 'Presencial · Box 2',
      fechaLabel: 'Hoy, 24 Oct 2024 · 09:30 AM',
      titulo: 'Consulta de Evaluación y Tratamiento',
      descripcion: 'Control rutinario, revisión de tensión y análisis semestral de seguimiento.',
      medico: 'Dra. Elena Ramos',
      esProxima: true,
    },
    {
      id: 'h2',
      estado: 'completada',
      modalidad: 'Presencial · Box 2',
      fechaLabel: '12 Sep 2024 · 11:00 AM',
      titulo: 'Chequeo preventivo y control de tensión arterial',
      descripcion: 'Tensión arterial estable (120/80 mmHg). Se solicita perfil lipídico para control en octubre.',
      medico: 'Dra. Elena Ramos',
    },
    {
      id: 'h3',
      estado: 'completada',
      modalidad: 'Teleconsulta',
      fechaLabel: '03 Jul 2024 · 16:30 PM',
      titulo: 'Revisión periódica y ajuste de analítica',
      descripcion: 'Revisión de analítica general satisfactoria. Continuación con pautas preventivas.',
      medico: 'Dra. Elena Ramos',
    },
    {
      id: 'h4',
      estado: 'completada',
      modalidad: 'Presencial · Box 1',
      fechaLabel: '18 Abr 2024 · 10:00 AM',
      titulo: 'Primera consulta de medicina general',
      descripcion: 'Apertura de ficha de paciente, antecedentes familiares registrados sin anomalías relevantes.',
      medico: 'Dra. Elena Ramos',
    },
  ],
}

export function obtenerHistorialCitas(pacienteId: string): CitaHistorialItem[] {
  return historialCitasPorPaciente[pacienteId] ?? []
}
