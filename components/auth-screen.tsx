'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

type Mode = 'login' | 'register'

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg></span>
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden
    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.3A10.7 10.7 0 0 1 12 4c5.5 0 9.3 5.2 9.3 8s-1.3 4.2-3.2 5.8M6.5 6.5C4.1 8.2 2.7 10.4 2.7 12c0 2.8 3.8 8 9.3 8 1 0 1.9-.2 2.8-.5" strokeLinecap="round" /></svg>
    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2.7 12S6.5 4 12 4s9.3 5.2 9.3 8-3.8 8-9.3 8-9.3-5.2-9.3-8Z" /><circle cx="12" cy="12" r="2.8" /></svg>
}

export function AuthScreen() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const isRegister = mode === 'register'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    if (isRegister && !accepted) { setError('Acepta los términos y condiciones para crear tu cuenta.'); return }
    setLoading(true)
    const result = isRegister ? await authClient.signUp.email({ name, email, password }) : await authClient.signIn.email({ email, password })
    setLoading(false)
    if (result.error?.message) { setError('No pudimos completar la solicitud. Revisa tus datos e inténtalo de nuevo.'); return }
    router.push('/')
    router.refresh()
  }

  function switchMode(nextMode: Mode) { setMode(nextMode); setError(''); setPassword('') }

  return (
    <main className="auth-shell">
      <div className="auth-layout">
        <aside className="auth-aside" aria-label="Información de Agenda Clara">
          <div className="auth-brand"><BrandMark /><span>Agenda Clara</span></div>
          <div className="auth-aside-copy"><p className="section-label">TU AGENDA, EN CALMA</p><h1>Más tiempo para atender. Menos tiempo para coordinar.</h1><p>Organiza tu práctica en un solo lugar y ofrece una experiencia clara desde la primera cita.</p></div>
          <div className="schedule-preview" aria-hidden="true"><div className="preview-header"><span>Hoy</span><span>Martes, 16</span></div><div className="preview-row"><time>09:00</time><span className="preview-event"><i />Consulta inicial</span></div><div className="preview-row"><time>11:00</time><span className="preview-event muted"><i />Seguimiento</span></div><div className="preview-row"><time>16:00</time><span className="preview-event"><i />Consulta general</span></div></div>
          <p className="auth-aside-footer">Una agenda diseñada para profesionales independientes.</p>
        </aside>
        <section className="auth-panel" aria-labelledby="auth-title">
          <div className="mobile-brand"><BrandMark /><span>Agenda Clara</span></div>
          <div className="auth-heading"><p className="section-label">{isRegister ? 'COMIENZA SIN COMPLICACIONES' : 'BIENVENIDO DE NUEVO'}</p><h2 id="auth-title">{isRegister ? 'Crea tu espacio de trabajo' : 'Ingresa a tu agenda'}</h2><p>{isRegister ? 'Configura tu cuenta y empieza a organizar tus citas.' : 'Accede para administrar tu día con claridad.'}</p></div>
          <div className="auth-tabs" role="tablist" aria-label="Tipo de acceso"><button type="button" role="tab" aria-selected={!isRegister} className={!isRegister ? 'active' : ''} onClick={() => switchMode('login')}>Iniciar sesión</button><button type="button" role="tab" aria-selected={isRegister} className={isRegister ? 'active' : ''} onClick={() => switchMode('register')}>Crear cuenta</button></div>
          <form onSubmit={handleSubmit} className="auth-form">
            {isRegister && <label className="field"><span>Nombre completo</span><input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required placeholder="Ej. Ana Martínez" /></label>}
            <label className="field"><span>Correo electrónico</span><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required placeholder="nombre@consultorio.com" /></label>
            <label className="field"><span>Contraseña</span><span className="password-field"><input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} autoComplete={isRegister ? 'new-password' : 'current-password'} minLength={8} required placeholder="Mínimo 8 caracteres" /><button type="button" className="password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}><EyeIcon hidden={showPassword} /></button></span>{isRegister && <small>Usa al menos 8 caracteres.</small>}</label>
            {isRegister && <label className="check-row"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} /><span>He leído y acepto los términos y condiciones y el aviso de privacidad.</span></label>}
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="submit-button" disabled={loading} type="submit"><span>{loading ? 'Procesando…' : isRegister ? 'Crear mi cuenta' : 'Ingresar a mi agenda'}</span>{!loading && <span aria-hidden="true">→</span>}</button>
          </form>
          <p className="auth-footer">{isRegister ? '¿Ya tienes una cuenta?' : '¿Aún no usas Agenda Clara?'} <button type="button" className="text-link" onClick={() => switchMode(isRegister ? 'login' : 'register')}>{isRegister ? 'Inicia sesión' : 'Crea tu cuenta'}</button></p>
        </section>
      </div>
      <p className="security-note"><span aria-hidden="true">⌁</span> Tus datos viajan protegidos y seguros.</p>
    </main>
  )
}
