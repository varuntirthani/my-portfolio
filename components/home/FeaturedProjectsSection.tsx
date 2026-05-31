import Link from "next/link";
import { getFeaturedProjects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function FeaturedProjectsSection() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section>
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-sm font-medium tracking-wide text-neutral-500 uppercase">
          Featured Projects
        </h2>
        <Link
          href="/projects"
          className="text-sm text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
