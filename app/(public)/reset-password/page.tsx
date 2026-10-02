import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth-server'
import { ResetPasswordForm } from '@/components/auth/reset-password-form'

export default async function ResetPasswordPage() {
  const session = await getSession()
  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  )
}
