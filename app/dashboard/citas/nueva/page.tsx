'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { PatientStep } from '@/components/citas/patient-step'
import { ServiceStep } from '@/components/citas/service-step'
import { ScheduleStep } from '@/components/citas/schedule-step'
import { ReminderStep, ReminderState } from '@/components/citas/reminder-step'
import { AppointmentSummary } from '@/components/citas/appointment-summary'
import {
  Modality,
  dayOptions,
  mockSelectedPatient,
  neighboringSlots,
  serviceOptions,
  timeSlotOptions,
} from '@/lib/mock/appointment-form'

export default function NuevaCitaPage() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const specialistName = session?.user?.name || 'Tu cuenta'

  const [selectedServiceId, setSelectedServiceId] = useState(serviceOptions[0].id)
  const [modality, setModality] = useState<Modality>('presencial')
  const [notes, setNotes] = useState(
    'Revisión periódica de tratamiento y evaluación de analítica reciente.'
  )
  const [selectedDayId, setSelectedDayId] = useState(dayOptions[0].id)
  const [selectedSlotId, setSelectedSlotId] = useState(timeSlotOptions[0].id)
  const [reminders, setReminders] = useState<ReminderState>({
    whatsappNow: true,
    reminder24h: true,
    calendarInvite: true,
  })

  const selectedService = useMemo(
    () => serviceOptions.find((service) => service.id === selectedServiceId) ?? serviceOptions[0],
    [selectedServiceId]
  )
  const selectedDay = useMemo(
    () => dayOptions.find((day) => day.id === selectedDayId) ?? dayOptions[0],
    [selectedDayId]
  )
  const selectedSlot = useMemo(
    () => timeSlotOptions.find((slot) => slot.id === selectedSlotId),
    [selectedSlotId]
  )

  function handleConfirm() {
    // TODO: sin backend de citas todavía — esto solo regresa al listado, no persiste nada.
    router.push('/dashboard/citas')
  }

  return (
    <div className="appointment-form-page">
      <div className="form-breadcrumb">
        <Link href="/dashboard/citas">Citas</Link>
        <span aria-hidden="true">›</span>
        <span>Nueva cita</span>
      </div>

      <div className="form-page-header">
        <div>
          <h1>Programar Nueva Cita</h1>
          <p>Registra una cita médica presencial o telemática para tu agenda.</p>
        </div>
        <div className="form-page-header-actions">
          <Link href="/dashboard/citas" className="form-button-ghost">Descartar</Link>
          {/* TODO: guardar borrador real cuando exista persistencia */}
          <button type="button" className="form-button-outline">Guardar borrador</button>
        </div>
      </div>

      <div className="appointment-form-layout">
        <div className="appointment-form-main">
          <PatientStep patient={mockSelectedPatient} />

          <ServiceStep
            services={serviceOptions}
            selectedServiceId={selectedServiceId}
            onSelectService={setSelectedServiceId}
            modality={modality}
            onSelectModality={setModality}
            notes={notes}
            onNotesChange={setNotes}
          />

          <ScheduleStep
            days={dayOptions}
            selectedDayId={selectedDayId}
            onSelectDay={setSelectedDayId}
            slots={timeSlotOptions}
            selectedSlotId={selectedSlotId}
            onSelectSlot={setSelectedSlotId}
            specialistName={specialistName}
          />

          <ReminderStep
            value={reminders}
            onChange={setReminders}
            patientPhone={mockSelectedPatient.phone}
            patientEmail={mockSelectedPatient.email}
          />
        </div>

        <div className="appointment-form-side">
          <AppointmentSummary
            day={selectedDay}
            slot={selectedSlot}
            service={selectedService}
            patient={mockSelectedPatient}
            specialistName={specialistName}
            modalityLabel={modality === 'presencial' ? 'Presencial' : 'Videoconsulta'}
            onConfirm={handleConfirm}
            neighboringSlots={neighboringSlots}
          />
        </div>
      </div>
    </div>
  )
}
