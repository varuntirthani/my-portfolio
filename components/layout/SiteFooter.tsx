import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-neutral-200/80">
      <div className="mx-auto max-w-3xl px-6 py-8 sm:px-8">
        <p className="text-sm text-neutral-500">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
