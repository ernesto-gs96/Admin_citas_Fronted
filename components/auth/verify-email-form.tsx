'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { AuthShell } from './auth-shell'
import { MailIcon } from './auth-icons'

export function VerifyEmailForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'already_verified' | 'error'>(
    token ? 'verifying' : 'idle'
  )
  const [manualToken, setManualToken] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [resendEmail, setResendEmail] = useState('')
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useEffect(() => {
    let isMounted = true

    async function executeVerification(tokenToVerify: string) {
      setStatus('verifying')
      setErrorMessage('')

      const result = await authClient.verifyEmail({ token: tokenToVerify })
      if (!isMounted) return

      if (result.error) {
        if (result.error.code === 'VERIFY_USER_ALREADY_VERIFIED') {
          setStatus('already_verified')
        } else {
          setStatus('error')
          setErrorMessage(result.error.message || 'El enlace o token de verificación es inválido o ha expirado.')
        }
      } else {
        setStatus('success')
      }
    }

    if (token) {
      executeVerification(token)
    }

    return () => {
      isMounted = false
    }
  }, [token])

  async function handleManualSubmit(e: FormEvent) {
    e.preventDefault()
    if (!manualToken.trim()) return

    setStatus('verifying')
    setErrorMessage('')

    const result = await authClient.verifyEmail({ token: manualToken.trim() })
    if (result.error) {
      if (result.error.code === 'VERIFY_USER_ALREADY_VERIFIED') {
        setStatus('already_verified')
      } else {
        setStatus('error')
        setErrorMessage(result.error.message || 'El token de verificación no es válido o ya caducó.')
      }
    } else {
      setStatus('success')
    }
  }

  async function handleResendEmail(e: FormEvent) {
    e.preventDefault()
    if (!resendEmail.trim()) return

    setResendStatus('sending')
    const result = await authClient.requestVerifyToken({ email: resendEmail.trim() })
    if (result.error) {
      setResendStatus('idle')
    } else {
      setResendStatus('sent')
      setTimeout(() => setResendStatus('idle'), 5000)
    }
  }

  // 1. Estado: Verificando
  if (status === 'verifying') {
    return (
      <AuthShell
        mode="verify-email"
        eyebrow="ACTIVACIÓN DE CUENTA"
        title="Verificando tu correo…"
        description="Por favor espera un momento mientras validamos tu cuenta."
        showTabs={false}
      >
        <div className="verify-panel" style={{ alignItems: 'center', textAlign: 'center', padding: '24px 0' }}>
          <span className="verify-icon">
            <MailIcon />
          </span>
          <p style={{ marginTop: '8px' }}>Validando el enlace de confirmación…</p>
        </div>
      </AuthShell>
    )
  }

  // 2. Estado: Verificación exitosa
  if (status === 'success') {
    return (
      <AuthShell
        mode="verify-email"
        eyebrow="ACTIVACIÓN COMPLETADA"
        title="¡Cuenta activada con éxito!"
        description="Tu correo electrónico ha sido confirmado correctamente."
        showTabs={false}
      >
        <div className="verify-panel">
          <p>
            ¡Genial! Tu correo ha sido verificado. Ya puedes acceder a tu espacio de trabajo y comenzar a organizar tus citas.
          </p>
          <div style={{ width: '100%', marginTop: '8px' }}>
            <Link
              href="/login?verified=true"
              className="submit-button"
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              <span>Ingresar a mi agenda</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </AuthShell>
    )
  }

  // 3. Estado: Ya estaba verificado
  if (status === 'already_verified') {
    return (
      <AuthShell
        mode="verify-email"
        eyebrow="CUENTA ACTIVA"
        title="Tu correo ya está verificado"
        description="Tu cuenta ya se encuentra activa para iniciar sesión."
        showTabs={false}
      >
        <div className="verify-panel">
          <p>
            Esta cuenta ya había sido confirmada previamente. Puedes ingresar directamente con tus datos de acceso.
          </p>
          <div style={{ width: '100%', marginTop: '8px' }}>
            <Link
              href="/login"
              className="submit-button"
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              <span>Ir al inicio de sesión</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </AuthShell>
    )
  }

  // 4. Estado: Error de token o enlace caducado
  if (status === 'error') {
    return (
      <AuthShell
        mode="verify-email"
        eyebrow="ENLACE NO VÁLIDO"
        title="No pudimos verificar tu correo"
        description="El token o enlace ha caducado o no es válido."
        showTabs={false}
      >
        <div className="verify-panel">
          {errorMessage && <p className="form-error" role="alert" style={{ width: '100%' }}>{errorMessage}</p>}

          <p>
            Los enlaces de confirmación tienen un tiempo límite de validez. Si no alcanzaste a confirmarlo, puedes solicitar un nuevo enlace aquí:
          </p>

          <form onSubmit={handleResendEmail} className="auth-form" style={{ width: '100%', marginTop: '4px' }}>
            <label className="field">
              <span>Tu correo electrónico</span>
              <input
                type="email"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                required
                placeholder="nombre@consultorio.com"
              />
            </label>

            <button
              type="submit"
              className="submit-button"
              disabled={resendStatus !== 'idle'}
            >
              <span>
                {resendStatus === 'sent'
                  ? '✓ Correo reenviado'
                  : resendStatus === 'sending'
                  ? 'Enviando…'
                  : 'Solicitar nuevo enlace de verificación'}
              </span>
            </button>
          </form>

          <p className="auth-footer" style={{ width: '100%', marginTop: '16px' }}>
            <Link className="text-link" href="/login">Volver al inicio de sesión</Link>
          </p>
        </div>
      </AuthShell>
    )
  }

  // 5. Estado: Idle (sin token en la URL)
  return (
    <AuthShell
      mode="verify-email"
      eyebrow="ACTIVACIÓN DE CUENTA"
      title="Verifica tu correo"
      description="Ingresa el token de confirmación recibido por correo."
      showTabs={false}
    >
      <form onSubmit={handleManualSubmit} className="auth-form">
        <label className="field">
          <span>Token de verificación</span>
          <input
            type="text"
            value={manualToken}
            onChange={(e) => setManualToken(e.target.value)}
            required
            placeholder="Pega el código o token de verificación"
          />
          <small>Código enviado a tu bandeja de entrada.</small>
        </label>

        <button type="submit" className="submit-button">
          <span>Verificar cuenta</span>
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <div style={{ marginTop: '24px', borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
        <p style={{ margin: '0 0 10px', fontSize: '13px', color: 'var(--muted)' }}>
          ¿No tienes el código o caducó?
        </p>
        <form onSubmit={handleResendEmail} className="auth-form">
          <label className="field">
            <span>Reenviar a tu correo</span>
            <input
              type="email"
              value={resendEmail}
              onChange={(e) => setResendEmail(e.target.value)}
              required
              placeholder="nombre@consultorio.com"
            />
          </label>
          <button
            type="submit"
            className="submit-button"
            disabled={resendStatus !== 'idle'}
            style={{ background: 'transparent', color: 'var(--brand-dark)', border: '1px solid var(--line-strong)', boxShadow: 'none' }}
          >
            <span>
              {resendStatus === 'sent'
                ? '✓ Correo reenviado'
                : resendStatus === 'sending'
                ? 'Enviando…'
                : 'Reenviar enlace de confirmación'}
            </span>
          </button>
        </form>
      </div>

      <p className="auth-footer">
        ¿Ya verificaste tu cuenta? <Link className="text-link" href="/login">Inicia sesión</Link>
      </p>
    </AuthShell>
  )
}

