'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { BrandMark } from '@/components/auth/auth-icons'
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon, PlusIcon, SettingsIcon, UsersIcon } from './dashboard-icons'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Resumen', icon: HomeIcon },
  { href: '/dashboard/citas', label: 'Citas', icon: CalendarIcon },
  { href: '/dashboard/pacientes', label: 'Pacientes', icon: UsersIcon },
  { href: '/dashboard/configuracion', label: 'Configuración', icon: SettingsIcon },
]

export function Sidebar({ userName, userEmail }: { userName?: string | null; userEmail: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleSignOut() {
    await authClient.signOut()
    router.replace('/login')
  }

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

        <Link href="/dashboard/citas" className="sidebar-cta" onClick={() => setOpen(false)}>
          <PlusIcon />
          <span>Nueva cita</span>
        </Link>

        <nav className="sidebar-nav" aria-label="Navegación principal">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
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

        <div className="sidebar-user">
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{userName || 'Tu cuenta'}</span>
            <span className="sidebar-user-email">{userEmail}</span>
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
