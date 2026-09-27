import { Modality, ServiceOption } from '@/lib/mock/appointment-form'
import { BuildingIcon, CheckIcon, VideoIcon } from '@/components/dashboard/dashboard-icons'

export function ServiceStep({
  services,
  selectedServiceId,
  onSelectService,
  modality,
  onSelectModality,
  notes,
  onNotesChange,
}: {
  services: ServiceOption[]
  selectedServiceId: string
  onSelectService: (id: string) => void
  modality: Modality
  onSelectModality: (modality: Modality) => void
  notes: string
  onNotesChange: (value: string) => void
}) {
  return (
    <section className="form-section">
      <div className="form-section-header">
        <div className="form-section-title">
          <span className="form-step-number">2</span>
          <h2>Servicio y Modalidad de Atención</h2>
        </div>
        <span className="form-section-hint">Paso requerido</span>
      </div>

      <fieldset>
        <legend className="form-label">Seleccionar acto médico o consulta</legend>
        <div className="service-grid">
          {services.map((service) => {
            const active = service.id === selectedServiceId
            return (
              <label key={service.id} className={`service-card ${active ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="service"
                  value={service.id}
                  checked={active}
                  onChange={() => onSelectService(service.id)}
                  className="sr-only"
                />
                <div className="service-card-head">
                  <span>{service.name}</span>
                  {active ? <CheckIcon /> : <span className="service-radio-dot" aria-hidden="true" />}
                </div>
                <p className="service-card-description">{service.description}</p>
                <div className="service-card-footer">
                  <span>{service.durationMinutes} min</span>
                  <span className="service-card-price">{service.price.toFixed(2)} €</span>
                </div>
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="form-label">Modalidad de asistencia</legend>
        <div className="modality-grid">
          <label className={`modality-card ${modality === 'presencial' ? 'active' : ''}`}>
            <div className="modality-card-main">
              <input type="radio" name="modality" checked={modality === 'presencial'} onChange={() => onSelectModality('presencial')} />
              <div>
                <span className="modality-title">Presencial en Clínica</span>
                <span className="modality-subtitle">Consultorio · confirmar sala en Disponibilidad</span>
              </div>
            </div>
            <BuildingIcon />
          </label>
          <label className={`modality-card ${modality === 'video' ? 'active' : ''}`}>
            <div className="modality-card-main">
              <input type="radio" name="modality" checked={modality === 'video'} onChange={() => onSelectModality('video')} />
              <div>
                <span className="modality-title">Videoconsulta</span>
                <span className="modality-subtitle">Enlace de videollamada enviado al paciente</span>
              </div>
            </div>
            <VideoIcon />
          </label>
        </div>
      </fieldset>

      <div className="form-field">
        <label htmlFor="appointment-notes" className="form-label">Motivo de consulta o síntomas iniciales</label>
        <textarea
          id="appointment-notes"
          rows={2}
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          placeholder="Ej. Revisión periódica de tratamiento y evaluación de analítica reciente…"
        />
      </div>
    </section>
  )
}
