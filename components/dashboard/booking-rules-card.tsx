'use client'

// components/dashboard/booking-rules-card.tsx
// COLUMNA DERECHA (bloque 2): Reglas de Reserva Inteligente.

import Link from 'next/link'
import type { ReglasReserva } from '@/lib/mock/disponibilidad'
import { ArrowForwardIcon } from './disponibilidad-icons'
import { TuneIcon } from './servicios-icons'

interface BookingRulesCardProps {
  reglas: ReglasReserva
  onChange: (patch: Partial<ReglasReserva>) => void
}

export function BookingRulesCard({ reglas, onChange }: BookingRulesCardProps) {
  return (
    <div className="disp-card disp-card-compact">
      <div className="disp-block-head">
        <span className="disp-block-head-icon is-muted">
          <TuneIcon />
        </span>
        <h2>Reglas de Reserva Inteligente</h2>
      </div>

      <div className="disp-rules">
        <div className="disp-rule">
          <div>
            <span className="disp-rule-title">Aviso mínimo previo</span>
            <span className="disp-rule-desc">Evita citas imprevistas de última hora</span>
          </div>
          <div className="disp-rule-number">
            <input
              type="number"
              min={0}
              value={reglas.avisoMinimoHoras}
              onChange={(event) => onChange({ avisoMinimoHoras: Number(event.target.value) })}
            />
            <span>horas</span>
          </div>
        </div>

        <div className="disp-rule">
          <div>
            <span className="disp-rule-title">Ventana de reserva futura</span>
            <span className="disp-rule-desc">Máximo número de días abiertos</span>
          </div>
          <div className="disp-rule-number">
            <input
              type="number"
              min={0}
              value={reglas.ventanaReservaDias}
              onChange={(event) => onChange({ ventanaReservaDias: Number(event.target.value) })}
            />
            <span>días</span>
          </div>
        </div>

        <div className="disp-rule">
          <div>
            <span className="disp-rule-title">Auto-bloqueo con Google Calendar</span>
            <span className="disp-rule-desc">Ocultar citas si hay eventos personales</span>
          </div>
          <label className="disp-switch">
            <input type="checkbox" checked={reglas.autoBloqueoGoogle} onChange={(event) => onChange({ autoBloqueoGoogle: event.target.checked })} />
            <span className="disp-switch-track is-emerald" />
          </label>
        </div>

        <div className="disp-rule">
          <div>
            <span className="disp-rule-title">Tiempo de cortesía / Buffer</span>
            <span className="disp-rule-desc">Descanso estricto post-consulta</span>
          </div>
          <div className="disp-rule-number">
            <input
              type="number"
              min={0}
              value={reglas.bufferMinutos}
              onChange={(event) => onChange({ bufferMinutos: Number(event.target.value) })}
            />
            <span>min</span>
          </div>
        </div>
      </div>

      <div className="disp-rules-foot">
        <Link href="/dashboard/servicios">
          <span>Avanzado: Configurar excepciones por servicio</span>
          <ArrowForwardIcon />
        </Link>
      </div>
    </div>
  )
}
