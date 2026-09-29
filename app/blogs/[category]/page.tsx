import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostCard } from "@/components/blogs/BlogPostCard";
import { Container } from "@/components/layout/Container";
import {
  blogCategories,
  getBlogCategory,
  getPublishedPosts,
} from "@/content/blogs";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return blogCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getBlogCategory(categorySlug);

  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getBlogCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const posts = getPublishedPosts(categorySlug);

  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container wide>
        <header className="mb-12">
          <Link
            href="/blogs"
            className="mb-4 inline-flex text-sm text-neutral-600 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            ← All blog categories
          </Link>
          <p className="mb-3 text-sm font-medium tracking-wide text-accent uppercase">
            Blog
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {category.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
            {category.description}
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-6">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50/50 px-6 py-12 text-center">
            <p className="text-sm font-medium text-neutral-700">
              Posts coming soon
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              This category is set up and ready for your first essay.
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
