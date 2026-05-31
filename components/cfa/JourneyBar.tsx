import { cfaData } from "@/data/cfa-data";
import type { CFALevelKey } from "@/lib/cfa-utils";

const levels: CFALevelKey[] = ["L1", "L2", "L3"];

export function JourneyBar() {
  return (
    <div className="border-b border-[#1e1e2e] bg-[#0a0a0f] px-6 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-[family-name:var(--font-cfa-mono)] text-xs tracking-[0.2em] text-[#6b7280] uppercase">
          CFA Journey
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-cfa-mono)] text-2xl font-semibold tracking-tight text-[#f0f0f5] sm:text-3xl">
          Knowledge Hub
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9ca3af]">
          Searchable notes from Levels I–III. L1 and L2 passed — currently
          preparing for Level III.
        </p>

        <div className="mt-8 flex items-stretch gap-0">
          {levels.map((key, index) => {
            const level = cfaData[key];
            const isLast = index === levels.length - 1;
            const isInProgress = level.status === "in_progress";
            const isPassed = level.status === "passed";

            return (
              <div key={key} className="flex flex-1 items-center">
                <div className="flex flex-1 flex-col items-center text-center">
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 font-[family-name:var(--font-cfa-mono)] text-sm font-semibold ${
                      isInProgress
                        ? "animate-pulse border-[#f59e0b] bg-[#f59e0b]/10 text-[#fbbf24]"
                        : isPassed
                          ? "border-[#22c55e] bg-[#22c55e]/10 text-[#4ade80]"
                          : "border-[#1e1e2e] bg-[#13131a] text-[#6b7280]"
                    }`}
                  >
                    {key.replace("L", "")}
                    {isInProgress && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#f59e0b]" />
                    )}
                  </div>
                  <p className="mt-3 font-[family-name:var(--font-cfa-mono)] text-sm font-medium text-[#f0f0f5]">
                    {level.label}
                  </p>
                  <p className="mt-1 text-xs text-[#6b7280]">
                    {isInProgress
                      ? "In Progress"
                      : level.passDate
                        ? `Passed ${level.passDate}`
                        : "—"}
                  </p>
                  <p className="mt-1 text-xs text-[#9ca3af]">
                    {level.topics.length} topics
                  </p>
                </div>

                {!isLast && (
                  <div
                    className={`mx-2 hidden h-px flex-1 sm:block ${
                      isPassed ? "bg-[#22c55e]/40" : "bg-[#1e1e2e]"
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
