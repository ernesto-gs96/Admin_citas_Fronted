import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { AuthScreen } from '@/components/auth-screen'

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session?.user) {
    return (
      <main className="signed-in-shell">
        <p>Sesión iniciada como {session.user.email}</p>
      </main>
    )
  }

  return <AuthScreen />
}
