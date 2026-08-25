import Link from "next/link";
import type { BlogPost } from "@/content/blogs";

type BlogPostCardProps = {
  post: BlogPost;
};

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="border-b border-neutral-200 py-8 first:pt-0 last:border-b-0">
      <time
        dateTime={post.publishedAt}
        className="text-xs font-medium tracking-wide text-neutral-500 uppercase"
      >
        {formatDate(post.publishedAt)}
      </time>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
        <Link
          href={`/blogs/${post.category}/${post.slug}`}
          className="transition-colors hover:text-accent"
        >
          {post.title}
        </Link>
      </h2>
      {post.tags && post.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
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
      <p className="mt-3 text-sm leading-7 text-neutral-600">{post.excerpt}</p>
      <Link
        href={`/blogs/${post.category}/${post.slug}`}
        className="mt-4 inline-flex text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
      >
        Read more →
      </Link>
    </article>
  );
}
