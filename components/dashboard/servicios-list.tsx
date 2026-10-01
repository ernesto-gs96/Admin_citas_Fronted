'use client'

// components/dashboard/servicios-list.tsx

import {
  ApartmentIcon,
  CopyIcon,
  ExternalLinkIcon,
  GlobeIcon,
  MeetingRoomIcon,
  PauseCircleIcon,
  PencilIcon,
  PlayCircleIcon,
  SERVICE_VISUAL_ICON,
  TimerIcon,
} from './servicios-icons'
import type { ServicioMedico } from '@/lib/mock/servicios'
import type { VistaServicios } from './servicios-filter-bar'

interface ServiciosListProps {
  servicios: ServicioMedico[]
  vista: VistaServicios
  selectedId: string | null
  onEdit: (id: string) => void
  onDuplicate: (id: string) => void
  onToggleEstado: (id: string) => void
}

const ESTADO_LABEL: Record<ServicioMedico['estado'], string> = {
  activo_web: 'Activo en web',
  activo: 'Activo',
  pausado: 'Pausado',
}

function modalidadLabel(servicio: ServicioMedico) {
  const tiene = (m: ServicioMedico['modalidades'][number]) => servicio.modalidades.includes(m)
  if (tiene('presencial') && tiene('online')) return 'Presencial & Online'
  if (tiene('online')) return 'Solo Online'
  if (tiene('domicilio')) return 'A Domicilio'
  return 'Solo Presencial'
}

export function ServiciosList({ servicios, vista, selectedId, onEdit, onDuplicate, onToggleEstado }: ServiciosListProps) {
  return (
    <div className="servicios-panel">
      <div className="servicios-panel-head">
        <div className="servicios-panel-title">
          <TimerIcon />
          <h2>Prestaciones Médicas Activas</h2>
        </div>
        <span className="servicios-panel-sync">Sincronización en tiempo real</span>
      </div>

      {servicios.length === 0 ? (
        <div className="servicios-empty">Ningún servicio coincide con los filtros aplicados.</div>
      ) : (
        <div className={`servicios-items${vista === 'grid' ? ' is-grid' : ''}`}>
          {servicios.map((servicio) => {
            const Icon = SERVICE_VISUAL_ICON[servicio.visual]
            const isSelected = servicio.id === selectedId

            return (
              <div key={servicio.id} className={`servicios-item${vista === 'grid' ? ' is-grid-card' : ''}${isSelected ? ' is-selected' : ''}`}>
                <div className="servicios-item-main">
                  <span className={`servicios-item-icon tint-${servicio.tint}`}>
                    <Icon />
                  </span>
                  <div className="servicios-item-info">
                    <div className="servicios-item-title-row">
                      <span className="servicios-item-name">{servicio.nombre}</span>
                      <span className={`servicios-item-status status-${servicio.estado}`}>
                        <span className="servicios-item-status-dot" />
                        {ESTADO_LABEL[servicio.estado]}
                      </span>
                      {servicio.etiqueta && <span className="servicios-item-tag">{servicio.etiqueta}</span>}
                    </div>
                    <div className="servicios-item-meta">
                      <span>
                        <ApartmentIcon />
                        {modalidadLabel(servicio)}
                      </span>
                      <span className="servicios-item-meta-sep">·</span>
                      <span>
                        <TimerIcon />
                        {servicio.duracionMinutos} min{servicio.bufferMinutos > 0 ? ` (+${servicio.bufferMinutos} min prep)` : ''}
                      </span>
                      <span className="servicios-item-meta-sep">·</span>
                      <span>
                        <MeetingRoomIcon />
                        {servicio.salaAsignada.split(' - ')[0]}
                      </span>
                    </div>
                    <p className="servicios-item-desc">{servicio.descripcion}</p>
                  </div>
                </div>

                <div className="servicios-item-side">
                  <div className="servicios-item-price">
                    <strong>{servicio.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })} €</strong>
                    <span>Exento IVA</span>
                  </div>
                  <div className="servicios-item-actions">
                    <button type="button" className="servicios-item-action is-edit" title="Editar" onClick={() => onEdit(servicio.id)}>
                      <PencilIcon />
                    </button>
                    <button type="button" className="servicios-item-action" title="Duplicar" onClick={() => onDuplicate(servicio.id)}>
                      <CopyIcon />
                    </button>
                    <button
                      type="button"
                      className="servicios-item-action is-danger"
                      title={servicio.estado === 'pausado' ? 'Reanudar servicio' : 'Pausar servicio'}
                      onClick={() => onToggleEstado(servicio.id)}
                    >
                      {servicio.estado === 'pausado' ? <PlayCircleIcon /> : <PauseCircleIcon />}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="servicios-panel-foot">
        <span>Régimen fiscal: Servicios médicos exentos según el Art. 20.Uno.3º Ley 37/1992 del IVA.</span>
        <a href="/dashboard/configuracion">Gestionar impuestos</a>
      </div>
    </div>
  )
}

export function ServiciosPublicBanner({ bookingLink }: { bookingLink: string }) {
  return (
    <div className="servicios-public-banner">
      <div className="servicios-public-banner-main">
        <span className="servicios-public-banner-icon">
          <GlobeIcon />
        </span>
        <div>
          <h4>Página pública de reserva habilitada</h4>
          <p>Los servicios con check verde están visibles para que los pacientes reserven online.</p>
        </div>
      </div>
      <a href={`https://${bookingLink}`} target="_blank" rel="noreferrer" className="servicios-public-link">
        <span>{bookingLink}</span>
        <ExternalLinkIcon />
      </a>
    </div>
  )
}
