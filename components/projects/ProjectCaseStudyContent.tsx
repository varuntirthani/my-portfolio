import { type ReactNode } from "react";
import type { ProjectCaseStudy } from "@/content/projects";

type ProjectCaseStudyContentProps = {
  caseStudy: ProjectCaseStudy;
};

function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 text-sm font-medium tracking-wide text-neutral-500 uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ProjectCaseStudyContent({
  caseStudy,
}: ProjectCaseStudyContentProps) {
  return (
    <div className="space-y-10">
      {caseStudy.subtitle && (
        <p className="text-lg font-medium text-neutral-800">
          {caseStudy.subtitle}
        </p>
      )}

      <CaseStudySection title="Overview">
        <p className="text-base leading-7 text-neutral-700">
          {caseStudy.overview}
        </p>
      </CaseStudySection>

      <CaseStudySection title="Objective">
        <p className="text-base leading-7 text-neutral-700">
          {caseStudy.objective}
        </p>
      </CaseStudySection>

      <CaseStudySection title="Approach">
        <ul className="space-y-3">
          {caseStudy.approach.map((item) => (
            <li
              key={item.slice(0, 48)}
              className="flex gap-3 text-base leading-7 text-neutral-700"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection title="Findings">
        <ul className="space-y-3">
          {caseStudy.findings.map((item) => (
            <li
              key={item.slice(0, 48)}
              className="flex gap-3 text-base leading-7 text-neutral-700"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection title="Conclusion">
        <p className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-5 text-base leading-7 text-neutral-700">
          {caseStudy.conclusion}
        </p>
      </CaseStudySection>
    </div>
  );
}
