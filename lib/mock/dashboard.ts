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

export const todayAppointments: Appointment[] = [
  {
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
    id: '2',
    time: '10:30',
    endTime: '11:00',
    patientName: 'Carlos Mendoza',
    serviceType: 'Revisión de analíticas',
    modality: 'Video',
    status: 'confirmed',
  },
  {
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
