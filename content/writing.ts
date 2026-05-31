export type WritingCategory = {
  slug: string;
  title: string;
  description: string;
  href?: string;
  comingSoon: boolean;
};

export const writingCategories: WritingCategory[] = [
  {
    slug: "cfa-journey",
    title: "CFA Journey",
    description: "Notes and reflections from the CFA program path.",
    href: "/cfa",
    comingSoon: false,
  },
  {
    slug: "work-experiences",
    title: "Work Experiences",
    description: "Insights from Goldman Sachs and professional roles.",
    comingSoon: true,
  },
  {
    slug: "investing",
    title: "Investing Blog",
    description: "Market views, theses, and capital markets research.",
    comingSoon: true,
  },
  {
    slug: "recruiting",
    title: "Recruiting Blog",
    description: "Career strategy, recruiting, and professional development.",
    comingSoon: true,
  },
  {
    slug: "topical",
    title: "Topical Blog",
    description: "Essays on technology, strategy, and analytical thinking.",
    comingSoon: true,
  },
];
