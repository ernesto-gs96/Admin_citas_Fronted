// lib/mock/servicios.ts
// Datos de ejemplo para /dashboard/servicios.

export type ModalidadServicio = 'presencial' | 'online' | 'domicilio'
export type EstadoServicio = 'activo_web' | 'activo' | 'pausado'
export type VisualServicio = 'clinical' | 'healing' | 'person_add' | 'video' | 'biotech' | 'heart'
export type TintServicio = 'brand' | 'amber' | 'sky' | 'violet' | 'rose' | 'emerald'
export type MetodoPago = 'presencial' | 'online'

export interface ServicioMedico {
  id: string
  nombre: string
  descripcion: string
  categoria: string
  codigoInterno: string
  modalidades: ModalidadServicio[]
  duracionMinutos: number
  bufferMinutos: number
  precio: number
  politicaFiscal: string
  metodoPago: MetodoPago
  salaAsignada: string
  visiblePublico: boolean
  requiereConfirmacion: boolean
  enviarCuestionario: boolean
  estado: EstadoServicio
  etiqueta?: string
  visual: VisualServicio
  tint: TintServicio
}

export const CATEGORIAS = ['Medicina General', 'Procedimientos / Curas', 'Evaluación Diagnóstica', 'Pruebas Clínicas', 'Telemedicina']

export const DURACIONES = [15, 30, 45, 60]
export const BUFFERS = [0, 5, 10, 15]
export const POLITICAS_FISCALES = ['Exento de IVA (Art. 20 Sanidad)', 'IVA Estándar (21%)']
export const SALAS = ['Box 1 - Consultas Rápidas', 'Box 2 - Dra. Elena Ramos (Principal)', 'Sala de Pruebas y Procedimientos']

export function nuevoServicioBase(): ServicioMedico {
  return {
    id: '',
    nombre: '',
    descripcion: '',
    categoria: CATEGORIAS[0],
    codigoInterno: '',
    modalidades: ['presencial'],
    duracionMinutos: 30,
    bufferMinutos: 0,
    precio: 0,
    politicaFiscal: POLITICAS_FISCALES[0],
    metodoPago: 'presencial',
    salaAsignada: SALAS[1],
    visiblePublico: true,
    requiereConfirmacion: false,
    enviarCuestionario: false,
    estado: 'activo',
    visual: 'clinical',
    tint: 'brand',
  }
}

export const serviciosIniciales: ServicioMedico[] = [
  {
    id: 's1',
    nombre: 'Consulta Médica General',
    descripcion: 'Evaluación diagnóstica primaria, anamnesis, exploración y prescripción facultativa.',
    categoria: 'Medicina General',
    codigoInterno: 'MG-GEN-01',
    modalidades: ['presencial', 'online'],
    duracionMinutos: 30,
    bufferMinutos: 0,
    precio: 65,
    politicaFiscal: POLITICAS_FISCALES[0],
    metodoPago: 'presencial',
    salaAsignada: SALAS[1],
    visiblePublico: true,
    requiereConfirmacion: false,
    enviarCuestionario: false,
    estado: 'activo_web',
    visual: 'clinical',
    tint: 'brand',
  },
  {
    id: 's2',
    nombre: 'Control Post-Operatorio y Curas',
    descripcion: 'Retirada de puntos, cura aséptica y evaluación de cicatrización post-quirúrgica.',
    categoria: 'Procedimientos / Curas',
    codigoInterno: 'MG-POST-02',
    modalidades: ['presencial'],
    duracionMinutos: 45,
    bufferMinutos: 10,
    precio: 80,
    politicaFiscal: POLITICAS_FISCALES[0],
    metodoPago: 'presencial',
    salaAsignada: SALAS[1],
    visiblePublico: true,
    requiereConfirmacion: true,
    enviarCuestionario: true,
    estado: 'activo',
    etiqueta: 'Historial previo obligatorio',
    visual: 'healing',
    tint: 'amber',
  },
  {
    id: 's3',
    nombre: 'Primera Visita / Evaluación Integral',
    descripcion: 'Apertura de historial médico detallado, revisión farmacológica y exploración física completa.',
    categoria: 'Evaluación Diagnóstica',
    codigoInterno: 'MG-EVAL-03',
    modalidades: ['presencial'],
    duracionMinutos: 60,
    bufferMinutos: 0,
    precio: 90,
    politicaFiscal: POLITICAS_FISCALES[0],
    metodoPago: 'presencial',
    salaAsignada: SALAS[1],
    visiblePublico: true,
    requiereConfirmacion: false,
    enviarCuestionario: true,
    estado: 'activo_web',
    visual: 'person_add',
    tint: 'brand',
  },
  {
    id: 's4',
    nombre: 'Videoconsulta Telemática',
    descripcion: 'Seguimiento clínico a distancia con prescripción electrónica cuando corresponda.',
    categoria: 'Telemedicina',
    codigoInterno: 'TM-VID-04',
    modalidades: ['online'],
    duracionMinutos: 30,
    bufferMinutos: 0,
    precio: 50,
    politicaFiscal: POLITICAS_FISCALES[0],
    metodoPago: 'online',
    salaAsignada: SALAS[0],
    visiblePublico: true,
    requiereConfirmacion: false,
    enviarCuestionario: false,
    estado: 'activo_web',
    etiqueta: 'Google Meet Auto-link',
    visual: 'video',
    tint: 'sky',
  },
  {
    id: 's5',
    nombre: 'Revisión de Analíticas y Pruebas',
    descripcion: 'Lectura de perfil bioquímico, hemograma o pruebas de imagen solicitadas previamente.',
    categoria: 'Pruebas Clínicas',
    codigoInterno: 'PC-ANA-05',
    modalidades: ['presencial', 'online'],
    duracionMinutos: 20,
    bufferMinutos: 0,
    precio: 40,
    politicaFiscal: POLITICAS_FISCALES[0],
    metodoPago: 'presencial',
    salaAsignada: SALAS[1],
    visiblePublico: true,
    requiereConfirmacion: false,
    enviarCuestionario: false,
    estado: 'activo',
    visual: 'biotech',
    tint: 'violet',
  },
  {
    id: 's6',
    nombre: 'Electrocardiograma Clínico y Lectura',
    descripcion: 'Toma de ECG en reposo 12 derivaciones con informe facultativo inmediato.',
    categoria: 'Pruebas Clínicas',
    codigoInterno: 'PC-ECG-06',
    modalidades: ['presencial'],
    duracionMinutos: 30,
    bufferMinutos: 0,
    precio: 75,
    politicaFiscal: POLITICAS_FISCALES[0],
    metodoPago: 'presencial',
    salaAsignada: SALAS[2],
    visiblePublico: true,
    requiereConfirmacion: false,
    enviarCuestionario: false,
    estado: 'activo',
    visual: 'heart',
    tint: 'rose',
  },
]
