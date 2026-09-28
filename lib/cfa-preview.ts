import "server-only";
import { cfaData } from "@/data/cfa-data";
import type { CFALevelKey, Difficulty, LevelStatus } from "@/data/cfa-types";
import { parseNote } from "@/lib/cfa-math";

export type CFAPreviewSample = {
  level: string;
  topic: string;
  module: string;
  note: string;
};

export type CFAPreviewLevel = {
  key: CFALevelKey;
  label: string;
  status: LevelStatus;
  noteCount: number;
  topics: { name: string; difficulty: Difficulty; noteCount: number }[];
};

export type CFAPreview = {
  totals: { topics: number; notes: number; formulas: number };
  levels: CFAPreviewLevel[];
  samples: CFAPreviewSample[];
};

const SAMPLE_NOTES: [CFALevelKey, string][] = [
  ["L1", "Effective Annual Rate:"],
  ["L2", "Callable bond:"],
  ["L3", "Equity-futures contracts:"],
];

function findSample(
  levelKey: CFALevelKey,
  prefix: string,
): CFAPreviewSample | null {
  const level = cfaData[levelKey];
  for (const topic of level.topics) {
    for (const cfaModule of topic.modules) {
      const note = cfaModule.notes.find((text) => text.startsWith(prefix));
      if (note) {
        return {
          level: level.label,
          topic: topic.name,
          module: cfaModule.title,
          note,
        };
      }
    }
  }
  return null;
}

export function getCFAPreview(): CFAPreview {
  const levels = (Object.keys(cfaData) as CFALevelKey[]).map((key) => {
    const level = cfaData[key];
    const topics = level.topics.map((topic) => ({
      name: topic.name,
      difficulty: topic.difficulty,
      noteCount: topic.modules.reduce(
        (sum, cfaModule) => sum + cfaModule.notes.length,
        0,
      ),
    }));

    return {
      key,
      label: level.label,
      status: level.status,
      noteCount: topics.reduce((sum, topic) => sum + topic.noteCount, 0),
      topics,
    };
  });

  const allNotes = Object.values(cfaData).flatMap((level) =>
    level.topics.flatMap((topic) =>
      topic.modules.flatMap((cfaModule) => cfaModule.notes),
    ),
  );

  return {
    totals: {
      topics: levels.reduce((sum, level) => sum + level.topics.length, 0),
      notes: allNotes.length,
      formulas: allNotes.filter((note) =>
        parseNote(note).some((part) => part.type === "math"),
      ).length,
    },
    levels,
    samples: SAMPLE_NOTES.map(([level, prefix]) =>
      findSample(level, prefix),
    ).filter((sample): sample is CFAPreviewSample => sample !== null),
  };
}
