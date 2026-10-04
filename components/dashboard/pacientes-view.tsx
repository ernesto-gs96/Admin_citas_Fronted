'use client'

// components/dashboard/pacientes-view.tsx
// Orquesta el estado de /dashboard/pacientes y compone el layout de 2 columnas.

import { useMemo, useState } from 'react'
import { pacientesIniciales, type Paciente } from '@/lib/mock/pacientes'
import { PacientesHeader } from './pacientes-header'
import { PacientesFilterBar } from './pacientes-filter-bar'
import { PacientesList } from './pacientes-list'
import { PacienteFicha } from './paciente-ficha'

const PAGE_SIZE = 5

export function PacientesView() {
  const [search, setSearch] = useState('')
  const [estado, setEstado] = useState('Todos los estados')
  const [etiqueta, setEtiqueta] = useState('Cualquiera')
  const [orden, setOrden] = useState('Última visita')
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState<string | null>(pacientesIniciales[0]?.id ?? null)

  const pacientesFiltrados = useMemo(() => {
    const term = search.trim().toLowerCase()
    let lista = pacientesIniciales.filter((p) => {
      const matchesSearch = term === '' || p.nombre.toLowerCase().includes(term) || p.expediente.toLowerCase().includes(term) || p.telefono.includes(term)
      const matchesEstado = estado === 'Todos los estados' || (estado === 'Activa' ? p.estado === 'activa' : p.estado === 'inactiva')
      const matchesEtiqueta = etiqueta === 'Cualquiera' || p.condicion === etiqueta
      return matchesSearch && matchesEstado && matchesEtiqueta
    })

    if (orden === 'Nombre (A-Z)') {
      lista = [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre))
    } else if (orden === 'Próxima cita') {
      lista = [...lista].sort((a, b) => (a.proximaCita ? 0 : 1) - (b.proximaCita ? 0 : 1))
    }

    return lista
  }, [search, estado, etiqueta, orden])

  const totalPages = Math.max(Math.ceil(pacientesFiltrados.length / PAGE_SIZE), 1)
  const currentPage = Math.min(page, totalPages)
  const paginaActual = pacientesFiltrados.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const inicioRango = pacientesFiltrados.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const finRango = Math.min(currentPage * PAGE_SIZE, pacientesFiltrados.length)
  const rangoLabel = `${inicioRango}-${finRango}`

  const pacienteSeleccionado: Paciente | null = pacientesIniciales.find((p) => p.id === selectedId) ?? null

  function handleExportar() {
    // Punto de integración: generar y descargar el CSV/Excel real.
    console.info('Exportar listado de pacientes', pacientesFiltrados)
  }

  return (
    <div className="pacientes-canvas">
      <PacientesHeader onExportar={handleExportar} />

      <PacientesFilterBar
        search={search}
        onSearchChange={(value) => {
          setSearch(value)
          setPage(1)
        }}
        estado={estado}
        onEstadoChange={(value) => {
          setEstado(value)
          setPage(1)
        }}
        etiqueta={etiqueta}
        onEtiquetaChange={(value) => {
          setEtiqueta(value)
          setPage(1)
        }}
        orden={orden}
        onOrdenChange={setOrden}
        total={pacientesIniciales.length}
      />

      <div className="pacientes-workspace">
        <PacientesList
          pacientes={paginaActual}
          selectedId={selectedId}
          onSelect={setSelectedId}
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
          rangoLabel={rangoLabel}
          total={pacientesFiltrados.length}
        />

        <div className="pacientes-ficha-col">
          <PacienteFicha paciente={pacienteSeleccionado} />
        </div>
      </div>
    </div>
  )
}
