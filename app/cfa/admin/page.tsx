import type { Metadata } from "next";
import Link from "next/link";
import { reviewCFAAccess } from "@/app/cfa/admin/actions";
import {
  requireCFAAdmin,
  type CFAAccessRequest,
} from "@/lib/cfa-access";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "CFA Access Administration",
};

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type CFAAdminPageProps = {
  searchParams: Promise<{ sent?: string; failed?: string }>;
};

export default async function CFAAdminPage({
  searchParams,
}: CFAAdminPageProps) {
  await requireCFAAdmin();
  const params = await searchParams;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("cfa_access_requests")
    .select(
      "id,email,requested_level,approved_level,status,created_at,reviewed_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Unable to load access requests: ${error.message}`);
  }

  const requests = (data ?? []) as CFAAccessRequest[];

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-[#0a0a0f] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-[family-name:var(--font-cfa-mono)] text-xs tracking-[0.2em] text-[#3b82f6] uppercase">
              Administrator
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-cfa-mono)] text-3xl font-semibold text-[#f0f0f5]">
              CFA access requests
            </h1>
          </div>
          <Link
            href="/cfa"
            className="text-sm text-[#9ca3af] underline-offset-4 hover:text-[#f0f0f5] hover:underline"
          >
            Back to CFA Hub
          </Link>
        </div>

        {params.sent && (
          <p className="mt-8 rounded-lg border border-[#22c55e]/30 bg-[#22c55e]/10 px-4 py-3 text-sm text-[#86efac]">
            Sign-in link sent to {params.sent}.
          </p>
        )}

        {params.failed && (
          <p className="mt-8 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {params.failed} is approved, but the sign-in email could not be
            sent. This is usually the hourly email limit. Use Resend link to
            try again later.
          </p>
        )}

        <div className="mt-10 overflow-x-auto rounded-xl border border-[#1e1e2e]">
          <table className="w-full min-w-3xl border-collapse text-left text-sm">
            <thead className="bg-[#13131a] text-xs tracking-wide text-[#6b7280] uppercase">
              <tr>
                <th className="px-5 py-4 font-medium">Email</th>
                <th className="px-5 py-4 font-medium">Level</th>
                <th className="px-5 py-4 font-medium">Requested</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e2e] bg-[#0f0f16]">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-5 py-4 text-[#d1d5db]">
                    {request.email}
                  </td>
                  <td className="px-5 py-4 text-[#9ca3af]">
                    Level {request.requested_level.slice(1)}
                  </td>
                  <td className="px-5 py-4 text-[#9ca3af]">
                    {formatDate(request.created_at)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        request.status === "approved"
                          ? "bg-[#22c55e]/15 text-[#86efac]"
                          : request.status === "rejected"
                            ? "bg-red-400/15 text-red-300"
                            : "bg-[#f59e0b]/15 text-[#fbbf24]"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {request.status === "pending" ? (
                      <form
                        action={reviewCFAAccess}
                        className="flex justify-end gap-2"
                      >
                        <input
                          type="hidden"
                          name="requestId"
                          value={request.id}
                        />
                        <button
                          type="submit"
                          name="decision"
                          value="rejected"
                          className="rounded-md border border-red-400/30 px-3 py-1.5 text-xs text-red-300 hover:bg-red-400/10"
                        >
                          Reject
                        </button>
                        <button
                          type="submit"
                          name="decision"
                          value="approved"
                          className="rounded-md bg-[#3b82f6] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#2563eb]"
                        >
                          Approve
                        </button>
                      </form>
                    ) : request.status === "approved" ? (
                      <form
                        action={reviewCFAAccess}
                        className="flex justify-end gap-2"
                      >
                        <input
                          type="hidden"
                          name="requestId"
                          value={request.id}
                        />
                        <button
                          type="submit"
                          name="decision"
                          value="rejected"
                          className="rounded-md border border-red-400/30 px-3 py-1.5 text-xs text-red-300 hover:bg-red-400/10"
                        >
                          Revoke
                        </button>
                        <button
                          type="submit"
                          name="decision"
                          value="resend"
                          className="rounded-md border border-[#1e1e2e] px-3 py-1.5 text-xs text-[#9ca3af] hover:border-[#3b82f6]/50 hover:text-[#f0f0f5]"
                        >
                          Resend link
                        </button>
                      </form>
                    ) : (
                      <span className="block text-right text-xs text-[#4b5563]">
                        Reviewed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-[#6b7280]"
                  >
                    No access requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
