'use client'

import { authClient } from "@/lib/auth-client";
import { AuthScreen } from '@/components/auth-screen'

export default function Page() {
  const { data: session } = authClient.useSession();

  if (session?.user) {
    return (
      <main className="signed-in-shell">
        <p>Sesión iniciada como {session.user.email}</p>
      </main>
    )
  }

  return <AuthScreen />
}
