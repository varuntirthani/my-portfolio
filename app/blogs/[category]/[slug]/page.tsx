import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import {
  getAllBlogPostPaths,
  getBlogCategory,
  getBlogPost,
} from "@/content/blogs";

type BlogPostPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogPostPaths().map(({ category, slug }) => ({
    category,
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { category: categorySlug, slug } = await params;
  const post = getBlogPost(categorySlug, slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category: categorySlug, slug } = await params;
  const category = getBlogCategory(categorySlug);
  const post = getBlogPost(categorySlug, slug);

  if (!category || !post) {
    notFound();
  }

  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container>
        <Link
          href={`/blogs/${categorySlug}`}
          className="mb-8 inline-flex text-sm text-neutral-600 underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          ← {category.title}
        </Link>

        <header className="mb-10 border-b border-neutral-200 pb-8">
          <p className="mb-3 text-sm font-medium tracking-wide text-accent uppercase">
            {category.title}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <time
            dateTime={post.publishedAt}
            className="mt-4 block text-sm text-neutral-500"
          >
            {formatDate(post.publishedAt)}
          </time>
          {post.tags && post.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="prose prose-neutral max-w-none">
          <p className="text-base leading-8 text-neutral-700">{post.excerpt}</p>
          <p className="mt-6 text-sm text-neutral-500">
            Full post content goes here — add body copy when you are ready.
          </p>
        </div>
      </Container>
    </main>
  );
}
