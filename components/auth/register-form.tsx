'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { AuthShell } from './auth-shell'
import { EyeIcon, MailIcon } from './auth-icons'

export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)
  const [resendState, setResendState] = useState<'idle' | 'sending' | 'sent'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    if (!accepted) {
      setError('Acepta los términos y condiciones para crear tu cuenta.')
      return
    }

    setLoading(true)
    const result = await authClient.signUp.email({ name, email, password })
    setLoading(false)

    if (result.error?.message) {
      setError(result.error.message || 'No pudimos completar la solicitud. Revisa tus datos e inténtalo de nuevo.')
      return
    }

    // El backend ahora envía correo de verificación. Mostramos pantalla de confirmación.
    setSubmittedEmail(email)
  }

  async function handleResend() {
    if (!submittedEmail) return
    setResendState('sending')
    const result = await authClient.requestVerifyToken({ email: submittedEmail })
    if (result.error) {
      setResendState('idle')
    } else {
      setResendState('sent')
      setTimeout(() => setResendState('idle'), 5000)
    }
  }

  if (submittedEmail) {
    return (
      <AuthShell
        mode="register"
        eyebrow="UN ÚLTIMO PASO"
        title="Confirma tu correo"
        description="Falta un paso para activar tu cuenta."
        showTabs={false}
      >
        <div className="verify-panel">
          <span className="verify-icon">
            <MailIcon />
          </span>
          <p>
            Hemos enviado un enlace de confirmación a <strong>{submittedEmail}</strong>.
            Ábrelo desde tu bandeja de entrada para verificar tu cuenta y poder ingresar a tu agenda.
          </p>
          <p>¿No llegó el correo? Revisa en spam o correo no deseado.</p>

          <button
            type="button"
            className="verify-resend"
            onClick={handleResend}
            disabled={resendState !== 'idle'}
          >
            {resendState === 'sent'
              ? '✓ Correo reenviado'
              : resendState === 'sending'
              ? 'Enviando…'
              : 'Reenviar correo de confirmación'}
          </button>
        </div>

        <p className="auth-footer">
          ¿Ya verificaste tu cuenta? <Link className="text-link" href="/login">Inicia sesión</Link>
        </p>
      </AuthShell>
    )
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

        <button className="submit-button" disabled={loading} type="submit">
          <span>{loading ? 'Procesando…' : 'Crear mi cuenta'}</span>
          {!loading && <span aria-hidden="true">→</span>}
        </button>
      </form>

      <p className="auth-footer">
        ¿Ya tienes una cuenta? <Link className="text-link" href="/login">Inicia sesión</Link>
      </p>
    </AuthShell>
  )
}
