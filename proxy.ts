import { NextRequest, NextResponse } from "next/server";

function isTokenValid(token?: string | null): boolean {
  if (!token) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const payloadStr = Buffer.from(parts[1], "base64").toString("utf-8");
    const payload = JSON.parse(payloadStr);
    if (payload.exp && typeof payload.exp === "number") {
      return payload.exp * 1000 > Date.now();
    }
    return true;
  } catch {
    return false;
  }
}

const PUBLIC_AUTH_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;
  const hasValidSession = isTokenValid(token);

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.includes(pathname);

  // 1. Proteger ruta privada /dashboard:
  // Si no hay sesión válida, redirigir a /login
  if (isDashboardRoute && !hasValidSession) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    // Limpiar cookies si el token existía pero estaba vencido o corrupto
    if (token) {
      response.cookies.delete("auth_token");
      response.cookies.delete("auth_user");
    }
    return response;
  }

  // 2. Rutas públicas de acceso:
  // Si el usuario ya tiene sesión activa, redirigir automáticamente al /dashboard
  if (isPublicAuthRoute && hasValidSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/dashboard/:path*",
  ],
};