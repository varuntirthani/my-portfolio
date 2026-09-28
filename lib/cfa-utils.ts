import type { CFALevel, CFATopic, CFAData } from "@/data/cfa-types";

export type CFALevelKey = keyof CFAData;

export function getLevelCategories(level: CFALevel): string[] {
  return [...new Set(level.topics.map((topic) => topic.category))].sort();
}

export function filterTopics(
  level: CFALevel,
  searchQuery: string,
  activeCategory: string | null,
): CFATopic[] {
  const query = searchQuery.trim().toLowerCase();

  return level.topics.filter((topic) => {
    if (activeCategory && topic.category !== activeCategory) {
      return false;
    }

    if (!query) {
      return true;
    }

    if (topic.name.toLowerCase().includes(query)) {
      return true;
    }

    if (topic.summary.toLowerCase().includes(query)) {
      return true;
    }

    return topic.modules.some(
      (module) =>
        module.title.toLowerCase().includes(query) ||
        module.notes.some((note) => note.toLowerCase().includes(query)),
    );
  });
}

export type Flashcard = {
  id: string;
  note: string;
  topicName: string;
  moduleTitle: string;
};

export function buildFlashcards(
  level: CFALevel,
  searchQuery: string,
  activeCategory: string | null,
): Flashcard[] {
  const topics = filterTopics(level, searchQuery, activeCategory);

  return topics.flatMap((topic) =>
    topic.modules.flatMap((module) =>
      module.notes.map((note, index) => ({
        id: `${topic.id}-${module.id}-${index}`,
        note,
        topicName: topic.name,
        moduleTitle: module.title,
      })),
    ),
  );
}

export function shuffleFlashcards(cards: Flashcard[]): Flashcard[] {
  const shuffled = [...cards];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export const difficultyStyles = {
  tough: {
    dot: "bg-red-400",
    label: "Tough",
  },
  medium: {
    dot: "bg-amber-400",
    label: "Medium",
  },
  easy: {
    dot: "bg-emerald-400",
    label: "Easy",
  },
} as const;
