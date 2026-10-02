'use client'

import { useEffect, useState } from 'react'
import {
  forgotPasswordAction,
  getCurrentUserAction,
  loginAction,
  logoutAction,
  registerAction,
  resetPasswordAction,
} from './auth-actions'
import type { User, Session } from './auth-server'

export type { User, Session }

export interface AuthError {
  code?: string
  message: string
}

export interface AuthResponse<T = unknown> {
  data: T | null
  error: AuthError | null
}

async function signInEmail({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<AuthResponse<{ user: User }>> {
  return await loginAction({ email, password })
}

async function signUpEmail({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name?: string
}): Promise<AuthResponse<{ user: User; autoLoggedIn: boolean }>> {
  return await registerAction({ email, password, name })
}

async function signOut(): Promise<void> {
  await logoutAction()
}

async function forgotPassword({
  email,
}: {
  email: string
}): Promise<AuthResponse<{ success: boolean }>> {
  return await forgotPasswordAction({ email })
}

async function resetPassword({
  token,
  password,
}: {
  token: string
  password: string
}): Promise<AuthResponse<{ success: boolean }>> {
  return await resetPasswordAction({ token, password })
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    let isMounted = true
    async function fetchSession() {
      try {
        const user = await getCurrentUserAction()
        if (isMounted) {
          setSession(user ? { user } : null)
          setIsPending(false)
        }
      } catch {
        if (isMounted) {
          setSession(null)
          setIsPending(false)
        }
      }
    }

    fetchSession()
    return () => {
      isMounted = false
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
  forgotPassword,
  resetPassword,
  useSession,
}