import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { sendMagicLink } from "@/app/cfa/actions";
import { CFAPreview } from "@/components/cfa/CFAPreview";
import { getCFAViewer } from "@/lib/cfa-access";
import { getCFAPreview } from "@/lib/cfa-preview";

export const metadata: Metadata = {
  title: "CFA Hub Sign In",
  description: "Sign in to request or access CFA notes.",
};

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; sent?: string }>;
};

const errorMessages: Record<string, string> = {
  callback: "That sign-in link is invalid or expired. Request a new one.",
  email: "Enter a valid email address.",
  signin: "We could not send a sign-in link. Please try again.",
};

export default async function CFALoginPage({
  searchParams,
}: LoginPageProps) {
  const viewer = await getCFAViewer();
  if (viewer) {
    redirect("/cfa");
  }

  const params = await searchParams;
  const errorMessage = params.error ? errorMessages[params.error] : null;

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-[#0a0a0f] bg-[radial-gradient(#1e1e2e_1px,transparent_1px)] px-6 py-16 [background-size:20px_20px]">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="order-2 lg:order-1">
          <CFAPreview preview={getCFAPreview()} />
        </div>

        <div className="order-1 rounded-2xl border border-[#1e1e2e] bg-[#13131a] p-8 shadow-2xl lg:sticky lg:top-8 lg:order-2">
          <p className="font-[family-name:var(--font-cfa-mono)] text-xs tracking-[0.2em] text-[#3b82f6] uppercase">
            Restricted access
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-cfa-mono)] text-2xl font-semibold text-[#f0f0f5]">
            CFA Knowledge Hub
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#9ca3af]">
            Sign in with your email. New visitors can request access to one CFA
            level after verifying their address.
          </p>

          {params.sent === "1" && (
            <p className="mt-6 rounded-lg border border-[#22c55e]/30 bg-[#22c55e]/10 px-4 py-3 text-sm text-[#86efac]">
              Check your inbox for a secure sign-in link.
            </p>
          )}

          {errorMessage && (
            <p className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </p>
          )}

          <form action={sendMagicLink} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="font-[family-name:var(--font-cfa-mono)] text-xs text-[#9ca3af]"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="mt-2 w-full rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-3 text-sm text-[#f0f0f5] outline-none transition-colors placeholder:text-[#4b5563] focus:border-[#3b82f6]/70"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#3b82f6] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2563eb]"
            >
              Email me a sign-in link
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
