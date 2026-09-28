"use client";

import { useState } from "react";
import type { CFATopic } from "@/data/cfa-types";
import { difficultyStyles } from "@/lib/cfa-utils";
import { NoteDrawer } from "@/components/cfa/NoteDrawer";

type TopicGridProps = {
  topics: CFATopic[];
};

export function TopicGrid({ topics }: TopicGridProps) {
  const [selectedTopic, setSelectedTopic] = useState<CFATopic | null>(null);

  if (topics.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#1e1e2e] bg-[#13131a]/50 px-6 py-12 text-center">
        <p className="font-[family-name:var(--font-cfa-mono)] text-sm text-[#9ca3af]">
          No topics match your search or filter.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const difficulty = difficultyStyles[topic.difficulty];

          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => setSelectedTopic(topic)}
              className="group rounded-xl border border-[#1e1e2e] bg-[#13131a] p-5 text-left transition-all duration-200 hover:border-[#3b82f6]/50 hover:shadow-[0_0_24px_rgba(59,130,246,0.12)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full border border-[#1e1e2e] px-2 py-0.5 font-[family-name:var(--font-cfa-mono)] text-[10px] tracking-wide text-[#9ca3af] uppercase">
                  {topic.category}
                </span>
                <span
                  className="flex items-center gap-1.5 text-[10px] text-[#6b7280]"
                  title={difficulty.label}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${difficulty.dot}`}
                  />
                  {difficulty.label}
                </span>
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-cfa-mono)] text-base font-semibold text-[#f0f0f5] transition-colors group-hover:text-[#93c5fd]">
                {topic.name}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#9ca3af]">
                {topic.summary}
              </p>
              <p className="mt-4 font-[family-name:var(--font-cfa-mono)] text-xs text-[#6b7280]">
                {topic.modules.length} modules
              </p>
            </button>
          );
        })}
      </div>

      {selectedTopic && (
        <NoteDrawer
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
        />
      )}
    </>
  );
}
