'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { AuthShell } from './auth-shell'
import { MailIcon } from './auth-icons'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const result = await authClient.forgotPassword({ email })
    setLoading(false)

    if (result.error?.message) {
      setError(result.error.message)
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <AuthShell
        mode="forgot-password"
        eyebrow="CORREO ENVIADO"
        title="Revisa tu bandeja"
        description="Te hemos enviado las instrucciones de recuperación."
        showTabs={false}
      >
        <div className="verify-panel">
          <span className="verify-icon">
            <MailIcon />
          </span>
          <p>
            Si existe una cuenta asociada a <strong>{email}</strong>, recibirás un correo con el token o enlace para restablecer tu contraseña.
          </p>
          <p>¿No lo ves? Revisa tu carpeta de spam o correo no deseado.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', marginTop: '8px' }}>
            <Link
              href={`/reset-password?email=${encodeURIComponent(email)}`}
              className="submit-button"
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              <span>Ingresar mi token de recuperación</span>
              <span aria-hidden="true">→</span>
            </Link>

            <button
              type="button"
              className="text-link"
              onClick={() => setSubmitted(false)}
              style={{ textAlign: 'center', fontSize: '13px', margin: '4px 0' }}
            >
              Probar con otro correo
            </button>
          </div>
        </div>

        <p className="auth-footer">
          ¿Recordaste tu contraseña? <Link className="text-link" href="/login">Inicia sesión</Link>
        </p>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      mode="forgot-password"
      eyebrow="RECUPERAR ACCESO"
      title="¿Olvidaste tu contraseña?"
      description="Ingresa tu correo y te enviaremos las instrucciones con un token para restablecerla."
      showTabs={false}
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

        {error && <p className="form-error" role="alert">{error}</p>}

        <button className="submit-button" disabled={loading} type="submit">
          <span>{loading ? 'Enviando…' : 'Enviar instrucciones'}</span>
          {!loading && <span aria-hidden="true">→</span>}
        </button>

        <div style={{ textAlign: 'center', marginTop: '4px' }}>
          <Link href="/reset-password" className="text-link" style={{ fontSize: '12.5px' }}>
            ¿Ya tienes un token de recuperación? Haz clic aquí
          </Link>
        </div>
      </form>

      <p className="auth-footer">
        ¿Recordaste tu contraseña? <Link className="text-link" href="/login">Inicia sesión</Link>
      </p>
    </AuthShell>
  )
}
