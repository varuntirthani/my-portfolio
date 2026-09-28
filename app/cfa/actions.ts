"use server";

import { redirect } from "next/navigation";
import { CFA_LEVELS, requireCFAUser } from "@/lib/cfa-access";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function sendMagicLink(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!isValidEmail(email)) {
    redirect("/cfa/login?error=email");
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
  const callbackUrl = new URL("/auth/callback", siteUrl);
  callbackUrl.searchParams.set("next", "/cfa/request-access");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: callbackUrl.toString(),
      shouldCreateUser: true,
    },
  });

  if (error) {
    redirect("/cfa/login?error=signin");
  }

  redirect("/cfa/login?sent=1");
}

export async function requestCFAAccess(formData: FormData) {
  const viewer = await requireCFAUser();
  const level = String(formData.get("level") ?? "");

  if (!CFA_LEVELS.includes(level as (typeof CFA_LEVELS)[number])) {
    redirect("/cfa/request-access?error=level");
  }

  if (viewer.isAdmin) {
    redirect("/cfa");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("request_cfa_access", {
    level_input: level,
  });

  if (error) {
    redirect("/cfa/request-access?error=submit");
  }

  redirect("/cfa?requested=1");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/cfa/login");
}
