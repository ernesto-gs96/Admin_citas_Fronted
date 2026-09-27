// MOCK DATA — todavía no existen los modelos de pacientes ni de catálogo de servicios en la
// base de datos. Reemplazar por consultas reales (Postgres/Neon) cuando ese backend exista.
// La forma de estos tipos es el contrato que ese fetch real debería cumplir.

export interface ServiceOption {
  id: string
  name: string
  description: string
  durationMinutes: number
  price: number
}

export const serviceOptions: ServiceOption[] = [
  {
    id: 'general',
    name: 'Consulta Médica General',
    description: 'Evaluación clínica completa, recetas y diagnósticos iniciales.',
    durationMinutes: 30,
    price: 65,
  },
  {
    id: 'postop',
    name: 'Control Post-Operatorio',
    description: 'Revisión de evolución, curas menores y retirada de suturas.',
    durationMinutes: 45,
    price: 80,
  },
  {
    id: 'first-visit',
    name: 'Primera Visita / Evaluación',
    description: 'Apertura de historia clínica exhaustiva y plan preventivo.',
    durationMinutes: 60,
    price: 90,
  },
  {
    id: 'labs',
    name: 'Revisión de Analíticas',
    description: 'Comentario e interpretación de pruebas de laboratorio.',
    durationMinutes: 20,
    price: 40,
  },
]

export type Modality = 'presencial' | 'video'

export interface DayOption {
  id: string
  label: string
  dateLabel: string
  weekday: string
}

export const dayOptions: DayOption[] = [
  { id: 'today', label: 'Hoy', dateLabel: '24 Oct', weekday: 'Jue' },
  { id: 'tomorrow', label: 'Mañana', dateLabel: '25 Oct', weekday: 'Vie' },
  { id: 'monday', label: 'Lunes', dateLabel: '28 Oct', weekday: 'Lun' },
]

export interface TimeSlotOption {
  id: string
  label: string
}

export const timeSlotOptions: TimeSlotOption[] = [
  { id: '09:30', label: '9:30 AM' },
  { id: '10:15', label: '10:15 AM' },
  { id: '11:30', label: '11:30 AM' },
  { id: '12:15', label: '12:15 PM' },
  { id: '16:00', label: '4:00 PM' },
  { id: '16:45', label: '4:45 PM' },
]

export interface MockPatient {
  name: string
  code: string
  phone: string
  email: string
  lastVisit: string
  allergy?: string
  bloodType?: string
}

// MOCK — hasta que exista selección/búsqueda real de pacientes, se precarga uno de ejemplo.
export const mockSelectedPatient: MockPatient = {
  name: 'Mariana Ortiz Suárez',
  code: 'MED-8942',
  phone: '+34 612 884 901',
  email: 'm.ortiz@gmail.com',
  lastVisit: 'Hace 2 semanas',
  allergy: 'Penicilina',
  bloodType: 'A+',
}

export interface NeighboringSlot {
  time: string
  label: string
  tag: string
  variant: 'default' | 'current' | 'open'
}

export const neighboringSlots: NeighboringSlot[] = [
  { time: '08:30', label: 'Carlos Mendoza', tag: 'Revisión', variant: 'default' },
  { time: '09:30', label: 'Mariana Ortiz (esta cita)', tag: '45 min', variant: 'current' },
  { time: '11:00', label: 'Hueco disponible', tag: '+ Añadir', variant: 'open' },
]
