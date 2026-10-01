'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { AuthShell } from './auth-shell'
import { EyeIcon } from './auth-icons'

export function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [infoMessage, setInfoMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setInfoMessage('')
    if (!accepted) {
      setError('Acepta los términos y condiciones para crear tu cuenta.')
      return
    }
    setLoading(true)
    const result = await authClient.signUp.email({ name, email, password })
    if (result.error?.message) {
      setLoading(false)
      setError(result.error.message || 'No pudimos completar la solicitud. Revisa tus datos e inténtalo de nuevo.')
      return
    }

    // Iniciar sesión automáticamente en FastAPI Users tras el registro
    const loginResult = await authClient.signIn.email({ email, password })
    setLoading(false)

    if (loginResult.error) {
      if (loginResult.error.code === 'LOGIN_USER_NOT_VERIFIED' || loginResult.error.code === 'EMAIL_NOT_VERIFIED') {
        setInfoMessage('¡Cuenta creada! Tu usuario requiere verificación antes de acceder.')
      } else {
        setInfoMessage('¡Cuenta creada con éxito! Redirigiendo al inicio de sesión…')
        setTimeout(() => {
          router.push('/login')
        }, 1200)
      }
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <AuthShell
      mode="register"
      eyebrow="COMIENZA SIN COMPLICACIONES"
      title="Crea tu espacio de trabajo"
      description="Configura tu cuenta y empieza a organizar tus citas."
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <label className="field">
          <span>Nombre completo</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
            placeholder="Ej. Ana Martínez"
          />
        </label>

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
              autoComplete="new-password"
              minLength={8}
              required
              placeholder="Mínimo 8 caracteres"
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
          <small>Usa al menos 8 caracteres.</small>
        </label>

        <label className="check-row">
          <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
          <span>He leído y acepto los términos y condiciones y el aviso de privacidad.</span>
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}
        {infoMessage && <p className="form-success" role="status" style={{ color: '#059669', fontSize: '0.9rem', margin: '0.25rem 0' }}>{infoMessage}</p>}

        <button className="submit-button" disabled={loading} type="submit">
          <span>{loading ? 'Procesando…' : 'Crear mi cuenta'}</span>
          {!loading && <span aria-hidden="true">→</span>}
        </button>
      </form>

      <p className="auth-footer">
        ¿Ya tienes una cuenta? <a className="text-link" href="/login">Inicia sesión</a>
      </p>
    </AuthShell>
  )
}
