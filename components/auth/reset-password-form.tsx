'use client'

import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { AuthShell } from './auth-shell'
import { EyeIcon } from './auth-icons'

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialToken = searchParams.get('token') || ''

  const [token, setToken] = useState(initialToken)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!token.trim()) {
      setError('Por favor ingresa el token de recuperación.')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden. Verifica que ambas sean iguales.')
      return
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    setLoading(true)
    const result = await authClient.resetPassword({ token: token.trim(), password })
    setLoading(false)

    if (result.error?.message) {
      setError(result.error.message)
      return
    }

    // Redirigir a login con aviso de éxito
    router.push('/login?reset=success')
    router.refresh()
  }

  return (
    <AuthShell
      mode="reset-password"
      eyebrow="NUEVA CONTRASEÑA"
      title="Restablece tu contraseña"
      description="Ingresa el token recibido y define una nueva contraseña segura para tu cuenta."
      showTabs={false}
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <label className="field">
          <span>Token de recuperación</span>
          <input
            value={token}
            onChange={(event) => setToken(event.target.value)}
            type="text"
            required
            placeholder="Pega el token recibido por correo o consola"
          />
          <small>Código o token proporcionado para restablecer tu cuenta.</small>
        </label>

        <label className="field">
          <span>Nueva contraseña</span>
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
        </label>

        <label className="field">
          <span>Confirmar nueva contraseña</span>
          <span className="password-field">
            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              minLength={8}
              required
              placeholder="Repite tu contraseña"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              <EyeIcon hidden={showConfirmPassword} />
            </button>
          </span>
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <button className="submit-button" disabled={loading} type="submit">
          <span>{loading ? 'Guardando…' : 'Actualizar contraseña'}</span>
          {!loading && <span aria-hidden="true">→</span>}
        </button>
      </form>

      <p className="auth-footer">
        ¿Deseas volver? <Link className="text-link" href="/login">Ir al inicio de sesión</Link>
      </p>
    </AuthShell>
  )
}
