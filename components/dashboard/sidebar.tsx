'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { BrandMark } from '@/components/auth/auth-icons'
import {
  CalendarIcon,
  ClockIcon,
  HelpIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  SettingsIcon,
  SlidersIcon,
  TagIcon,
  UsersIcon,
} from './dashboard-icons'

const PRIMARY_NAV = [
  { href: '/dashboard', label: 'Inicio', icon: HomeIcon },
  { href: '/dashboard/agenda', label: 'Agenda', icon: CalendarIcon, badgeKey: 'today' as const },
  { href: '/dashboard/citas', label: 'Citas', icon: TagIcon },
  { href: '/dashboard/pacientes', label: 'Pacientes', icon: UsersIcon },
]

const MANAGEMENT_NAV = [
  { href: '/dashboard/servicios', label: 'Servicios', icon: SettingsIcon },
  { href: '/dashboard/disponibilidad', label: 'Disponibilidad', icon: ClockIcon },
]

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function Sidebar({
  userName,
  userEmail,
  specialty,
  appointmentsToday,
}: {
  userName?: string | null
  userEmail: string
  specialty: string
  appointmentsToday: number
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleSignOut() {
    await authClient.signOut()
    router.replace('/login')
  }

  const displayName = userName || 'Tu cuenta'

  return (
    <>
      <div className="sidebar-topbar">
        <div className="auth-brand">
          <BrandMark />
          <span>Agenda Clara</span>
        </div>
        <div className="sidebar-topbar-actions">
          <Link href="/dashboard/citas" className="sidebar-topbar-cta" aria-label="Nueva cita">
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
          <span className="sidebar-profile-avatar" aria-hidden="true">{initials(displayName)}</span>
          <div className="sidebar-profile-info">
            <span className="sidebar-profile-name">{displayName}</span>
            <span className="sidebar-profile-specialty">{specialty}</span>
          </div>
        </div>

        <p className="sidebar-nav-label">Principal</p>
        <nav className="sidebar-nav" aria-label="Navegación principal">
          {PRIMARY_NAV.map(({ href, label, icon: Icon, badgeKey }) => {
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
                {badgeKey === 'today' && appointmentsToday > 0 && (
                  <span className="sidebar-link-badge">{appointmentsToday} hoy</span>
                )}
              </Link>
            )
          })}
        </nav>

        <p className="sidebar-nav-label">Gestión</p>
        <nav className="sidebar-nav" aria-label="Navegación de gestión">
          {MANAGEMENT_NAV.map(({ href, label, icon: Icon }) => {
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
          })}
        </nav>

        <div className="sidebar-footer">
          <nav className="sidebar-nav" aria-label="Configuración y soporte">
            <Link
              href="/dashboard/configuracion"
              className={`sidebar-link ${pathname === '/dashboard/configuracion' ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <SettingsIcon />
              <span>Configuración</span>
            </Link>
            <span className="sidebar-link sidebar-link-static">
              <HelpIcon />
              <span>Ayuda y soporte</span>
            </span>
          </nav>

          <div className="sidebar-user">
            <button type="button" className="sidebar-signout" onClick={handleSignOut}>
              <LogOutIcon />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
