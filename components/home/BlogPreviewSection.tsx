import Link from "next/link";
import { blogCategories } from "@/content/blogs";

export function BlogPreviewSection() {
  return (
    <section>
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-sm font-medium tracking-wide text-neutral-500 uppercase">
          Blog
        </h2>
        <Link
          href="/blogs"
          className="text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
        >
          View all →
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {blogCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/blogs/${category.slug}`}
            className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-5 transition-colors hover:border-neutral-300 hover:bg-neutral-100"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-medium text-foreground">{category.title}</h3>
              {category.comingSoon && (
                <span className="shrink-0 rounded-full bg-neutral-200 px-2 py-0.5 text-xs text-neutral-600">
                  Soon
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
