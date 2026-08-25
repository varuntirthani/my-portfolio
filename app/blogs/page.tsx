import type { Metadata } from "next";
import Link from "next/link";
import { BlogCategoryCard } from "@/components/blogs/BlogCategoryCard";
import { Container } from "@/components/layout/Container";
import { blogCategories, getPublishedPosts } from "@/content/blogs";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Essays and notes on investing, work, recruiting, and analytical thinking.",
};

export default function BlogsPage() {
  const recentPosts = getPublishedPosts().slice(0, 3);

  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container wide>
        <header className="mb-12">
          <p className="mb-3 text-sm font-medium tracking-wide text-accent uppercase">
            Blog
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Writing & notes
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
            Long-form essays and reflections across investing, professional
            experience, recruiting, and topics I am exploring.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="mb-6 text-sm font-medium tracking-wide text-neutral-500 uppercase">
            Categories
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {blogCategories.map((category) => (
              <BlogCategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </section>

        {recentPosts.length > 0 && (
          <section>
            <h2 className="mb-6 text-sm font-medium tracking-wide text-neutral-500 uppercase">
              Recent posts
            </h2>
            <div className="rounded-xl border border-neutral-200 bg-white px-6">
              {recentPosts.map((post) => (
                <article
                  key={`${post.category}-${post.slug}`}
                  className="border-b border-neutral-200 py-6 last:border-b-0"
                >
                  <Link
                    href={`/blogs/${post.category}/${post.slug}`}
                    className="text-lg font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-2 text-sm text-neutral-600">{post.excerpt}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <Link
          href="/"
          className="mt-12 inline-flex text-sm text-neutral-600 underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          ← Back to home
        </Link>
      </Container>
    </main>
  );
}
