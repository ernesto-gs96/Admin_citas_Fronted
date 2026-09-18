'use client'

import { FormEvent, useState } from 'react'
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
      setError('No pudimos completar la solicitud. Revisa tus datos e inténtalo de nuevo.')
      return
    }
    // Better Auth doesn't sign the user in until the address is confirmed, so show the
    // "check your email" state here instead of redirecting into the app.
    setSubmittedEmail(email)
  }

  async function handleResend() {
    if (!submittedEmail) return
    setResendState('sending')
    try {
      await authClient.sendVerificationEmail({ email: submittedEmail, callbackURL: '/dashboard' })
      setResendState('sent')
    } catch {
      setResendState('idle')
    }
  }

  if (submittedEmail) {
    return (
      <AuthShell
        mode="register"
        eyebrow="UN ÚLTIMO PASO"
        title="Confirma tu correo"
        description="Falta un paso para activar tu cuenta."
      >
        <div className="verify-panel">
          <span className="verify-icon"><MailIcon /></span>
          <p>
            Enviamos un enlace de confirmación a <strong>{submittedEmail}</strong>. Ábrelo desde
            tu bandeja de entrada para activar tu cuenta y empezar a usar Agenda Clara.
          </p>
          <p>¿No llegó? Revisa spam o correo no deseado.</p>
          <button
            type="button"
            className="verify-resend"
            onClick={handleResend}
            disabled={resendState !== 'idle'}
          >
            {resendState === 'sent' ? 'Correo reenviado' : resendState === 'sending' ? 'Enviando…' : 'Reenviar correo de confirmación'}
          </button>
        </div>

        <p className="auth-footer">
          ¿Ya confirmaste? <a className="text-link" href="/login">Inicia sesión</a>
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
        ¿Ya tienes una cuenta? <a className="text-link" href="/login">Inicia sesión</a>
      </p>
    </AuthShell>
  )
}
