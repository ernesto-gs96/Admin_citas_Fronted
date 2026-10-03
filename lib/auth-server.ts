import { cookies } from 'next/headers'

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

export function parseJwt(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split('.')[1]
    if (!base64Url) return null
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8')
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

/**
 * Función para Server Components:
 * Lee de forma segura las cookies httpOnly sin exponerlas al cliente JavaScript (previene XSS).
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value

  if (!token || !isTokenValid(token)) {
    return null
  }

  const userCookie = cookieStore.get('auth_user')?.value
  let user: User | null = null

  if (userCookie) {
    try {
      user = JSON.parse(userCookie) as User
    } catch {
      user = null
    }
  }

  if (!user) {
    const payload = parseJwt(token)
    const email = (payload?.email as string) || (payload?.sub as string) || 'Usuario'
    user = {
      id: (payload?.sub || payload?.user_id) as string | undefined,
      email,
      name: email.split('@')[0],
    }
  }

  return {
    user,
    token,
  }
}
