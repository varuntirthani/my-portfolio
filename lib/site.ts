export const site = {
  name: "Varun Tirthani",
  tagline:
    "Investing, technology, and structured problem solving at the intersection of finance and engineering.",
  url: "https://varuntirthani.com",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "CFA Hub", href: "/cfa" },
  { label: "Writing", href: "/writing", disabled: true },
  { label: "Research Lab", href: "/research", disabled: true },
] as const;
