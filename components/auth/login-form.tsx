'use client'

import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { AuthShell } from './auth-shell'
import { EyeIcon } from './auth-icons'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isResetSuccess = searchParams.get('reset') === 'success'
  const isVerifiedSuccess = searchParams.get('verified') === 'true'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isNotVerified, setIsNotVerified] = useState(false)
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsNotVerified(false)
    setLoading(true)

    const result = await authClient.signIn.email({ email, password })
    setLoading(false)

    if (result.error?.message) {
      if (result.error.code === 'EMAIL_NOT_VERIFIED' || result.error.code === 'LOGIN_USER_NOT_VERIFIED') {
        setIsNotVerified(true)
        setError('Tu correo aún no está verificado. Revisa tu bandeja de entrada o haz clic en reenviar enlace.')
      } else {
        setError(result.error.message || 'No pudimos iniciar sesión. Revisa tus datos e inténtalo de nuevo.')
      }
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  async function handleResendVerification() {
    if (!email.trim()) return
    setResendStatus('sending')
    const result = await authClient.requestVerifyToken({ email })
    if (result.error) {
      setResendStatus('idle')
    } else {
      setResendStatus('sent')
      setTimeout(() => setResendStatus('idle'), 5000)
    }
  }

  return (
    <AuthShell
      mode="login"
      eyebrow="BIENVENIDO DE NUEVO"
      title="Ingresa a tu agenda"
      description="Accede para administrar tu día con claridad."
    >
      <form onSubmit={handleSubmit} className="auth-form">
        {isResetSuccess && (
          <p
            className="form-success"
            role="status"
            style={{
              margin: '-2px 0 4px',
              padding: '10px 12px',
              border: '1px solid #a7f3d0',
              borderRadius: 'var(--radius-sm)',
              color: '#065f46',
              background: '#ecfdf5',
              fontSize: '12.5px',
              lineHeight: '1.5',
            }}
          >
            ✓ Tu contraseña se ha actualizado con éxito. Ya puedes iniciar sesión.
          </p>
        )}

        {isVerifiedSuccess && (
          <p
            className="form-success"
            role="status"
            style={{
              margin: '-2px 0 4px',
              padding: '10px 12px',
              border: '1px solid #a7f3d0',
              borderRadius: 'var(--radius-sm)',
              color: '#065f46',
              background: '#ecfdf5',
              fontSize: '12.5px',
              lineHeight: '1.5',
            }}
          >
            ✓ Correo verificado con éxito. Ya puedes iniciar sesión con tus credenciales.
          </p>
        )}

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

        <div className="form-options" style={{ justifyContent: 'flex-end', marginTop: '-4px' }}>
          <Link href="/forgot-password" className="text-link" style={{ fontSize: '12.5px' }}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}

        {isNotVerified && (
          <div style={{ textAlign: 'center', marginTop: '-6px' }}>
            <button
              type="button"
              className="text-link"
              onClick={handleResendVerification}
              disabled={resendStatus !== 'idle'}
              style={{ fontSize: '13px' }}
            >
              {resendStatus === 'sent'
                ? '✓ Correo de verificación reenviado'
                : resendStatus === 'sending'
                ? 'Enviando enlace…'
                : 'Reenviar correo de verificación'}
            </button>
          </div>
        )}

        <button className="submit-button" disabled={loading} type="submit">
          <span>{loading ? 'Procesando…' : 'Ingresar a mi agenda'}</span>
          {!loading && <span aria-hidden="true">→</span>}
        </button>
      </form>

      <p className="auth-footer">
        ¿Aún no usas Agenda Clara? <Link className="text-link" href="/register">Crea tu cuenta</Link>
      </p>
    </AuthShell>
  )
}
