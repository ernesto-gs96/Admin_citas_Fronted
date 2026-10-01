// components/dashboard/servicios-kpi-cards.tsx

import { useMemo } from 'react'
import type { ServicioMedico } from '@/lib/mock/servicios'
import { BanknotesIcon, CheckCircleIcon, PieChartIcon, TimerIcon } from './servicios-icons'

interface ServiciosKpiCardsProps {
  servicios: ServicioMedico[]
}

export function ServiciosKpiCards({ servicios }: ServiciosKpiCardsProps) {
  const kpis = useMemo(() => {
    const activos = servicios.filter((s) => s.estado !== 'pausado')
    const totalActivos = activos.length
    const online = activos.filter((s) => s.visiblePublico).length
    const porcentajeOnline = totalActivos === 0 ? 0 : Math.round((online / totalActivos) * 100)

    const duracionPromedio = totalActivos === 0 ? 0 : Math.round(activos.reduce((sum, s) => sum + s.duracionMinutos, 0) / totalActivos)
    const bufferPromedio = totalActivos === 0 ? 0 : Math.round(activos.reduce((sum, s) => sum + s.bufferMinutos, 0) / totalActivos)

    const precios = activos.map((s) => s.precio)
    const precioPromedio = precios.length === 0 ? 0 : precios.reduce((a, b) => a + b, 0) / precios.length
    const precioMin = precios.length === 0 ? 0 : Math.min(...precios)
    const precioMax = precios.length === 0 ? 0 : Math.max(...precios)

    const presenciales = activos.filter((s) => s.modalidades.includes('presencial')).length
    const onlineVideo = activos.filter((s) => s.modalidades.includes('online')).length
    const totalModalidades = presenciales + onlineVideo || 1
    const pctPresencial = Math.round((presenciales / totalModalidades) * 100)
    const pctOnline = 100 - pctPresencial

    return { totalActivos, porcentajeOnline, duracionPromedio, bufferPromedio, precioPromedio, precioMin, precioMax, pctPresencial, pctOnline }
  }, [servicios])

  const formatEuros = (value: number) => `${value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`

  return (
    <div className="servicios-kpi-grid">
      <div className="servicios-kpi-card">
        <div className="servicios-kpi-head">
          <span>Servicios Activos</span>
          <span className="servicios-kpi-icon tint-emerald">
            <CheckCircleIcon />
          </span>
        </div>
        <div className="servicios-kpi-value">
          <strong>{kpis.totalActivos}</strong>
          <span>prestaciones habilitadas</span>
        </div>
        <div className="servicios-kpi-foot servicios-kpi-foot-positive">{kpis.porcentajeOnline}% disponibles online</div>
      </div>

      <div className="servicios-kpi-card">
        <div className="servicios-kpi-head">
          <span>Duración Promedio</span>
          <span className="servicios-kpi-icon tint-brand">
            <TimerIcon />
          </span>
        </div>
        <div className="servicios-kpi-value">
          <strong>{kpis.duracionPromedio} min</strong>
          <span>por consulta</span>
        </div>
        <div className="servicios-kpi-foot">+{kpis.bufferPromedio} min preparación box</div>
      </div>

      <div className="servicios-kpi-card">
        <div className="servicios-kpi-head">
          <span>Precio Promedio</span>
          <span className="servicios-kpi-icon tint-amber">
            <BanknotesIcon />
          </span>
        </div>
        <div className="servicios-kpi-value">
          <strong>{formatEuros(kpis.precioPromedio)}</strong>
          <span>IVA exento</span>
        </div>
        <div className="servicios-kpi-foot">
          Rango: {formatEuros(kpis.precioMin)} - {formatEuros(kpis.precioMax)}
        </div>
      </div>

      <div className="servicios-kpi-card">
        <div className="servicios-kpi-head">
          <span>Modalidad Más Reservada</span>
          <span className="servicios-kpi-icon tint-sky">
            <PieChartIcon />
          </span>
        </div>
        <div className="servicios-kpi-value servicios-kpi-value-inline">
          <strong>{kpis.pctPresencial}%</strong>
          <span>Presencial</span>
        </div>
        <div className="servicios-kpi-bar">
          <div className="servicios-kpi-bar-track">
            <span style={{ width: `${kpis.pctPresencial}%` }} />
          </div>
          <span className="servicios-kpi-bar-label">{kpis.pctOnline}% Video</span>
        </div>
      </div>
    </div>
  )
}
