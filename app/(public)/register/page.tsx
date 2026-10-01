import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth-server'
import { RegisterForm } from '@/components/auth/register-form'

export default async function RegisterPage() {
  const session = await getSession()
  if (session?.user) {
    redirect('/dashboard')
  }

  return <RegisterForm />
}
