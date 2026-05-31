"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

export function PrimaryNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          const isDisabled = "disabled" in item && item.disabled;

          if (isDisabled) {
            return (
              <li key={item.href}>
                <span
                  className="cursor-not-allowed text-sm text-neutral-400"
                  title="Coming soon"
                >
                  {item.label}
                </span>
              </li>
            );
          }

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "font-medium text-accent"
                    : "text-neutral-600 hover:text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
