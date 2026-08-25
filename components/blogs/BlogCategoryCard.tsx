import Link from "next/link";
import type { BlogCategory } from "@/content/blogs";
import { getPublishedPosts } from "@/content/blogs";

type BlogCategoryCardProps = {
  category: BlogCategory;
};

export function BlogCategoryCard({ category }: BlogCategoryCardProps) {
  const postCount = getPublishedPosts(category.slug).length;
  const isEmpty = postCount === 0 && category.comingSoon;

  return (
    <article className="flex flex-col rounded-xl border border-neutral-200 bg-neutral-50/50 p-5 transition-colors hover:border-neutral-300 hover:bg-white">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          <Link
            href={`/blogs/${category.slug}`}
            className="transition-colors hover:text-accent"
          >
            {category.title}
          </Link>
        </h2>
        {isEmpty ? (
          <span className="shrink-0 rounded-full bg-neutral-200 px-2 py-0.5 text-xs text-neutral-600">
            Soon
          </span>
        ) : (
          <span className="shrink-0 text-xs font-medium text-neutral-500">
            {postCount} {postCount === 1 ? "post" : "posts"}
          </span>
        )}
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">
        {category.description}
      </p>
      <Link
        href={`/blogs/${category.slug}`}
        className="mt-5 text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
      >
        View category →
      </Link>
    </article>
  );
}
