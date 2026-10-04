// app/dashboard/pacientes/[id]/page.tsx
import { notFound } from 'next/navigation'
import { buscarPacientePorId } from '@/lib/mock/pacientes'
import { obtenerHistorialCitas } from '@/lib/mock/paciente-historial'
import { PacienteDetalleView } from '@/components/dashboard/paciente-detalle-view'

interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function PacienteDetallePage({ params }: PageProps) {
   const { id } = await params; 
  const paciente = buscarPacientePorId(id)
  if (!paciente) {
    notFound()
  }

  const citas = obtenerHistorialCitas(paciente.id)

  return <PacienteDetalleView paciente={paciente} citas={citas} />
}
