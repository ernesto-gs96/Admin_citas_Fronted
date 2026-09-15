"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { AuthStepper } from "./auth-shell";

export function LoginForm() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [show, setShow] = useState(false); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  function submit(event: FormEvent) { event.preventDefault(); if (!email || !password) { setError("Enter your email and password to continue."); return; } setLoading(true); setError(""); window.setTimeout(() => setLoading(false), 700); }
  return <><AuthStepper active={1} /><div className="step-content"><div className="heading-block"><div className="heading-icon"><LockKeyhole size={20} /></div><p className="eyebrow">Welcome back</p><h1>Sign in to cita.flow</h1><p className="subcopy">Manage your appointments from one calm, secure workspace.</p></div><form onSubmit={submit} className="auth-form"><div className="field"><label className="field-label" htmlFor="login-email">Email address</label><div className="input-with-icon"><Mail size={17} /><input id="login-email" type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} placeholder="alex@company.com" autoComplete="email" /></div></div><div className="field login-password"><div className="label-row"><label className="field-label" htmlFor="login-password">Password</label><Link href="#forgot">Forgot password?</Link></div><div className="input-with-icon trailing"><LockKeyhole size={17} /><input id="login-password" type={show ? "text" : "password"} value={password} onChange={e => { setPassword(e.target.value); setError(""); }} placeholder="Your password" autoComplete="current-password" /><button type="button" className="icon-button" aria-label="Toggle password visibility" onClick={() => setShow(!show)}>{show ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></div>{error && <p className="error-message" role="alert">{error}</p>}<button className="primary-button" type="submit">{loading ? "Signing in…" : "Sign in"} <ArrowRight size={17} /></button></form><p className="terms">New to cita.flow? <Link href="/register">Create an account</Link></p></div></>;
}
