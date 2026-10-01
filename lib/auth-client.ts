'use client'

import { useEffect, useState } from 'react'

export interface User {
  id?: string
  email: string
  name?: string
  is_active?: boolean
  is_superuser?: boolean
  is_verified?: boolean
}

export interface Session {
  user: User
  token?: string
}

export interface AuthError {
  code?: string
  message: string
}

export interface AuthResponse<T = unknown> {
  data: T | null
  error: AuthError | null
}

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL || '/api/py'
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + TOKEN_KEY + '=([^;]*)'))
  if (match) return decodeURIComponent(match[2])
  return localStorage.getItem(TOKEN_KEY)
}

export function setAuthToken(token: string) {
  if (typeof window === 'undefined') return
  const maxAge = 7 * 24 * 60 * 60 // 7 días
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax`
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeAuthToken() {
  if (typeof window === 'undefined') return
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function setStoredUser(user: User) {
  if (typeof window === 'undefined') return
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function parseJwt(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split('.')[1]
    if (!base64Url) return null
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false
  const payload = parseJwt(token)
  if (!payload || typeof payload.exp !== 'number') return true
  return payload.exp * 1000 > Date.now()
}

function notifyAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-state-change'))
  }
}

async function signInEmail({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<AuthResponse<{ user: User; token: string }>> {
  try {
    const body = new URLSearchParams()
    body.append('username', email)
    body.append('password', password)

    const res = await fetch(`${getBaseUrl()}/auth/jwt/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => null)
      const detail = errorData?.detail

      if (res.status === 400) {
        if (detail === 'LOGIN_BAD_CREDENTIALS') {
          return {
            data: null,
            error: {
              code: 'LOGIN_BAD_CREDENTIALS',
              message: 'Credenciales incorrectas. Revisa tu correo y contraseña.',
            },
          }
        }
        if (detail === 'LOGIN_USER_NOT_VERIFIED') {
          return {
            data: null,
            error: {
              code: 'LOGIN_USER_NOT_VERIFIED',
              message: 'Tu correo aún no está confirmado. Revisa tu bandeja de entrada para activar tu cuenta.',
            },
          }
        }
      }

      if (res.status === 422) {
        return {
          data: null,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Por favor ingresa un correo y contraseña válidos.',
          },
        }
      }

      return {
        data: null,
        error: {
          code: 'AUTH_ERROR',
          message: typeof detail === 'string' ? detail : 'No pudimos iniciar sesión. Revisa tus datos e inténtalo de nuevo.',
        },
      }
    }

    const data = await res.json()
    const token = data.access_token as string
    setAuthToken(token)

    const payload = parseJwt(token)
    const existingUser = getStoredUser()
    const user: User = {
      id: (payload?.sub || payload?.user_id) as string | undefined,
      email,
      name: existingUser?.name || email.split('@')[0],
    }
    setStoredUser(user)
    notifyAuthChange()

    return {
      data: { user, token },
      error: null,
    }
  } catch {
    return {
      data: null,
      error: {
        code: 'NETWORK_ERROR',
        message: 'No pudimos conectar con el servidor. Verifica que el backend esté en ejecución.',
      },
    }
  }
}

async function signUpEmail({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name?: string
}): Promise<AuthResponse<User>> {
  try {
    const res = await fetch(`${getBaseUrl()}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        is_active: true,
        is_superuser: false,
        is_verified: false,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => null)
      const detail = errorData?.detail

      if (res.status === 400) {
        if (detail === 'REGISTER_USER_ALREADY_EXISTS') {
          return {
            data: null,
            error: {
              code: 'REGISTER_USER_ALREADY_EXISTS',
              message: 'Ya existe una cuenta registrada con este correo electrónico.',
            },
          }
        }
        if (detail === 'REGISTER_INVALID_PASSWORD') {
          return {
            data: null,
            error: {
              code: 'REGISTER_INVALID_PASSWORD',
              message: 'La contraseña no cumple con los requisitos de seguridad requeridos.',
            },
          }
        }
      }

      if (res.status === 422) {
        return {
          data: null,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Verifica los campos ingresados. El formato del correo o contraseña no es válido.',
          },
        }
      }

      return {
        data: null,
        error: {
          code: 'REGISTER_ERROR',
          message: typeof detail === 'string' ? detail : 'No pudimos completar el registro.',
        },
      }
    }

    const userData = await res.json()
    const user: User = {
      ...userData,
      name: name?.trim() || email.split('@')[0],
    }

    if (name) {
      setStoredUser(user)
    }

    return {
      data: user,
      error: null,
    }
  } catch {
    return {
      data: null,
      error: {
        code: 'NETWORK_ERROR',
        message: 'No pudimos conectar con el servidor de autenticación.',
      },
    }
  }
}

async function signOut(): Promise<void> {
  const token = getAuthToken()
  if (token) {
    try {
      await fetch(`${getBaseUrl()}/auth/jwt/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch {
      // Ignorar fallo de red en logout
    }
  }
  removeAuthToken()
  notifyAuthChange()
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    function syncSession() {
      const token = getAuthToken()
      if (!token || !isTokenValid(token)) {
        if (token && !isTokenValid(token)) {
          removeAuthToken()
        }
        setSession(null)
        setIsPending(false)
        return
      }

      const storedUser = getStoredUser()
      const payload = parseJwt(token)
      const email = storedUser?.email || (payload?.email as string) || (payload?.sub as string) || 'Usuario'
      const name = storedUser?.name || email.split('@')[0]

      setSession({
        token,
        user: {
          id: (payload?.sub || payload?.user_id) as string | undefined,
          email,
          name,
          ...storedUser,
        },
      })
      setIsPending(false)
    }

    syncSession()

    window.addEventListener('auth-state-change', syncSession)
    window.addEventListener('storage', syncSession)
    return () => {
      window.removeEventListener('auth-state-change', syncSession)
      window.removeEventListener('storage', syncSession)
    }
  }, [])

  return { data: session, isPending }
}

export const authClient = {
  signIn: {
    email: signInEmail,
  },
  signUp: {
    email: signUpEmail,
  },
  signOut,
  useSession,
  getToken: getAuthToken,
  getUser: getStoredUser,
}