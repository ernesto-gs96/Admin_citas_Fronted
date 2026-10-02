import Link from 'next/link'
import { ReactNode } from 'react'

type Mode = 'login' | 'register' | 'forgot-password' | 'reset-password' | 'verify-email'

export function AuthShell({
  mode,
  eyebrow,
  title,
  description,
  children,
  showTabs = mode === 'login' || mode === 'register',
}: {
  mode: Mode
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  showTabs?: boolean
}) {
  const isRegister = mode === 'register'

  return (
    <main className="auth-shell">
      <div className="auth-layout">
        <section className="auth-panel" aria-labelledby="auth-title">
          <div className="auth-heading">
            <p className="section-label">{eyebrow}</p>
            <h2 id="auth-title">{title}</h2>
            <p>{description}</p>
          </div>

          {showTabs && (
            <nav className="auth-tabs" aria-label="Tipo de acceso">
              <Link href="/login" aria-current={!isRegister ? 'page' : undefined} className={!isRegister ? 'active' : ''}>
                Iniciar sesión
              </Link>
              <Link href="/register" aria-current={isRegister ? 'page' : undefined} className={isRegister ? 'active' : ''}>
                Crear cuenta
              </Link>
            </nav>
          )}

          {children}
        </section>
      </div>
      <p className="security-note">
        <span aria-hidden="true">⌁</span> Tus datos viajan protegidos y seguros.
      </p>
    </main>
  )
}
