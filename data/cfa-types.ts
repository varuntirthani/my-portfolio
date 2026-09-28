export type LevelStatus = "passed" | "in_progress";

export type Difficulty = "tough" | "medium" | "easy";

export type CFAModule = {
  id: string;
  title: string;
  notes: string[];
};

export type CFATopic = {
  id: string;
  name: string;
  category: string;
  difficulty: Difficulty;
  summary: string;
  modules: CFAModule[];
};

export type CFALevel = {
  label: string;
  status: LevelStatus;
  passDate: string | null;
  topics: CFATopic[];
};

export type CFAData = Record<"L1" | "L2" | "L3", CFALevel>;

export type CFALevelKey = keyof CFAData;

export type CFADataSubset = Partial<CFAData>;
