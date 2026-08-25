export type BlogCategory = {
  slug: string;
  title: string;
  description: string;
  comingSoon?: boolean;
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags?: string[];
  draft?: boolean;
};

export const blogCategories: BlogCategory[] = [
  {
    slug: "work-experiences",
    title: "Work Experiences",
    description:
      "Insights from Goldman Sachs, professional roles, and lessons from the desk.",
    comingSoon: true,
  },
  {
    slug: "investing",
    title: "Investing",
    description:
      "Market views, investment theses, and capital markets research.",
    comingSoon: true,
  },
  {
    slug: "recruiting",
    title: "Recruiting",
    description:
      "Career strategy, recruiting, and professional development.",
    comingSoon: true,
  },
  {
    slug: "topical",
    title: "Topical",
    description:
      "Essays on technology, strategy, systems thinking, and analytical work.",
    comingSoon: true,
  },
];

/** Add posts here as you write them. */
export const blogPosts: BlogPost[] = [];

export function getBlogCategory(slug: string) {
  return blogCategories.find((category) => category.slug === slug);
}

export function getPublishedPosts(categorySlug?: string) {
  return blogPosts.filter(
    (post) =>
      !post.draft && (!categorySlug || post.category === categorySlug),
  );
}

export function getBlogPost(categorySlug: string, postSlug: string) {
  return blogPosts.find(
    (post) =>
      post.category === categorySlug &&
      post.slug === postSlug &&
      !post.draft,
  );
}

export function getAllBlogPostPaths() {
  return getPublishedPosts().map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}
