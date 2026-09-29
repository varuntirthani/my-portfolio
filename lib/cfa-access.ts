import "server-only";

import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import type { CFALevelKey } from "@/data/cfa-types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const CFA_ADMIN_EMAIL = (
  process.env.CFA_ADMIN_EMAIL ?? "vgttir@gmail.com"
)
  .trim()
  .toLowerCase();

export const CFA_LEVELS: CFALevelKey[] = ["L1", "L2", "L3"];

export type CFAAccessStatus = "pending" | "approved" | "rejected";

export type CFAAccessRequest = {
  id: string;
  user_id: string;
  email: string;
  requested_level: CFALevelKey;
  approved_level: CFALevelKey | null;
  status: CFAAccessStatus;
  created_at: string;
  reviewed_at: string | null;
};

export type CFAViewer = {
  user: User;
  isAdmin: boolean;
  allowedLevels: CFALevelKey[];
  accessRequest: CFAAccessRequest | null;
};

export function isCFAAdmin(email: string | undefined): boolean {
  return email?.trim().toLowerCase() === CFA_ADMIN_EMAIL;
}

// Local fallback so the admin is never locked out if email or Supabase is unavailable.
// NODE_ENV is always "production" in deployed builds, so this cannot activate on the live site.
function getLocalAdminViewer(): CFAViewer | null {
  if (
    process.env.NODE_ENV !== "development" ||
    process.env.CFA_LOCAL_ADMIN !== "true"
  ) {
    return null;
  }

  return {
    user: { id: "local-admin", email: CFA_ADMIN_EMAIL } as User,
    isAdmin: true,
    allowedLevels: CFA_LEVELS,
    accessRequest: null,
  };
}

export async function getCFAViewer(): Promise<CFAViewer | null> {
  const localAdmin = getLocalAdminViewer();
  if (localAdmin) {
    return localAdmin;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const isAdmin = isCFAAdmin(user.email);
  if (isAdmin) {
    return {
      user,
      isAdmin: true,
      allowedLevels: CFA_LEVELS,
      accessRequest: null,
    };
  }

  const { data, error } = await supabase
    .from("cfa_access_requests")
    .select(
      "id,user_id,email,requested_level,approved_level,status,created_at,reviewed_at",
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load CFA access: ${error.message}`);
  }

  const accessRequest = (data as CFAAccessRequest | null) ?? null;
  const allowedLevels =
    accessRequest?.status === "approved" && accessRequest.approved_level
      ? [accessRequest.approved_level]
      : [];

  return { user, isAdmin: false, allowedLevels, accessRequest };
}

export async function requireCFAUser(): Promise<CFAViewer> {
  const viewer = await getCFAViewer();

  if (!viewer) {
    redirect("/cfa/login");
  }

  return viewer;
}

export async function requireCFAAdmin(): Promise<CFAViewer> {
  const viewer = await requireCFAUser();

  if (!viewer.isAdmin) {
    redirect("/cfa?error=admin");
  }

  return viewer;
}
