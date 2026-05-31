import { profile } from "@/content/profile";

const externalLinks = [
  {
    key: "email",
    label: "Email",
    href: `mailto:${profile.links.email}`,
    show: Boolean(profile.links.email),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: profile.links.linkedin,
    show: Boolean(profile.links.linkedin),
  },
  {
    key: "github",
    label: "GitHub",
    href: profile.links.github,
    show: Boolean(profile.links.github),
  },
] as const;

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className = "" }: SocialLinksProps) {
  const visibleLinks = externalLinks.filter((link) => link.show);

  if (visibleLinks.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      {visibleLinks.map((link, index) => (
        <span key={link.key} className="flex items-center gap-4">
          {index > 0 && (
            <span className="text-neutral-300" aria-hidden="true">
              |
            </span>
          )}
          <a
            href={link.href}
            className="text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
            {...(link.key !== "email"
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {link.label}
          </a>
        </span>
      ))}
    </div>
  );
}

export function ResumeLink({ className = "" }: SocialLinksProps) {
  if (!profile.links.resume) {
    return null;
  }

  return (
    <a
      href={profile.links.resume}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline ${className}`}
    >
      View Resume →
    </a>
  );
}
