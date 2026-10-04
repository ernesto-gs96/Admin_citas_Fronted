// lib/mock/pacientes.ts
// Datos de ejemplo para /dashboard/pacientes.

export type EstadoPaciente = 'activa' | 'inactiva'
export type GeneroPaciente = 'femenino' | 'masculino' | 'otro'
export type TintBadge = 'brand' | 'amber' | 'blue' | 'purple' | 'neutral'
export type TintAvatar = 'brand' | 'secondary' | 'tertiary' | 'neutral'

export interface ProximaCita {
  label: string // 'Jueves 09:30', 'Mañana 10:30', '29 Oct · 17:00'
  fechaLabel: string // 'Hoy, 24 Oct · 09:30 AM'
  modalidad: string // 'Presencial' | 'Online'
  motivo: string
}

export interface UltimaVisita {
  fecha: string // '12 Sep 2024'
  nota: string
}

export type EstadoCitaHistorial = 'confirmada' | 'completada'

export interface CitaHistorial {
  id: string
  estado: EstadoCitaHistorial
  estadoLabel: string // 'Confirmada / En espera' | 'Completada'
  modalidadLabel: string // 'Presencial · Box 2' | 'Teleconsulta'
  fechaLabel: string // 'Hoy, 24 Oct 2024 · 09:30 AM'
  titulo: string
  descripcion: string
  medico: string
  esProxima?: boolean
}

export interface Paciente {
  id: string
  nombre: string
  expediente: string // 'MED-8942'
  edad: number
  genero?: GeneroPaciente
  fechaNacimiento?: string
  direccion?: string
  fechaAlta?: string
  categoria?: string
  iniciales: string
  tintAvatar: TintAvatar
  estado: EstadoPaciente
  telefono: string
  email: string
  tipoPaciente?: string // 'Paciente Regular'
  condicion: string
  condicionTint: TintBadge
  proximaCita?: ProximaCita
  ultimaVisita?: UltimaVisita
  historialCitas?: CitaHistorial[]
}

const MESES_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

export function formatNacimiento(fechaNacimiento?: string, edad?: number): string | null {
  if (!fechaNacimiento) return null
  const fecha = new Date(`${fechaNacimiento}T00:00:00`)
  if (Number.isNaN(fecha.getTime())) return null
  const dia = fecha.getDate()
  const mes = MESES_ES[fecha.getMonth()]
  const mesCap = mes.charAt(0).toUpperCase() + mes.slice(1)
  const edadFinal = edad ?? calcularEdad(fechaNacimiento)
  return `${dia} ${mesCap} ${fecha.getFullYear()} (${edadFinal} años)`
}

export function generoLabel(genero?: GeneroPaciente): string {
  if (genero === 'masculino') return 'Masculino'
  if (genero === 'otro') return 'Otro'
  if (genero === 'femenino') return 'Femenino'
  return 'No especificado'
}

/** Historial por defecto para pacientes sin `historialCitas` explícito, construido a partir de su próxima cita y última visita. */
export function obtenerHistorialCitas(paciente: Paciente): CitaHistorial[] {
  if (paciente.historialCitas) return paciente.historialCitas

  const historial: CitaHistorial[] = []
  if (paciente.proximaCita) {
    historial.push({
      id: `${paciente.id}-proxima`,
      estado: 'confirmada',
      estadoLabel: 'Confirmada / En espera',
      modalidadLabel: paciente.proximaCita.modalidad,
      fechaLabel: paciente.proximaCita.fechaLabel,
      titulo: paciente.proximaCita.motivo,
      descripcion: 'Cita programada pendiente de realizarse.',
      medico: 'Dra. Elena Ramos',
      esProxima: true,
    })
  }
  if (paciente.ultimaVisita) {
    historial.push({
      id: `${paciente.id}-ultima`,
      estado: 'completada',
      estadoLabel: 'Completada',
      modalidadLabel: 'Presencial',
      fechaLabel: paciente.ultimaVisita.fecha,
      titulo: paciente.ultimaVisita.nota,
      descripcion: 'Consulta registrada en el expediente del paciente.',
      medico: 'Dra. Elena Ramos',
    })
  }
  return historial
}

export const ESTADOS_PACIENTE = ['Todos los estados', 'Activa', 'Inactiva']
export const ETIQUETAS_PACIENTE = ['Cualquiera', 'Control rutinario', 'Hipertensión', 'Post-operatorio', 'Pediatría']
export const ORDENES_PACIENTE = ['Última visita', 'Nombre (A-Z)', 'Próxima cita']

