'use client'

// components/dashboard/servicios-view.tsx
// Orquesta el estado del catálogo de servicios y compone MAIN SCROLLABLE CANVAS.

import { useMemo, useState } from 'react'
import { nuevoServicioBase, serviciosIniciales, type ServicioMedico } from '@/lib/mock/servicios'
import { ServiciosBreadcrumb } from './servicios-breadcrumb'
import { ServiciosHeader } from './servicios-header'
import { ServiciosKpiCards } from './servicios-kpi-cards'
import { ServiciosFilterBar, type EstadoFiltroServicio, type VistaServicios } from './servicios-filter-bar'
import { ServiciosList, ServiciosPublicBanner } from './servicios-list'
import { ServicioForm } from './servicio-form'

const BOOKING_LINK = 'auraflow.io/dr-mateo'

export function ServiciosView() {
  const [servicios, setServicios] = useState<ServicioMedico[]>(serviciosIniciales)
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [estadoFiltro, setEstadoFiltro] = useState<EstadoFiltroServicio>('todos')
  const [vista, setVista] = useState<VistaServicios>('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const serviciosFiltrados = useMemo(() => {
    const term = search.trim().toLowerCase()
    return servicios.filter((servicio) => {
      const matchesSearch = term === '' || servicio.nombre.toLowerCase().includes(term) || servicio.descripcion.toLowerCase().includes(term)
      const matchesCategoria = categoria === 'todas' || servicio.categoria === categoria
      const matchesEstado =
        estadoFiltro === 'todos' ||
        (estadoFiltro === 'activo_web' && servicio.estado === 'activo_web') ||
        (estadoFiltro === 'presencial' && servicio.modalidades.includes('presencial')) ||
        (estadoFiltro === 'online' && servicio.modalidades.includes('online'))
      return matchesSearch && matchesCategoria && matchesEstado
    })
  }, [servicios, search, categoria, estadoFiltro])

  const servicioSeleccionado = servicios.find((s) => s.id === selectedId) ?? null
  const formValue = servicioSeleccionado ?? nuevoServicioBase()

  function handleEdit(id: string) {
    setSelectedId(id)
  }

  function handleNuevoServicio() {
    setSelectedId(null)
  }

  function handleDuplicate(id: string) {
    const original = servicios.find((s) => s.id === id)
    if (!original) return
    const copia: ServicioMedico = { ...original, id: `${original.id}-copia-${Date.now()}`, nombre: `${original.nombre} (copia)`, estado: 'activo' }
    setServicios((prev) => [...prev, copia])
  }

  function handleToggleEstado(id: string) {
    setServicios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, estado: s.estado === 'pausado' ? 'activo' : 'pausado' } : s)),
    )
  }

  function handleSave(data: ServicioMedico) {
    if (data.id) {
      setServicios((prev) => prev.map((s) => (s.id === data.id ? data : s)))
    } else {
      setServicios((prev) => [...prev, { ...data, id: `s-${Date.now()}` }])
    }
    setSelectedId(null)
  }

  return (
    <div className="servicios-page">
      <ServiciosBreadcrumb />

      <main className="servicios-canvas">
        <ServiciosHeader totalServicios={servicios.length} onNuevoServicio={handleNuevoServicio} />

        <ServiciosKpiCards servicios={servicios} />

        <ServiciosFilterBar
          search={search}
          onSearchChange={setSearch}
          categoria={categoria}
          onCategoriaChange={setCategoria}
          estadoFiltro={estadoFiltro}
          onEstadoFiltroChange={setEstadoFiltro}
          vista={vista}
          onVistaChange={setVista}
          visibles={serviciosFiltrados.length}
          total={servicios.length}
        />

        <div className="servicios-workspace">
          <div className="servicios-list-col">
            <ServiciosList
              servicios={serviciosFiltrados}
              vista={vista}
              selectedId={selectedId}
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onToggleEstado={handleToggleEstado}
            />
            <ServiciosPublicBanner bookingLink={BOOKING_LINK} />
          </div>

          <div className="servicios-form-col">
            <ServicioForm servicio={formValue} isEditing={Boolean(servicioSeleccionado)} onSave={handleSave} onDiscard={handleNuevoServicio} />
          </div>
        </div>
      </main>
    </div>
  )
}
