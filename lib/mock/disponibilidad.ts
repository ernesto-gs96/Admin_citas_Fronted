// lib/mock/disponibilidad.ts
// Datos de ejemplo para /dashboard/disponibilidad.

export type ModalidadFranja = 'presencial' | 'online' | 'mixto'
export type EstadoDia = 'laborable' | 'media_jornada' | 'cerrado'
export type TintEtiqueta = 'blue' | 'purple' | 'emerald' | 'rose'

export interface Franja {
  id: string
  inicio: string // 'HH:MM'
  fin: string
  modalidad: ModalidadFranja
  label: string // texto descriptivo mostrado junto al icono de modalidad
}

export interface Descanso {
  inicio: string
  fin: string
  nota: string
}

export interface DiaHorario {
  dayIndex: number // 0 = Lunes ... 6 = Domingo
  nombre: string
  activo: boolean
  estado: EstadoDia
  franjas: Franja[]
  descanso?: Descanso
}

export interface Bloqueo {
  id: string
  titulo: string
  etiqueta: string
  etiquetaTint: TintEtiqueta
  fechaInicio: string // ISO yyyy-mm-dd
  fechaFin: string
  resumen: string
  nota?: string
  notaTint?: 'emerald' | 'amber' | 'neutral'
}

export interface ReglasReserva {
  avisoMinimoHoras: number
  ventanaReservaDias: number
  autoBloqueoGoogle: boolean
  bufferMinutos: number
}

export const MOTIVOS_BLOQUEO = ['Congreso / Médico', 'Vacaciones anuales', 'Asuntos propios', 'Baja médica']

export function motivoAEtiqueta(motivo: string): { etiqueta: string; tint: TintEtiqueta } {
  switch (motivo) {
    case 'Congreso / Médico':
      return { etiqueta: 'Formación', tint: 'blue' }
    case 'Vacaciones anuales':
      return { etiqueta: 'Vacaciones', tint: 'emerald' }
    case 'Asuntos propios':
      return { etiqueta: 'Personal', tint: 'purple' }
    case 'Baja médica':
      return { etiqueta: 'Baja', tint: 'rose' }
    default:
      return { etiqueta: motivo, tint: 'blue' }
  }
}

export const MODALIDAD_LABEL: Record<ModalidadFranja, string> = {
  presencial: 'Presencial',
  online: 'Online',
  mixto: 'Mixto',
}

export const horarioInicial: DiaHorario[] = [
  {
    dayIndex: 0,
    nombre: 'Lunes',
    activo: true,
    estado: 'laborable',
    franjas: [
      { id: 'f1', inicio: '09:00', fin: '14:00', modalidad: 'presencial', label: 'Presencial (Box 2)' },
      { id: 'f2', inicio: '16:00', fin: '20:00', modalidad: 'online', label: 'Videoconsulta online' },
    ],
    descanso: { inicio: '14:00', fin: '16:00', nota: 'Pausa almuerzo y administración clínica' },
  },
  {
    dayIndex: 1,
    nombre: 'Martes',
    activo: true,
    estado: 'laborable',
    franjas: [{ id: 'f3', inicio: '09:00', fin: '15:00', modalidad: 'mixto', label: 'Mixto (Box 2 + Telemedicina)' }],
  },
  {
    dayIndex: 2,
    nombre: 'Miércoles',
    activo: true,
    estado: 'laborable',
    franjas: [
      { id: 'f4', inicio: '09:00', fin: '14:00', modalidad: 'presencial', label: 'Presencial (Box 2)' },
      { id: 'f5', inicio: '16:00', fin: '19:30', modalidad: 'online', label: 'Videoconsulta online' },
    ],
  },
  {
    dayIndex: 3,
    nombre: 'Jueves',
    activo: true,
    estado: 'laborable',
    franjas: [{ id: 'f6', inicio: '09:00', fin: '14:00', modalidad: 'presencial', label: 'Presencial (Box 2)' }],
  },
  {
    dayIndex: 4,
    nombre: 'Viernes',
    activo: true,
    estado: 'laborable',
    franjas: [{ id: 'f7', inicio: '08:30', fin: '14:30', modalidad: 'presencial', label: 'Presencial (Box 2)' }],
  },
  {
    dayIndex: 5,
    nombre: 'Sábado',
    activo: true,
    estado: 'media_jornada',
    franjas: [{ id: 'f8', inicio: '10:00', fin: '13:30', modalidad: 'online', label: 'Telemedicina / Urgencias leves' }],
  },
  {
    dayIndex: 6,
    nombre: 'Domingo',
    activo: false,
    estado: 'cerrado',
    franjas: [],
  },
]

export const bloqueosIniciales: Bloqueo[] = [
  {
    id: 'b1',
    titulo: 'Congreso de Medicina General',
    etiqueta: 'Formación',
    etiquetaTint: 'blue',
    fechaInicio: '2024-11-12',
    fechaFin: '2024-11-16',
    resumen: '12 Nov - 16 Nov · 5 días completos',
    nota: 'Sin citas previas en conflicto',
    notaTint: 'emerald',
  },
  {
    id: 'b2',
    titulo: 'Puente de la Constitución',
    etiqueta: 'Festivo',
    etiquetaTint: 'purple',
    fechaInicio: '2024-12-06',
    fechaFin: '2024-12-08',
    resumen: '06 Dic - 08 Dic · 3 días',
    nota: 'Sincronizado vía Festivos España',
    notaTint: 'neutral',
  },
  {
    id: 'b3',
    titulo: 'Vacaciones de Invierno',
    etiqueta: 'Vacaciones',
    etiquetaTint: 'emerald',
    fechaInicio: '2024-12-24',
    fechaFin: '2025-01-01',
    resumen: '24 Dic - 01 Ene (9 días de descanso)',
    nota: 'Auto-respuesta activa para pacientes',
    notaTint: 'amber',
  },
]

export const reglasIniciales: ReglasReserva = {
  avisoMinimoHoras: 3,
  ventanaReservaDias: 60,
  autoBloqueoGoogle: true,
  bufferMinutos: 10,
}
