import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";
import { ProjectCaseStudyContent } from "@/components/projects/ProjectCaseStudyContent";
import { ContentImage } from "@/components/ui/ContentImage";
import { Container } from "@/components/layout/Container";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const heroImage = project.detailImage ?? project.image;

  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container>
        <Link
          href="/projects"
          className="mb-8 inline-flex text-sm text-neutral-600 underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          ← All projects
        </Link>

        <article>
          <header className="mb-10">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {project.title}
            </h1>
            {project.caseStudy.subtitle && (
              <p className="mt-3 text-lg text-neutral-600">
                {project.caseStudy.subtitle}
              </p>
            )}
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </header>

          <div className="relative mb-12 aspect-[16/10] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
            <ContentImage
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
            />
          </div>

          <ProjectCaseStudyContent caseStudy={project.caseStudy} />
        </article>
      </Container>
    </main>
  );
}
