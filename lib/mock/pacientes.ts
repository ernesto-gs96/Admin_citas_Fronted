// lib/mock/pacientes.ts
// Datos de ejemplo para /dashboard/pacientes.

export type EstadoPaciente = 'activa' | 'inactiva'
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

export interface Paciente {
  id: string
  nombre: string
  expediente: string // 'MED-8942'
  edad: number
  iniciales: string
  tintAvatar: TintAvatar
  estado: EstadoPaciente
  telefono: string
  email: string
  condicion: string
  condicionTint: TintBadge
  proximaCita?: ProximaCita
  ultimaVisita?: UltimaVisita
}

export const ESTADOS_PACIENTE = ['Todos los estados', 'Activa', 'Inactiva']
export const ETIQUETAS_PACIENTE = ['Cualquiera', 'Control rutinario', 'Hipertensión', 'Post-operatorio', 'Pediatría']
export const ORDENES_PACIENTE = ['Última visita', 'Nombre (A-Z)', 'Próxima cita']

export const pacientesIniciales: Paciente[] = [
  {
    id: 'p1',
    nombre: 'Mariana Ortiz Suárez',
    expediente: 'MED-8942',
    edad: 34,
    iniciales: 'MO',
    tintAvatar: 'brand',
    estado: 'activa',
    telefono: '+34 612 894 122',
    email: 'mariana.ortiz@email.com',
    condicion: 'Control rutinario',
    condicionTint: 'brand',
    proximaCita: { label: 'Jueves 09:30', fechaLabel: 'Hoy, 24 Oct · 09:30 AM', modalidad: 'Presencial', motivo: 'Consulta General · Control rutinario' },
    ultimaVisita: { fecha: '12 Sep 2024', nota: 'Chequeo preventivo y control de tensión arterial' },
  },
  {
    id: 'p2',
    nombre: 'Carlos Benítez Soler',
    expediente: 'MED-8941',
    edad: 52,
    iniciales: 'CB',
    tintAvatar: 'secondary',
    estado: 'activa',
    telefono: '+34 622 310 894',
    email: 'carlos.benitez@email.com',
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
