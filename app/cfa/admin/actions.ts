"use server";

import { revalidatePath } from "next/cache";
import { requireCFAAdmin } from "@/lib/cfa-access";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function reviewCFAAccess(formData: FormData) {
  const admin = await requireCFAAdmin();
  const requestId = String(formData.get("requestId") ?? "");
  const decision = String(formData.get("decision") ?? "");

  if (
    !/^[0-9a-f-]{36}$/i.test(requestId) ||
    !["approved", "rejected"].includes(decision)
  ) {
    throw new Error("Invalid access review.");
  }

  const supabase = await createSupabaseServerClient();
  const { data: request, error: requestError } = await supabase
    .from("cfa_access_requests")
    .select("requested_level")
    .eq("id", requestId)
    .single();

  if (requestError || !request) {
    throw new Error("Access request not found.");
  }

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

  revalidatePath("/cfa");
  revalidatePath("/cfa/admin");
}
