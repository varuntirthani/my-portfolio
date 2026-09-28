import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requestCFAAccess, signOut } from "@/app/cfa/actions";
import { CFA_LEVELS, requireCFAUser } from "@/lib/cfa-access";

export const metadata: Metadata = {
  title: "Request CFA Access",
};

export const dynamic = "force-dynamic";

type RequestAccessPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function RequestAccessPage({
  searchParams,
}: RequestAccessPageProps) {
  const viewer = await requireCFAUser();

  if (
    viewer.isAdmin ||
    viewer.accessRequest?.status === "approved" ||
    viewer.accessRequest?.status === "pending"
  ) {
    redirect("/cfa");
  }

  const params = await searchParams;

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-[#0a0a0f] bg-[radial-gradient(#1e1e2e_1px,transparent_1px)] px-6 py-16 [background-size:20px_20px]">
      <div className="mx-auto max-w-lg rounded-2xl border border-[#1e1e2e] bg-[#13131a] p-8 shadow-2xl">
        <p className="font-[family-name:var(--font-cfa-mono)] text-xs tracking-[0.2em] text-[#3b82f6] uppercase">
          Access request
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-cfa-mono)] text-2xl font-semibold text-[#f0f0f5]">
          Choose your CFA level
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#9ca3af]">
          Access is reviewed manually. If approved, this account will only
          receive notes for the selected level.
        </p>

        <div className="mt-6 rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-3">
          <p className="text-xs text-[#6b7280]">Verified email</p>
          <p className="mt-1 text-sm text-[#d1d5db]">{viewer.user.email}</p>
        </div>

        {viewer.accessRequest?.status === "rejected" && (
          <p className="mt-6 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-3 text-sm text-[#fbbf24]">
            Your previous request was not approved. You may submit a new level
            for review.
          </p>
        )}

        {params.error && (
          <p className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            We could not submit this request. Check the selected level and try
            again.
          </p>
        )}

        <form action={requestCFAAccess} className="mt-8 space-y-4">
          <fieldset>
            <legend className="font-[family-name:var(--font-cfa-mono)] text-xs text-[#9ca3af]">
              Requested level
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {CFA_LEVELS.map((level) => (
                <label
                  key={level}
                  className="cursor-pointer rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-3 text-center text-sm text-[#d1d5db] has-checked:border-[#3b82f6] has-checked:bg-[#3b82f6]/10 has-checked:text-[#93c5fd]"
                >
                  <input
                    type="radio"
                    name="level"
                    value={level}
                    required
                    className="sr-only"
                  />
                  Level {level.slice(1)}
                </label>
              ))}
            </div>
          </fieldset>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#3b82f6] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2563eb]"
          >
            Submit for approval
          </button>
        </form>

        <form action={signOut} className="mt-4 text-center">
          <button
            type="submit"
            className="text-xs text-[#6b7280] underline-offset-4 hover:text-[#9ca3af] hover:underline"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
