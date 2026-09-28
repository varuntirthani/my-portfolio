"use client";

import { useState } from "react";
import type { CFATopic } from "@/data/cfa-types";
import { CFANoteText } from "@/components/cfa/CFANoteText";

type NoteDrawerProps = {
  topic: CFATopic;
  onClose: () => void;
};

export function NoteDrawer({ topic, onClose }: NoteDrawerProps) {
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(
    topic.modules[0]?.id ?? null,
  );
  const [copiedModuleId, setCopiedModuleId] = useState<string | null>(null);

  async function copyNotes(moduleId: string, title: string, notes: string[]) {
    const text = `${topic.name} — ${title}\n\n${notes.map((note) => `• ${note}`).join("\n")}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedModuleId(moduleId);
      window.setTimeout(() => setCopiedModuleId(null), 2000);
    } catch {
      setCopiedModuleId(null);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <aside
        className="flex h-full w-full max-w-xl flex-col border-l border-[#1e1e2e] bg-[#13131a] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        aria-labelledby="note-drawer-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#1e1e2e] px-6 py-5">
          <div>
            <p className="font-[family-name:var(--font-cfa-mono)] text-xs tracking-wide text-[#3b82f6] uppercase">
              {topic.category}
            </p>
            <h2
              id="note-drawer-title"
              className="mt-1 font-[family-name:var(--font-cfa-mono)] text-xl font-semibold text-[#f0f0f5]"
            >
              {topic.name}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#9ca3af]">
              {topic.summary}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[#1e1e2e] px-3 py-1.5 text-sm text-[#9ca3af] transition-colors hover:border-[#3b82f6]/50 hover:text-[#f0f0f5]"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3">
            {topic.modules.map((module) => {
              const isExpanded = expandedModuleId === module.id;

              return (
                <div
                  key={module.id}
                  className="overflow-hidden rounded-lg border border-[#1e1e2e] bg-[#0a0a0f]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedModuleId(isExpanded ? null : module.id)
                    }
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[#13131a]"
                  >
                    <span className="font-[family-name:var(--font-cfa-mono)] text-sm font-medium text-[#f0f0f5]">
                      {module.title}
                    </span>
                    <span className="text-xs text-[#6b7280]">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-[#1e1e2e] px-4 py-4">
                        <ul className="space-y-3">
                          {module.notes.map((note) => (
                            <li
                              key={note.slice(0, 48)}
                              className="flex gap-3 text-sm leading-6 text-[#d1d5db]"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3b82f6]" />
                              <CFANoteText text={note} />
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={() =>
                            copyNotes(module.id, module.title, module.notes)
                          }
                          className="mt-4 rounded-md border border-[#1e1e2e] px-3 py-1.5 text-xs text-[#9ca3af] transition-colors hover:border-[#3b82f6]/50 hover:text-[#f0f0f5]"
                        >
                          {copiedModuleId === module.id
                            ? "Copied"
                            : "Copy notes"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
