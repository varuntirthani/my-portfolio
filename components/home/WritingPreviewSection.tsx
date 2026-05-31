import Link from "next/link";
import { writingCategories } from "@/content/writing";

export function WritingPreviewSection() {
  return (
    <section>
      <h2 className="mb-8 text-sm font-medium tracking-wide text-neutral-500 uppercase">
        Writing & Notes
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {writingCategories.map((category) => {
          const content = (
            <>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium text-foreground">{category.title}</h3>
                {category.comingSoon ? (
                  <span className="shrink-0 rounded-full bg-neutral-200 px-2 py-0.5 text-xs text-neutral-600">
                    Soon
                  </span>
                ) : (
                  <span className="shrink-0 text-xs font-medium text-accent">
                    Live →
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {category.description}
              </p>
            </>
          );

          if (category.href && !category.comingSoon) {
            return (
              <Link
                key={category.slug}
                href={category.href}
                className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-5 transition-colors hover:border-neutral-300 hover:bg-white"
              >
                {content}
              </Link>
            );
          }

          return (
            <div
              key={category.slug}
              className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-5"
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
