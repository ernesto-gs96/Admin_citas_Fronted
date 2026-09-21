// MOCK DATA — no hay todavía modelo de citas en la base de datos.
// Reemplazar por una consulta real (p. ej. a Postgres/Neon vía Better Auth session + tabla de citas)
// cuando exista esa parte del backend. La forma de los tipos de abajo es el contrato que
// ese fetch real debería cumplir para que los componentes necesiten cambios mínimos.

export type AppointmentStatus = 'confirmed' | 'pending'

export interface Appointment {
  id: string
  time: string
  endTime: string
  patientName: string
  serviceType: string
  modality: 'Presencial' | 'Video'
  location?: string
  status: AppointmentStatus
}

export interface UpcomingAppointment {
  id: string
  patientName: string
  patientContact: string
  dateLabel: string
  serviceType: string
  status: AppointmentStatus
}

/** Un hueco libre entre citas, disponible para reservar. */
export interface FreeSlot {
  kind: 'free'
  id: string
  time: string
  endTime: string
  label: string
}

/** Un bloque no disponible para citas (comida, tareas administrativas, etc). */
export interface BlockedSlot {
  kind: 'blocked'
  id: string
  time: string
  endTime: string
  label: string
}

export type TodaySlot = ({ kind: 'appointment' } & Appointment) | FreeSlot | BlockedSlot

export const todaySchedule: TodaySlot[] = [
  {
    kind: 'appointment',
    id: '1',
    time: '09:30',
    endTime: '10:15',
    patientName: 'Mariana Ortiz',
    serviceType: 'Primera consulta',
    modality: 'Presencial',
    location: 'Consultorio 2',
    status: 'confirmed',
  },
  {
    kind: 'appointment',
    id: '2',
    time: '10:30',
    endTime: '11:00',
    patientName: 'Carlos Mendoza',
    serviceType: 'Revisión de analíticas',
    modality: 'Video',
    status: 'confirmed',
  },
  {
    kind: 'free',
    id: 'free-1',
    time: '11:00',
    endTime: '11:45',
    label: '45 min libre · Abierto a reservas online',
  },
  {
    kind: 'appointment',
    id: '3',
    time: '12:00',
    endTime: '12:45',
    patientName: 'Lucía Benítez',
    serviceType: 'Seguimiento de control',
    modality: 'Presencial',
    location: 'Consultorio 1',
    status: 'pending',
  },
  {
    kind: 'blocked',
    id: 'blocked-1',
    time: '13:00',
    endTime: '14:00',
    label: 'Almuerzo y gestión administrativa',
  },
  {
    kind: 'appointment',
    id: '4',
    time: '14:30',
    endTime: '15:15',
    patientName: 'Roberto Gómez',
    serviceType: 'Evaluación periódica',
    modality: 'Presencial',
    location: 'Consultorio 2',
    status: 'confirmed',
  },
]

/** Compatibilidad con pantallas existentes que ya consumen solo las citas del día. */
export const todayAppointments: Appointment[] = todaySchedule
  .filter((slot): slot is { kind: 'appointment' } & Appointment => slot.kind === 'appointment')
  .map(({ kind, ...appointment }) => appointment)

export const upcomingAppointments: UpcomingAppointment[] = [
  {
    id: '5',
    patientName: 'Ana Laura Morales',
    patientContact: 'ana.morales@mail.com',
    dateLabel: 'Mié 25 Oct · 10:00',
    serviceType: 'Consulta integral',
    status: 'confirmed',
  },
  {
    id: '6',
    patientName: 'Javier Romero',
    patientContact: '+34 612 884 901',
    dateLabel: 'Mié 25 Oct · 12:30',
    serviceType: 'Revisión post-tratamiento',
    status: 'pending',
  },
  {
    id: '7',
    patientName: 'Camila Vega',
    patientContact: 'camila.v@icloud.com',
    dateLabel: 'Jue 26 Oct · 16:00',
    serviceType: 'Sesión de diagnóstico',
    status: 'confirmed',
  },
]

/**
 * MOCK — especialidad del profesional. Hoy no existe una pantalla de perfil/configuración
 * que la capture, así que vive aquí como placeholder. El nombre que se muestra en el
 * sidebar SÍ es real (viene de la sesión de Better Auth), solo esta especialidad es mock.
 */
export const professionalSpecialty = 'Medicina General'

/**
 * MOCK — enlace público de reservas. Todavía no existe una página pública de reserva;
 * este valor es solo representativo hasta que ese flujo se construya.
 */
export const bookingLink = 'agendaclara.app/mi-agenda'

/**
 * MOCK — punto de referencia de "hora actual" para la línea de tiempo. Como todo esto es
 * data ficticia (no está atada al reloj real), se fija un valor legible para que el diseño
 * tenga sentido en cualquier momento del día. Reemplazar cuando haya datos reales por hora().
 */
export const currentTimeLabel = '09:05'

/** Diferencia en minutos entre dos horas en formato "HH:MM". */
export function minutesBetween(from: string, to: string): number {
  const [fromH, fromM] = from.split(':').map(Number)
  const [toH, toM] = to.split(':').map(Number)
  return toH * 60 + toM - (fromH * 60 + fromM)
}
