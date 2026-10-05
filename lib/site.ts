export const site = {
  name: "Varun Tirthani",
  tagline:
    "Investing, technology, and structured problem solving at the intersection of finance and engineering.",
  url: "https://my-portfolio-kappa-nine-57.vercel.app",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "CFA Hub", href: "/cfa" },
  { label: "Blog", href: "/blogs" },
  { label: "Research Lab", href: "/research", disabled: true },
] as const;
