import Link from "next/link";
import type { Project } from "@/content/projects";
import { ContentImage } from "@/components/ui/ContentImage";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 transition-colors hover:border-neutral-300">
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <ContentImage
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600"
            >
              {tag}
            </li>
          ))}
        </ul>
        <p className="mt-4 flex-1 text-sm leading-6 text-neutral-600">
          {project.summary}
        </p>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-5 text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
        >
          Project summary →
        </Link>
      </div>
    </article>
  );
}
