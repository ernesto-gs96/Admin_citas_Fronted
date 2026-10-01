'use server'

import { cookies } from 'next/headers'
import { isTokenValid, parseJwt, User } from './auth-server'

export interface AuthError {
  code?: string
  message: string
}

export interface ActionResult<T = unknown> {
  data: T | null
  error: AuthError | null
}

function getFastApiUrl(): string {
  const url = process.env.FASTAPI_URL || 'http://127.0.0.1:8000'
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export async function loginAction({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<ActionResult<{ user: User }>> {
  try {
    const body = new URLSearchParams()
    body.append('username', email)
    body.append('password', password)

    const res = await fetch(`${getFastApiUrl()}/api/auth/jwt/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
      cache: 'no-store',
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

    const payload = parseJwt(token)
    const user: User = {
      id: (payload?.sub || payload?.user_id) as string | undefined,
      email,
      name: email.split('@')[0],
    }

    const cookieStore = await cookies()
    const maxAge = 7 * 24 * 60 * 60 // 7 días
    const isProduction = process.env.NODE_ENV === 'production'

    // Cookie httpOnly segura para el JWT (inaccesible desde JavaScript en navegador)
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge,
    })

    // Cookie httpOnly segura para el usuario
    cookieStore.set('auth_user', JSON.stringify(user), {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge,
    })

    return {
      data: { user },
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

export async function registerAction({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name?: string
}): Promise<ActionResult<{ user: User; autoLoggedIn: boolean }>> {
  try {
    const res = await fetch(`${getFastApiUrl()}/api/auth/register`, {
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
      cache: 'no-store',
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
              message: 'La contraseña no cumple con los requisitos mínimos de seguridad.',
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

    // Intentar inicio de sesión automático tras el registro en el servidor
    const loginRes = await loginAction({ email, password })

    if (!loginRes.error && loginRes.data) {
      // Actualizar cookie httpOnly con el nombre del usuario
      const cookieStore = await cookies()
      const maxAge = 7 * 24 * 60 * 60
      const isProduction = process.env.NODE_ENV === 'production'

      cookieStore.set('auth_user', JSON.stringify(user), {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
        maxAge,
      })

      return {
        data: { user, autoLoggedIn: true },
        error: null,
      }
    }

    return {
      data: { user, autoLoggedIn: false },
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

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value

  if (token) {
    try {
      await fetch(`${getFastApiUrl()}/api/auth/jwt/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      })
    } catch {
      // Ignorar fallo de red en logout
    }
  }

  cookieStore.delete('auth_token')
  cookieStore.delete('auth_user')
}

export async function getCurrentUserAction(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  if (!token || !isTokenValid(token)) return null

  const userCookie = cookieStore.get('auth_user')?.value
  if (userCookie) {
    try {
      return JSON.parse(userCookie) as User
    } catch {
      // fallback
    }
  }

  const payload = parseJwt(token)
  const email = (payload?.email as string) || (payload?.sub as string) || 'Usuario'
  return {
    id: (payload?.sub || payload?.user_id) as string | undefined,
    email,
    name: email.split('@')[0],
  }
}
