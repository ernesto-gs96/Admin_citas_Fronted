"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/auth/auth-icons";

export function SiteNavbar() {
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";

  return (
    <header className="landing-header">
      <Link href="/" className="auth-brand" aria-label="Ir al inicio">
        <BrandMark />
        <span>Agenda Clara</span>
      </Link>
      <nav className="landing-nav" aria-label="Navegación principal">
        <Link href="/#funcionalidades">Funcionalidades</Link>
        <Link href="/#como-funciona">Cómo funciona</Link>
        <Link href="/#para-quien">Para quién</Link>
        {!isLogin && (
          <Link href="/login" className="text-link">
            Iniciar sesión
          </Link>
        )}
        {!isRegister && (
          <Link href="/register" className="landing-cta-small">
            Crear cuenta
          </Link>
        )}
      </nav>
    </header>
  );
}
