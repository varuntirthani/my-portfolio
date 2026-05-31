import { skills, tools } from "@/content/skills";
import { ContentImage } from "@/components/ui/ContentImage";

export function SkillsSection() {
  return (
    <section>
      <h2 className="mb-8 text-sm font-medium tracking-wide text-neutral-500 uppercase">
        Technical & Professional Skills
      </h2>

      <div className="mb-10 flex flex-wrap gap-6">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
              <ContentImage
                src={tool.icon}
                alt={tool.name}
                fill
                sizes="56px"
                className="object-contain p-2"
              />
            </div>
            <span className="text-xs text-neutral-600">{tool.name}</span>
          </div>
        ))}
      </div>

      <ul className="space-y-3">
        {skills.map((skill) => (
          <li
            key={skill.name}
            className="flex flex-col gap-1 border-b border-neutral-200 pb-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-base text-neutral-800">{skill.name}</span>
            <span className="text-sm text-neutral-500">{skill.experience}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
