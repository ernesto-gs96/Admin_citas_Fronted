import { RegisterForm } from "@/components/auth/register-form";
import { AuthShell } from "@/components/auth/auth-shell";

export default function RegisterPage() {
  return <AuthShell title="Create your account"><RegisterForm /></AuthShell>;
}
