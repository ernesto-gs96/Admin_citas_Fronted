import { LoginForm } from "@/components/auth/login-form";
import { AuthShell } from "@/components/auth/auth-shell";

export default function LoginPage() {
  return <AuthShell title="Sign in"><LoginForm /></AuthShell>;
}
