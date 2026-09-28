import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/cfa/actions";
import { CFAHub } from "@/components/cfa/CFAHub";
import { cfaData } from "@/data/cfa-data";
import type { CFADataSubset } from "@/data/cfa-types";
import { requireCFAUser } from "@/lib/cfa-access";

export const metadata: Metadata = {
  title: "CFA Knowledge Hub",
  description:
    "Interactive, searchable CFA exam notes across Levels I, II, and III.",
};

export const dynamic = "force-dynamic";

export default async function CFAPage() {
  const viewer = await requireCFAUser();

  if (!viewer.isAdmin && !viewer.accessRequest) {
    redirect("/cfa/request-access");
  }

  if (viewer.accessRequest?.status === "rejected") {
    redirect("/cfa/request-access");
  }

  if (viewer.allowedLevels.length === 0) {
    return (
      <main className="min-h-[calc(100vh-8rem)] bg-[#0a0a0f] bg-[radial-gradient(#1e1e2e_1px,transparent_1px)] px-6 py-16 [background-size:20px_20px]">
        <div className="mx-auto max-w-lg rounded-2xl border border-[#1e1e2e] bg-[#13131a] p-8 text-center shadow-2xl">
          <p className="font-[family-name:var(--font-cfa-mono)] text-xs tracking-[0.2em] text-[#f59e0b] uppercase">
            Approval pending
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-cfa-mono)] text-2xl font-semibold text-[#f0f0f5]">
            Your request is under review
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#9ca3af]">
            You requested Level{" "}
            {viewer.accessRequest?.requested_level.slice(1)} access. You will
            be able to open the notes after approval.
          </p>
          <form action={signOut} className="mt-8">
            <button
              type="submit"
              className="rounded-lg border border-[#1e1e2e] px-4 py-2 text-sm text-[#9ca3af] transition-colors hover:border-[#3b82f6]/50 hover:text-[#f0f0f5]"
            >
              Sign out
            </button>
          </form>
        </div>
      </main>
    );
  }

  const permittedData = Object.fromEntries(
    viewer.allowedLevels.map((level) => [level, cfaData[level]]),
  ) as CFADataSubset;

  return (
    <>
      <div className="border-b border-[#1e1e2e] bg-[#0a0a0f] px-6 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-end gap-4 text-xs">
          {viewer.isAdmin && (
            <Link
              href="/cfa/admin"
              className="text-[#93c5fd] underline-offset-4 hover:underline"
            >
              Manage access
            </Link>
          )}
          <span className="hidden text-[#6b7280] sm:inline">
            {viewer.user.email}
          </span>
          <form action={signOut}>
            <button
              type="submit"
              className="text-[#9ca3af] underline-offset-4 hover:text-[#f0f0f5] hover:underline"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
      <CFAHub
        allowedLevels={viewer.allowedLevels}
        data={permittedData}
      />
    </>
  );
}
