"use client";

import { useEffect, useMemo, useState } from "react";
import type { CFALevelKey } from "@/lib/cfa-utils";
import {
  buildFlashcards,
  shuffleFlashcards,
  type Flashcard,
} from "@/lib/cfa-utils";
import { cfaData } from "@/data/cfa-data";

type FlashcardModeProps = {
  activeLevel: CFALevelKey;
  searchQuery: string;
  activeCategory: string | null;
  onExit: () => void;
};

export function FlashcardMode({
  activeLevel,
  searchQuery,
  activeCategory,
  onExit,
}: FlashcardModeProps) {
  const initialDeck = useMemo(
    () =>
      shuffleFlashcards(
        buildFlashcards(cfaData[activeLevel], searchQuery, activeCategory),
      ),
    [activeLevel, searchQuery, activeCategory],
  );

  const [deck, setDeck] = useState<Flashcard[]>(initialDeck);
  const [reviewQueue, setReviewQueue] = useState<Flashcard[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [seenCount, setSeenCount] = useState(0);

  useEffect(() => {
    setDeck(initialDeck);
    setReviewQueue([]);
    setIsFlipped(false);
    setSeenCount(0);
  }, [initialDeck]);

  const currentCard = deck[0];
  const totalCards = initialDeck.length;
  const remaining = deck.length + reviewQueue.length;

  function advance(nextDeck: Flashcard[], nextReview: Flashcard[]) {
    let resolvedDeck = nextDeck;
    let resolvedReview = nextReview;

    if (resolvedDeck.length === 0 && resolvedReview.length > 0) {
      resolvedDeck = shuffleFlashcards(resolvedReview);
      resolvedReview = [];
    }

    setDeck(resolvedDeck);
    setReviewQueue(resolvedReview);
    setIsFlipped(false);
    setSeenCount((count) => count + 1);
  }

  function handleKnewIt() {
    if (!currentCard) return;
    advance(deck.slice(1), reviewQueue);
  }

  function handleStillLearning() {
    if (!currentCard) return;
    advance(deck.slice(1), [...reviewQueue, currentCard]);
  }

  function handleSkip() {
    if (!currentCard) return;
    advance([...deck.slice(1), currentCard], reviewQueue);
  }

  if (totalCards === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]/95 px-6">
        <div className="max-w-md rounded-xl border border-[#1e1e2e] bg-[#13131a] p-8 text-center">
          <p className="font-[family-name:var(--font-cfa-mono)] text-sm text-[#9ca3af]">
            No flashcards match your current filters.
          </p>
          <button
            type="button"
            onClick={onExit}
            className="mt-6 rounded-md bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2563eb]"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]/95 px-6">
        <div className="max-w-md rounded-xl border border-[#1e1e2e] bg-[#13131a] p-8 text-center">
          <p className="font-[family-name:var(--font-cfa-mono)] text-lg font-semibold text-[#f0f0f5]">
            Session complete
          </p>
          <p className="mt-2 text-sm text-[#9ca3af]">
            You reviewed {seenCount} cards from {cfaData[activeLevel].label}.
          </p>
          <button
            type="button"
            onClick={onExit}
            className="mt-6 rounded-md bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2563eb]"
          >
            End Session
          </button>
        </div>
      </div>
    );
  }

  const progress =
    totalCards > 0 ? Math.min((seenCount / totalCards) * 100, 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0f]/95">
      <div className="border-b border-[#1e1e2e] px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div>
            <p className="font-[family-name:var(--font-cfa-mono)] text-xs tracking-wide text-[#6b7280] uppercase">
              Flashcard Mode · {cfaData[activeLevel].label}
            </p>
            <p className="mt-1 text-sm text-[#9ca3af]">
              {seenCount} seen · {remaining} remaining
            </p>
          </div>
          <button
            type="button"
            onClick={onExit}
            className="rounded-md border border-[#1e1e2e] px-3 py-1.5 text-sm text-[#9ca3af] transition-colors hover:text-[#f0f0f5]"
          >
            End Session
          </button>
        </div>
        <div className="mx-auto mt-4 h-1 max-w-3xl overflow-hidden rounded-full bg-[#1e1e2e]">
          <div
            className="h-full bg-[#3b82f6] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl [perspective:1200px]">
          <button
            type="button"
            onClick={() => setIsFlipped((flipped) => !flipped)}
            className="relative mx-auto block h-72 w-full max-w-xl cursor-pointer [transform-style:preserve-3d] transition-transform duration-500"
            style={{
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-[#1e1e2e] bg-[#13131a] p-8 [backface-visibility:hidden]">
              <p className="text-center text-lg leading-8 text-[#f0f0f5]">
                {currentCard.note}
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-[#3b82f6]/40 bg-[#13131a] p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <p className="font-[family-name:var(--font-cfa-mono)] text-xs tracking-wide text-[#3b82f6] uppercase">
                Source
              </p>
              <p className="mt-3 text-center font-[family-name:var(--font-cfa-mono)] text-lg font-semibold text-[#f0f0f5]">
                {currentCard.topicName}
              </p>
              <p className="mt-2 text-center text-sm text-[#9ca3af]">
                {currentCard.moduleTitle}
              </p>
            </div>
          </button>
          <p className="mt-4 text-center text-xs text-[#6b7280]">
            Tap card to flip
          </p>
        </div>
      </div>

      <div className="border-t border-[#1e1e2e] px-6 py-5">
        <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handleKnewIt}
            className="rounded-md bg-[#22c55e]/15 px-4 py-2 text-sm font-medium text-[#4ade80] transition-colors hover:bg-[#22c55e]/25"
          >
            Knew It
          </button>
          <button
            type="button"
            onClick={handleStillLearning}
            className="rounded-md bg-[#f59e0b]/15 px-4 py-2 text-sm font-medium text-[#fbbf24] transition-colors hover:bg-[#f59e0b]/25"
          >
            Still Learning
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="rounded-md border border-[#1e1e2e] px-4 py-2 text-sm text-[#9ca3af] transition-colors hover:text-[#f0f0f5]"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
