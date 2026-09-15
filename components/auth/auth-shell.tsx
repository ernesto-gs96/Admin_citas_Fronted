import type { ReactNode } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";

export function AuthShell({ children, title = "Account access" }: { children: ReactNode; title?: string }) {
  return (
    <main className="auth-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className="auth-shell" aria-label={title}>
        <div className="brand-row"><div className="brand-mark"><ShieldCheck size={20} strokeWidth={2.5} /></div><span>cita<span className="brand-accent">.</span>flow</span></div>
        <div className="auth-card">{children}</div>
        <p className="secure-note"><LockKeyhole size={13} /> Your information is encrypted and secure</p>
      </section>
    </main>
  );
}

export function AuthStepper({ active }: { active: 1 | 2 | 3 }) {
  const steps = [{ number: 1, label: "Account" }, { number: 2, label: "Verify email" }, { number: 3, label: "2FA security" }];
  return <div className="stepper" aria-label="Registration progress">{steps.map((item, index) => <div className="step-wrap" key={item.number}><div className={`step-item ${active >= item.number ? "active" : ""} ${active > item.number ? "done" : ""}`}><span className="step-number">{active > item.number ? "✓" : item.number}</span><span className="step-label">{item.label}</span></div>{index < steps.length - 1 && <div className={`step-line ${active > item.number ? "filled" : ""}`} />}</div>)}</div>;
}
