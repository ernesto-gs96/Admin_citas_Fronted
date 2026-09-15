"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from "lucide-react";

type Step = 1 | 2 | 3;

type FormData = {
  fullName: string;
  email: string;
  country: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const steps = [
  { number: 1, label: "Account" },
  { number: 2, label: "Verify email" },
  { number: 3, label: "2FA security" },
];

function FieldLabel({ children, htmlFor, optional = false }: { children: React.ReactNode; htmlFor: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="field-label">
      {children}
      {optional && <span className="optional">Optional</span>}
    </label>
  );
}

function OtpInput({ value, onChange, error }: { value: string; onChange: (value: string) => void; error?: boolean }) {
  return (
    <div className={`otp-group ${error ? "otp-error" : ""}`} aria-label="6 digit security code">
      {Array.from({ length: 6 }, (_, index) => (
        <input
          key={index}
          aria-label={`Digit ${index + 1}`}
          inputMode="numeric"
          maxLength={1}
          value={value[index] ?? ""}
          onChange={(event) => {
            const next = event.target.value.replace(/\D/g, "");
            const chars = value.split("");
            chars[index] = next;
            onChange(chars.join("").slice(0, 6));
            if (next) event.currentTarget.nextElementSibling?.querySelector("input")?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !value[index] && event.currentTarget.parentElement?.previousElementSibling) {
              event.currentTarget.parentElement.previousElementSibling.querySelector("input")?.focus();
            }
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>({ fullName: "", email: "", country: "+52", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [code, setCode] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (step !== 2 || countdown <= 0) return;
    const timer = window.setInterval(() => setCountdown((current) => current - 1), 1000);
    return () => window.clearInterval(timer);
  }, [step, countdown]);

  const passwordRules = useMemo(() => ({
    length: form.password.length >= 8,
    mixed: /[A-Z]/.test(form.password) && /\d/.test(form.password),
  }), [form.password]);
  const passwordValid = passwordRules.length && passwordRules.mixed;

  function update(name: keyof FormData, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !passwordValid || form.password !== form.confirmPassword) {
      setError(form.password !== form.confirmPassword ? "Passwords do not match." : "Please complete all required fields.");
      return;
    }
    setStep(2);
    setCountdown(60);
  }

  function verifyEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code !== "123456") {
      setError("That code doesn’t look right. Try 123456 for this demo.");
      return;
    }
    setError("");
    setStep(3);
  }

  function verifyTwoFactor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (twoFactorCode !== "123456") {
      setError("Incorrect security code. Try 123456 for this demo.");
      return;
    }
    setError("");
    setComplete(true);
  }

  return (
    <main className="auth-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className="auth-shell" aria-label="Account setup">
        <div className="brand-row">
          <div className="brand-mark"><ShieldCheck size={20} strokeWidth={2.5} /></div>
          <span>cita<span className="brand-accent">.</span>flow</span>
        </div>
        <div className="auth-card">
          <div className="stepper" aria-label="Registration progress">
            {steps.map((item, index) => (
              <div className="step-wrap" key={item.number}>
                <div className={`step-item ${step >= item.number ? "active" : ""} ${step > item.number ? "done" : ""}`}>
                  <span className="step-number">{step > item.number ? <Check size={14} /> : item.number}</span>
                  <span className="step-label">{item.label}</span>
                </div>
                {index < steps.length - 1 && <div className={`step-line ${step > item.number ? "filled" : ""}`} />}
              </div>
            ))}
          </div>

          {complete ? (
            <div className="success-view">
              <div className="success-icon"><CheckCircle2 size={34} /></div>
              <p className="eyebrow">You’re all set</p>
              <h1>Welcome to cita.flow</h1>
              <p className="subcopy">Your account is verified and protected. Your dashboard is ready when you are.</p>
              <button className="primary-button" onClick={() => setComplete(false)}>Continue to dashboard <ArrowRight size={17} /></button>
            </div>
          ) : step === 1 ? (
            <div className="step-content">
              <div className="heading-block"><div className="heading-icon"><UserRound size={20} /></div><p className="eyebrow">Create your account</p><h1>Let’s get started</h1><p className="subcopy">Set up your admin account to manage your appointments with ease.</p></div>
              <form onSubmit={handleRegister} className="auth-form">
                <div className="form-grid">
                  <div className="field full"><FieldLabel htmlFor="fullName">Full name</FieldLabel><input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Alex Morgan" autoComplete="name" required /></div>
                  <div className="field full"><FieldLabel htmlFor="email">Email address</FieldLabel><div className="input-with-icon"><Mail size={17} /><input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="alex@company.com" autoComplete="email" required /></div></div>
                  <div className="field full"><FieldLabel htmlFor="phone" optional>Phone number</FieldLabel><div className="phone-input"><div className="country-select"><span>{form.country}</span><ChevronDown size={14} /></div><input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="55 123 45 67" autoComplete="tel" required /></div><p className="field-hint">We’ll use this for future WhatsApp notifications.</p></div>
                  <div className="field"><FieldLabel htmlFor="password">Password</FieldLabel><div className="input-with-icon trailing"><LockKeyhole size={17} /><input id="password" type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Create a password" autoComplete="new-password" required /><button type="button" className="icon-button" aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></div>
                  <div className="field"><FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel><div className="input-with-icon trailing"><LockKeyhole size={17} /><input id="confirmPassword" type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="Repeat password" autoComplete="new-password" required /><button type="button" className="icon-button" aria-label="Toggle confirmation visibility" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></div>
                </div>
                {form.password && <div className="password-check"><span className={passwordRules.length ? "valid" : ""}><Check size={13} /> 8+ characters</span><span className={passwordRules.mixed ? "valid" : ""}><Check size={13} /> 1 uppercase &amp; number</span></div>}
                {error && <p className="error-message" role="alert">{error}</p>}
                <button className="primary-button" type="submit">Create account <ArrowRight size={17} /></button>
              </form>
              <p className="terms">By continuing, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</p>
            </div>
          ) : (
            <div className="step-content centered-content">
              <div className="heading-block"><div className="heading-icon">{step === 2 ? <Mail size={20} /> : <LockKeyhole size={20} />}</div><p className="eyebrow">{step === 2 ? "Check your inbox" : "One last step"}</p><h1>{step === 2 ? "Verify your email" : "Secure your account"}</h1><p className="subcopy">{step === 2 ? <>We sent a 6-digit verification code to <strong>{form.email || "your email address"}</strong>.</> : "Enter the 2FA security code sent to your registered email."}</p></div>
              <form onSubmit={step === 2 ? verifyEmail : verifyTwoFactor} className="auth-form otp-form">
                <OtpInput value={step === 2 ? code : twoFactorCode} onChange={step === 2 ? setCode : setTwoFactorCode} error={Boolean(error)} />
                {error && <p className="error-message" role="alert">{error}</p>}
                <button className="primary-button" type="submit">{step === 2 ? "Verify email" : "Verify and enter dashboard"} <ArrowRight size={17} /></button>
                {step === 2 && <div className="resend-row"><span>Didn’t receive a code?</span>{countdown > 0 ? <span className="countdown">Resend in 00:{String(countdown).padStart(2, "0")}</span> : <button type="button" className="text-button" onClick={() => setCountdown(60)}><RefreshCw size={14} /> Resend code</button>}</div>}
              </form>
              <button className="back-button" onClick={() => { setError(""); setStep((step - 1) as Step); }}><ArrowLeft size={15} /> Back</button>
            </div>
          )}
        </div>
        <p className="secure-note"><LockKeyhole size={13} /> Your information is encrypted and secure</p>
      </section>
    </main>
  );
}
