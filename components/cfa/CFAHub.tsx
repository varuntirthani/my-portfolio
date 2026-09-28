"use client";

import { useMemo, useState } from "react";
import type {
  CFADataSubset,
  CFALevelKey,
} from "@/data/cfa-types";
import {
  filterTopics,
  getLevelCategories,
} from "@/lib/cfa-utils";
import { FlashcardMode } from "@/components/cfa/FlashcardMode";
import { JourneyBar } from "@/components/cfa/JourneyBar";
import { TopicGrid } from "@/components/cfa/TopicGrid";

type CFAHubProps = {
  allowedLevels: CFALevelKey[];
  data: CFADataSubset;
};

export function CFAHub({ allowedLevels, data }: CFAHubProps) {
  const [activeLevel, setActiveLevel] = useState<CFALevelKey>(
    allowedLevels[0],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);

  const activeLevelData = data[activeLevel]!;
  const journeyLevels = allowedLevels.map((key) => ({
    key,
    level: data[key]!,
  }));
  const categories = useMemo(
    () => getLevelCategories(activeLevelData),
    [activeLevelData],
  );

  const filteredTopics = useMemo(
    () => filterTopics(activeLevelData, searchQuery, activeCategory),
    [activeLevelData, searchQuery, activeCategory],
  );

  function handleLevelChange(level: CFALevelKey) {
    setActiveLevel(level);
    setActiveCategory(null);
  }

  return (
    <div className="relative min-h-[calc(100vh-8rem)] bg-[#0a0a0f] bg-[radial-gradient(#1e1e2e_1px,transparent_1px)] [background-size:20px_20px]">
      <JourneyBar levels={journeyLevels} />

      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8">
        <div className="flex flex-wrap gap-2 border-b border-[#1e1e2e] pb-1">
          {allowedLevels.map((level) => {
            const isActive = activeLevel === level;
            const levelData = data[level]!;

            return (
              <button
                key={level}
                type="button"
                onClick={() => handleLevelChange(level)}
                className={`relative px-4 py-2 font-[family-name:var(--font-cfa-mono)] text-sm transition-colors ${
                  isActive
                    ? "text-[#f0f0f5]"
                    : "text-[#6b7280] hover:text-[#9ca3af]"
                }`}
              >
                {levelData.label}
                {levelData.status === "in_progress" && (
                  <span className="ml-2 rounded-full bg-[#f59e0b]/20 px-2 py-0.5 text-[10px] text-[#fbbf24]">
                    In Progress
                  </span>
                )}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#3b82f6]" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-4">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search topics, modules, and notes..."
            className="w-full rounded-lg border border-[#1e1e2e] bg-[#13131a] px-4 py-3 text-sm text-[#f0f0f5] placeholder:text-[#6b7280] outline-none transition-colors focus:border-[#3b82f6]/60"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`rounded-full border px-3 py-1 font-[family-name:var(--font-cfa-mono)] text-xs transition-colors ${
                activeCategory === null
                  ? "border-[#3b82f6]/50 bg-[#3b82f6]/10 text-[#93c5fd]"
                  : "border-[#1e1e2e] text-[#9ca3af] hover:border-[#3b82f6]/30"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-3 py-1 font-[family-name:var(--font-cfa-mono)] text-xs transition-colors ${
                  activeCategory === category
                    ? "border-[#3b82f6]/50 bg-[#3b82f6]/10 text-[#93c5fd]"
                    : "border-[#1e1e2e] text-[#9ca3af] hover:border-[#3b82f6]/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-[family-name:var(--font-cfa-mono)] text-xs tracking-wide text-[#6b7280] uppercase">
              {filteredTopics.length} topic
              {filteredTopics.length === 1 ? "" : "s"}
            </p>
          </div>
          <TopicGrid topics={filteredTopics} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsFlashcardMode(true)}
        className="fixed right-6 bottom-6 z-40 rounded-full bg-[#3b82f6] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#3b82f6]/20 transition-colors hover:bg-[#2563eb]"
      >
        {isFlashcardMode ? "Flashcards" : "Flashcard Mode"}
      </button>

      {isFlashcardMode && (
        <FlashcardMode
          level={activeLevelData}
          searchQuery={searchQuery}
          activeCategory={activeCategory}
          onExit={() => setIsFlashcardMode(false)}
        />
      )}
    </div>
  );
}
