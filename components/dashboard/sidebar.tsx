'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { BrandMark } from '@/components/auth/auth-icons'
// import { AvailabilityWidget } from './availability-widget'
import {
  CalendarIcon,
  ClipboardIcon,
  HelpIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  SettingsIcon,
  UsersIcon,
} from './dashboard-icons'

const PRINCIPAL_ITEMS = [
  { href: '/dashboard', label: 'Resumen', icon: HomeIcon },
  { href: '/dashboard/citas', label: 'Citas', icon: CalendarIcon },
  { href: '/dashboard/pacientes', label: 'Pacientes', icon: UsersIcon },
]

const GESTION_ITEMS = [
  { href: '/dashboard/servicios', label: 'Servicios', icon: ClipboardIcon },
  { href: '/dashboard/disponibilidad', label: 'Disponibilidad', icon: CalendarIcon },
]

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function Sidebar({ userName, userEmail }: { userName?: string | null; userEmail: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleSignOut() {
    await authClient.signOut()
    router.replace('/login')
    router.refresh()
  }

  function renderLinks(items: typeof PRINCIPAL_ITEMS) {
    return items.map(({ href, label, icon: Icon }) => {
      const active = pathname === href
      return (
        <Link
          key={href}
          href={href}
          className={`sidebar-link ${active ? 'active' : ''}`}
          aria-current={active ? 'page' : undefined}
          onClick={() => setOpen(false)}
        >
          <Icon />
          <span>{label}</span>
        </Link>
      )
    })
  }

  return (
    <>
      <div className="sidebar-topbar">
        <div className="auth-brand">
          <BrandMark />
          <span>Agenda Clara</span>
        </div>
        <div className="sidebar-topbar-actions">
          <Link href="/dashboard/citas/nueva" className="sidebar-topbar-cta" aria-label="Nueva cita">
            <PlusIcon />
          </Link>
          <button
            type="button"
            className="sidebar-menu-toggle"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} aria-hidden="true" />}

      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand auth-brand">
          <BrandMark />
          <span>Agenda Clara</span>
        </div>

        <div className="sidebar-profile">
          <span className="sidebar-profile-avatar" aria-hidden="true">{initials(userName || userEmail)}</span>
          <div className="sidebar-profile-info">
            <span className="sidebar-profile-name">{userName || 'Tu cuenta'}</span>
            <span className="sidebar-profile-email">{userEmail}</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Navegación principal">
          <div className="sidebar-nav-group">
            <span className="sidebar-nav-label">Principal</span>
            {renderLinks(PRINCIPAL_ITEMS)}
          </div>
          <div className="sidebar-nav-group">
            <span className="sidebar-nav-label">Gestión</span>
            {renderLinks(GESTION_ITEMS)}
          </div>
        </nav>

        <div className="sidebar-bottom">
          {/* <AvailabilityWidget /> */}

          <div className="sidebar-footer-links">
            <Link href="/dashboard/configuracion" className="sidebar-link" onClick={() => setOpen(false)}>
              <SettingsIcon />
              <span>Configuración</span>
            </Link>
            <a href="mailto:soporte@agendaclara.app" className="sidebar-link">
              <HelpIcon />
              <span>Ayuda y Soporte</span>
            </a>
          </div>

          <button type="button" className="sidebar-signout" onClick={handleSignOut}>
            <LogOutIcon />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}
