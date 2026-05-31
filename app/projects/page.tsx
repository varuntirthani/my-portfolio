import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies in systematic trading, global economy research, and quantitative work.",
};

export default function ProjectsPage() {
  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container wide>
        <header className="mb-12">
          <p className="mb-3 text-sm font-medium tracking-wide text-accent uppercase">
            Projects
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Featured work
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
            Selected projects across systematic trading, economic research, and
            quantitative analysis.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <Link
          href="/"
          className="mt-12 inline-flex text-sm text-neutral-600 underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          ← Back to home
        </Link>
      </Container>
    </main>
  );
}
