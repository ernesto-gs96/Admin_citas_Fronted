// lib/mock/weekly-agenda.ts
// Datos de ejemplo para la Agenda Semanal (/dashboard/citas).
// dayIndex: 0 = Lunes ... 6 = Domingo, según la semana visible en pantalla.

export type ModalidadCita = 'presencial' | 'online'
export type EstadoCita = 'confirmada' | 'pendiente'

// Tipos de los filtros del sub-header (WeeklyAgendaToolbar).
export type EstadoFiltro = 'todas' | EstadoCita
export type ModalidadFiltro = 'todas' | ModalidadCita

export interface CitaSemanal {
  id: string
  dayIndex: number
  startTime: string // '09:30'
  endTime: string // '10:15'
  patientName: string
  patientId: string
  reason: string
  modality: ModalidadCita
  status?: EstadoCita
}

// Franja visible en el grid: primera hora mostrada y última hora que abre fila.
export const AGENDA_START_HOUR = 8
export const AGENDA_LAST_ROW_HOUR = 17
export const AGENDA_CLOSE_LABEL = 'Fin de jornada habitual (18:30)'
export const AGENDA_LUNCH_LABEL = 'Almuerzo y gestión administrativa clínica · Bloque recurrente 13:00 - 14:00'

export const weeklyAppointments: CitaSemanal[] = [
  // Lunes
  { id: 'w1', dayIndex: 0, startTime: '09:00', endTime: '09:45', patientName: 'Beatriz Soler', patientId: 'MED-7710', reason: 'Chequeo periódico', modality: 'presencial', status: 'confirmada' },
  { id: 'w2', dayIndex: 0, startTime: '11:00', endTime: '11:45', patientName: 'Tomás Rivas', patientId: 'MED-7402', reason: 'Electrocardiograma', modality: 'presencial' },
  { id: 'w3', dayIndex: 0, startTime: '14:30', endTime: '15:15', patientName: 'Clara Fuentes', patientId: 'MED-7188', reason: 'Consulta general', modality: 'presencial' },
  { id: 'w4', dayIndex: 0, startTime: '16:00', endTime: '16:45', patientName: 'Martín Cárdenas', patientId: 'MED-7055', reason: 'Certificado deportivo', modality: 'presencial' },
  // Martes
  { id: 'w5', dayIndex: 1, startTime: '08:15', endTime: '08:45', patientName: 'Andrés Morales', patientId: 'MED-8102', reason: 'Triaje y analíticas', modality: 'presencial', status: 'confirmada' },
  { id: 'w6', dayIndex: 1, startTime: '10:00', endTime: '10:45', patientName: 'Federico Sanz', patientId: 'MED-8390', reason: 'Seguimiento hipertensión', modality: 'online' },
  { id: 'w7', dayIndex: 1, startTime: '12:00', endTime: '12:45', patientName: 'Javier Alarcón', patientId: 'MED-8471', reason: 'Renovación de receta', modality: 'presencial' },
  { id: 'w8', dayIndex: 1, startTime: '15:15', endTime: '16:00', patientName: 'Ángela Montero', patientId: 'MED-8552', reason: 'Control mensual', modality: 'presencial' },
  // Miércoles
  { id: 'w9', dayIndex: 2, startTime: '09:15', endTime: '10:00', patientName: 'Gabriel Duarte', patientId: 'MED-8634', reason: 'Certificado médico', modality: 'presencial', status: 'confirmada' },
  { id: 'w10', dayIndex: 2, startTime: '11:30', endTime: '12:15', patientName: 'Patricia Vega', patientId: 'MED-8709', reason: 'Consulta general', modality: 'presencial' },
  { id: 'w11', dayIndex: 2, startTime: '15:00', endTime: '15:45', patientName: 'Samuel Torres', patientId: 'MED-8790', reason: 'Alergología inicial', modality: 'presencial' },
  { id: 'w12', dayIndex: 2, startTime: '16:30', endTime: '17:15', patientName: 'Daniela Reyes', patientId: 'MED-8861', reason: 'Consulta de seguimiento', modality: 'online' },
  // Jueves
  { id: 'w13', dayIndex: 3, startTime: '09:30', endTime: '10:15', patientName: 'Mariana Ortiz', patientId: 'MED-8942', reason: 'Consulta de control post-operatorio · Traumatología', modality: 'presencial', status: 'confirmada' },
  { id: 'w14', dayIndex: 3, startTime: '10:30', endTime: '11:00', patientName: 'Carlos Mendoza', patientId: 'MED-9013', reason: 'Revisión de analíticas', modality: 'online' },
  { id: 'w15', dayIndex: 3, startTime: '12:00', endTime: '12:45', patientName: 'Lucía Benítez', patientId: 'MED-9084', reason: 'Seguimiento tiroideo', modality: 'presencial', status: 'pendiente' },
  { id: 'w16', dayIndex: 3, startTime: '14:30', endTime: '15:15', patientName: 'Roberto Gómez', patientId: 'MED-9155', reason: 'Evaluación general', modality: 'presencial' },
  { id: 'w17', dayIndex: 3, startTime: '15:30', endTime: '16:15', patientName: 'Valeria Romero', patientId: 'MED-9226', reason: 'Consulta dermatológica', modality: 'presencial', status: 'confirmada' },
  // Viernes
  { id: 'w18', dayIndex: 4, startTime: '09:00', endTime: '09:45', patientName: 'Inés Valenzuela', patientId: 'MED-9297', reason: 'Resultados de sangre', modality: 'presencial' },
  { id: 'w19', dayIndex: 4, startTime: '10:15', endTime: '11:00', patientName: 'Sofía Castillo', patientId: 'MED-9368', reason: 'Primera visita', modality: 'presencial' },
  { id: 'w20', dayIndex: 4, startTime: '12:00', endTime: '12:45', patientName: 'Ernesto Gil', patientId: 'MED-9439', reason: 'Consulta general', modality: 'presencial' },
  { id: 'w21', dayIndex: 4, startTime: '16:00', endTime: '16:45', patientName: 'Felipe Marín', patientId: 'MED-9510', reason: 'Revisión anual', modality: 'presencial' },
  // Sábado
  { id: 'w22', dayIndex: 5, startTime: '09:00', endTime: '10:00', patientName: 'Urgencia leve', patientId: 'MED-9581', reason: 'Atención sin cita previa', modality: 'presencial' },
]
