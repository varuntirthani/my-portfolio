import Link from "next/link";
import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200/80 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-5 sm:px-8">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-foreground transition-colors hover:text-accent"
        >
          {site.name}
        </Link>
        <PrimaryNav />
      </div>
    </header>
  );
}
