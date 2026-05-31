import Link from "next/link";
import { about } from "@/content/about";
import { ResumeLink, SocialLinks } from "@/components/ui/SocialLinks";

export function AboutContent() {
  return (
    <article>
      <header className="mb-12">
        <p className="mb-3 text-sm font-medium tracking-wide text-accent uppercase">
          {about.headline}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Varun Tirthani
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-600">
          {about.intro}
        </p>
      </header>

      <div className="space-y-12">
        {about.sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-4 text-sm font-medium tracking-wide text-neutral-500 uppercase">
              {section.title}
            </h2>
            {section.title === "Credentials" ? (
              <ul className="space-y-2">
                {section.body.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-base text-neutral-700"
                  >
                    <span className="text-accent" aria-hidden="true">
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="space-y-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-base leading-7 text-neutral-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <section className="mt-14 border-t border-neutral-200 pt-10">
        <h2 className="mb-4 text-sm font-medium tracking-wide text-neutral-500 uppercase">
          {about.contact.label}
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={`mailto:${about.contact.email}`}
            className="text-base font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
          >
            {about.contact.email}
          </a>
          <SocialLinks />
        </div>
        <ResumeLink className="mt-4" />
        <Link
          href="/"
          className="mt-6 inline-flex text-sm text-neutral-600 underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          ← Back to home
        </Link>
      </section>
    </article>
  );
}
