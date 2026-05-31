export type Skill = {
  name: string;
  experience: string;
};

export type Tool = {
  name: string;
  icon: string;
};

export const tools: Tool[] = [
  { name: "Excel", icon: "/images/skills/excel.jpg" },
  { name: "Python", icon: "/images/skills/python.jpg" },
  { name: "Bloomberg Terminal", icon: "/images/skills/bloomberg.png" },
];

export const skills: Skill[] = [
  { name: "Financial Analysis & Valuation", experience: "2+ Years" },
  { name: "Consulting / Problem-Solving", experience: "2+ Years" },
  { name: "Research & Strategy", experience: "3+ Years" },
  { name: "Communication & Leadership", experience: "5+ Years" },
];
