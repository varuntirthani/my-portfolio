import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function safeNextPath(value: string | null): string {
  return value &&
    (value === "/cfa" || value.startsWith("/cfa/")) &&
    !value.startsWith("//")
    ? value
    : "/cfa";
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const next = safeNextPath(url.searchParams.get("next"));
  const supabase = await createSupabaseServerClient();

  let error: Error | null = null;

  if (code) {
    const result = await supabase.auth.exchangeCodeForSession(code);
    error = result.error;
  } else if (tokenHash && type) {
    const result = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });
    error = result.error;
  } else {
    error = new Error("Missing authentication token.");
  }

  if (error) {
    return NextResponse.redirect(
      new URL("/cfa/login?error=callback", request.url),
    );
  }

  return NextResponse.redirect(new URL(next, request.url));
}
