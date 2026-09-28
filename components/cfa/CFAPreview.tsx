import { CFANoteText } from "@/components/cfa/CFANoteText";
import type { CFAPreview as CFAPreviewData } from "@/lib/cfa-preview";
import { difficultyStyles } from "@/lib/cfa-utils";

const statusLabels = {
  passed: "Passed",
  in_progress: "In progress",
} as const;

export function CFAPreview({ preview }: { preview: CFAPreviewData }) {
  const stats = [
    { label: "Topics", value: preview.totals.topics },
    { label: "Notes", value: preview.totals.notes },
    { label: "Formulas", value: preview.totals.formulas },
  ];

  return (
    <section aria-labelledby="cfa-preview-heading" className="space-y-10">
      <div>
        <p className="font-[family-name:var(--font-cfa-mono)] text-xs tracking-[0.2em] text-[#3b82f6] uppercase">
          Sneak peek
        </p>
        <h2
          id="cfa-preview-heading"
          className="mt-3 font-[family-name:var(--font-cfa-mono)] text-2xl font-semibold text-[#f0f0f5] sm:text-3xl"
        >
          What&apos;s inside the hub
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#9ca3af]">
          Condensed notes from my own CFA preparation across all three levels,
          with every key formula typeset, searchable, and ready for flashcard
          review.
        </p>

        <dl className="mt-6 grid max-w-md grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[#1e1e2e] bg-[#13131a] px-4 py-3"
            >
              <dt className="text-xs text-[#6b7280]">{stat.label}</dt>
              <dd className="mt-1 font-[family-name:var(--font-cfa-mono)] text-xl font-semibold text-[#f0f0f5]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <h3 className="font-[family-name:var(--font-cfa-mono)] text-sm font-semibold text-[#f0f0f5]">
          A few sample notes
        </h3>
        <ul className="mt-4 space-y-3">
          {preview.samples.map((sample) => (
            <li
              key={sample.note}
              className="rounded-xl border border-[#1e1e2e] bg-[#13131a] p-4"
            >
              <p className="font-[family-name:var(--font-cfa-mono)] text-[11px] tracking-wide text-[#6b7280] uppercase">
                {sample.level} · {sample.topic} · {sample.module}
              </p>
              <CFANoteText
                text={sample.note}
                className="mt-2 block text-sm leading-7 text-[#d1d5db]"
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-[family-name:var(--font-cfa-mono)] text-sm font-semibold text-[#f0f0f5]">
          Topics by level
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {preview.levels.map((level) => (
            <div
              key={level.key}
              className="rounded-xl border border-[#1e1e2e] bg-[#13131a] p-4"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-[family-name:var(--font-cfa-mono)] text-sm font-semibold text-[#f0f0f5]">
                  {level.label}
                </p>
                <span
                  className={`text-[11px] ${level.status === "passed" ? "text-[#86efac]" : "text-[#fcd34d]"}`}
                >
                  {statusLabels[level.status]}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#6b7280]">
                {level.topics.length} topics · {level.noteCount} notes
              </p>
              <ul className="mt-4 space-y-2">
                {level.topics.map((topic) => (
                  <li
                    key={topic.name}
                    className="flex items-center gap-2 text-xs text-[#9ca3af]"
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${difficultyStyles[topic.difficulty].dot}`}
                      title={difficultyStyles[topic.difficulty].label}
                    />
                    <span className="flex-1 truncate">{topic.name}</span>
                    <span className="font-[family-name:var(--font-cfa-mono)] text-[#4b5563]">
                      {topic.noteCount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
