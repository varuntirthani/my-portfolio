import { profile } from "@/content/profile";

export const about = {
  headline: "About",
  intro: profile.bio[0],
  sections: [
    {
      title: "Background",
      body: profile.bio.slice(1, 3),
    },
    {
      title: "What this site is",
      body: [profile.bio[3]],
    },
    {
      title: "Credentials",
      body: profile.credentials,
    },
  ],
  contact: {
    label: "Get in touch",
    email: profile.links.email,
  },
} as const;