export function calcularEdad(fechaNacimiento: string): number {
  const nacimiento = new Date(fechaNacimiento)
  if (Number.isNaN(nacimiento.getTime())) return 0
  const hoy = new Date()
  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  const aunNoCumple = hoy.getMonth() < nacimiento.getMonth() || (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())
  if (aunNoCumple) edad -= 1
  return Math.max(edad, 0)
}

export function obtenerIniciales(nombre: string): string {
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase())
    .join('')
}

const TINTS_AVATAR: TintAvatar[] = ['brand', 'secondary', 'tertiary', 'neutral']

export function siguienteTintAvatar(indice: number): TintAvatar {
  return TINTS_AVATAR[indice % TINTS_AVATAR.length]
}

export const pacientesIniciales: Paciente[] = [
  {
    id: 'p1',
    nombre: 'Mariana Ortiz Suárez',
    expediente: 'MED-8942',
    edad: 34,
    genero: 'femenino',
    fechaNacimiento: '1990-05-14',
    direccion: 'Calle Mayor 45, 3ºB, Madrid',
    fechaAlta: '2023-01-15',
    categoria: 'Paciente Regular',
    iniciales: 'MO',
    tintAvatar: 'brand',
    estado: 'activa',
    telefono: '+34 612 894 122',
    email: 'mariana.ortiz@email.com',
    tipoPaciente: 'Paciente Regular',
    condicion: 'Control rutinario',
    condicionTint: 'brand',
    proximaCita: { label: 'Jueves 09:30', fechaLabel: 'Hoy, 24 Oct 2024 · 09:30 AM', modalidad: 'Presencial', motivo: 'Consulta General · Control rutinario' },
    ultimaVisita: { fecha: '12 Sep 2024', nota: 'Chequeo preventivo y control de tensión arterial' },
    historialCitas: [
      {
        id: 'p1-c1',
        estado: 'confirmada',
        estadoLabel: 'Confirmada / En espera',
        modalidadLabel: 'Presencial · Box 2',
        fechaLabel: 'Hoy, 24 Oct 2024 · 09:30 AM',
        titulo: 'Consulta de Evaluación y Tratamiento',
        descripcion: 'Control rutinario, revisión de tensión y análisis semestral de seguimiento.',
        medico: 'Dra. Elena Ramos',
        esProxima: true,
      },
      {
        id: 'p1-c2',
        estado: 'completada',
        estadoLabel: 'Completada',
        modalidadLabel: 'Presencial · Box 2',
        fechaLabel: '12 Sep 2024 · 11:00 AM',
        titulo: 'Chequeo preventivo y control de tensión arterial',
        descripcion: 'Tensión arterial estable (120/80 mmHg). Se solicita perfil lipídico para control en octubre.',
        medico: 'Dra. Elena Ramos',
      },
      {
        id: 'p1-c3',
        estado: 'completada',
        estadoLabel: 'Completada',
        modalidadLabel: 'Teleconsulta',
        fechaLabel: '03 Jul 2024 · 16:30 PM',
        titulo: 'Revisión periódica y ajuste de analítica',
        descripcion: 'Revisión de analítica general satisfactoria. Continuación con pautas preventivas.',
        medico: 'Dra. Elena Ramos',
      },
      {
        id: 'p1-c4',
        estado: 'completada',
        estadoLabel: 'Completada',
        modalidadLabel: 'Presencial · Box 1',
        fechaLabel: '18 Abr 2024 · 10:00 AM',
        titulo: 'Primera consulta de medicina general',
        descripcion: 'Apertura de ficha de paciente, antecedentes familiares registrados sin anomalías relevantes.',
        medico: 'Dra. Elena Ramos',
      },
    ],
  },
  {
    id: 'p2',
    nombre: 'Carlos Benítez Soler',
    expediente: 'MED-8941',
    edad: 52,
    genero: 'masculino',
    fechaNacimiento: '1972-02-18',
    iniciales: 'CB',
    tintAvatar: 'secondary',
    estado: 'activa',
    telefono: '+34 622 310 894',
    email: 'carlos.benitez@email.com',
    direccion: 'Av. de la Constitución 12, 1ºA, Madrid',
    fechaAlta: '02 Marzo 2022',
    tipoPaciente: 'Paciente Regular',
    condicion: 'Hipertensión',
    condicionTint: 'amber',
    proximaCita: { label: 'Mañana 10:30', fechaLabel: 'Mañana, 25 Oct · 10:30 AM', modalidad: 'Presencial', motivo: 'Seguimiento · Hipertensión' },
    ultimaVisita: { fecha: '03 Oct 2024', nota: 'Ajuste de medicación antihipertensiva' },
  },
  {
    id: 'p3',
    nombre: 'Lucía Morales Valls',
    expediente: 'MED-8938',
    edad: 41,
    iniciales: 'LM',
    tintAvatar: 'tertiary',
    estado: 'activa',
    telefono: '+34 655 201 433',
    email: 'lucia.morales@email.com',
    condicion: 'Post-operatorio',
    condicionTint: 'blue',
    ultimaVisita: { fecha: '18 Sep 2024', nota: 'Retirada de puntos sin incidencias' },
  },
  {
    id: 'p4',
    nombre: 'Mateo Navarro Gil',
    expediente: 'MED-8935',
    edad: 8,
    iniciales: 'MN',
    tintAvatar: 'tertiary',
    estado: 'activa',
    telefono: '+34 699 044 782',
    email: 'familia.navarro@email.com',
    condicion: 'Pediatría',
    condicionTint: 'purple',
    proximaCita: { label: '29 Oct · 17:00', fechaLabel: '29 Oct · 17:00', modalidad: 'Presencial', motivo: 'Revisión pediátrica' },
    ultimaVisita: { fecha: '29 Jul 2024', nota: 'Revisión de calendario de vacunación' },
  },
  {
    id: 'p5',
    nombre: 'Sofía Aranda Méndez',
    expediente: 'MED-8930',
    edad: 29,
    iniciales: 'SA',
    tintAvatar: 'neutral',
    estado: 'activa',
    telefono: '+34 611 772 905',
    email: 'sofia.aranda@email.com',
    condicion: 'Control rutinario',
    condicionTint: 'brand',
    ultimaVisita: { fecha: '02 Ago 2024', nota: 'Analítica general sin hallazgos relevantes' },
  },
  {
    id: 'p6',
    nombre: 'Javier Alarcón Díaz',
    expediente: 'MED-8927',
    edad: 47,
    iniciales: 'JA',
    tintAvatar: 'secondary',
    estado: 'inactiva',
    telefono: '+34 633 558 214',
    email: 'javier.alarcon@email.com',
    condicion: 'Control rutinario',
    condicionTint: 'brand',
    ultimaVisita: { fecha: '11 Mar 2024', nota: 'Renovación de receta habitual' },
  },
  {
    id: 'p7',
    nombre: 'Ángela Montero Ruiz',
    expediente: 'MED-8921',
    edad: 36,
    iniciales: 'AM',
    tintAvatar: 'brand',
    estado: 'activa',
    telefono: '+34 677 390 118',
    email: 'angela.montero@email.com',
    condicion: 'Hipertensión',
    condicionTint: 'amber',
    proximaCita: { label: '31 Oct · 12:00', fechaLabel: '31 Oct · 12:00', modalidad: 'Online', motivo: 'Control mensual de tensión' },
    ultimaVisita: { fecha: '28 Sep 2024', nota: 'Control mensual, tensión estable' },
  },
  {
    id: 'p8',
    nombre: 'Tomás Rivas Peña',
    expediente: 'MED-8915',
    edad: 63,
    iniciales: 'TR',
    tintAvatar: 'neutral',
    estado: 'activa',
    telefono: '+34 644 882 207',
    email: 'tomas.rivas@email.com',
    condicion: 'Post-operatorio',
    condicionTint: 'blue',
    ultimaVisita: { fecha: '05 Oct 2024', nota: 'Electrocardiograma de control, sin alteraciones' },
  },
]

export function buscarPacientePorId(id: string): Paciente | undefined {
  return pacientesIniciales.find((p) => p.id === id)
}

export function formatFechaLarga(iso: string): string {
  const fecha = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(fecha.getTime())) return iso
  const mes = MESES_ES[fecha.getMonth()]
  return `${fecha.getDate()} ${mes.charAt(0).toUpperCase() + mes.slice(1)} ${fecha.getFullYear()}`
}

export const GENERO_LABEL: Record<GeneroPaciente, string> = {
  femenino: 'Femenino',
  masculino: 'Masculino',
  otro: 'Otro',
}
