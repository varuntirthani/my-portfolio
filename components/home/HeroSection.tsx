import { profile } from "@/content/profile";
import { ResumeLink, SocialLinks } from "@/components/ui/SocialLinks";
import { ContentImage } from "@/components/ui/ContentImage";

export function HeroSection() {
  return (
    <section className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_200px] sm:items-start">
      <div>
        <p className="mb-3 text-sm font-medium tracking-wide text-accent uppercase">
          Portfolio
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {profile.greeting}
        </h1>
        <div className="mt-6 space-y-4">
          {profile.bio.slice(0, 3).map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-base leading-7 text-neutral-700"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-4 text-base leading-7 text-neutral-600">
          {profile.bio[3]}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <ResumeLink />
          <SocialLinks />
        </div>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 sm:mx-0">
        <ContentImage
          src={profile.photo.src}
          alt={profile.photo.alt}
          fill
          priority
          sizes="200px"
          className="object-cover"
        />
      </div>
    </section>
  );
}
