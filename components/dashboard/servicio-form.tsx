'use client'

// components/dashboard/servicio-form.tsx

import { useEffect, useState, type FormEvent } from 'react'
import { BUFFERS, CATEGORIAS, DURACIONES, POLITICAS_FISCALES, SALAS, type ModalidadServicio, type ServicioMedico } from '@/lib/mock/servicios'
import { EditNoteIcon, SaveIcon } from './servicios-icons'

interface ServicioFormProps {
  servicio: ServicioMedico
  isEditing: boolean
  onSave: (servicio: ServicioMedico) => void
  onDiscard: () => void
}

const MODALIDADES: { value: ModalidadServicio; label: string; hint: string }[] = [
  { value: 'presencial', label: 'Presencial', hint: 'En consultorio' },
  { value: 'online', label: 'Videoconsulta', hint: 'Telemedicina' },
  { value: 'domicilio', label: 'A Domicilio', hint: 'Visita médica' },
]

export function ServicioForm({ servicio, isEditing, onSave, onDiscard }: ServicioFormProps) {
  const [form, setForm] = useState<ServicioMedico>(servicio)

  // Sincroniza el formulario cuando se selecciona otro servicio para editar.
  useEffect(() => {
    setForm(servicio)
  }, [servicio])

  function update<K extends keyof ServicioMedico>(key: K, value: ServicioMedico[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleModalidad(modalidad: ModalidadServicio) {
    setForm((prev) => {
      const tiene = prev.modalidades.includes(modalidad)
      const siguiente = tiene ? prev.modalidades.filter((m) => m !== modalidad) : [...prev.modalidades, modalidad]
      // Al menos una modalidad debe quedar seleccionada.
      return { ...prev, modalidades: siguiente.length > 0 ? siguiente : prev.modalidades }
    })
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSave(form)
  }

  return (
    <form className="servicios-form-panel" onSubmit={handleSubmit}>
      <div className="servicios-form-head">
        <div className="servicios-form-head-title">
          <span className="servicios-form-head-icon">
            <EditNoteIcon />
          </span>
          <h2>Registrar / Editar Prestación</h2>
        </div>
        <span className="servicios-form-badge">{isEditing ? 'Editando' : 'Nuevo Registro'}</span>
      </div>

      <div className="servicios-form-body">
        <div className="servicios-field">
          <label htmlFor="servicio-nombre">Nombre del Servicio Médico *</label>
          <input
            id="servicio-nombre"
            type="text"
            value={form.nombre}
            onChange={(event) => update('nombre', event.target.value)}
            placeholder="Ej. Control Post-Operatorio y Curas"
            required
          />
          <span className="servicios-field-hint">Visible para pacientes en el comprobante y reservas online.</span>
        </div>

        <div className="servicios-field-row">
          <div className="servicios-field">
            <label htmlFor="servicio-categoria">Categoría Clínica *</label>
            <select id="servicio-categoria" value={form.categoria} onChange={(event) => update('categoria', event.target.value)}>
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="servicios-field">
            <label htmlFor="servicio-codigo">Código CIE / Interno</label>
            <input id="servicio-codigo" type="text" value={form.codigoInterno} onChange={(event) => update('codigoInterno', event.target.value)} />
          </div>
        </div>

        <div className="servicios-field">
          <label>Modalidad de Atención Admitida *</label>
          <div className="servicios-modality-grid">
            {MODALIDADES.map((modalidad) => {
              const checked = form.modalidades.includes(modalidad.value)
              return (
                <label key={modalidad.value} className={`servicios-modality-option${checked ? ' is-checked' : ''}`}>
                  <input type="checkbox" checked={checked} onChange={() => toggleModalidad(modalidad.value)} />
                  <span className="servicios-modality-text">
                    <strong>{modalidad.label}</strong>
                    <small>{modalidad.hint}</small>
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        <div className="servicios-field-group">
          <div className="servicios-field">
            <label htmlFor="servicio-duracion">Duración Consulta *</label>
            <select id="servicio-duracion" value={form.duracionMinutos} onChange={(event) => update('duracionMinutos', Number(event.target.value))}>
              {DURACIONES.map((min) => (
                <option key={min} value={min}>
                  {min} minutos
                </option>
              ))}
            </select>
          </div>
          <div className="servicios-field">
            <label htmlFor="servicio-buffer">Descanso / Buffer</label>
            <select id="servicio-buffer" value={form.bufferMinutos} onChange={(event) => update('bufferMinutos', Number(event.target.value))}>
              {BUFFERS.map((min) => (
                <option key={min} value={min}>
                  {min === 0 ? 'Sin buffer' : `${min} min`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="servicios-field">
          <label>Honorarios y Política de Facturación *</label>
          <div className="servicios-price-row">
            <div className="servicios-price-input">
              <input
                type="number"
                min={0}
                step="0.01"
                value={form.precio}
                onChange={(event) => update('precio', Number(event.target.value))}
              />
              <span>€</span>
            </div>
            <select className="servicios-price-tax" value={form.politicaFiscal} onChange={(event) => update('politicaFiscal', event.target.value)}>
              {POLITICAS_FISCALES.map((pol) => (
                <option key={pol} value={pol}>
                  {pol}
                </option>
              ))}
            </select>
          </div>

          <span className="servicios-field-hint servicios-payment-label">Método de cobro preferente:</span>
          <div className="servicios-payment-grid">
            <label className={`servicios-payment-option${form.metodoPago === 'presencial' ? ' is-checked' : ''}`}>
              <input type="radio" name="metodoPago" checked={form.metodoPago === 'presencial'} onChange={() => update('metodoPago', 'presencial')} />
              <span>Pago en consulta (Tpv/Efectivo)</span>
            </label>
            <label className={`servicios-payment-option${form.metodoPago === 'online' ? ' is-checked' : ''}`}>
              <input type="radio" name="metodoPago" checked={form.metodoPago === 'online'} onChange={() => update('metodoPago', 'online')} />
              <span>Prepago online (Stripe)</span>
            </label>
          </div>
        </div>

        <div className="servicios-field">
          <label htmlFor="servicio-sala">Sala / Consultorio Asignado por defecto</label>
          <select id="servicio-sala" value={form.salaAsignada} onChange={(event) => update('salaAsignada', event.target.value)}>
            {SALAS.map((sala) => (
              <option key={sala} value={sala}>
                {sala}
              </option>
            ))}
          </select>
        </div>

        <div className="servicios-visibility-box">
          <div className="servicios-visibility-row">
            <div>
              <span className="servicios-visibility-title">Visibilidad pública</span>
              <span className="servicios-visibility-sub">auraflow.io/dr-mateo</span>
            </div>
            <label className="servicios-toggle">
              <input type="checkbox" checked={form.visiblePublico} onChange={(event) => update('visiblePublico', event.target.checked)} />
              <span className="servicios-toggle-track" />
            </label>
          </div>
          <div className="servicios-visibility-checks">
            <label>
              <input type="checkbox" checked={form.requiereConfirmacion} onChange={(event) => update('requiereConfirmacion', event.target.checked)} />
              <span>Requiere confirmación previa del médico</span>
            </label>
            <label>
              <input type="checkbox" checked={form.enviarCuestionario} onChange={(event) => update('enviarCuestionario', event.target.checked)} />
              <span>Enviar cuestionario de salud anamnésico al paciente</span>
            </label>
          </div>
        </div>

        <div className="servicios-form-actions">
          <button type="button" className="servicios-btn servicios-btn-ghost" onClick={onDiscard}>
            Descartar cambios
          </button>
          <button type="submit" className="servicios-btn servicios-btn-primary">
            <SaveIcon />
            <span>Guardar Servicio</span>
          </button>
        </div>
      </div>
    </form>
  )
}
