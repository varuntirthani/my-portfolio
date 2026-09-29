import "server-only";
import { cfaData } from "@/data/cfa-data";
import type { CFALevelKey, Difficulty, LevelStatus } from "@/data/cfa-types";

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
  moduleCount: number;
  topics: { name: string; difficulty: Difficulty; moduleCount: number }[];
};

export type CFAPreview = {
  totals: { levels: number; topics: number; modules: number; passed: number };
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
      moduleCount: topic.modules.length,
    }));

    return {
      key,
      label: level.label,
      status: level.status,
      moduleCount: topics.reduce((sum, topic) => sum + topic.moduleCount, 0),
      topics,
    };
  });

  return {
    totals: {
      levels: levels.length,
      topics: levels.reduce((sum, level) => sum + level.topics.length, 0),
      modules: levels.reduce((sum, level) => sum + level.moduleCount, 0),
      passed: levels.filter((level) => level.status === "passed").length,
    },
    levels,
    samples: SAMPLE_NOTES.map(([level, prefix]) =>
      findSample(level, prefix),
    ).filter((sample): sample is CFAPreviewSample => sample !== null),
  };
}
