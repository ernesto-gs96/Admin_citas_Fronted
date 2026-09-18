'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { AuthShell } from './auth-shell'
import { EyeIcon } from './auth-icons'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    const result = await authClient.signIn.email({ email, password })
    setLoading(false)
    if (result.error?.message) {
      // Better Auth returns a dedicated code when the account exists but hasn't confirmed its email yet.
      if (result.error.code === 'EMAIL_NOT_VERIFIED') {
        setError('Tu correo aún no está confirmado. Revisa tu bandeja de entrada para activar tu cuenta.')
      } else {
        setError('No pudimos iniciar sesión. Revisa tus datos e inténtalo de nuevo.')
      }
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <AuthShell
      mode="login"
      eyebrow="BIENVENIDO DE NUEVO"
      title="Ingresa a tu agenda"
      description="Accede para administrar tu día con claridad."
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <label className="field">
          <span>Correo electrónico</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            autoComplete="email"
            required
            placeholder="nombre@consultorio.com"
          />
        </label>

        <label className="field">
          <span>Contraseña</span>
          <span className="password-field">
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              minLength={8}
              required
              placeholder="Tu contraseña"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              <EyeIcon hidden={showPassword} />
            </button>
          </span>
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <button className="submit-button" disabled={loading} type="submit">
          <span>{loading ? 'Procesando…' : 'Ingresar a mi agenda'}</span>
          {!loading && <span aria-hidden="true">→</span>}
        </button>
      </form>

      <p className="auth-footer">
        ¿Aún no usas Agenda Clara? <a className="text-link" href="/register">Crea tu cuenta</a>
      </p>
    </AuthShell>
  )
}
