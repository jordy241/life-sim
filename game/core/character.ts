export type StatBlock = {
  health: number; // 0–100
  happiness: number; // 0–100
  energy: number; // 0–100
  money: number; // free-form
};

export type Trait = "ambitious" | "creative" | "lazy" | "social"; // Expandable

export interface Character {
  id: string;
  name: string;
  age: number;
  stats: StatBlock;
  traits: Trait[];
}
