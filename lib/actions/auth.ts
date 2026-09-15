"use server";

export type AuthResult = { ok: boolean; message?: string };

export async function registerAccount(input: { name: string; email: string; password: string }): Promise<AuthResult> {
  void input;
  return { ok: true };
}

export async function signInAccount(input: { email: string; password: string }): Promise<AuthResult> {
  void input;
  return { ok: true };
}

export async function verifyCode(input: { email: string; code: string; purpose: "email" | "two-factor" }): Promise<AuthResult> {
  void input;
  return { ok: true };
}
