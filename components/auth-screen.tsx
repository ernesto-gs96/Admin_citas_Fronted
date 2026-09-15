'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

type Mode = 'login' | 'register'

export function AuthScreen() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isRegister = mode === 'register'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    if (isRegister && !accepted) {
      setError('Debes aceptar los términos y condiciones para continuar.')
      return
    }
    setLoading(true)

    const result = isRegister
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password })

    setLoading(false)
    if (result.error) {
      setError('No pudimos completar la solicitud. Revisa tus datos e inténtalo de nuevo.')
      return
    }

    router.push('/')
    router.refresh()
  }

  function switchMode(nextMode: Mode) {
    setMode(nextMode)
    setError('')
  }

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="auth-title">
        <header className="auth-header">
          <div className="brand-mark" aria-hidden="true">+</div>
          <div>
            <p className="eyebrow">CLÍNICA CLARIDAD</p>
            <h1 id="auth-title">{isRegister ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}</h1>
          </div>
        </header>

        <div className="auth-tabs" role="tablist" aria-label="Tipo de acceso">
          <button type="button" role="tab" aria-selected={!isRegister} className={!isRegister ? 'active' : ''} onClick={() => switchMode('login')}>
            Iniciar sesión
          </button>
          <button type="button" role="tab" aria-selected={isRegister} className={isRegister ? 'active' : ''} onClick={() => switchMode('register')}>
            Registrarse
          </button>
        </div>

        <p className="auth-intro">{isRegister ? 'Registra tus datos para empezar a gestionar tus citas.' : 'Accede a tu cuenta para gestionar tus citas.'}</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <label>
              Nombre completo
              <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required placeholder="Tu nombre" />
            </label>
          )}
          <label>
            Correo electrónico
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required placeholder="tu@email.com" />
          </label>
          <label>
            Contraseña
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} minLength={8} required placeholder="••••••••" />
          </label>

          {isRegister && (
            <label className="check-row">
              <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
              <span>Acepto los <button type="button" className="inline-link">términos y condiciones</button>.</span>
            </label>
          )}
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="submit-button" disabled={loading} type="submit">{loading ? 'Procesando...' : isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</button>
        </form>

        <p className="auth-footer">{isRegister ? '¿Ya tienes una cuenta?' : '¿Aún no tienes una cuenta?'}{' '}<button type="button" className="inline-link" onClick={() => switchMode(isRegister ? 'login' : 'register')}>{isRegister ? 'Inicia sesión' : 'Regístrate'}</button></p>
      </section>
      <p className="security-note"><span aria-hidden="true">▣</span> Tus datos están protegidos con seguridad de nivel empresarial.</p>
    </main>
  )
}
