"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCFAAdmin } from "@/lib/cfa-access";
import { getSiteUrl } from "@/lib/site-url";
import {
  createSupabaseServerClient,
  createSupabaseStatelessClient,
} from "@/lib/supabase/server";

async function sendApprovalLink(email: string): Promise<boolean> {
  const callbackUrl = new URL("/auth/callback", getSiteUrl());
  callbackUrl.searchParams.set("next", "/cfa");

  const { error } = await createSupabaseStatelessClient().auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: callbackUrl.toString(),
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.error(`CFA approval email failed: ${error.status} ${error.message}`);
  }

  return !error;
}

export async function reviewCFAAccess(formData: FormData) {
  const admin = await requireCFAAdmin();
  const requestId = String(formData.get("requestId") ?? "");
  const decision = String(formData.get("decision") ?? "");

  if (
    !/^[0-9a-f-]{36}$/i.test(requestId) ||
    !["approved", "rejected", "resend"].includes(decision)
  ) {
    throw new Error("Invalid access review.");
  }

  const supabase = await createSupabaseServerClient();
  const { data: request, error: requestError } = await supabase
    .from("cfa_access_requests")
    .select("email,requested_level,status")
    .eq("id", requestId)
    .single();

  if (requestError || !request) {
    throw new Error("Access request not found.");
  }

  if (decision !== "resend") {
    const { error } = await supabase
      .from("cfa_access_requests")
      .update({
        status: decision,
        approved_level:
          decision === "approved" ? request.requested_level : null,
        reviewed_at: new Date().toISOString(),
        reviewed_by: admin.user.id,
      })
      .eq("id", requestId);

    if (error) {
      throw new Error(`Unable to review access: ${error.message}`);
    }
  }

  revalidatePath("/cfa/admin");

  const shouldEmail =
    decision === "approved" ||
    (decision === "resend" && request.status === "approved");

  if (!shouldEmail) {
    redirect("/cfa/admin");
  }

  const email = encodeURIComponent(request.email);
  redirect(
    (await sendApprovalLink(request.email))
      ? `/cfa/admin?sent=${email}`
      : `/cfa/admin?failed=${email}`,
  );
}
