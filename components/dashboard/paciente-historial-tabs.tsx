'use client'

// components/dashboard/paciente-historial-tabs.tsx

import { useState } from 'react'
import { ESTADO_HISTORIAL_LABEL, type CitaHistorialItem } from '@/lib/mock/paciente-historial'
import { EventIcon } from './pacientes-icons'
import { AddCircleIcon, FlaskIcon } from './servicios-icons'
import { ArrowForwardIcon } from './disponibilidad-icons'
import { FolderSpecialIcon, PostAddIcon, PrescriptionsIcon, StethoscopeIcon } from './paciente-detalle-icons'

type Tab = 'citas' | 'estudios' | 'recetas'

interface PacienteHistorialTabsProps {
  citas: CitaHistorialItem[]
  onVerDetalles: (citaId: string) => void
  onIniciarConsulta: (citaId: string) => void
}

export function PacienteHistorialTabs({ citas, onVerDetalles, onIniciarConsulta }: PacienteHistorialTabsProps) {
  const [tab, setTab] = useState<Tab>('citas')

  return (
    <div className="paciente-tabs-wrap">
      <div className="paciente-tabs-bar" role="tablist">
        <button type="button" role="tab" aria-selected={tab === 'citas'} className={tab === 'citas' ? 'active' : ''} onClick={() => setTab('citas')}>
          <EventIcon />
          <span>Historial de Citas</span>
          <span className="paciente-tabs-count">{citas.length} citas</span>
        </button>
        <button type="button" role="tab" aria-selected={tab === 'estudios'} className={tab === 'estudios' ? 'active' : ''} onClick={() => setTab('estudios')}>
          <FlaskIcon />
          <span>Estudios y Diagnósticos</span>
        </button>
        <button type="button" role="tab" aria-selected={tab === 'recetas'} className={tab === 'recetas' ? 'active' : ''} onClick={() => setTab('recetas')}>
          <PrescriptionsIcon />
          <span>Recetas Médicas</span>
        </button>
      </div>

      {tab === 'citas' && (
        <div className="paciente-timeline">
          {citas.length === 0 && (
            <div className="paciente-tab-empty">
              <span>
                <FolderSpecialIcon />
              </span>
              <p className="paciente-tab-empty-title">Aún no hay citas registradas</p>
              <p className="paciente-tab-empty-desc">El historial de consultas de este paciente aparecerá aquí en cuanto se agende la primera cita.</p>
            </div>
          )}
          {citas.map((cita) => (
            <div key={cita.id} className={`paciente-cita-card${cita.esProxima ? ' is-proxima' : ''}`}>
              <div className="paciente-cita-top">
                <div className="paciente-cita-badges">
                  <span className={`paciente-cita-estado estado-${cita.estado}`}>
                    <span />
                    {ESTADO_HISTORIAL_LABEL[cita.estado]}
                  </span>
                  <span className="paciente-cita-modalidad">{cita.modalidad}</span>
                </div>
                <span className={`paciente-cita-fecha${cita.esProxima ? ' is-proxima' : ''}`}>{cita.fechaLabel}</span>
              </div>

              <div>
                <h3>{cita.titulo}</h3>
                <p>{cita.descripcion}</p>
              </div>

              <div className="paciente-cita-foot">
                <span className="paciente-cita-medico">
                  <StethoscopeIcon />
                  {cita.esProxima ? (
                    <>
                      Médico asignado: <strong>{cita.medico}</strong>
                    </>
                  ) : (
                    cita.medico
                  )}
                </span>

                {cita.esProxima ? (
                  <div className="paciente-cita-actions">
                    <button type="button" className="paciente-cita-btn-outline" onClick={() => onVerDetalles(cita.id)}>
                      Ver detalles
                    </button>
                    <button type="button" className="paciente-cita-btn-primary" onClick={() => onIniciarConsulta(cita.id)}>
                      Iniciar consulta
                    </button>
                  </div>
                ) : (
                  <button type="button" className="paciente-cita-link">
                    <span>Ver informe clínico</span>
                    <ArrowForwardIcon />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'estudios' && (
        <div className="paciente-tab-section">
          <div className="paciente-tab-section-head">
            <h3>Estudios Clínicos y Diagnósticos Recientes</h3>
            <button type="button" className="paciente-tab-add-link">
              <AddCircleIcon />
              <span>Añadir diagnóstico</span>
            </button>
          </div>
          <div className="paciente-tab-empty">
            <span>
              <FolderSpecialIcon />
            </span>
            <p className="paciente-tab-empty-title">Aún no hay estudios o diagnósticos registrados</p>
            <p className="paciente-tab-empty-desc">
              Los informes de laboratorio, analíticas y diagnósticos clínicos aparecerán en esta sección una vez sincronizados con el laboratorio o expediente digital.
            </p>
            <button type="button" className="paciente-tab-empty-btn">
              <PostAddIcon />
              <span>Añadir nota clínica</span>
            </button>
          </div>
        </div>
      )}

      {tab === 'recetas' && (
        <div className="paciente-tab-section">
          <div className="paciente-tab-section-head">
            <h3>Recetas Médicas Emitidas</h3>
            <button type="button" className="paciente-tab-add-link">
              <AddCircleIcon />
              <span>Emitir receta</span>
            </button>
          </div>
          <div className="paciente-tab-empty">
            <span>
              <PrescriptionsIcon />
            </span>
            <p className="paciente-tab-empty-title">Aún no hay recetas médicas emitidas</p>
            <p className="paciente-tab-empty-desc">Las recetas que emitas para este paciente quedarán registradas aquí para futura referencia.</p>
          </div>
        </div>
      )}
    </div>
  )
}
