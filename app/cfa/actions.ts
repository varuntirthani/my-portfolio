"use server";

import { redirect } from "next/navigation";
import type { CFALevelKey } from "@/data/cfa-types";
import { CFA_LEVELS } from "@/lib/cfa-access";
import { notifyAdminOfRequest } from "@/lib/cfa-notify";
import { getSiteUrl } from "@/lib/site-url";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function readEmail(formData: FormData): string {
  return String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
}

function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitAccessRequest(formData: FormData) {
  // Hidden field that people never see; bots that fill every input do.
  if (String(formData.get("website") ?? "") !== "") {
    redirect("/cfa/login?requested=1");
  }

  const email = readEmail(formData);
  const level = String(formData.get("level") ?? "") as CFALevelKey;

  if (!isValidEmail(email)) {
    redirect("/cfa/login?error=email");
  }
  if (!CFA_LEVELS.includes(level)) {
    redirect("/cfa/login?error=level");
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("submit_cfa_access_request", {
    email_input: email,
    level_input: level,
  });

  if (error) {
    redirect(
      error.message.includes("Too many requests")
        ? "/cfa/login?error=busy"
        : "/cfa/login?error=request",
    );
  }

  if (data === "created") {
    await notifyAdminOfRequest(email, level);
  }

  // Same response whether the email was new, pending, or already reviewed.
  redirect("/cfa/login?requested=1");
}

export async function sendMagicLink(formData: FormData) {
  const email = readEmail(formData);

  if (!isValidEmail(email)) {
    redirect("/cfa/login?error=email");
  }

  const callbackUrl = new URL("/auth/callback", getSiteUrl());
  callbackUrl.searchParams.set("next", "/cfa");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: callbackUrl.toString(),
      shouldCreateUser: false,
    },
  });

  // Accounts exist only for approved visitors, so an unknown email fails here.
  // Show the same message either way to avoid revealing who is approved.
  if (error && error.status !== 400 && error.status !== 422) {
    console.error(`CFA sign-in email failed: ${error.status} ${error.message}`);
  }

  redirect("/cfa/login?sent=1");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/cfa/login");
}
