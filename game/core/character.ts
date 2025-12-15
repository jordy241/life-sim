// game/core/character.ts

export type VitalsStats = {
  health: number; // 0-100
  energy: number; // 0-100
  stress: number; // 0-100 (higher = worse)
};

export type MindStats = {
  happiness: number;  // 0-100
  confidence: number; // 0-100
  discipline: number; // 0-100
};

export type SocialStats = {
  charisma: number;   // 0-100
  reputation: number; // 0-100
};

export type WealthStats = {
  cash: number; // >= 0 (or allow negative if you want overdraft)
  debt: number; // >= 0
};

export type StatBlock = {
  vitals: VitalsStats;
  mind: MindStats;
  social: SocialStats;
  wealth: WealthStats;
};

export type Trait = "ambitious" | "creative" | "lazy" | "social";

export interface Character {
  id: string;
  name: string;
  stats: StatBlock;
  traits: Trait[];
}
