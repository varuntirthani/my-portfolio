import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { sendMagicLink, submitAccessRequest } from "@/app/cfa/actions";
import { CFAPreview } from "@/components/cfa/CFAPreview";
import { CFA_LEVELS, getCFAViewer } from "@/lib/cfa-access";
import { getCFAPreview } from "@/lib/cfa-preview";

export const metadata: Metadata = {
  title: "CFA Knowledge Hub",
  description: "Request access to CFA notes or sign in once approved.",
};

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; sent?: string; requested?: string }>;
};

const errorMessages: Record<string, string> = {
  busy: "We are receiving a lot of requests right now. Please try again in an hour.",
  callback: "That sign-in link is invalid or expired. Sign in again for a new one.",
  email: "Enter a valid email address.",
  level: "Choose the CFA level you want access to.",
  request: "We could not submit your request. Please try again.",
};

const inputClassName =
  "mt-2 w-full rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-3 text-sm text-[#f0f0f5] outline-none transition-colors placeholder:text-[#4b5563] focus:border-[#3b82f6]/70";

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
            Request access to one CFA level. Each request is reviewed
            personally, and you will receive a sign-in link by email once it
            is approved.
          </p>

          {params.requested === "1" && (
            <p className="mt-6 rounded-lg border border-[#22c55e]/30 bg-[#22c55e]/10 px-4 py-3 text-sm text-[#86efac]">
              Request received. You will get an email with a sign-in link if
              it is approved.
            </p>
          )}

          {params.sent === "1" && (
            <p className="mt-6 rounded-lg border border-[#22c55e]/30 bg-[#22c55e]/10 px-4 py-3 text-sm text-[#86efac]">
              If this email has been approved, a sign-in link is on its way.
            </p>
          )}

          {errorMessage && (
            <p className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </p>
          )}

          <form action={submitAccessRequest} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="request-email"
                className="font-[family-name:var(--font-cfa-mono)] text-xs text-[#9ca3af]"
              >
                Email address
              </label>
              <input
                id="request-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                className={inputClassName}
              />
            </div>

            <fieldset>
              <legend className="font-[family-name:var(--font-cfa-mono)] text-xs text-[#9ca3af]">
                CFA level
              </legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {CFA_LEVELS.map((level) => (
                  <label
                    key={level}
                    className="cursor-pointer rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] px-3 py-2.5 text-center text-sm text-[#d1d5db] transition-colors has-checked:border-[#3b82f6] has-checked:bg-[#3b82f6]/10 has-checked:text-[#93c5fd]"
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

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#3b82f6] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2563eb]"
            >
              Request access
            </button>
          </form>

          <div className="mt-8 border-t border-[#1e1e2e] pt-6">
            <p className="font-[family-name:var(--font-cfa-mono)] text-xs text-[#9ca3af]">
              Already approved?
            </p>
            <form action={sendMagicLink} className="mt-3 flex gap-2">
              <label htmlFor="signin-email" className="sr-only">
                Email address
              </label>
              <input
                id="signin-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] px-3 py-2.5 text-sm text-[#f0f0f5] outline-none transition-colors placeholder:text-[#4b5563] focus:border-[#3b82f6]/70"
              />
              <button
                type="submit"
                className="rounded-lg border border-[#1e1e2e] px-4 py-2.5 text-sm text-[#d1d5db] transition-colors hover:border-[#3b82f6]/50 hover:text-[#f0f0f5]"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
